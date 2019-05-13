const {Category} = require("../models");

module.export = {
    findAll: async function () {
        let result = await Category.findAll();
        return result;
    },

    findOne: async function () {
        let result = await Category.findOne();
        return result;
    }
};