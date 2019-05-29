var express = require('express');
var router = express.Router();
var categoryService = require('../services/categoryService');


/* GET home page. */
router.get('/', getAllCategoriesNames);
router.get('/:id', getSelectCategory);
router.post('/', addCategory);

async function getAllCategoriesNames(req, res, next) {
    let allCategory = await categoryService.findAll();
    //let result = {result : "HI"};
    console.log(allCategory);
    console.log(typeof (allCategory));
    res.status(200).json(allCategory);
}

async function getSelectCategory(req, res, next) {
    let categoryId = req.params.id;
    let selectCategory = await categoryService.findOne(categoryId);
    res.status(200).send(selectCategory);
}

async function addCategory(req, res, next) {
    //  let categoryName = req.body.name;
    //   let categoryType = req.body.type;
//    let result = await categoryService.create(categoryName, categoryType);
    //   res.status(201).send(result);
}

module.exports = router;
