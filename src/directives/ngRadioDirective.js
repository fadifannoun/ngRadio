(function(){
	'use strict';
	angular.module('ngRadio').directive('ngRadio', ngRadioDirective);

	function ngRadioDirective(ngRadioService, $interval){

		function getTemplate(){
			return ['<div id="ngRadio" class="radio-player animated flipInY">',
				'<div class="lv-player">',
					'<div class="row">',
						'<div class="col">',
							'<div class="prev">',
								'<div class="previous-station">',
									'<button class="button button-icon button-clear icon-right icon ion-chevron-right" ng-click="previous()"></button>',
								'</div>',
							'</div>',
							'<div class="play-button">',
								'<button type="button" ng-click="audio.play()" ng-if="!audio.isPlaying()"><i class="icon ion-ios-play"></i></button>',
								'<button type="button" ng-click="audio.pause()" ng-if="audio.isPlaying()"><i class="icon ion-ios-pause"></i></button>',
							'</div>',
							'<div class="next">',
								'<div class="next-station">',
									'<button class="button button-icon button-clear icon-left icon ion-chevron-left" ng-click="next()"></button>',
								'</div>',
							'</div>',
						'</div>',
					'</div>',
					'<div class="row">',
						'<div class="col">',
							'<div class="exapnd-list" ng-click="expandStationsList()">',
								'{{ activeStation.name }}',
							'</div>',
						'</div>',
					'</div>',
					'<div class="list" ng-show="listExpanded">',
						'<a href="" class="item" ng-repeat="st in list" ng-click="setActiveStation(st)">{{ st.name }}</a>',
					'</div>',
				'</div>',
			'</div>'].join('');
		}

		return {

			restrict: 'E',
            scope: true,
            replace: true,
            template: getTemplate(),
			link: function(scope, elt, attrs){

				// plugin scope
				scope.listExpanded = false;
				scope.enableNavigation = true;
				scope.station = null;
				scope.isLoading = false;

				// private vars
				var list, activeIndex = 0,  userList = attrs.ngrSource;
				var debugMode = attrs.ngrDebugMode || true;
				var template = attrs.ngrTheme || 'widget.html';

				// handle templates
				scope.getTemplateUrl = function() {
					return [
  					  '<div id="ngRadio" class="radio-player animated flipInY">',
  					      '<div class="lv-player">',
  					          '<div class="row">',
  					              '<div class="col">',
  					                  '<div class="prev">',
  					                      '<div class="previous-station">',
  					                          '<button class="button button-icon button-clear icon-right icon ion-chevron-right" ng-click="previous()"></button>',
  					                      '</div>',
  					                  '</div>',
  					                  '<div class="play-button">',
  					                      '<button type="button" ng-click="audio.play()" ng-if="!audio.isPlaying()"><i class="icon ion-ios-play"></i></button>',
  					                      '<button type="button" ng-click="audio.pause()" ng-if="audio.isPlaying()"><i class="icon ion-ios-pause"></i></button>',
  					                  '</div>',
  					                  '<div class="next">',
  					                      '<div class="next-station">',
  					                          '<button class="button button-icon button-clear icon-left icon ion-chevron-left" ng-click="next()"></button>',
  					                      '</div>',
  					                  '</div>',
  					              '</div>',
  					          '</div>',
  					          '<div class="row">',
  					              '<div class="col" ng-click="expandStationsList()">',
  					                  '{{ activeStation.name }}',
  					              '</div>',
  					          '</div>',
  					          '<div class="list" ng-show="listExpanded">',
  					              '<a href="" class="item" ng-repeat="st in list" ng-click="setActiveStation(st)">{{ st.name }}</a>',
  					          '</div>',
  					      '</div>',
  					  '</div>'
  				  ].join('');
	            };

				// set plugin options
				if(typeof userList !== "undefined" && userList.length > 0){
            		ngRadioService.setList(userList);
				}

				if(typeof attrs.ngrExtendedMode !== "undefined" && attrs.ngrExtendedMode === true){
					controlList.expand();
				}

				if(typeof attrs.ngrEnableNavigation !== "undefined"){
					scope.enableNavigation = attrs.ngrEnableNavigation;
				}

				if(list = ngRadioService.getList()){
					scope.list = list;
					scope.activeStation = ngRadioService.getActiveStation();
					debug(scope.activeStation.name);
				}

				// navigation control
				scope.setActiveStation = function(station){

					scope.activeStation = station;
					ngRadioService.setActiveStation(station);

					scope.audio.play();
				};

				scope.next = function(){
					scope.setActiveStation (ngRadioService.getNextStation() );
				};

				scope.previous = function(){
					scope.setActiveStation ( ngRadioService.getPreviousStation() );
				};

				scope.expandStationsList = function(){
					scope.listExpanded ? controlList().collapse() : controlList().expand();
				};

				// control audio object
				scope.audio = {
					init: function(){
						this.destory();
						scope.station = new Audio(scope.activeStation.url);
					},
					play: function(){
						this.init();
						scope.station.play();
						handleStationEvents();
					},
					pause: function(){
						scope.station.pause();
					},
					stop: function(){
						scope.station.pause();
						scope.station = null;
					},
					load: function(){
						scope.station.load();
					},
					destory: function(){
						if(scope.station !== null){
							this.stop();
						}
					},
					isPlaying: function(){
						if(scope.station === null) return false;
						return scope.station.paused ? false : true;
					}
				}

				// control list on stations
				function controlList(){
					function expandList(){
						scope.listExpanded = true;
					}
					function collapseList(){
						scope.listExpanded = false;
					}
					return {
						expand: expandList,
						collapse: collapseList
					};
				}

				// handle audio events
				function handleStationEvents(){

					$interval(function(){
						if(scope.station.readyState <= 2){
							debug('waiting streaming to complete ... ');
						}
					}, 1000);

					scope.station.addEventListener("canplay", function(){
						debug('Station is available for playing');
					}, false);

					scope.station.addEventListener("playing", function(){
						scope.isLoading = false;
						debug('Station is now playing');
					}, false);

					scope.station.addEventListener("error", function(e){
						debug('Error playing', e);
						scope.isLoading = false;
					}, false);

					scope.station.addEventListener("waiting", function(e){
						scope.isLoading = true;
						debug('Waiting station to load');
					}, false);

					scope.station.addEventListener("ended", function(e){
						debug('Playing ended');
						scope.audio.destory();
						scope.isLoading = false;
					}, false);

				}

				function debug(msg, extra){
					if(debugMode){
						console.log(msg, extra);
					}
				}


			}

		};

	}

})();
