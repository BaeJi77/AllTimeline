const XLSX = require('xlsx');

module.exports = {
    readXlsx : function () {
        var wookbook = XLSX.readFile('/stylesheets/korean_history.xlsx');
        console.log(wookbook);
    }
};