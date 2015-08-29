(function() {
  'use strict';

  angular
    .module('dashbord')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http) {
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
      //求和
      Array.prototype.sum = function () {
       var i;
       for (var sum = i = 0; i < this.length; i++)sum += parseInt(this[i]);
       return sum;
      };

      $scope.refresh =function(){
        fetchData();
      };

      $scope.today = {};
      $scope.yesterday = {};

      var renderSummaryTable = function(data) {

          var sum = {};
          sum.today = {
              new_user:[],active_user:[],launch:[],total:[]
          };
          sum.yesterday = {
              new_user:[],active_user:[],launch:[],total:[]
          };
        if(data.length> 0) {
          for (var j = 0; j < data.length; j++) {
              var _today = data[j].sum_data.today,
                  _yesterday = data[j].sum_data.yesterday;

              sum.today.new_user.push(_today.new_user);
              sum.today.active_user.push(_today.new_user);
              sum.today.launch.push(_today.launch);
              sum.today.total.push(_today.total);
              sum.yesterday.new_user.push(_yesterday.new_user);
              sum.yesterday.active_user.push(_yesterday.new_user);
              sum.yesterday.launch.push(_yesterday.launch);
              sum.yesterday.total.push(_yesterday.total);
          };
          $scope.today.new_user = sum.today.new_user.sum();
          $scope.today.active_user = sum.today.active_user.sum();
          $scope.today.launch = sum.today.launch.sum();
          $scope.today.total = sum.today.total.sum();
          $scope.yesterday.new_user = sum.yesterday.new_user.sum();
          $scope.yesterday.active_user = sum.yesterday.active_user.sum();
          $scope.yesterday.launch = sum.yesterday.launch.sum();
          $scope.yesterday.total = sum.yesterday.total.sum();
        }
      };

      var fetchData = function() {

        $http.get('http://115.29.202.161:8087/statistics/api/index').
          then(function(response) {
            // this callback will be called asynchronously
            // when the response is available
            // console.log(response.data)
    var mockdata = {"errno":0,"errmsg":"","data":[{"id":1,"create_time":1440580984,"update_time":1440662570,"name":"YeahMobi-DY-USA-Package","app_key":"541f7767fd98c518cc0776b7","platform":"android","type":"","popular":0,"sum_data":{"yesterday":{"id":951,"create_time":1440585909,"update_time":1440680390,"app_id":1,"date":"2015-08-24","new_user":4020,"active_user":8383,"launch":25424,"duration":1292,"duration_text":"00:21:32","total":0},"today":{"id":952,"create_time":1440585909,"update_time":1440680390,"app_id":1,"date":"2015-08-25","new_user":3945,"active_user":10909,"launch":41677,"duration":1092,"duration_text":"00:18:12","total":0}}},{"id":2,"create_time":1440580984,"update_time":1440662570,"name":"YeahMobi-DY-USA-Preload","app_key":"541f7724fd98c518de06f185","platform":"android","type":"","popular":0,"sum_data":{"yesterday":{"id":1903,"create_time":1440585916,"update_time":1440680399,"app_id":2,"date":"2015-08-24","new_user":194,"active_user":241,"launch":439,"duration":567,"duration_text":"00:09:27","total":0},"today":{"id":1904,"create_time":1440585916,"update_time":1440680399,"app_id":2,"date":"2015-08-25","new_user":297,"active_user":387,"launch":844,"duration":172,"duration_text":"00:02:52","total":0}}},{"id":3,"create_time":1440580984,"update_time":1440662570,"name":"testAndroid","app_key":"53f2e57afd98c536610030d9","platform":"android","type":"","popular":0,"sum_data":{"yesterday":{"id":2855,"create_time":1440585923,"update_time":1440680409,"app_id":3,"date":"2015-08-24","new_user":0,"active_user":0,"launch":0,"duration":739,"duration_text":"00:12:19","total":0},"today":{"id":2856,"create_time":1440585923,"update_time":1440680409,"app_id":3,"date":"2015-08-25","new_user":0,"active_user":0,"launch":0,"duration":666,"duration_text":"00:11:06","total":0}}},{"id":4,"create_time":1440580984,"update_time":1440662570,"name":"iphone dailyyoga \u6d4b\u8bd5","app_key":"53e87056fd98c59651063a1e","platform":"ipad","type":"","popular":0,"sum_data":{"yesterday":{"id":3807,"create_time":1440585931,"update_time":1440680418,"app_id":4,"date":"2015-08-24","new_user":0,"active_user":1,"launch":1,"duration":2766,"duration_text":"00:46:06","total":0},"today":{"id":3808,"create_time":1440585931,"update_time":1440680418,"app_id":4,"date":"2015-08-25","new_user":1,"active_user":4,"launch":4,"duration":2474,"duration_text":"00:41:14","total":0}}},{"id":5,"create_time":1440580984,"update_time":1440662570,"name":"dailyyogaTv","app_key":"53b398bd56240b19e10300a3","platform":"android","type":"","popular":0,"sum_data":{"yesterday":{"id":4759,"create_time":1440585939,"update_time":1440680428,"app_id":5,"date":"2015-08-24","new_user":341,"active_user":1005,"launch":1256,"duration":1669,"duration_text":"00:27:49","total":0},"today":{"id":4760,"create_time":1440585939,"update_time":1440680428,"app_id":5,"date":"2015-08-25","new_user":339,"active_user":1004,"launch":1241,"duration":2874,"duration_text":"00:47:54","total":0}}},{"id":6,"create_time":1440580984,"update_time":1440662570,"name":"DailyYogaiPad","app_key":"5370857c56240b0a6d1a455b","platform":"ipad","type":"","popular":0,"sum_data":{"yesterday":{"id":5711,"create_time":1440585948,"update_time":1440680442,"app_id":6,"date":"2015-08-24","new_user":858,"active_user":3702,"launch":48828,"duration":1541,"duration_text":"00:25:41","total":0},"today":{"id":5712,"create_time":1440585948,"update_time":1440680442,"app_id":6,"date":"2015-08-25","new_user":795,"active_user":4139,"launch":40578,"duration":2592,"duration_text":"00:43:12","total":0}}},{"id":7,"create_time":1440580984,"update_time":1440662570,"name":"DailyYogaiPhone","app_key":"5370851456240b52a3001d00","platform":"iphone","type":"","popular":0,"sum_data":{"yesterday":{"id":6663,"create_time":1440585956,"update_time":1440680454,"app_id":7,"date":"2015-08-24","new_user":2495,"active_user":8650,"launch":30578,"duration":2889,"duration_text":"00:48:09","total":0},"today":{"id":6664,"create_time":1440585956,"update_time":1440680454,"app_id":7,"date":"2015-08-25","new_user":2639,"active_user":11055,"launch":38283,"duration":929,"duration_text":"00:15:29","total":0}}},{"id":8,"create_time":1440580984,"update_time":1440662570,"name":"DailyYoga","app_key":"5370574c56240b0a7f17a7b7","platform":"android","type":"","popular":0,"sum_data":{"yesterday":{"id":7615,"create_time":1440585968,"update_time":1440680464,"app_id":8,"date":"2015-08-24","new_user":9832,"active_user":261632,"launch":1575943,"duration":181,"duration_text":"00:03:01","total":0},"today":{"id":7616,"create_time":1440585968,"update_time":1440680464,"app_id":8,"date":"2015-08-25","new_user":11481,"active_user":265032,"launch":1595886,"duration":1350,"duration_text":"00:22:30","total":0}}},{"id":9,"create_time":1440580984,"update_time":1440662570,"name":"\u6bcf\u65e5\u745c\u4f3diOS\u4e2d\u6587iPad","app_key":"528c79a056240bb434183b10","platform":"ipad","type":"","popular":0,"sum_data":{"yesterday":{"id":8567,"create_time":1440585979,"update_time":1440680476,"app_id":9,"date":"2015-08-24","new_user":1483,"active_user":9266,"launch":68030,"duration":2225,"duration_text":"00:37:05","total":0},"today":{"id":8568,"create_time":1440585979,"update_time":1440680476,"app_id":9,"date":"2015-08-25","new_user":1474,"active_user":11149,"launch":63581,"duration":936,"duration_text":"00:15:36","total":0}}},{"id":10,"create_time":1440580984,"update_time":1440662570,"name":"\u6bcf\u65e5\u745c\u4f3diOS\u4e2d\u6587iPhone","app_key":"528c791856240b16f80cb7f2","platform":"iphone","type":"","popular":0,"sum_data":{"yesterday":{"id":9519,"create_time":1440585988,"update_time":1440680488,"app_id":10,"date":"2015-08-24","new_user":3661,"active_user":17381,"launch":88495,"duration":1623,"duration_text":"00:27:03","total":0},"today":{"id":9520,"create_time":1440585988,"update_time":1440680488,"app_id":10,"date":"2015-08-25","new_user":4052,"active_user":25580,"launch":119778,"duration":2435,"duration_text":"00:40:35","total":0}}},{"id":11,"create_time":1440580984,"update_time":1440662570,"name":"\u6bcf\u65e5\u745c\u4f3d","app_key":"50ef6bef52701504b40000c2","platform":"android","type":"","popular":0,"sum_data":{"yesterday":{"id":10471,"create_time":1440585999,"update_time":1440680501,"app_id":11,"date":"2015-08-24","new_user":15200,"active_user":284952,"launch":1300480,"duration":2874,"duration_text":"00:47:54","total":0},"today":{"id":10472,"create_time":1440585999,"update_time":1440680501,"app_id":11,"date":"2015-08-25","new_user":16662,"active_user":287979,"launch":1334700,"duration":776,"duration_text":"00:12:56","total":0}}}]};

    $scope.appInfo=mockdata.data;
    renderSummaryTable(mockdata.data);
    return;
            if(response.data.errno === 0) {
              $scope.appInfo=response.data.data;
              renderSummaryTable(response.data.data);
            } else {
              alert(response.data.errmsg);
            }
          }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

          });
      };

      fetchData();
    };
})();
