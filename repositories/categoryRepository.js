const {Category} = require('../models');
const {CategoryEvent} = require('../models');

module.exports = {
    findAllCategoryNames: async function () {
        return await Category.findAll();
    },

    findAllCategoryEventById: async function (categoryId) {
        return await CategoryEvent.findAll({
            where: {
                categoryId : categoryId
            }
        });
    },

    createCategoryWithNameAndType: async function (name, type) {
        return Category.create({
            category_name: name,
            type: type
        });
    },

    createCategoryEvent : async function (eachEvent) {
        return CategoryEvent.create(eachEvent);
    }
};