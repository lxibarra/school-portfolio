'use strict';

var _ = require('lodash');
var Concept = require('./concept.model');

// Get list of concepts
exports.index = function(req, res) {
  Concept.find({ 'owner':req.user.email }, function (err, concepts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(concepts);
  });
};

// Get a single concept
exports.show = function(req, res) {
  Concept.findById(req.params.id).where('owner').equals(req.user.email).exec(function (err, concept) {
    if(err) { return handleError(res, err); }
    if(!concept) { return res.status(404).send('Not Found'); }
    return res.json(concept);
  });
};

//Find an item by name
exports.findbyname = function(req, res) {
    var query = new RegExp(req.params.name, "i");
    Concept.find({'name':query, 'owner':req.user.email }, function(err, concept) {
      if(err) { return handleError(res, err); }
      if(!concept) { return res.status(404).send('Not Found'); }
      return res.json(concept);
    });
};

// Creates a new concept in the DB.
exports.create = function(req, res) {
  req.body.owner = req.user.email;
  Concept.create(req.body, function(err, concept) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(concept);
  });
};

// Updates an existing concept in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Concept.findById(req.params.id).where('owner').equals(req.user.email).exec(function (err, concept) {
    if (err) { return handleError(res, err); }
    if(!concept) { return res.status(404).send('Not Found'); }
    var updated = _.merge(concept, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(concept);
    });
  });
};

// Deletes a concept from the DB.
exports.destroy = function(req, res) {
  Concept.findById(req.params.id).where('owner').equals(req.user.email).exec(function (err, concept) {
    if(err) { return handleError(res, err); }
    if(!concept) { return res.status(404).send('Not Found'); }
    concept.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
