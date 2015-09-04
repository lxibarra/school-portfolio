'use strict';

var _ = require('lodash');
var Tryout = require('./tryout.model');
var Portfolios = require('../portfolios/portfolios.model');
var s3 = require('s3');
var AWS = require('aws-sdk');


// Get list of tryouts
exports.index = function (req, res) {
  Tryout.find(function (err, tryouts) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(tryouts);
  });
};

// Get a single tryout
exports.show = function (req, res) {
  Tryout.findById(req.params.id, function (err, tryout) {
    if (err) {
      return handleError(res, err);
    }
    if (!tryout) {
      return res.status(404).send('Not Found');
    }
    return res.json(tryout);
  });
};

// Creates a new tryout in the DB.
exports.create = function (req, res) {

  Portfolios.findById(req.body.document, function (err, portfolios) {
    for (var c = 0, top = portfolios.concepts.length; c < top; c++) {
      if (portfolios.concepts[c]._id == req.body.concept) {
        portfolios.concepts[c].attachments.push(
          {
            name: req.file.originalname,
            uploaded: new Date(),
            url: req.file.key
          }
        )
      }
    }
    var updated = _.extend(portfolios, portfolios);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(portfolios);
    });
  });

  //res.status(200).send('File was uploaded but there was a problem with the database.');
};

exports.updateAttachment = function(req, res) {
  Portfolios.findById(req.params.id).where('owner').equal(req.user.email).exec(function (err, portfolios) {
    for (var c = 0, top = portfolios.concepts.length; c < top; c++) {
      if (portfolios.concepts[c]._id == req.params.concept) {
        for (var i = 0, topA = portfolios.concepts[c].attachments.length; i < topA; i++) {
          if(portfolios.concepts[c].attachments[i]._id == req.params.attachment) {
            portfolios.concepts[c].attachments[i].name = req.body.name;
            break;
          }
        }
      }
    }
    var updated = _.extend(portfolios, portfolios);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(portfolios);
    });
  });
};

// Currently not in use
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Tryout.findById(req.params.id, function (err, tryout) {
    if (err) {
      return handleError(res, err);
    }
    if (!tryout) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(tryout, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(tryout);
    });
  });
};



// Deletes a tryout from the DB.
exports.destroyAttachment = function (req, res) {

  //we need con control the error in case the S3 fails, we may want
  //to keep a reference to it in the database or simply launch a queue

  Portfolios.findById(req.body.portfolio_id).where('owner').equals(req.user.email).exec(function (err, portfolios) {
    for (var c = 0, top = portfolios.concepts.length; c < top; c++) {
      if (portfolios.concepts[c]._id == req.body.concept_id) {
        for (var i = 0, topA = portfolios.concepts[c].attachments.length; i < topA; i++) {
          if(portfolios.concepts[c].attachments[i]._id == req.body.attachment_id) {
            portfolios.concepts[c].attachments.splice(i,1);
            break;
          }
        }
      }
    }
    var updated = _.extend(portfolios, portfolios);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }

      AWS.config.update({
        accessKeyId: process.env.AWS_S3_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET
      });

      var params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Delete: {
          Objects: [
            {
              Key: req.body.url
            }
          ]
        }
      };

      var client = new AWS.S3();
      client.deleteObjects(params, function(err, data) {
        if (err) {
          //we need to inform the user
          console.log(err, err.stack); // an error occurred
        }
        else   {
          //no need to to anything
          console.log(data); // successful response
        }
      });
      //create an object and send the info with portfolio to the user
      // data = { portfolio:portfolios, status:'ok' } or something like that
      return res.status(200).json(portfolios);
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
