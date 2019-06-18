const categoryRepository = require('../repositories/categoryRepository');

module.exports = {
    findAllCategories: async function () {
        return await categoryRepository.findAllCategoryNames();
    },

    findDetailCategory: async function (categoryId) {
        return await categoryRepository.findOneCategoryById(categoryId);
    },

    create: async function (name, type) {
        return categoryRepository.createCategoryWithNameAndType(name, type);
    }
};