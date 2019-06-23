const puppeteer = require('puppeteer');
const yearParser = require('../modules/parser');
const historyRepository = require('../repositories/historyRepository');
const {Category} = require('../models');
const {CategoryEvent} = require('../models');


const peopleRepository = require('../repositories/peopleRepository');

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
    // TODO : 찾은 데이터가 없는 경우에도 db에 없다고 넣어주기
    searchPerson: async function (personSearchKeyword) {
        let decisionAlreadySearch = await peopleRepository.findPreviousSearchResult(personSearchKeyword);
        if (decisionAlreadySearch !== null) {
            console.log("기존에 검색한 결과 반환");
            return await peopleRepository.findAllPeopleInformationByName(personSearchKeyword);
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://people.search.naver.com/', {waitUntil: 'networkidle2', timeout: 5000});
        var gogo = 'https://people.search.naver.com/search.naver';   //link url 병합위함
        await page.type('#nx_query', personSearchKeyword);

        const allResultsSelector = '#search_form > fieldset > input';
        await page.waitForSelector(allResultsSelector);
        await page.click(allResultsSelector);

        let insertNewPeople = await peopleRepository.createFirstSearchPeople(personSearchKeyword, 0);
        let insertPeoplePrimaryId = insertNewPeople.dataValues.id;

        const resultSelector = 'a.name';
        try {
            await page.waitForSelector(resultSelector, {timeout: 3000});
        } catch (err) { // TODO : 없는 경우 이 경우도 DB에 저장
            console.error(err);
            return [];
        }

        await page.waitForSelector('#content > div > div.result_section > div.result_content');

        var dtArray = await page.evaluate(() => {
            var titleNodeList = document.querySelectorAll(`a.name`);
            var job = document.querySelectorAll(`span.sub`);
            var titleLinkArray = [];
            for (var i = 0; i < titleNodeList.length; i++) {
                titleLinkArray[i] = {
                    person_name: titleNodeList[i].innerText.trim(),
                    job: job[i].innerText.trim(),
                    link: titleNodeList[i].getAttribute("href"),
                    image: ""
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
        var imgtmp = new Queue();
        while (qu.size() != 0) {
            var imgurl = qu.dequeue(); // 결과 JSON
            await page.goto(imgurl, {waitUntil: 'networkidle2'});;

            await page.waitForSelector(profilePictureSelector);
            let profilePiceutre = await page.evaluate(() => {
                if (document.querySelector('img.thmb_img') == null) return -1;
                return document.querySelector('img.thmb_img').getAttribute('src');
            });

            imgtmp.enqueue(profilePiceutre);
        }
        browser.close();

        for (var i = 0; i < dtArray.length; i++) {
            dtArray[i].image = imgtmp.dequeue();
            dtArray[i].personId = insertPeoplePrimaryId;
            await peopleRepository.createNameSearchResult(dtArray[i]);
        }

        return await peopleRepository.findAllPeopleInformationByName(personSearchKeyword);
    },

    /*
    * TODO : 1. 디비 저장하는 부분 / 2. 이전에 데이터가 있었는지 확인하는 루틴(db 구조 변경 요구) / 3. 사진 주기
    * */

    searchDetailUrl: async function (peopleSearchId, url) {
        let decisionAlreadySearch = await peopleRepository.findPreviousDetailSearchResult(peopleSearchId);
        if (decisionAlreadySearch !== null) {
            console.log("기존에 검색한 결과 반환");
            return await peopleRepository.findAllPeopleEventUsingByPeopleSearchId(peopleSearchId);
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});

        const allResultsSelector = '#content > div > div.record_wrap > div:nth-child(2)';
        const lifeDateSelector = '#content > div > div.profile_wrap > div.profile_dsc';

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
            newObject.start_date = yearParser.convertYearMonthToYear(newObject.start_date.trim());
            newObject.end_date = yearParser.convertYearMonthToYear(newObject.end_date.trim());
            newObject.event_name = object.content;
            if (newObject.start_date === "-1" && newObject.end_date === "-1")
                continue;
            returnDateContent.push(newObject);
        }

        var birthEvent = {};
        birthEvent.start_date = birthYear;
        birthEvent.end_date = -1;
        birthEvent.event_name = "출생";
        returnDateContent.push(birthEvent);

        if (lifeDateSplit.length === 2) {
            var deathEvent = {};
            deathEvent.start_date = deathYear;
            deathEvent.end_date = -1;
            deathEvent.event_name = "사망";
            returnDateContent.push(deathEvent);
        }
        browser.close();
        return returnDateContent;
    },

    searchHistory: async function (HistorySearchKeyword) {
        return await historyRepository.findHistoryFocusingWar();

        let historyEvents = await historyRepository.findOneHistoryByName(HistorySearchKeyword)
            .then(() => historyRepository.findAllHistory());

        return historyEvents;
        for(var i = 0 ; i < returnDateContent.length ; i++) {
            returnDateContent[i].peopleSearchId = peopleSearchId;
            await peopleRepository.createChoicePeopleNameAndJob(returnDateContent[i]);
        }

        return await peopleRepository.findAllPeopleEventUsingByPeopleSearchId(peopleSearchId);
    },
};