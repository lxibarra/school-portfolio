'use strict';

var _ = require('lodash');
var Portfolios = require('./portfolios.model');

// Get list of portfolioss
exports.index = function(req, res) {
  Portfolios.find(function (err, portfolioss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(portfolioss);
  });
};

// Get a single portfolios
exports.show = function(req, res) {
  Portfolios.findById(req.params.id, function (err, portfolios) {
    if(err) { return handleError(res, err); }
    if(!portfolios) { return res.status(404).send('Not Found'); }
    return res.json(portfolios);
  });
};

// Creates a new portfolios in the DB.
exports.create = function(req, res) {
  Portfolios.create(req.body, function(err, portfolios) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(portfolios);
  });
};

// Updates an existing portfolios in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Portfolios.findById(req.params.id, function (err, portfolios) {
    if (err) { return handleError(res, err); }
    if(!portfolios) { return res.status(404).send('Not Found'); }
    var updated = _.merge(portfolios, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(portfolios);
    });
  });
};

// Deletes a portfolios from the DB.
exports.destroy = function(req, res) {
  Portfolios.findById(req.params.id, function (err, portfolios) {
    if(err) { return handleError(res, err); }
    if(!portfolios) { return res.status(404).send('Not Found'); }
    portfolios.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}