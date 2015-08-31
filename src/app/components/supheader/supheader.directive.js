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
    $scope.data = {
      availableOptions: JSON.parse($cookieStore.get('apps')),
      selectedOption: $cookieStore.get('currentApp') //This sets the default value of the select in the ui
    };

    $rootScope.currentApp = $cookieStore.get('currentApp');
    // $log.log($scope.data);

    $scope.changeApp = function() {
      $rootScope.currentApp = $scope.data.selectedOption;
      $cookieStore.put('currentApp', $scope.data.selectedOption);

      if($scope.data.selectedOption.id === 0) {
        $location.path('/');
      }
    };

  };
})();
