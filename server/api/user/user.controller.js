'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 * All new users are inactive until admin aproval
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  //Make super sure that user stays invalid on registration.
  req.body.status = false;
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    //We dont return the validation token because users must be approved first
    //var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });

    res.status(200).send({ created: true });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  if(req.user._id.toString() !== req.params.id) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
      if (err) return res.status(500).send(err);
      return res.status(204).send('No Content');
    });
  } else {
    return res.status(500).send({ message:'You cannot self terminate' });
  }
};


/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

exports.activate = function(req, res, next) {
  console.log('Fired');
  if (req.user._id.toString() !== req.params.id) {
    var userId = req.params.id;
    User.findById(userId, function (err, user) {
      if (err) return res.status(500).send(err);
      if (user) {
        if (user.email !== req.user.email) {
          user.status = !user.status;
          console.log(user);
          user.save(function (err) {
            if (err) return ValidationError(res, err);
          });
        }
      } else {
        return res.status(404).send({message: 'Usuario no encontrado.'});
      }
    });
  } else {
    return res.status(500).send({message:'You cannot shutdown your self'});
  }
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
