const express = require('express');
const { uploadFile } = require('../controller/fileUploadController');
const Router = express.Router();

Router.get('/upload',uploadFile);

module.exports = Router;