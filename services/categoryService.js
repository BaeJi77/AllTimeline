const {Category} = require('../models');

module.exports = {
    findAll: async function () {
        let result = await Category.findAll();
        return result;
    }
};