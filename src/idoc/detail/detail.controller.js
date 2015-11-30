"use strict";

angular.module('iDocApp')
    .controller('DetailCtrl', function ($scope, IdocRestService, $stateParams) {
        IdocRestService.getDoctorDetail($stateParams.uid).then(function(response) {
        	$scope.doctor = response.data.data;
        }, function(error) {

        });
    });