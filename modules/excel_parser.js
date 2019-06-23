const XLSX = require('xlsx');
const categoryRepository = require('../repositories/categoryRepository');
var express = require('express');
var router = express.Router();

router.get('/korean', async function (req, res, next) {
    var wookbook = XLSX.readFile(__dirname+'/korean_history.xlsx');
    var wooksheet = wookbook.Sheets["Sheet1"];

    
    // 1 ~ 169
    for(var i = 1 ; i <=  169 ; i++) {
        var newObject = {};
        var start_date = 'A' + i;
        var event_name = 'B' + i;
        var descriptor = 'C' + i;
        var detail_url = 'D' + i;
        var picture = 'E' + i;
        var end_date = 'F' + i;
        var duration = 'G' + i;
        newObject.start_date = wooksheet[start_date].v;
        newObject.event_name = wooksheet[event_name].v;
        newObject.descriptor = wooksheet[descriptor].v;
        newObject.detail_url = wooksheet[detail_url].v;
        newObject.picture = wooksheet[picture].v;
        newObject.end_date = wooksheet[end_date].v;
        newObject.duration = wooksheet[duration].v;
        newObject.categoryId = 1;
        console.log(newObject);
        await categoryRepository.createCategoryEvent(newObject);
    }

    res.json(wooksheet);
});


router.get('/world', async function (req, res, next) {
    var wookbook = XLSX.readFile(__dirname+'/world_history.xlsx');
    var wooksheet = wookbook.Sheets["Sheet1"];

    // 1 ~ 234
    for(var i = 1 ; i <=  234 ; i++) {
        var newObject = {};
        var start_date = 'A' + i;
        var event_name = 'B' + i;
        var descriptor = 'C' + i;
        var detail_url = 'D' + i;
        var picture = 'E' + i;
        var end_date = 'F' + i;
        var duration = 'G' + i;
        newObject.start_date = wooksheet[start_date].v;
        newObject.event_name = wooksheet[event_name].v;
        newObject.descriptor = wooksheet[descriptor].v;
        newObject.detail_url = wooksheet[detail_url].v;
        newObject.picture = wooksheet[picture].v;
        newObject.end_date = wooksheet[end_date].v;
        newObject.duration = wooksheet[duration].v;
        newObject.categoryId = 2;
        console.log(newObject);
        await categoryRepository.createCategoryEvent(newObject);
    }
    // console.log(wooksheet);
    res.json(wooksheet);
});

router.get('/music', async function (req, res, next) {
    var wookbook = XLSX.readFile(__dirname+'/music_history.xlsx');
    var wooksheet = wookbook.Sheets["Sheet1"];

    // 1 ~ 26
    for(var i = 1 ; i <=  26 ; i++) {
        var newObject = {};
        var start_date = 'A' + i;
        var event_name = 'B' + i;
        var descriptor = 'C' + i;
        var detail_url = 'D' + i;
        var picture = 'E' + i;
        var end_date = 'F' + i;
        var duration = 'G' + i;
        newObject.start_date = wooksheet[start_date].v;
        newObject.event_name = wooksheet[event_name].v;
        newObject.descriptor = wooksheet[descriptor].v;
        newObject.detail_url = wooksheet[detail_url].v;
        newObject.picture = wooksheet[picture].v;
        newObject.end_date = wooksheet[end_date].v;
        newObject.duration = wooksheet[duration].v;
        newObject.categoryId = 3;
        console.log(newObject);
        await categoryRepository.createCategoryEvent(newObject);
    }
    // console.log(wooksheet);
    res.json(wooksheet);
});

router.get('/art', async function (req, res, next) {
    var wookbook = XLSX.readFile(__dirname+'/art_history.xlsx');
    var wooksheet = wookbook.Sheets["Sheet1"];

    // 1 ~ 72
    for(var i = 1 ; i <=  69 ; i++) {
        var newObject = {};
        var start_date = 'A' + i;
        var event_name = 'B' + i;
        var descriptor = 'C' + i;
        var detail_url = 'D' + i;
        var picture = 'E' + i;
        var end_date = 'F' + i;
        var duration = 'G' + i;
        newObject.start_date = wooksheet[start_date].v;
        newObject.event_name = wooksheet[event_name].v;
        newObject.descriptor = wooksheet[descriptor].v;
        newObject.detail_url = wooksheet[detail_url].v;
        newObject.picture = wooksheet[picture].v;
        newObject.end_date = wooksheet[end_date].v;
        newObject.duration = wooksheet[duration].v;
        newObject.categoryId = 4;
        console.log(newObject);
        await categoryRepository.createCategoryEvent(newObject);
    }
    // console.log(wooksheet);
    res.json(wooksheet);
});



module.exports = router;