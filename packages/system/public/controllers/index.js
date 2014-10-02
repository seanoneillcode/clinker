'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$location',
  function($scope, Global, $location) {
    $scope.global = Global;

    $scope.loginClick = function() {
    	$location.path('/auth/login');
    };
  }
]);
