'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  User = mongoose.model('User'),
  Person = mongoose.model('Person'),
  _ = require('lodash');

var generateColor = function() {
  var brightness = 220;
  var hsv = function(brightness) {
    var r = 255 - brightness;
    var n = 0 | ((Math.random() * r) + brightness);
    var s = n.toString(16);
    return (s.length===1) ? '0' + s : s;
  };
  return '#' + hsv(brightness) + hsv(brightness) + hsv(brightness);
};

/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
  Article.load(id, function(err, article) {
    if (err) return next(err);
    if (!article) return next(new Error('Failed to load article ' + id));
    req.article = article;
    next();
  });
};

/**
 * adds a link to other users. Is placed into inbox folder.
 */
exports.badger = function(req, res, next) {
  console.log('BADGER');
  Person.find({user: req.user, selected: true}).exec(function(err, persons) {
    if (!err && persons) {
      persons.forEach(function (person) {
        User.findOne({
          email: person.address
        }).exec(function (err, user) {
          if (!err && user) {
            var article = new Article({
              title: req.body.title,
              folder: 'inbox',
              image: req.body.image,
              color: req.body.color
            });
            article.user = user;
            article.user.username = article.user.name;
            article.save(function(err) {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      });
    }
    res.json(req.article);
  });
};

/**
 * Create an article
 */
exports.create = function(req, res, next) {
  console.log('CREATE');
  var article = new Article(req.body);
  article.user = req.user;
  article.color = generateColor();
  article.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the article'
      });
    }
    res.json(article);
    req.article = article;
    next();
  });
};

/**
 * Update an article
 */
exports.update = function(req, res) {
  var article = req.article;
  article = _.extend(article, req.body);
  article.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the article'
      });
    }
    res.json(article);
  });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
  var article = req.article;
  article.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the article'
      });
    }
    res.json(article);
  });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
  res.json(req.article);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
  Article.find({ user : req.user}).sort('-created').populate('user', 'name username').exec(function(err, articles) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the articles'
      });
    }
    res.json(articles);
  });
};
