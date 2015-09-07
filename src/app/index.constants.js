/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('dashbord')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('ionicons')
    // .constant('loading')
    .constant('highcharts-release')
    .constant('720kb.datepicker')
    // .constant('angular-loading-bar')
    .constant('moment', moment);

})();
