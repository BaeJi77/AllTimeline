const {Category} = require('../models');
const {CategoryEvent} = require('../models');

module.exports = {
    findAllCategoryNames: async function () {
        return await Category.findAll();
    },

    findOneCategoryById: async function (categoryId) {
        return await CategoryEvent.findAll({
            where: {
                id: categoryId
            }
        });
    },

    createCategoryWithNameAndType: async function (name, type) {
        return Category.create({
            category_name: name,
            type: type
        });
    }
};