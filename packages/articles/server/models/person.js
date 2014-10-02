'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var PersonSchema = new Schema({
  address: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  name: { 
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: false
  },
  selected: {
    type: Boolean,
    default: false
  },
  automail: {
    type: Boolean,
    default: false
  }
});

/**
 * Validations
 */
PersonSchema.path('address').validate(function(address) {
  return !!address;
}, 'Address cannot be blank');

/**
 * Statics
 */
PersonSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};
 
mongoose.model('Person', PersonSchema);
