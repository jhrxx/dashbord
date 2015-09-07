(function() {
  'use strict';

  angular
    .module('dashbord')
    .factory('config', config)
    .controller('MainController', MainController);

  function config() {
    var cfg = {
      devUrl: 'http://115.29.202.161:8087',
      baseUrl: ''
    }
    this.get = get;
    this.getUrl = getUrl;

    function get() {
      return cfg;
    }

    function getUrl() {
      return cfg[/127.0.0.1|localhost|115.29.202.161/.test(window.location.hostname)? 'devUrl':'baseUrl'];
    }
    return this;
  }

  /** @ngInject */
  function MainController($rootScope, $scope, $cookieStore, $http, $log, $location, cfpLoadingBar, config) {
    // var vm = this;

    // vm.awesomeThings = [];
    // vm.classAnimation = '';
    // vm.creationDate = 1440844850518;
    // vm.showToastr = showToastr;

    // activate();

    // function activate() {
    //   getWebDevTec();
    //   $timeout(function() {
    //     vm.classAnimation = 'rubberBand';
    //   }, 4000);
    // }

    // function showToastr() {
    //   toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    //   vm.classAnimation = '';
    // }

    // function getWebDevTec() {
    //   vm.awesomeThings = webDevTec.getTec();

    //   angular.forEach(vm.awesomeThings, function(awesomeThing) {
    //     awesomeThing.rank = Math.random();
    //   });
    // }
    //
    //

      //求和
      Array.prototype.sum = function () {
       var i;
       for (var sum = i = 0; i < this.length; i++)sum += parseInt(this[i]);
       return sum;
      };

      $scope.refresh =function(){
        fetchData();
      };

      $scope.showDetail = function(data) {
        // $log.log(data)
        $rootScope.currentApp = data;
        $cookieStore.put('currentApp', data);
        $location.path('trends/summary');
      };

      function getDateStr(AddDayCount,split) {
        if(!split) {
          split = '/';
        }
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y+split+m+split+d;
      };
      $scope.today = getDateStr(0, '-');

      // $scope.today = {};
      $scope.yesterday = {};

      var renderSummaryTable = function(data) {
          var sum = {};
          // sum.today = {
          //     new_user:[],active_user:[],launch:[],total:[]
          // };
          sum.yesterday = {
              new_user:[],active_user:[],launch:[],total:[]
          };
        if(data.length> 0) {
          for (var j = 0; j < data.length; j++) {
              // var _today = data[j].sum_data.today,
                var  _yesterday = data[j].sum_data.yesterday;

              // sum.today.new_user.push(_today.new_user);
              // sum.today.active_user.push(_today.active_user);
              // sum.today.launch.push(_today.launch);
              // sum.today.total.push(_today.total);
              sum.yesterday.new_user.push(_yesterday.new_user);
              sum.yesterday.active_user.push(_yesterday.active_user);
              sum.yesterday.launch.push(_yesterday.launch);
              sum.yesterday.total.push(_yesterday.total);
          };
          // $scope.today.new_user = sum.today.new_user.sum();
          // $scope.today.active_user = sum.today.active_user.sum();
          // $scope.today.launch = sum.today.launch.sum();
          // $scope.today.total = sum.today.total.sum();
          $scope.yesterday.new_user = sum.yesterday.new_user.sum();
          $scope.yesterday.active_user = sum.yesterday.active_user.sum();
          $scope.yesterday.launch = sum.yesterday.launch.sum();
          $scope.yesterday.total = sum.yesterday.total.sum();
        }
      };

      var cookieStoreApps = function(data) {
        var _apps = [{id:0,name:"全部"}];
        for (var i = 0; i < data.length; i++) {
          _apps.push({id: data[i].id, name: data[i].name});
        };
        // $log.log(_apps);

        $cookieStore.put('apps',JSON.stringify(_apps));
        if(!$cookieStore.get('currentApp')) {
          $cookieStore.put('currentApp', _apps[0]);
        }

        $rootScope.currentApp = $cookieStore.get('currentApp');

      }

      var fetchData = function() {
        cfpLoadingBar.start();

        $http.get(config.getUrl()+'/statistics/api/index').
          then(function(response) {
            // this callback will be called asynchronously
            // when the response is available
            if(response.data.errno === 0) {
              if(response.data.data.length === 0){
                toastr.error('没有数据');
              } else {
                $scope.appInfo=response.data.data;
                renderSummaryTable(response.data.data);
                cookieStoreApps(response.data.data);
              }
            } else {
              toastr.error(response.data.errmsg);
            }
            cfpLoadingBar.complete()
          }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

          });
      };

      fetchData();
    };
})();
