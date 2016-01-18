"use strict";

angular.module('iDocApp')
    .controller('AboutCtrl', function ($scope) {

    	$scope.show = {
    		about: true,
        	team: false,
        	faqs: false,
        	contact: false
    	}

        $scope.showTab = function (tab) {
        	_.each($scope.show, function (value, key, list) {
        		list[key] = key === tab ? true : false;
        	});
        }
    });