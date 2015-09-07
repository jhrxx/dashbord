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
        yAxis: {
          title: {
            text: ''
          },
          maxPadding: 2,
          minPadding: 2,
          min:0
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
      'active': {
        filter: true,
        url: '/statistics/api/common',
        chartCfg: angular.extend({
          chart: {
            type: 'line'
          },
          title: {
            text: '新增用户趋势',
            legend: {
              floating: false
            }
          },
          tooltip: {
            pointFormat: '{series.name}: {point.y:.0f}',
            shared: true
          }
        },chartCfg),
        dataGenerator: function(data) {
          var _obj = {
            new_user:[],
            active_user:[],
            start_date:[],
            end_date:[],
            launch: [],
            date:[],
            week_no:[],
            year:[]
          };
          _obj.data = data;
          angular.forEach(data, function(value, key){
            _obj.new_user.push(value.new_user);
            _obj.active_user.push(value.active_user);
            _obj.launch.push(value.launch);
            if(!value.year) {
              _obj.date.push(value.date);
            }
            if(value.week_no) {
              _obj.date.push('第'+ value.week_no +'周');
            }
            if(value.month_no) {
              _obj.date.push(value.year + '年'+ value.month_no +'月');
            }
            _obj.week_no.push(value.week_no);
            _obj.start_date.push(value.start_date);
            _obj.end_date.push(value.end_date);
            _obj.year.push(value.year);
          });
          return _obj;
        },
        render: function(data) {
          // $log.log(this.chartCfg)
          var _cfg = angular.extend(this.chartCfg, {
            chart: {
              type: 'line'
            },
            title: {
              text: '活跃用户趋势',
              legend: {
                floating: false
              }
            },
            tooltip: {
              pointFormat: '{series.name}: {point.y:.0f}',
              shared: true
            },
            xAxis: {
              categories: data.date
            },
            legend: {
              enabled: false
            },
            series: [{
              name: '活跃用户',
              data: data.active_user
            }]
          });

          $('#container').highcharts(_cfg);
        }
      },
      'new': {
        url: '/statistics/api/commondaily',
        chartCfg: angular.extend({
          chart: {
            type: 'line'
          },
          title: {
            text: '新增用户趋势',
            legend: {
              floating: false
            }
          },
          legend: {
            enabled: false
          },
          yAxis:{
            maxPadding: 5,
            minPadding: 5
          },
          tooltip: {
            pointFormat: '{series.name}: {point.y:.0f}',
            shared: true
          }
        }, chartCfg),
        dataGenerator: function(data) {
          // $log.log(data)
          var _obj = {
            new_user:[],
            active_user:[],
            date:[],
            launch: [],
            single_duration:[]
          };
          _obj.data = data;
          angular.forEach(data, function(value, key){
            _obj.new_user.push(value.new_user);
            _obj.active_user.push(value.active_user);
            _obj.date.push(value.date);
            _obj.launch.push(value.launch);
            _obj.single_duration.push(value.single_duration);
          });
          return _obj;
        },
        render: function(data) {
          var _cfg = angular.extend(this.chartCfg, {
            chart: {
              type: 'line'
            },
            title: {
              text: '新增用户趋势',
              legend: {
                floating: false
              }
            },
            tooltip: {
              pointFormat: '{series.name}: {point.y:.0f}',
              shared: true
            },
            xAxis: {
              categories: data.date
            },
            series: [{
              name: '新增用户',
              data: data.new_user
            }]
          });

          $('#container').highcharts(_cfg);
        }
      },
      'launch': {
        url: '/statistics/api/commondaily',
        chartCfg: angular.extend({
          title: {
            text: '启动次数趋势',
            legend: {
              floating: false
            }
          },
          tooltip: {
            pointFormat: '{series.name}: {point.y:.0f}',
            shared: true
          }
        }, chartCfg),
        dataGenerator: function(data) {
          var _obj = {
            date:[],
            launch: []
          };
          _obj.data = data;
          angular.forEach(data, function(value, key){
            _obj.date.push(value.date);
            _obj.launch.push(value.launch);
          });
          return _obj;
        },
        render: function(data) {
          var _cfg = angular.extend(this.chartCfg, {
            chart: {
              type: 'line'
            },
            title: {
              text: '启动次数趋势',
              legend: {
                floating: false
              }
            },
            tooltip: {
              pointFormat: '{series.name}: {point.y:.0f}',
              shared: true
            },
            xAxis: {
              categories: data.date
            },
            series: [{
              name: '启动次数',
              data: data.launch
            }]
          });

          $('#container').highcharts(_cfg);
        }
      },
      'retained': {
        filter: true,
        url: '/statistics/api/remain',
        render: function(data) {

        }
      },
      'duration': {
        url: '/statistics/api/duration',
        chartCfg: chartCfg,
        dataGenerator: function(data) {
          var obj = {single: {key: [], value: [], data:[]}, day: {key: [], value: [], data:[]}};
          obj.avg_single_duration = data.avg_single_duration;
          obj.avg_day_duration = data.avg_day_duration;
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
          var _cfg = this.chartCfg,
              _singleCfg = angular.extend(_cfg, {
                chart: {
                  type: 'column'
                },
                title: {
                  text: '单次使用时长分布'
                },
                xAxis: {
                  categories: data.single.key
                },
                series: [{
                  name: '时长占比',
                  data: data.single.value
                }],
                yAxis:{
                  title: {
                    text: ''
                  },
                  min:0
                },
                tooltip: {
                  pointFormat: '{series.name}: {point.y:.1f}%',
                  shared: true
                }
              });

          $('#single_duration_container').highcharts(_singleCfg);

          var _dayCfg = angular.extend(_cfg, {
            chart: {
              type: 'column'
            },
            title: {
              text: '日使用时长分布'
            },
            xAxis: {
              categories: data.day.key
            },
            series: [{
              name: '时长占比',
              data: data.day.value
            }],
            yAxis:{
              title: {
                text: ''
              },
              min:0
            },
            tooltip: {
              shared: false,
              crosshairs: false,
              pointFormat: '{series.name}: {point.y:.1f}%'
            }
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
  function UserController($rootScope, $scope, $http, $location, $log, $filter, userConfig, toastr, cfpLoadingBar, config) {

    // $log.log($location.path());
    var path = $location.path().split('/')[2],
        ucfg = userConfig.getConfig(),
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
      time:'daily'
    };
    $scope.today = getDateStr(0);
    $scope.yesterday = getDateStr(-1);
    $scope.minDate = '2013/10/1';
    $scope.yearPicker = [2013, 2014, 2015];


    switch (path) {
      case 'new': break;
      case 'active': break;
      case 'launch':

        break;
      case 'retained': break;
      case 'duration':
        $scope.enddate = null;
        $scope.startdate = null;
        break;
    };

    $scope.retention = function(data) {
      return isNaN(data)?'':$filter('number')(data*100, 2)+'%';
    };
    $scope.retainedBgc = function(data) {
      return 'retained-c'+Math.ceil(data*100/20);
    };

    var setCalendar = function(data) {
      if(path==='active' || path==='retained'){
        if(data[0].year) {
          $scope.filter.year = data[0].year;
        } else {
          $scope.startdate = data[0].date;
          $scope.enddate = data[data.length-1].date;
        }
      } else if(path==='duration'){
        $scope.enddate = null;
        $scope.startdate = data.date;
      } else {
        $scope.startdate = data[0].date;
        $scope.enddate = data[data.length-1].date;
      }
    };

    var fetchData = function(options) {
      if($rootScope.currentApp.id === 0){
        return;
      }
      cfpLoadingBar.start();

      options = angular.extend({
        app_id: $rootScope.currentApp.id
      }, options);

      if($scope.filter.year) {
        options = angular.extend({
          year: $scope.filter.year
        }, options);
      } else if(path === 'duration' && $scope.startdate) {
        options = angular.extend({
          start_date: $scope.startdate
        }, options);
      } else if($scope.startdate && $scope.enddate) {
        options = angular.extend({
          start_date: $scope.startdate,
          end_date: $scope.enddate
        }, options);
      }

      var url = ucfg[path].url;
      if(ucfg[path].filter) {
        url += $scope.filter.time;
      }

      $http.get(config.getUrl()+url, {params: options}).
        then(function(response) {
          // this callback will be called asynchronously
          // when the response is available
          if(response.data.errno === 0) {
            if(response.data.data.length === 0){
              toastr.error('没有数据');
            } else {
              // $log.log(response.data.data);
              $scope.data = ucfg[path].dataGenerator ? ucfg[path].dataGenerator(response.data.data) : response.data.data;
              ucfg[path].render && ucfg[path].render($scope.data);
              setCalendar(response.data.data);
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

      if(newValue && newValue.id === 0) {
        fetchData({app_id: $scope.currentApp.id});
      } else {
        fetchData();
      }
    }, true);

    $scope.filterOnChange = function(value){
      $log.debug(value);
      $scope.startdate = null;
      $scope.enddate = null;
      $scope.filter.year = null;
      fetchData({app_id: $scope.currentApp.id});
    };

    $scope.yearPickerChange = function(value){
      $log.debug(value);
      fetchData({year: value});
    };

    $scope.refresh = function() {
      fetchData();
    };
  };
})();
