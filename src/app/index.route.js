(function() {
  'use strict';

  angular
    .module('dashbord')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/trends', {
        templateUrl: 'app/trends/trends.html',
        controller: 'TrendsController',
        controllerAs: 'trends'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
