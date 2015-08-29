(function() {
  'use strict';

  angular
    .module('dashbord')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
