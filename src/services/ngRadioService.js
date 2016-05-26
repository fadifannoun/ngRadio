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
