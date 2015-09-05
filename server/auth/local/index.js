'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).json({message: 'Algo salió mal inténtelo de nuevo.'});
    if (!user.status) res.status(401).json({ message:'Su cuenta ya se encuentra en proceso de revisión, por el momento no puede iniciar sesión.' });
    var token = auth.signToken(user._id, user.role);
    res.json({token: token});
  })(req, res, next)
});

module.exports = router;
