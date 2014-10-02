'use strict';



angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles', '$http', 'Persons', '$timeout', 'MeanUser',
  function($scope, $stateParams, $location, Global, Articles, $http, Persons, $timeout, MeanUser) {
    $scope.global = Global;
    $scope.currentFilter = 'NEW';

    $scope.setFilter = function(filter) {
      $scope.currentFilter = filter;
    };

    $scope.loadArticles = function() {
      Articles.query(function(articles) {
        $scope.articles = articles;
      });
    };

    $scope.shareLink = function(article) {
      article.$send(function(response) {
        console.log(response);
        $scope.mark(article, 'emailed');
      });
    };

    $scope.badger = function(article) {
      article.$badger(function(response) {
        console.log(response);
        $scope.mark(article, 'badgered');
      });
    };

    $scope.mark = function(article, text) {
      article.sent = text;
      article.showSent = true;
      $timeout(function() {
        article.showSent = false;
      }, 600);
    };

    $scope.addLink = function() {
      var self = this;
      var url = self.title;
      if (url.indexOf('http://') < 0) {
        url = 'http://' + url;
      }
      if(self.isUrlValid(url)) {
          var article = new Articles({
          title: url,
          folder: 'new'
        });
        $scope.articles.unshift(article);
        article.$save(function(response) {
          console.log('added link');
          self.title = '';
        });
      } else {
        console.log('url is invalid');
        self.title = 'Address is invalid!';
      }
    };

    $scope.isUrlValid = function(url) {


      var validUrl = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
      return validUrl.test(url);
    };

    $scope.remove = function(article) {
      if (article.folder === 'bin') {
        if (article) {
          article.$remove();
          for (var i in $scope.articles) {
            if ($scope.articles[i] === article) {
              $scope.articles.splice(i, 1);
            }
          }
        } else {
          $scope.article.$remove(function(response) {
            $location.path('articles');
          });
        }
      } else {
        article.folder = 'bin';
        article.$update(function() {

        });
      }
    };

    $scope.archive = function(article) {
      article.folder = 'archive';
      article.$update(function() {

      });
    };

  }
])
.directive('folderSelection', function() {
  return {
    restrict: 'AE',
    replace: true,
    template: '<div class="folder-item" ng-class="isSelected()">' + 
                '<div class="folder-item-highlight" ng-class="isSelected()"></div>' + 
                '<div class="folder-item-text">{{folder}}</div>' + 
              '</div>',
    scope: {
        folder: '@folder'
    },
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        scope.$apply(function() {
          scope.$parent.currentFilter = scope.folder;
        });
      });
      scope.isSelected = function() {
        return scope.folder === scope.$parent.currentFilter ? 'selected' : '';
      }
    }
  };
});
