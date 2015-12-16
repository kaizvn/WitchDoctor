"use strict";

angular.module('iDocApp')
    .controller('DetailCtrl', function ($scope, IdocRestService, DoctorsService, $stateParams) {
        var isRelated;
        IdocRestService.getDoctorDetail($stateParams.id).then(function(response) {
            isRelated = false;
        	$scope.doctor = response.data;
            $scope.doctor.profile.image_url = $scope.doctor.profile.images && $scope.doctor.profile.images.length > 0 ? $scope.doctor.profile.images[0].image : '';
            $scope.doctor.profile.address = DoctorsService.getAddressDoctor($scope.doctor);
            
        	/*$scope.maps = [{
        		lat: $scope.doctor.practices[0].visit_address.lat,
        		lon: $scope.doctor.practices[0].visit_address.lon,
        		title: $scope.doctor.profile.first_name +' '+ $scope.doctor.profile.last_name,
        		desc: $scope.doctor.practices[0].visit_address.street +'<br>'+ $scope.doctor.practices[0].visit_address.city +', '+ $scope.doctor.practices[0].visit_address.state +' '+ $scope.doctor.practices[0].visit_address.zip
        	}]*/

            if(DoctorsService.results) {
                isRelated = true;
                $scope.relatedDoctors = DoctorsService.getRelatedDoctors(DoctorsService.getDoctors().results, $scope.doctor.id);
            }

            IdocRestService.getDoctors().then(function (response) {
                $scope.topDoctors = DoctorsService.formatDoctorsData(response.data);
                if(!isRelated) {
                    $scope.relatedDoctors = DoctorsService.getRelatedDoctors($scope.topDoctors.results, $scope.doctor.id);
                }
            }, function (error) {
                console.trace(error);
            });
        }, function(error) {

        });
    });