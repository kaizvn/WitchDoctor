"use strict";

angular.module('iDocApp')
    .controller('DetailCtrl', function ($scope, IdocRestService, $stateParams) {
        IdocRestService.getDoctorDetail($stateParams.uid).then(function(response) {
        	$scope.doctor = response.data;
            $scope.doctor.profile.address = '';
            if($scope.doctor.practices) {
                for(var i = 0; i < $scope.doctor.practices.length && !$scope.doctor.profile.address; i++) {
                    for(var j = 0; j < $scope.doctor.practices[i].addresses.length; j++) {
                        if($scope.doctor.practices[i].addresses[j] && $scope.doctor.practices[i].addresses[j].raw) {
                            $scope.doctor.profile.address = $scope.doctor.practices[i].addresses[j].raw;
                            break;
                        }
                    }
                }
            }
            
        	/*$scope.maps = [{
        		lat: $scope.doctor.practices[0].visit_address.lat,
        		lon: $scope.doctor.practices[0].visit_address.lon,
        		title: $scope.doctor.profile.first_name +' '+ $scope.doctor.profile.last_name,
        		desc: $scope.doctor.practices[0].visit_address.street +'<br>'+ $scope.doctor.practices[0].visit_address.city +', '+ $scope.doctor.practices[0].visit_address.state +' '+ $scope.doctor.practices[0].visit_address.zip
        	}]*/
        }, function(error) {

        });
    });