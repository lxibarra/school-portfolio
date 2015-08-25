'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TryoutSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Tryout', TryoutSchema);