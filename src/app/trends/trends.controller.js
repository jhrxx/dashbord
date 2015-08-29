(function() {
  'use strict';

  angular
    .module('dashbord')
    .controller('TrendsController', TrendsController);

  /** @ngInject */
  function TrendsController($scope, $http) {
    var renderChart =  function(data) {
      $('#container').highcharts({
        title: {
          text: '趋势图'
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

        yAxis: [{ // left y axis
          title: {
            text: null
          },
          labels: {
            align: 'left',
            x: 3,
            y: 16,
            format: '{value:.,0f}'
          },
          showFirstLabel: false
        }, { // right y axis
          linkedTo: 0,
          gridLineWidth: 0,
          opposite: true,
          title: {
            text: null
          },
          labels: {
            align: 'right',
            x: -3,
            y: 16,
            format: '{value:.,0f}'
          },
          showFirstLabel: false
        }],

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
          name: '平均持续时间',
          data: data.avg_duration,
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
        date: [],
        avg_duration: []
      };

      for (var i = 0; i < summ.length; i++) {
        sum.active_user.push(parseInt(summ[i].sum_active_user));
        sum.launch.push(parseInt(summ[i].sum_launch));
        sum.new_user.push(parseInt(summ[i].sum_new_user));
        sum.total.push(parseInt(summ[i].sum_total));
        sum.date.push(summ[i].date.replace('2015-', ''));
        sum.avg_duration.push(parseInt(summ[i].avg_duration));
      };
      return sum;
    };

    var fetchData = function() {
      $http.get('http://115.29.202.161:8087/statistics/api/summ').
      then(function(response) {
        // this callback will be called asynchronously
        // when the response is available
        // console.log(response.data)
        var mockdata = {"errno":0,"errmsg":"","data":[{"date":"2015-08-21","sum_new_user":"32123","sum_active_user":"594192","sum_launch":"3112290","avg_duration":"1239.0909","sum_total":"23723865"},{"date":"2015-08-22","sum_new_user":"32603","sum_active_user":"582232","sum_launch":"3057578","avg_duration":"1244.6364","sum_total":"23756468"},{"date":"2015-08-23","sum_new_user":"35306","sum_active_user":"580884","sum_launch":"3103567","avg_duration":"1656.5455","sum_total":"23791774"},{"date":"2015-08-24","sum_new_user":"38084","sum_active_user":"595213","sum_launch":"3139474","avg_duration":"1768.3636","sum_total":"23829858"},{"date":"2015-08-25","sum_new_user":"41685","sum_active_user":"617238","sum_launch":"3236572","avg_duration":"1435.1818","sum_total":"23871543"},{"date":"2015-08-26","sum_new_user":"0","sum_active_user":"602994","sum_launch":"0","avg_duration":"1158.7273","sum_total":"23910707"},{"date":"2015-08-27","sum_new_user":"0","sum_active_user":"595777","sum_launch":"0","avg_duration":"1599.9091","sum_total":"23949724"},{"date":"2015-08-28","sum_new_user":"0","sum_active_user":"318801","sum_launch":"0","avg_duration":"0.0000","sum_total":"23971522"}]};
        renderChart(generaterChartData(mockdata.data));

        return;
        if (response.data.errno === 0) {
          renderChart(generaterChartData(response.data.data));
        } else {
          // alert(response.data.errmsg);
        }
      }, function(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

      });
    };

    fetchData();

    $scope.refresh = function(){
      fetchData();
    };
  };
})();
