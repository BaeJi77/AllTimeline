const {PeopleSearch} = require('../models');



/*
* TODO : find, create 부분 만들기 - 1. 사람과 직업리스트, 2. 선택한 사람과 그 연표
* */
module.exports = {
    findAllPeopleInformationByName: async function (searchName) {
        let peopleInformation = await PeopleSearch.findAll({
            where: {
                person_name: searchName
            }
        });

        return peopleInformation;
    },


    // TODO : 찾은 데이터가 없는 경우에도 db에 없다고 넣어주기
};