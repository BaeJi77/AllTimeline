const {History} = require('../models');
const {HistoryEvent} = require('../models');
const {CategoryEvent} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    findHistoryFocusingWar: async function () {
        return await CategoryEvent.findAll({
            where:{
                [Op.or] : [
                    {
                        event_name : {
                            [Op.like] : "%전쟁%"
                        }
                    },
                    {
                        event_name : {
                            [Op.like] : "%war%"
                        }
                    }
                ]
            }
        })
    },

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

};