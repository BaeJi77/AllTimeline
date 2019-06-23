var express = require('express');
var router = express.Router();
var categoryService = require('../services/categoryService');

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', addCategory);


async function getAllCategories(req, res, next) {
    let allCategory = await categoryService.findAllCategories();
    console.log(typeof (allCategory));
    res.status(200).json(allCategory);
}


async function getCategory(req, res, next) {
    let categoryId = req.params.id;
    let selectCategory = await categoryService.findDetailCategory(categoryId);
    res.status(200).send(selectCategory);
}


async function addCategory(req, res, next) {
    let categoryName = req.body.name;
    let categoryType = req.body.type;
    let cateroryPicture = req.body.picture;
    let result = await categoryService.create(categoryName, categoryType, cateroryPicture);
    res.status(201).send(result);
}


module.exports = router;

