const {History} = require('../models');
const {HistoryEvent} = require('../models');


/*
* TODO : find, create 부분 만들기 - 1. 사람과 직업리스트, 2. 선택한 사람과 그 연표
* */
module.exports = {

    findOneHistoryByName: async function (searchName) {
        let historyInformation = await History.findOne({
            where: {
                category_name: searchName
            }
        })
    },

    findAllHistory: async function (searchName) {
        let historyInformation = await HistoryEvent.findAll();
        return historyInformation;
    },

    createHistoryWithNameAndType: async function (name, type) {
        return History.create({
            category_name: name,
            type: type
        });
    }


    // TODO : 찾은 데이터가 없는 경우에도 db에 없다고 넣어주기
};