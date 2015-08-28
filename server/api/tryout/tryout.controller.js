'use strict';

var _ = require('lodash');
var Tryout = require('./tryout.model');
var Portfolios = require('../portfolios/portfolios.model');


// Get list of tryouts
exports.index = function(req, res) {
  Tryout.find(function (err, tryouts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tryouts);
  });
};

// Get a single tryout
exports.show = function(req, res) {
  Tryout.findById(req.params.id, function (err, tryout) {
    if(err) { return handleError(res, err); }
    if(!tryout) { return res.status(404).send('Not Found'); }
    return res.json(tryout);
  });
};

// Creates a new tryout in the DB.
exports.create = function(req, res) {
  console.log('Hi from the controller, ', req.file);
  //in here we save the reference to mongodb
  console.log('Form data:', req.body);

  Portfolios.findById(req.body.document, function (err, portfolios) {
    console.log(portfolios);
  });
  res.status(200).send('File upladed successfully');
};

// Updates an existing tryout in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tryout.findById(req.params.id, function (err, tryout) {
    if (err) { return handleError(res, err); }
    if(!tryout) { return res.status(404).send('Not Found'); }
    var updated = _.merge(tryout, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(tryout);
    });
  });
};

// Deletes a tryout from the DB.
exports.destroy = function(req, res) {
  Tryout.findById(req.params.id, function (err, tryout) {
    if(err) { return handleError(res, err); }
    if(!tryout) { return res.status(404).send('Not Found'); }
    tryout.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
