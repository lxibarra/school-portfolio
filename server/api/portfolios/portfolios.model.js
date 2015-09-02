'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PortfoliosSchema = new Schema({
  course: String,
  startDate: Date,
  endDate: Date,
  description:String,
  active:Boolean,
  owner:String,
  concepts:[
    {
      name: { type: String },
      info: { type: String },
      active: { type:Boolean },
      attachments:[
        {
          name: { type:String },
          uploaded: { type:Date },
          url: { type:String }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Portfolios', PortfoliosSchema);
