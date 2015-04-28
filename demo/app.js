(function() {
  'use strict';

  angular.module('demo', [
      'snStickyTableHeader'
    ])
    .controller('demoController', function($scope, $http) {
      $http.get('data.json').then(function(response) {
        $scope.data = response.data;
      });
    });
})();

