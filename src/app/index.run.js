(function() {
  'use strict';

  angular
    .module('dashbord')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
  	// initialization Fn
    $log.debug('runBlock end');
  }

})();
