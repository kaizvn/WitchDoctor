"use strict";

angular.module('iDocApp')
    .controller('HomeCtrl', function ($scope, IdocRestService) {
        $scope.content = 'Home';

        $scope.search = function() {
        	IdocRestService.getDoctors().then(function(response) {
        		console.log(response.data);
        	}, function(error) {

        	});
        }
    });