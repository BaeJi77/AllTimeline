const {Category} = require('../models');

module.exports = {
    findAllCategoryNames: async function () {
        let result = await Category.findAll();
        return result;
    },

    findOneCategoryById: async function (categoryId) {
        let result = await Category.findDetailCategory({
            where: {
                id: categoryId
            }
        });
        return result;
    },

    createCategoryWithNameAndType: async function (name, type) {
        return Category.create({
            category_name: name,
            type: type
        });
    }
};