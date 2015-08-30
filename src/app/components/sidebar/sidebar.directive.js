(function() {
  'use strict';

  angular
    .module('dashbord')
    .directive('activeLink', ['$location', activeLink])
    .directive('asideBar', asideBar);

  function activeLink (location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var clazz = attrs.activeLink;
        var path = attrs.href;
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        scope.$watch('location.path()', function (newPath) {
          if (path === newPath) {
            element.addClass(clazz);
          } else {
            element.removeClass(clazz);
          }
        });
      }
    };
  };

  function asideBar () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sidebar/sidebar.html'
      // scope: {
      //   creationDate: '='
      // }
      // controller: NavbarController,
      // controllerAs: 'vm',
      // bindToController: true
    };

    return directive;
    
  }
})();
