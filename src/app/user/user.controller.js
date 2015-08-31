(function() {
  'use strict';

  angular
    .module('dashbord')
    .service('userConfig', userConfig)
    .controller('UserController', UserController);

  function userConfig($log) {
    var chartCfg = {
        title: {
          align: 'left'
        },
        exporting: {
          enabled: false
        },
        xAxis: {
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
        // yAxis: [{ // left y axis
        //   title: {
        //     text: null
        //   },
        //   labels: {
        //     align: 'left',
        //     x: 3,
        //     y: 16,
        //     format: '{value:.,0f}'
        //   },
        //   showFirstLabel: false
        // }, { // right y axis
        //   linkedTo: 0,
        //   gridLineWidth: 0,
        //   opposite: true,
        //   title: {
        //     text: null
        //   },
        //   labels: {
        //     align: 'right',
        //     x: -3,
        //     y: 16,
        //     format: '{value:.,0f}'
        //   },
        //   showFirstLabel: false
        // }],
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
              pointPadding: 0.2,
              borderWidth: 0,
              lineWidth: 1
            }
          }
        }
      };
    var data = {
      'new': {
        url: 'http://115.29.202.161:8087/statistics/api/new',
        chartCfg: angular.extend(chartCfg, {
          // chart: {
          //   type: 'column'
          // },
          title: {
            text: '新增用户趋势',
            legend: {
              floating: false
            }
          },
          tooltip: {
            pointFormat: '{series.name}: {point.y:.1f}',
            shared: true
          }
        }),
        dataGenerator: function(data) {

        },
        render: function() {

        }
      },
      'active': {
        url: 'http://115.29.202.161:8087/statistics/api/active'
      },
      'silent': {
        url: 'http://115.29.202.161:8087/statistics/api/silent'
      },
      'launch': {
        url: 'http://115.29.202.161:8087/statistics/api/launch',
        chartCfg: angular.extend(chartCfg, {
          // chart: {
          //   type: 'column'
          // },
          title: {
            text: '启动次数趋势',
            legend: {
              floating: false
            }
          },
          tooltip: {
            pointFormat: '{series.name}: {point.y:.1f}',
            shared: true
          }
        }),
        dataGenerator: function(data) {

        },
        render: function() {

        }
      },
      'retained': {
        url: 'http://115.29.202.161:8087/statistics/api/retained'
      },
      'duration': {
        url: 'http://115.29.202.161:8087/statistics/api/duration',
        chartCfg: angular.extend(chartCfg, {
          chart: {
            type: 'column'
          },
          title: {
            legend: {
              floating: false
            }
          },
          tooltip: {
            pointFormat: '{series.name}: {point.y:.1f} %',
            shared: true
          }
        }),
        dataGenerator: function(data) {
          var obj = {single: {key: [], value: [], data:[]}, day: {key: [], value: [], data:[]}};
          // obj.single_duration = data.single_duration;
          // obj.day_duration = data.day_duration;
          angular.forEach(data.single_duration, function(value, key) {
            obj.single.key.push(key);
            obj.single.value.push(value);
            obj.single.data.push({key: key, value: value});
          });

          angular.forEach(data.day_duration, function(value, key) {
            obj.day.key.push(key);
            obj.day.value.push(value);
            obj.day.data.push({key: key, value: value});
          });

          return obj;
        },
        render: function(data) {
          // $log.log(this.chartCfg);
          var _cfg = this.chartCfg,
              _singleCfg = angular.extend(_cfg, {
                title: {
                  text: '单次使用时长分布'
                },
                xAxis: {
                  categories: data.single.key
                },
                series: [{
                  name: '时长占比',
                  data: data.single.value
                }]
              });

          $('#single_duration_container').highcharts(_singleCfg);

          var _dayCfg = angular.extend(_cfg, {
            title: {
              text: '日使用时长分布'
            },
            xAxis: {
              categories: data.day.key
            },
            series: [{
              name: '时长占比',
              data: data.day.value
            }]
          });

          $('#day_duration_container').highcharts(_dayCfg);
        }
      }
    };

    this.getConfig = getConfig;

    function getConfig() {
      return data;
    }
  };

  /** @ngInject */
  function UserController($rootScope, $scope, $http, $location, $log, userConfig) {
    // $log.log($location.path());
    var path = $location.path().split('/')[2],
        config = userConfig.getConfig(),
        options = {};

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
    $scope.filter = {
      time:'day'
    };
    $scope.today = getDateStr(0);
    $scope.yesterday = getDateStr(-1);
    $scope.minDate = '2014/1/1';



    switch (path) {
      case 'new': break;
      case 'active': break;
      case 'silent': break;
      case 'launch':
        break;
      case 'retained': break;
      case 'duration':
        options.start_date = getDateStr(-1,'-');
        $scope.startdate = options.start_date;
        break;
    };

    var retainedBgc = function(data) {
      return 'retained-c'+Math.ceil(data/20);
    }

    var fetchData = function(options) {
      options = angular.extend({
        app_id: $rootScope.currentApp.id,
        start_date: $scope.startdate,
        end_date: $scope.enddate
      }, options);

      $http.get(config[path].url, options).
        then(function(response) {
          // this callback will be called asynchronously
          // when the response is available

  var mockdata =  {"errno":0,"errmsg":"","data":{"id":962,"create_time":1440854423,"update_time":1440854423,"app_id":5,"date":"2015-07-20","single_duration":{"1-3\u79d2":0.7,"4-10\u79d2":1.6,"11-30\u79d2":0.2,"31-60\u79d2":0.4,"1-3\u5206":40.6,"3-10\u5206":55.6,"10-20\u5206":0.9},"day_duration":{"1-3\u79d2":0.9,"4-10\u79d2":0.9,"11-30\u79d2":0.6,"31-60\u79d2":1.9,"1-3\u5206":36.8,"3-10\u5206":58.4,"10-20\u5206":0.5}}}
  $log.log(mockdata);
  $scope.data = config[path].dataGenerator ?  config[path].dataGenerator(mockdata.data): response.data;
  $log.log($scope.data);
  config[path].render && config[path].render($scope.data);
  return;
          if(response.data.errno === 0) {
            $scope.data = config[path].dataGenerator ? config[path].dataGenerator(response.data) : response.data;
            config[path].render && config[path].render($scope.data);
          } else {
            alert(response.data.errmsg);
          }
        }, function(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.

        });
    };

    $scope.$watch(function() {
      return $rootScope.currentApp;
    }, function() {
      $scope.currentApp = $rootScope.currentApp;
      fetchData({app_id: $scope.currentApp.id});
    }, true);

    $scope.refresh = function() {
      fetchData();
    };
  };
})();
