'use strict';

var articles = require('../controllers/articles');
var persons = require('../controllers/persons');
var mailer = require('../controllers/mailer');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Articles, app, auth, passport) {

  /* Routes */
  app.route('/articles')
    .get(articles.all)
    .post(auth.requiresLogin, [articles.create, persons.automail, mailer.send]);
  app.route('/articles/badger')
    .post(auth.requiresLogin, articles.badger);
  app.route('/articles/:articleId')
    .get(articles.show)
    .put(auth.requiresLogin, hasAuthorization, articles.update)
    .post(auth.requiresLogin, mailer.send)
    .delete(auth.requiresLogin, hasAuthorization, articles.destroy);
  app.route('/persons')
    .get(persons.all)
    .post(auth.requiresLogin, persons.create);
  app.route('/persons/:personId')
    .get(persons.show)
    .put(auth.requiresLogin, hasAuthorization, persons.update)
    .delete(auth.requiresLogin, hasAuthorization, persons.destroy);
  app.route('/articles/archive')
    .get(articles.all)
    .post(auth.requiresLogin, articles.create);

  /* Params */
  app.param('articleId', articles.article);
  app.param('personId', persons.person);
};
