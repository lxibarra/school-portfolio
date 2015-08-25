'use strict';

var express = require('express');
var controller = require('./tryout.controller');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var router = express.Router();

router.post('/', upload.single('attachment'), controller.create);
/*
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
*/
module.exports = router;
