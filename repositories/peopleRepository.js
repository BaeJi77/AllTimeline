const {People} = require('../models');
const {PeopleSearch} = require('../models');
const {PeopleEvent} = require('../models');


/*
* TODO : find, create 부분 만들기 - 1. 사람과 직업리스트, 2. 선택한 사람과 그 연표
* TODO : 찾은 데이터가 없는 경우에도 db에 없다고 넣어주기
* */

module.exports = {
    createFirstSearchPeople: async function (name, type) {
        return await People.create({
            name : name,
            type : type
        })
    },

    findPreviousSearchResult: async function (name) {
        return await People.findOne({
            where: {
                name: name
            }
        })
    },

    findAllPeopleInformationByName: async function (searchName) {
        return await PeopleSearch.findAll({
            where: {
                person_name: searchName
            }
        });
    },

    createNameSearchResult: async function (eachSearchResult) {
        return await PeopleSearch.create(eachSearchResult);
    },

    findPreviousDetailSearchResult: async function (peopleSearchId) {
        return await PeopleEvent.findOne({
            where: {
                peopleSearchId: peopleSearchId
            }
        })
    },

    createChoicePeopleNameAndJob: async function (yearEvent) {
        return await PeopleEvent.create(yearEvent);
    },

    findAllPeopleEventUsingByPeopleSearchId: async function (peopleSearchId) {
        return await PeopleEvent.findAll({
            where: {
                peopleSearchId : peopleSearchId
            }
        });
    },
};