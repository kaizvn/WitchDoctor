"use strict";

angular.module('iDocApp')
    .controller('DetailCtrl', function ($scope, IdocRestService, $stateParams) {
        IdocRestService.getDoctorDetail($stateParams.uid).then(function(response) {
        	$scope.doctor = response.data.data;
        	$scope.maps = [{
        		lat: $scope.doctor.practices[0].visit_address.lat,
        		lon: $scope.doctor.practices[0].visit_address.lon,
        		title: $scope.doctor.profile.first_name +' '+ $scope.doctor.profile.last_name,
        		desc: $scope.doctor.practices[0].visit_address.street +'<br>'+ $scope.doctor.practices[0].visit_address.city +', '+ $scope.doctor.practices[0].visit_address.state +' '+ $scope.doctor.practices[0].visit_address.zip
        	}]
        }, function(error) {

        });
    });