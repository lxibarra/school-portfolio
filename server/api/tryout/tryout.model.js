'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TryoutSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  owner:String
});

module.exports = mongoose.model('Tryout', TryoutSchema);
