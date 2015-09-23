'use strict';

var _ = require('lodash');
var Portfolios = require('./portfolios.model');

// Get list of portfolioss
exports.index = function(req, res) {
  Portfolios.find({ owner:req.user.email }, function (err, portfolioss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(portfolioss);
  });
};

// Get a single portfolios
exports.show = function(req, res) {
  Portfolios.findById(req.params.id).where('owner').equals(req.user.email).exec(function (err, portfolios) {
    if(err) { return handleError(res, err); }
    if(!portfolios) { return res.status(404).send('Not Found'); }
    return res.json(portfolios);
  });
};

// Creates a new portfolios in the DB.
exports.create = function(req, res) {
  req.body.owner = req.user.email;
  Portfolios.create(req.body, function(err, portfolios) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(portfolios);
  });
};

// Updates an existing portfolios in the DB.
//if you use sub document arrays you need to change _.merge for _.extend
//http://stackoverflow.com/questions/26372523/document-sub-arrays-stored-as-duplicate-values-of-the-first-entry-in-mongo
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Portfolios.findById(req.params.id).where('owner').equals(req.user.email).exec(function (err, portfolios) {
    if (err) { return handleError(res, err); }
    if(!portfolios) { return res.status(404).send('Not Found'); }
    var updated = _.extend(portfolios, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(portfolios);
    });
  });
};

exports.updateConcept = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Portfolios.findById(req.params.id).where('owner').equals(req.user.email).exec(function(err, portfolios){
    if(err) { return handleError(res, err); }
    if(!portfolios) { return res.status(404).send('Not Found'); }
    var concept = {};
    for(var c=0; c< portfolios.concepts.length; c++) {
      if(portfolios.concepts[c]._id == req.params.conceptId) {
        portfolios.concepts[c].name = req.body.name||portfolios.concepts[c].name;
        portfolios.concepts[c].info = req.body.info||portfolios.concepts[c].info;
        concept =  portfolios.concepts[c];
        break;
      }
    }
    var updated = _.extend(portfolios, portfolios);
    updated.save(function(err) {
      if(err) { return res.status(500).send('Unable to save'); }
      return res.status(200).json(concept);
    })
  });
};

// Deletes a portfolios from the DB.
exports.destroy = function(req, res) {
  Portfolios.findById(req.params.id).where('owner').equals(req.user.email).exec(function (err, portfolios) {
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
