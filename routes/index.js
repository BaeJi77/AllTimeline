var express = require('express');
var router = express.Router();
var categoryDAO = require('../DAO/category');

/* GET home page. */
router.get('/', function(req, res, next) {
    categoryDAO.hello();
    res.render('index', { title: 'Express' });
});

module.exports = router;
