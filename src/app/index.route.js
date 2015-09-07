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
      .when('/trends/summary', {
        templateUrl: 'app/trends/summary.html',
        controller: 'TrendsController',
        controllerAs: 'trends'
      })
      .when('/user/new', {
        templateUrl: 'app/user/new.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .when('/user/active', {
        templateUrl: 'app/user/active.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .when('/user/duration', {
        templateUrl: 'app/user/duration.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .when('/user/silent', {
        templateUrl: 'app/user/silent.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .when('/user/launch', {
        templateUrl: 'app/user/launch.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .when('/user/retained', {
        templateUrl: 'app/user/retained.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
