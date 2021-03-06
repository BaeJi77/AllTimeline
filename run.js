const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://people.search.naver.com/', {waitUntil: 'networkidle2'});
    var gogo = 'https://people.search.naver.com/search.naver';   //link url 병합위함
    await page.type('#nx_query', '김민성');

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

    console.log(dtArray);
    console.log("here:", dtArray[0]);
    console.log(dtArray.length);
    if (dtArray.length === 1) {
        //해당 page로 link를 가지고 접근해서 data가져옴{경력사항}
    } else {
        //안쓰로 누구를 찾는가 보여주고
        // 해당 data에 대한 link 접근후 data가져옴
    }

    await browser.close();

})();

