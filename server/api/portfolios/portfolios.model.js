'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PortfoliosSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Portfolios', PortfoliosSchema);