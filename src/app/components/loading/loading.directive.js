(function() {
  'use strict';

  angular
    .module('dashbord')
    .directive('loading', loading);

  /** @ngInject */
  function loading() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/loading/loading.html',
      scope: {
          creationDate: '='
      },
      // controller: NavbarController,
      // controllerAs: 'vm',
      bindToController: false
    };

    return directive;


  }

})();
