'use strict';

var express = require('express');
var controller = require('./portfolios.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

//url=/api/portfolioss

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(),  controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.put('/:id/concept/:conceptId', auth.isAuthenticated(), controller.updateConcept);

module.exports = router;
