'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.articles')
.factory('Articles', ['$resource',
  function($resource) {
    return $resource('articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      send: {
      	method: 'POST'
      },
      badger: {
        url: 'articles/badger',
        method: 'POST'
      }
    });
  }
])
.factory('Persons', ['$resource',
  function($resource) {
   return $resource('persons/:personId', {
      personId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
  
]);
