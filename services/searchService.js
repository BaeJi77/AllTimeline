const puppeteer = require('puppeteer');
const yearParser = require('../modules/parser');

// TODO : 1. 없으면 없다고 처리하기
module.exports = {
    searchPerson: async function (personSearchKeyword) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://people.search.naver.com/', {waitUntil: 'networkidle2'});
        var gogo = 'https://people.search.naver.com/search.naver';   //link url 병합위함
        await page.type('#nx_query', personSearchKeyword);

        console.log(personSearchKeyword);

        const allResultsSelector = '#search_form > fieldset > input';
        await page.waitForSelector(allResultsSelector);
        await page.click(allResultsSelector);

        const resultSelector = 'a.name';
        await page.waitForSelector(resultSelector);
        var dtArray = await page.evaluate(() => {
            var titleNodeList = document.querySelectorAll(`a.name`);
            var job = document.querySelectorAll(`span.sub`);
            var profile = document.querySelectorAll(`dl`);
            var titleLinkArray = [];
            for (var i = 0; i < titleNodeList.length; i++) {
                titleLinkArray[i] = {
                    title: titleNodeList[i].innerText.trim(),
                    job: job[i].innerText.trim(),
                    link: titleNodeList[i].getAttribute("href"),
                    profile: profile[i].innerText.trim()
                };
            }
            return titleLinkArray;
        });
        for (var i = 0; i < dtArray.length; i++) {
            dtArray[i].link = gogo + dtArray[i].link;
        }

        // if (dtArray.length === 1) {
        //     //해당 page로 link를 가지고 접근해서 data가져옴{경력사항}
        // } else {
        //     //안쓰로 누구를 찾는가 보여주고
        //     // 해당 data에 대한 link 접근후 data가져옴
        // }

        browser.close();
        return dtArray;
    },


    /*
    * TODO : 1. 디비 저장하는 부분 / 2. 날짜 부분 처리 안된 것 정리하기 / 3. 이전에 데이터가 있었는지 확인하는 루틴(db 구조 변경 요구)
    * */
    searchDetailUrl: async function (Url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(Url, {waitUntil: 'networkidle2'});

        const allResultsSelector = '#content > div > div.record_wrap > div:nth-child(2)';
        await page.waitForSelector(allResultsSelector);

        console.log(Url);

        var dtArray = await page.evaluate(() => {
            // var titleNodeList = document.querySelectorAll(`div.record`);
            var date = document.querySelectorAll(`div.record > dl > dt`);
            var content = document.querySelectorAll(`div.record > dl > dd`);
            var titleLinkArray = [];
            for (var i = 0; i < date.length; i++) {
                titleLinkArray[i] = {
                    // title: titleNodeList[i].innerText.trim(),
                    Date: date[i].innerText.trim(),
                    Content: content[i].innerText.trim()
                };
            }
            return titleLinkArray;
        });

        console.log(dtArray.length);
        console.log(yearParser.startEndYearParsing(dtArray[0]));
        console.log(dtArray);
        browser.close();
        return dtArray;

    }
};