'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PortfoliosSchema = new Schema({
  course: String,
  startDate: Date,
  endDate: Date,
  description:String,
  active:Boolean,
  concepts:[
    {
      name: { type: String },
      info: { type: String },
      active: { type:Boolean }
    }
  ]
});

module.exports = mongoose.model('Portfolios', PortfoliosSchema);
