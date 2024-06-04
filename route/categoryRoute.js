const express = require('express');
const getCategory = require('../controller/categoryController');
const Router = express.Router();

Router.get('/list',getCategory);

module.exports = Router;