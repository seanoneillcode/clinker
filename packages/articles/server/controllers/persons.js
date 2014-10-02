'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  _ = require('lodash');
var Person = mongoose.model('Person'); 

exports.all = function(req, res) {
  Person.find({user:req.user}).populate('user', 'name username').exec(function(err, persons) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the persons'
      });
    }
    res.json(persons);
  });
};

exports.person = function(req, res, next, id) {
  Person.load(id, function(err, person) {
    if (err) return next(err);
    if (!person) return next(new Error('Failed to load person ' + id));
    req.person = person;
    next();
  });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
  var person = new Person(req.body);
  person.user = req.user;

  person.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the person'
      });
    }
    res.json(person);

  });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
  var person = req.person;

  person.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the person'
      });
    }
    res.json(person);

  });
};

exports.automail = function(req, res, next) {
  console.log('AUTOMAIL');

  Person.find({automail:true}).populate('user', 'name username').exec(function(err, persons) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the persons'
      });
    }
    req.body.persons = persons; // TODO stop modifying the req :(
    next();
  });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
  res.json(req.person);
};

exports.update = function(req, res) {
  var person = req.person;

  person = _.extend(person, req.body);

  person.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the person'
      });
    }
    res.json(person);

  });
};
