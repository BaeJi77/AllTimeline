var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

var searchService = require('../services/searchService');

router.get('/', running);
router.post('/person', naverSearch);
router.post('/personDetail', naverSearchDetail);


async function naverSearch(req, res, next) {
    let personSearchKeyword = req.body.personName;
    let searchResult = await searchService.searchPerson(personSearchKeyword);
    console.log(searchResult);
    res.status(200).send(searchResult);
}


async function naverSearchDetail(req, res, next) {
    let choiceUrl = req.body.detailUrl;
    console.log(choiceUrl);
    let searchResult = await searchService.searchDetailUrl(choiceUrl);
    console.log("Consoele " + searchResult);
    res.status(200).send(searchResult);
}

//실행함수만들기
async function running(req, res, next) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://ko.wikipedia.org/wiki/아이작_뉴턴', {waitUntil: 'networkidle2'});
    //await page.waitForSelector('#mw-content-text > div > table.infobox > tr>td');
    const selector = '#mw-content-text > div > table.infobox>tbody>tr';
    const selector2 = '#mw-content-text > div > table.infobox>tbody>tr>td'
    await page.waitForSelector(selector);


    const links = await page.evaluate(selector => {
        const anchors = Array.from(document.querySelectorAll(selector));
        //   console.log(anchors);
        return anchors.map(anchor => {
            const title = anchor.textContent.split('|')[0].trim();
            // return `${title} - ${anchor}`;
            return `${title}`;
        });
    }, selector);

    console.log('type:', typeof (links));
    var str = links.toString();
    var strArray = str.split(',');
    console.log('str::', str);

    console.log('here:', strArray);

    console.log('End:');
    console.log('here:', strArray[0]);
    console.log('here:', strArray[1]);
    console.log('here:', strArray[2]);
    console.log('here:', strArray[3]);
    console.log('here:', strArray[4]);
    console.log('here:', strArray[5]);
    console.log('here:', strArray[6]);
    console.log('here:', strArray[7]);
    console.log('here:', strArray[8]);
    console.log('here:', strArray[9]);
    console.log('here:', strArray[10]);
    console.log('here:', strArray[11]);
    console.log('here:', strArray[12]);
    console.log('here:', strArray[13]);

    console.log('End2:');
    //console.log(links.join('\n'));


    browser.close();
};


module.exports = router;
