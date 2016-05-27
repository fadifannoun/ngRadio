(function() {
  'use strict';
  angular.module('ngRadio', []);
})();
(function(){
	'use strict';
	angular.module('ngRadio').directive('ngRadio', ngRadioDirective);

	function ngRadioDirective(ngRadioService, $interval){
		return {

			restrict: 'E',
            scope: true,
            replace: true,
            template: '<ng-include src="getTemplateUrl()" />',
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
	              return "dist/templates/" + template;
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
(function(){

	'use strict';

	angular.module('ngRadio').factory('ngRadioService', ngRadioService);

	function ngRadioService(){

		var list = [],
			active = {},
			index = 0;

		function getList(){
			if(list.length == 0) {
				throw new Error('Radio stations list is empty, please provide a list first!');
			}
			return list;
		}

		function setList(userList){
			if(!userList instanceof Array){
				throw new Error('Souce must be typeof array!');
			}

			try{
                list = JSON.parse(userList);
                active = list[0];
				index = list.indexOf(active);
            } catch(err) {
                throw err;
            }
		}

		function setActiveStation(station){
			active = station;
		}

		function getActiveStation(){
			return active;
		}

		function getActiveIndex(){
			return list.indexOf(active);
		}

		function getNextStation(){
			var indx = index++;
			setActiveStation(list[indx]);
			return list[indx];
		}

		function getPreviousStation(){
			var indx = index--;
			setActiveStation(list[indx]);
			return list[indx];
		}

		return {
			getList: getList,
			setList: setList,
			setActiveStation: setActiveStation,
			getActiveStation: getActiveStation,
			getActiveIndex: getActiveIndex,
			getNextStation: getNextStation,
			getPreviousStation: getPreviousStation
		};

	}

})();
