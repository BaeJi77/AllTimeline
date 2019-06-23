const categoryRepository = require('../repositories/categoryRepository');

module.exports = {
    findAllCategories: async function () {
        return await categoryRepository.findAllCategoryNames();
    },

    findDetailCategory: async function (categoryId) {
        return await categoryRepository.findAllCategoryEventById(categoryId);
    },

    create: async function (name, type, picture) {
        return categoryRepository.createCategoryWithNameAndType(name, type, picture);
    }
};