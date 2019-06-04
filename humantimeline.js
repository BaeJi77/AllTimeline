// const puppeteer = require('puppeteer');
// const xlsx = require('xlsx');
// const fs = require('fs');
//
//
// (async () => {
//
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//
//     await page.goto('http://humanhistorytimeline.com/', {waitUntil: 'networkidle2'});
//     var gogo = 'https://people.search.naver.com/search.naver';   //link url 병합위함
//
//     const allResultsSelector = '#post-47';
//     await page.waitForSelector(allResultsSelector);
//
//     var dtArray = await page.evaluate(() => {
//         var listing = document.querySelectorAll(`li`);
//         //var link = document.querySelectorAll(`a.href`);
//
//         var titleLinkArray = [];
//         for (var i = 0; i < listing.length; i++) {
//             titleLinkArray[i] = {
//                 List: listing[i].innerText.trim(),
//                 //link: link[i].href
//             };
//         }
//         return titleLinkArray;
//     });
//
//     //console.log(dtArray);
//     for (var i = 0; i < dtArray.length; i++) {
//         console.log(dtArray[i]);
//     }
//
//     console.log(dtArray.length);
//
//     //exportToExcel(dtArray);
//
//     if (dtArray.length === 1) {
//         //해당 page로 link를 가지고 접근해서 data가져옴{경력사항}
//     } else {
//         //안쓰로 누구를 찾는가 보여주고
//         // 해당 data에 대한 link 접근후 data가져옴
//     }
//
//     await browser.close();
//
// })();