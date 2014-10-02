'use strict';



angular.module('mean.articles').controller('PersonsController', ['$scope', '$stateParams', '$location', 'Global', 'Persons',
  function($scope, $stateParams, $location, Global, Persons) {
    $scope.global = Global;
    $scope.oldAddress = '';

    $scope.getPersons = function () {
      Persons.query(function (persons) {
        $scope.persons = persons;
      });
    };

    $scope.getDetail = function (person) {
      $scope.currentPerson = person;
    };

    $scope.hasAuthorization = function(person) {
      if (!person || !person.user) return false;
      return $scope.global.isAdmin || person.user._id === $scope.global.user._id;
    };

    $scope.toggleSelected = function (person) {
        person.selected = !person.selected;
        person.$update(function() {
          // $location.path('articles/' + article._id);
        });
    };

    $scope.toggleAutomail = function (person) {
        person.automail = !person.automail;
        person.$update(function() {
          // $location.path('articles/' + article._id);
        });
    };

    $scope.create = function() {
      var self = this;
      $scope.oldAddress = self.address;
      var person = new Persons({
        address: self.address,
        name: 'no name'
      });
      $scope.persons.push(person);
      person.$save(function(response) {
        console.log('refreshed');
        self.address = '';
        self.name = '';
      });
    };

    $scope.blurCreate = function() {
      var self = this;
      if (self.address && self.address !== '' && self.address !== 'Add address...') {
        if (self.oldAddress !== self.address) {
          return self.create();
        }
      }
    };

    $scope.update = function() {
      var person = $scope.currentPerson;
      // if (!article.updated) {
      //   article.updated = [];
      // }
      // article.updated.push(new Date().getTime());

      person.$update(function() {
        // $location.path('articles/' + article._id);
      });
    };

    $scope.remove = function(person) {
      if (person) {
        person.$remove();
        for (var i in $scope.persons) {
          if ($scope.persons[i] === person) {
            $scope.persons.splice(i, 1);
          }
        }
      } else {
        $scope.person.$remove(function(response) {
          $location.path('articles');
        });
      }
    };
  }
]);
