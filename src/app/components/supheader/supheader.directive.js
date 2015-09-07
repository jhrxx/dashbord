(function() {
  'use strict';

  angular
    .module('dashbord')
    .directive('supHeader', supHeader);

  function supHeader () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/supheader/supheader.html',
      controller: SupheaderController,
      bindToController: true
    };

    return directive;
  };

  /** @ngInject */
  function SupheaderController($rootScope, $scope, $log, $cookieStore, $location) {
    var init = function() {
      var _apps = $cookieStore.get('apps');
      if(_apps) {
        $scope.data = {
          availableOptions: JSON.parse(_apps),
          selectedOption: $cookieStore.get('currentApp') //This sets the default value of the select in the ui
        };

        $rootScope.currentApp = $cookieStore.get('currentApp');
      }
    };

    $scope.changeApp = function(newValue, oldValue) {
      // $log.debug(newValue,oldValue)
      $rootScope.currentApp = $scope.data.selectedOption;
      $cookieStore.put('currentApp', $scope.data.selectedOption);

      if(newValue.id === 0) {
        $location.path('/');
      }

      if(newValue.id > 1 && +oldValue < 2) {
        $location.path('trends/summary');
      }
    };

    $scope.$watch(function() {
      return $rootScope.currentApp;
    }, function() {
      init();
    }, true);

  };
})();
