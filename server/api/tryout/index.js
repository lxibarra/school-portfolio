'use strict';

var express = require('express');
var controller = require('./tryout.controller');
var slug = require('slug');
var multer = require('multer');
var s3 = require('multer-s3');
var auth = require('../../auth/auth.service');


var router = express.Router();

var upload = multer({
  storage: s3({
    dirname: 'uploads',
    bucket: process.env.AWS_S3_BUCKET,
    secretAccessKey: process.env.AWS_S3_SECRET,
    accessKeyId: process.env.AWS_S3_KEY,
    region: 'us-east-1',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '_' + Date.now() + '_' + slug(file.originalname, { remove: null, lower: true }));
    }
  })
});

router.post('/', auth.isAuthenticated(), upload.single('attachment'), controller.create);
router.post('/:id/:concept/:attachment',  auth.isAuthenticated(), controller.updateAttachment);
router.post('/remove/attachment', auth.isAuthenticated(), controller.destroyAttachment);

//pending save to the database.
/*
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
*/
module.exports = router;
