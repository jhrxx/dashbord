(function() {
  'use strict';

  angular
    .module('dashbord')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastr, cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(false);

    // cfpLoadingBarProvider.includeSpinner = true;
    // cfpLoadingBarProvider.latencyThreshold = 500;
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
  }

})();
