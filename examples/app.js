'use strict';
angular.module('app', ['ngRadio', 'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/ngRadio.html',
        controller: function($scope){
            $scope.radios = [
                {
                    name: 'هلا إف إم',
                    url: 'http://76.164.217.100:7302/;&codec=mp3&tracking=true&volume=100&autoplay=true&buffering=3;'
                },
                {
                    name: 'مزاج اف ام',
                    url: 'http://ice5.securenetsystems.net:80/MAZAJFM?&playSessionID=76112426-CCF9-FE82-B92E0F2D0DAEC4AA;'
                },
                {
                    name: 'حياة اف ام',
                    url: 'http://stream.purecore.net:8000/;&lang=en&autoplay=true&codec=mp3&buffering=5;'
                },
                {
                    name: 'بي بي سي العربية',
                    url: 'http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-araba'
                },
                {
                    name: 'راديو سوا لبنان',
                    url: 'http://mbn-channel-07.ng.akacast.akamaistream.net/7/27/233456/v1/ibb.akacast.akamaistream.net/mbn_channel_07;'
                },
                {
                    name: 'راديو ألون',
                    url: 'http://streaming.radionomy.com/RadionoMiX;'
                },
                {
                    name: 'مونتي كارلو',
                    url: 'http://mc-doualiya.scdn.arkena.com/mc-doualiya.mp3'
                },
                {
                    name: 'راديو الشرق',
                    url: 'http://radioorient.scdn.arkena.com/radioorient.mp3'
                },
                {
                    name: 'راديو موزارت',
                    url: 'http://streaming.radionomy.com/Radio-Mozart'
                },
                {
                    name: 'الجزيرة انجليزي',
                    url: 'http://66.226.10.51:8000/AljazeeraEnglish'
                },
                {
                    name: 'راديو هوانا',
                    url: 'https://streaming.radionomy.com/Radio-Hawana?1429795965019.mp3'
                }
            ];
        }
      })
      .when('/ngRadio', {
        templateUrl: 'views/ngRadio.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]);
