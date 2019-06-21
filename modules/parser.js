const nowYear = "2019";

module.exports = {
    startEndYearParsing: function (date) {
        var retObject = {};
        let parsingArray = date.split('~');
        if (parsingArray[0] === '' || parsingArray[0] === '\t' || parsingArray[0] === '\n') {
            retObject.start_date = "-1";
            retObject.end_date = "-1";
        } else if (parsingArray.length === 1) {
            retObject.start_date = parsingArray[0];
            retObject.end_date = "-1";
        } else if (parsingArray[1] === '' || parsingArray[1] === '\t' || parsingArray[1] === '\n') {
            retObject.start_date = parsingArray[0];
            retObject.end_date = nowYear;
        } else {
            retObject.start_date = parsingArray[0];
            retObject.end_date = parsingArray[1];
        }

        return retObject;
    },

    convertYearMonthToYear: function (yearAndMonth) {
        return yearAndMonth.split('.')[0];
    },

    makeBirthDate: function (birthDate) {
        var onlyYear = birthDate.split('년');
        var onlyYearNoDetail = onlyYear[0].split(' ');
        var ret = "";
        if (onlyYearNoDetail.length === 2) {
            ret = onlyYearNoDetail[1];
        } else {
            ret = onlyYearNoDetail[0];
        }
        return ret.trim();
    },

    makeDeathDate: function (deathDate) {
        var onlyYear = deathDate.split('년');
        var onlyYearNoDetail = onlyYear[0].split(' ');
        var ret = "";
        if (onlyYearNoDetail.length === 2) {
            ret = onlyYearNoDetail[1];
        } else {
            ret = onlyYearNoDetail[0];
        }
        return ret.trim();
    }
};