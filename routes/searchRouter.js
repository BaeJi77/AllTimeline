var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

var searchService = require('../services/searchService');

router.post('/person', naverSearch);
router.post('/personDetail', naverSearchDetail);
router.post('/history', HistorySearchDetail);


async function naverSearch(req, res, next) {
    let personSearchKeyword = req.body.personName;
    let searchResult = await searchService.searchPerson(personSearchKeyword);
    res.status(200).send(searchResult);
}


async function naverSearchDetail(req, res, next) {
    let peopleSearchId = req.body.peopleSearchId;
    let choiceUrl = req.body.detailUrl;
    let searchResult = await searchService.searchDetailUrl(peopleSearchId, choiceUrl);
    res.status(200).send(searchResult);
}


async function HistorySearchDetail(req, res, next) {
    let historySearchKeyword = req.body.historyEvent;
    let searchResult = await searchService.searchHistory(historySearchKeyword);
    res.status(200).send(searchResult);
}


module.exports = router;
