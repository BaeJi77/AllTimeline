const XLSX = require('xlsx');
const categoryRepository = require('../repositories/categoryRepository');
var express = require('express');
var router = express.Router();

module.exports = {
    prefixConfig : async function () {
        await categoryRepository.createCategoryWithNameAndType("한국사", 1, "https://upload.wikimedia.org/wikipedia/commons/8/8a/Horse_back_archery_AD_4C.jpg");
        await categoryRepository.createCategoryWithNameAndType("세계사", 1, "https://upload.wikimedia.org/wikipedia/commons/d/d8/Winkel-tripel-projection.jpg");
        await categoryRepository.createCategoryWithNameAndType("음악사", 1, "https://upload.wikimedia.org/wikipedia/commons/b/b5/Bach.jpg");
        await categoryRepository.createCategoryWithNameAndType("미술사", 1, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/270px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg");
        await categoryRepository.createCategoryWithNameAndType("기술사", 1, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDTRDuR-o3YotT429wdn1mdmoKQ9VvlqHrVfCaoW-_uawgj7KG");

        var wookbookKorean = XLSX.readFile(__dirname+'/korean_history.xlsx');
        var wooksheetKorean = wookbookKorean.Sheets["Sheet1"];

        // 1 ~ 169
        for(var i = 1 ; i <=  163 ; i++) {
            var newObject = {};
            var start_date = 'A' + i;
            var event_name = 'B' + i;
            var descriptor = 'C' + i;
            var detail_url = 'D' + i;
            var picture = 'E' + i;
            var end_date = 'F' + i;
            var duration = 'G' + i;
            newObject.start_date = wooksheetKorean[start_date].v;
            newObject.event_name = wooksheetKorean[event_name].v;
            newObject.descriptor = wooksheetKorean[descriptor].v;
            newObject.detail_url = wooksheetKorean[detail_url].v;
            newObject.picture = wooksheetKorean[picture].v;
            newObject.end_date = wooksheetKorean[end_date].v;
            newObject.duration = wooksheetKorean[duration].v;
            newObject.categoryId = 1;
            // console.log(newObject);
            await categoryRepository.createCategoryEvent(newObject);
        }

        var wookbookWorld = XLSX.readFile(__dirname+'/world_history.xlsx');
        var wooksheetWorld = wookbookWorld.Sheets["Sheet1"];

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
            newObject.start_date = wooksheetWorld[start_date].v;
            newObject.event_name = wooksheetWorld[event_name].v;
            newObject.descriptor = wooksheetWorld[descriptor].v;
            newObject.detail_url = wooksheetWorld[detail_url].v;
            newObject.picture = wooksheetWorld[picture].v;
            newObject.end_date = wooksheetWorld[end_date].v;
            newObject.duration = wooksheetWorld[duration].v;
            newObject.categoryId = 2;
            // console.log(newObject);
            await categoryRepository.createCategoryEvent(newObject);
        }

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
            // console.log(newObject);
            await categoryRepository.createCategoryEvent(newObject);
        }

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
            // console.log(newObject);
            await categoryRepository.createCategoryEvent(newObject);
        }

        var wookbook = XLSX.readFile(__dirname+'/technology_history.xlsx');
        var wooksheet = wookbook.Sheets["Sheet1"];

        // 1 ~ 12
        for(var i = 1 ; i <=  12 ; i++) {
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
            newObject.categoryId = 5;
            await categoryRepository.createCategoryEvent(newObject);
        }
    }
}
//
//
// router.get('/korean', async function (req, res, next) {
//     var wookbook = XLSX.readFile(__dirname+'/korean_history.xlsx');
//     var wooksheet = wookbook.Sheets["Sheet1"];
//
//
//     // 1 ~ 169
//     for(var i = 1 ; i <=  169 ; i++) {
//         var newObject = {};
//         var start_date = 'A' + i;
//         var event_name = 'B' + i;
//         var descriptor = 'C' + i;
//         var detail_url = 'D' + i;
//         var picture = 'E' + i;
//         var end_date = 'F' + i;
//         var duration = 'G' + i;
//         newObject.start_date = wooksheet[start_date].v;
//         newObject.event_name = wooksheet[event_name].v;
//         newObject.descriptor = wooksheet[descriptor].v;
//         newObject.detail_url = wooksheet[detail_url].v;
//         newObject.picture = wooksheet[picture].v;
//         newObject.end_date = wooksheet[end_date].v;
//         newObject.duration = wooksheet[duration].v;
//         newObject.categoryId = 1;
//         console.log(newObject);
//         await categoryRepository.createCategoryEvent(newObject);
//     }
//
//     res.json(wooksheet);
// });
//
//
// router.get('/world', async function (req, res, next) {
//     var wookbook = XLSX.readFile(__dirname+'/world_history.xlsx');
//     var wooksheet = wookbook.Sheets["Sheet1"];
//
//     // 1 ~ 234
//     for(var i = 1 ; i <=  234 ; i++) {
//         var newObject = {};
//         var start_date = 'A' + i;
//         var event_name = 'B' + i;
//         var descriptor = 'C' + i;
//         var detail_url = 'D' + i;
//         var picture = 'E' + i;
//         var end_date = 'F' + i;
//         var duration = 'G' + i;
//         newObject.start_date = wooksheet[start_date].v;
//         newObject.event_name = wooksheet[event_name].v;
//         newObject.descriptor = wooksheet[descriptor].v;
//         newObject.detail_url = wooksheet[detail_url].v;
//         newObject.picture = wooksheet[picture].v;
//         newObject.end_date = wooksheet[end_date].v;
//         newObject.duration = wooksheet[duration].v;
//         newObject.categoryId = 2;
//         console.log(newObject);
//         await categoryRepository.createCategoryEvent(newObject);
//     }
//     // console.log(wooksheet);
//     res.json(wooksheet);
// });
//
// router.get('/music', async function (req, res, next) {
//     var wookbook = XLSX.readFile(__dirname+'/music_history.xlsx');
//     var wooksheet = wookbook.Sheets["Sheet1"];
//
//     // 1 ~ 26
//     for(var i = 1 ; i <=  26 ; i++) {
//         var newObject = {};
//         var start_date = 'A' + i;
//         var event_name = 'B' + i;
//         var descriptor = 'C' + i;
//         var detail_url = 'D' + i;
//         var picture = 'E' + i;
//         var end_date = 'F' + i;
//         var duration = 'G' + i;
//         newObject.start_date = wooksheet[start_date].v;
//         newObject.event_name = wooksheet[event_name].v;
//         newObject.descriptor = wooksheet[descriptor].v;
//         newObject.detail_url = wooksheet[detail_url].v;
//         newObject.picture = wooksheet[picture].v;
//         newObject.end_date = wooksheet[end_date].v;
//         newObject.duration = wooksheet[duration].v;
//         newObject.categoryId = 3;
//         console.log(newObject);
//         await categoryRepository.createCategoryEvent(newObject);
//     }
//     // console.log(wooksheet);
//     res.json(wooksheet);
// });
//
// router.get('/art', async function (req, res, next) {
//     var wookbook = XLSX.readFile(__dirname+'/art_history.xlsx');
//     var wooksheet = wookbook.Sheets["Sheet1"];
//
//     // 1 ~ 72
//     for(var i = 1 ; i <=  69 ; i++) {
//         var newObject = {};
//         var start_date = 'A' + i;
//         var event_name = 'B' + i;
//         var descriptor = 'C' + i;
//         var detail_url = 'D' + i;
//         var picture = 'E' + i;
//         var end_date = 'F' + i;
//         var duration = 'G' + i;
//         newObject.start_date = wooksheet[start_date].v;
//         newObject.event_name = wooksheet[event_name].v;
//         newObject.descriptor = wooksheet[descriptor].v;
//         newObject.detail_url = wooksheet[detail_url].v;
//         newObject.picture = wooksheet[picture].v;
//         newObject.end_date = wooksheet[end_date].v;
//         newObject.duration = wooksheet[duration].v;
//         newObject.categoryId = 4;
//         console.log(newObject);
//         await categoryRepository.createCategoryEvent(newObject);
//     }
//     // console.log(wooksheet);
//     res.json(wooksheet);
// });
//
//
//
// module.exports = router;