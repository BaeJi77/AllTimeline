var express = require('express');
var router = express.Router();
var categoryService = require('../services/categoryService');

/* GET home page. */
router.get('/', getSelectCategory);

async function getSelectCategory(req, res, next) {
    console.log("db 만들었따.");
    console.log(await categoryService.findAll());
    res.render('index', { title: 'Express' });
}


module.exports = router;
