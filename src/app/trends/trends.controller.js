(function() {
  'use strict';

  angular
    .module('dashbord')
    .controller('TrendsController', TrendsController);

  /** @ngInject */
  function TrendsController($rootScope, $scope, $http, $location, $log, cfpLoadingBar, config) {
    var path = $location.path();

    function getDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth()+1;//获取当前月份的日期
      var d = dd.getDate();
      return y+"/"+m+"/"+d;
    };
    $scope.minDate = '2013/10/1';
    $scope.today = getDateStr(0);
    $scope.yesterday = getDateStr(-1);

    var renderChart =  function(data) {
      $('#container').highcharts({
        title: {
          align: 'left',
          text: '趋势图'
        },
        exporting: {
          enabled: false
        },
        xAxis: {
          categories: data.date,
          tickWidth: 0,
          gridLineWidth: 1,
          labels: {
            align: 'center',
            x: 3,
            y: -3
          }
        },

        credits: {
          enabled: false
        },

        yAxis: { // left y axis
          maxPadding: 2,
          minPadding: 2,
          title: {
            text: null
          },
          labels: {
            align: 'left',
            x: 3,
            y: 16,
            format: '{value:.,0f}'
          },
          min:0,
          showFirstLabel: false
        },

        legend: {
          enabled: true,
          align: 'right',
          verticalAlign: 'top',
          y: 0,
          floating: true,
          borderWidth: 0
        },

        tooltip: {
          shared: false,
          crosshairs: false
        },

        plotOptions: {
          series: {
            cursor: 'pointer',
            marker: {
              lineWidth: 1
            }
          }
        },

        series: [{
          name: '新增用户',
          data: data.new_user,
          visible: true
        }, {
          name: '活跃用户',
          data: data.active_user,
          visible: false
        }, {
          name: '启动次数',
          data: data.launch,
          visible: false
        }, {
          name: '累计用户',
          data: data.total,
          visible: false
        }]
      });
    };

    var generaterChartData = function(summ) {
      var sum = {
        active_user: [],
        launch: [],
        new_user: [],
        total: [],
        date: []
      };
      if(summ.list) {
        for (var i = 0; i < summ.list.length; i++) {
          sum.active_user.push(parseInt(summ.list[i].active_user));
          sum.launch.push(parseInt(summ.list[i].launch));
          sum.new_user.push(parseInt(summ.list[i].new_user));
          sum.total.push(parseInt(summ.list[i].total));
          sum.date.push(summ.list[i].date.replace('2015-', ''));
        }
      } else {
        for (var i = 0; i < summ.length; i++) {
          sum.active_user.push(parseInt(summ[i].sum_active_user));
          sum.launch.push(parseInt(summ[i].sum_launch));
          sum.new_user.push(parseInt(summ[i].sum_new_user));
          sum.total.push(parseInt(summ[i].sum_total));
          sum.date.push(summ[i].date.replace('2015-', ''));
        };
      }
      return sum;
    };

    var setCalendar = function(data) {
      if(data.list) {
        $scope.startdate = data.list[0].date;
        $scope.enddate = data.list[data.list.length-1].date;
      } else{
        $scope.startdate = data[0].date;
        $scope.enddate = data[data.length-1].date;
      }
    };

    var fetchData = function(options) {
      cfpLoadingBar.start();
      options = $.extend({
        app_id: $rootScope.currentApp.id
      }, options);

      if($scope.startdate && $scope.enddate) {
        options = $.extend({
          start_date: $scope.startdate,
          end_date: $scope.enddate
        }, options);
      } else {
        $scope.startdate = null;
        $scope.enddate = null;
      }
      // if($scope.startdate && $scope.enddate) {
      //   options = angular.extend({
      //     app_id: $rootScope.currentApp.id,
      //     start_date: $scope.startdate,
      //     end_date: $scope.enddate
      //   }, options);
      // }

      var url = config.getUrl() + '/statistics/api/'
      url += options.app_id===0?'summ':'app';

      $http.get(url, {params: options}).
      then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        if (response.data.errno === 0) {
          if(response.data.data.length === 0){
            toastr.error('没有数据');
          } else {
            renderChart(generaterChartData(response.data.data));
            $scope.data = response.data.data;
            setCalendar($scope.data);
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

    $scope.$watch(function() {
      return $rootScope.currentApp;
    }, function(newValue, oldValue) {
      $scope.currentApp = $rootScope.currentApp;
      $scope.startdate = null;
      $scope.enddate = null;

      if(newValue.id === 0) {
        fetchData({app_id: $scope.currentApp.id});
      } else {
        fetchData();
      }

    }, true);

    $scope.refresh = function(){
      fetchData();
    };
  };
})();
