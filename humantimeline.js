const puppeteer = require('puppeteer');
const xlsx = require('xlsx');
const fs = require('fs');


(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://artsandculture.google.com/category/event', {waitUntil: 'networkidle2'});
    //var gogo = 'https://people.search.naver.com/search.naver';   //link url 병합위함
    await page.waitForSelector('#yDmH0d > div.YtXkff.ZnICfc > div.AFnmuc > div.sHnYxd > div');
    await page.click('#yDmH0d > div.YtXkff.ZnICfc > div.AFnmuc > div.sHnYxd > div');

    console.log("HI");
    await page.waitFor(2000);
    await page.waitForSelector('#yDmH0d > div.YtXkff.ZnICfc.pYOnsb > div.jhbJ2 > div > input');
    await page.type('#yDmH0d > div.YtXkff.ZnICfc.pYOnsb > div.jhbJ2 > div > input', '세계2차대전', {delay: 20});
    console.log("SIBA:");
    // const allResultsSelector = '#yDmH0d > div.t3Pwhc.uFenQ > div > div > section.cv0WEf > div.dxztSe > div.z1JkWd.NJ4rnc > span > div:nth-child(2) > a > span > div.cIdUIc > h3';
    //await page.waitForSelector(allResultsSelector);

    // await page.waitFor(2000);
    await page.keyboard.press('Enter');
    //await page.waitForSelector()
    await page.waitFor(2000);
    console.log(page.url());


    //  await page.waitForSelector('#yDmH0d > div.t3Pwhc.uFenQ > div > div > section.cv0WEf > div.dxztSe > div.z1JkWd.NJ4rnc > span > div:nth-child(2)');
    // await page.waitFor(2000);

    const allResultsSelector = '#yDmH0d > div.t3Pwhc.uFenQ > div > div > section.cv0WEf > div.dxztSe > div.z1JkWd.NJ4rnc > span > div:nth-child(2) > a';
    //await page.waitForSelector(allResultsSelector);

    //await page.waitForSelector('#yDmH0d > div.t3Pwhc.uFenQ > div > div > section.cv0WEf > div.dxztSe > div.z1JkWd.NJ4rnc > span ');
    await page.waitFor(2000);
    var dtArray = await page.evaluate(() => {
        //  page.waitFor(1000);
        var titleNodeList = document.querySelectorAll(`a.e0WtYb`);

        var titleLinkArray = [];

        for (var i = 0; i < titleNodeList.length; i++) {
            titleLinkArray[i] = {
                title: titleNodeList[i].innerText.trim(),
                link: titleNodeList[i].getAttribute("href"),
            };
        }

        return titleLinkArray;
    });

    //var url = document.querySelectorAll('#yDmH0d > div.t3Pwhc.uFenQ > div > div > section.cv0WEf > div.dxztSe > div.z1JkWd.NJ4rnc > span > div:nth-child(2) > a').getAttribute("href");
    for (var i = 0; i < dtArray.length; i++) {
        if (dtArray[i].title == "제2차 세계 대전")
            console.log(dtArray[i].link);
    }
    console.log(dtArray);

    console.log("page.url()");
    console.log("BBBB");


    var title = document.querySelector('#yDmH0d > div.Noqx5.uFenQ > header > div.Z7Jybf > h1').innerText.trim();
    var year = document.querySelector('#yDmH0d > div.Noqx5.uFenQ > header > div.Z7Jybf > h2').innerText.trim();
    var data = document.querySelector('#yDmH0d > div.Noqx5.uFenQ > div > div:nth-child(1) > div > div.gI3F8b').innerText.trim();

    console.log(title);
    console.log(year);
    console.log(data);

    // const resultSelector = 'a.name';
    // await page.waitForSelector(resultSelector);
    // var dtArray = await page.evaluate(() => {
    //     var titleNodeList = document.querySelectorAll(`a.name`);
    //     var job = document.querySelectorAll(`span.sub`);
    //     var profile = document.querySelectorAll(`dl`);
    //     var titleLinkArray = [];
    //     for (var i = 0; i < titleNodeList.length; i++) {
    //         titleLinkArray[i] = {
    //             title: titleNodeList[i].innerText.trim(),
    //             job: job[i].innerText.trim(),
    //             link: titleNodeList[i].getAttribute("href"),
    //             profile: profile[i].innerText.trim()
    //         };
    //     }
    //     return titleLinkArray;
    // });
    // for (var i = 0; i < dtArray.length; i++) {
    //     dtArray[i].link = gogo + dtArray[i].link;
    // }


    browser.close();
    return dtArray;
})();
