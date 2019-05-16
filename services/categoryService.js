const {Category} = require('../models');

module.exports = {
    findAll: async function () {
        let result = await Category.findAndCountAll();
        return result;
    },

    findOne: async function (categoryId) {
        let result = await Category.findOne({
            where: {
                id: categoryId
            }
        });
        return result;
    },

    create: async function (name, type) {
        return Category.create({
            category_name: name,
            type: type
        });
    }
};