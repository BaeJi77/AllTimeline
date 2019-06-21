const puppeteer = require('puppeteer');
const yearParser = require('../modules/parser');
const historyRepository = require('../repositories/historyRepository');
const {Category} = require('../models');
const {CategoryEvent} = require('../models');


class Queue {
    constructor() {
        this._arr = [];
    }

    enqueue(item) {
        this._arr.push(item);
    }

    dequeue() {
        return this._arr.shift();
    }

    size() {
        return this._arr.length;
    }
}

module.exports = {
    searchPerson: async function (personSearchKeyword) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://people.search.naver.com/', {waitUntil: 'networkidle2', timeout: 5000});
        var gogo = 'https://people.search.naver.com/search.naver';   //link url 병합위함
        await page.type('#nx_query', personSearchKeyword);

        console.log(personSearchKeyword);

        const allResultsSelector = '#search_form > fieldset > input';
        await page.waitForSelector(allResultsSelector);
        await page.click(allResultsSelector);

        const resultSelector = 'a.name';
        try {
            await page.waitForSelector(resultSelector, {timeout: 3000});
        } catch (err) {
            console.error(err);
            return [];
        }

        await page.waitForSelector('#content > div > div.result_section > div.result_content');

        var dtArray = await page.evaluate(() => {
            //var img = document.querySelectorAll('img.thmb_img');
            var titleNodeList = document.querySelectorAll(`a.name`);
            var job = document.querySelectorAll(`span.sub`);
            var profile = document.querySelectorAll(`dl`);
            var titleLinkArray = [];
            for (var i = 0; i < titleNodeList.length; i++) {
                titleLinkArray[i] = {
                    title: titleNodeList[i].innerText.trim(),
                    job: job[i].innerText.trim(),
                    link: titleNodeList[i].getAttribute("href"),
                    profile: profile[i].innerText.trim(),
                    imgurl: ""
                };
            }
            return titleLinkArray;
        });

        var qu = new Queue();
        for (var i = 0; i < dtArray.length; i++) {
            dtArray[i].link = gogo + dtArray[i].link;
            qu.enqueue(dtArray[i].link);
        }

        const profilePictureSelector = '#content > div > div.profile_wrap > div.thmb_wrap ';

        var imgurl = [];
        var imgtmp = new Queue();
        while (qu.size() != 0) {
            var imgurl = qu.dequeue();
            //const newbrowser = await puppeteer.launch();
            //page = await newbrowser.newPage();
            await page.goto(imgurl, {waitUntil: 'networkidle2'});
            //console.log("Imgurl open:" + imgurl);

            await page.waitForSelector(profilePictureSelector);
            let profilePiceutre = await page.evaluate(() => {
                if (document.querySelector('img.thmb_img') == null) return -1;
                return document.querySelector('img.thmb_img').getAttribute('src');
            });

            imgtmp.enqueue(profilePiceutre);
            //browser.close();

        }
        browser.close();

        for (var i = 0; i < dtArray.length; i++) {
            dtArray[i].imgurl = imgtmp.dequeue();
        }

        return dtArray;
    },


    /*
    * TODO : 1. 디비 저장하는 부분 / 2. 이전에 데이터가 있었는지 확인하는 루틴(db 구조 변경 요구) / 3. 사진 주기
    * */
    searchDetailUrl: async function (Url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(Url, {waitUntil: 'networkidle2'});

        console.log(Url);

        const allResultsSelector = '#content > div > div.record_wrap > div:nth-child(2)';
        //const profilePictureSelector = '#content > div > div.profile_wrap > div.thmb_wrap > a.thmb';
        const lifeDateSelector = '#content > div > div.profile_wrap > div.profile_dsc';

        // await page.waitForSelector(profilePictureSelector);
        // let profilePicture = await page.evaluate(() => {
        //     return document.querySelector('img.thmb_img').getAttribute('src');
        // });

        await page.waitForSelector(lifeDateSelector);
        let lifeDate = await page.evaluate(() => {
            var profileCategories = document.querySelectorAll('dl.dsc > dt');
            var profileContents = document.querySelectorAll('dl.dsc > dd');
            var targetIndex = 0;
            for (var i = 0; i < profileCategories.length; i++) {
                if (profileCategories[i].innerText === "출생" || profileCategories[i].innerText === "출생-사망") {
                    targetIndex = i;
                    break;
                }
            }
            return profileContents[targetIndex].innerText;
        });

        var lifeDateSplit = lifeDate.split('-');
        var birthYear = yearParser.makeBirthDate(lifeDateSplit[0]);
        var deathYear = -1;
        if (lifeDateSplit.length === 2)
            deathYear = yearParser.makeDeathDate(lifeDateSplit[1]);

        await page.waitForSelector(allResultsSelector);
        var dtArray = await page.evaluate(() => {
            var date = document.querySelectorAll(`div.record > dl > dt`);
            var content = document.querySelectorAll(`div.record > dl > dd`);
            var titleLinkArray = [];
            for (var i = 0; i < date.length; i++) {
                if (date[i].innerText.trim() === " " || date[i].innerText.trim() === '' || date[i].innerText.trim() === "연도없음") {
                    continue;
                }
                var temp = {
                    date: date[i].innerText.trim(),
                    content: content[i].innerText.trim()
                };
                titleLinkArray.push(temp);
            }
            return titleLinkArray;
        });

        var returnDateContent = [];
        for (var i = 0; i < dtArray.length; i++) {
            var object = dtArray[i];
            var newObject = {};
            newObject = yearParser.startEndYearParsing(object.date);
            newObject.start = yearParser.convertYearMonthToYear(newObject.start.trim());
            newObject.end = yearParser.convertYearMonthToYear(newObject.end.trim());
            newObject.event_name = object.content;
            if (newObject.start === "-1" && newObject.end === "-1")
                continue;
            returnDateContent.push(newObject);
        }

        var birthEvent = {};
        birthEvent.start = birthYear;
        birthEvent.end = -1;
        birthEvent.event_name = "출생";
        returnDateContent.push(birthEvent);

        if (lifeDateSplit.length === 2) {
            var deathEvent = {};
            deathEvent.start = deathYear;
            deathEvent.end = -1;
            deathEvent.event_name = "사망";
            returnDateContent.push(deathEvent);
        }

        browser.close();
        return returnDateContent;
    },

    searchHistory: async function (HistorySearchKeyword) {

        let historyEvents = await historyRepository.findOneHistoryByName(HistorySearchKeyword)
            .then(() => historyRepository.findAllHistory());

        return historyEvents;
    },
};