const puppeteer = require('puppeteer');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');


(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://en.wikipedia.org/wiki/Timeline_of_historic_inventions', {waitUntil: 'networkidle2'});

    const allResultsSelector = '#\\32 0th_century';
    await page.waitForSelector(allResultsSelector);

    var dtArray = await page.evaluate(() => {
        var listing = document.querySelectorAll(`li`);
        // var content = document.querySelectorAll('div.slideshow-slide-dek > p');
        //var src = document.querySelectorAll('div.slide-media-outer > div.slide-media slide-media-4x6 > div.slide-media-inner > span.slide-image-wrap > picture > img');
        //var link = document.querySelectorAll(`a.href`);

        var titleLinkArray = [];
        for (var i = 0; i < listing.length; i++) {
            titleLinkArray[i] = {
                List: listing[i].innerText.trim(),
                //    Content: content[i].innerText.trim(),
                //SRC : src[i].src()
                //link: link[i].href
            };
        }

        return titleLinkArray;
    });

    for (var i = 0; i < dtArray.length; i++) {
        var tmp1 = dtArray[i].List.split(':')[0];
        var tmp2 = dtArray[i].List.split(':')[1];
        dtArray[i].List = tmp1;
        dtArray[i].Name = tmp2;
    }

    (async () => {
        let csv = new ObjectsToCsv((dtArray));
        await csv.toDisk(('./test.csv'));

        console.log(await csv.toString());
    })();


    console.log(dtArray.length);

    //exportToExcel(dtArray);

    if (dtArray.length === 1) {
        //해당 page로 link를 가지고 접근해서 data가져옴{경력사항}
    } else {
        //안쓰로 누구를 찾는가 보여주고
        // 해당 data에 대한 link 접근후 data가져옴
    }

    await browser.close();

})();