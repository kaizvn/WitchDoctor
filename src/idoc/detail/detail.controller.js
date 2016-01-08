"use strict";

angular.module('iDocApp')
    .controller('DetailCtrl', function ($scope, IdocRestService, DoctorsService, $stateParams) {
        var isRelated;
        IdocRestService.getDoctorDetail($stateParams.id).then(function (response) {
            isRelated = false;
            $scope.doctor = response.data;
            $scope.doctor.profile.image_url = $scope.doctor.profile.images && $scope.doctor.profile.images.length > 0 ? $scope.doctor.profile.images[0].image : '';
            $scope.doctor.profile.address = DoctorsService.getAddressDoctor($scope.doctor);
            $scope.doctor.experience_in_years = accumulateExperience(response.data.experiences);

            function accumulateExperience(ar) {
                if (!ar.length){
                    return 0;
                }

                var exp = 0;
                for( var i=0; i < ar.length; i++ ){
                    exp += ( ar[i].duration ? parseInt(ar[i].duration) : 0 );
                }
                return exp;
            }

            var profile = $scope.doctor.profile;
            $scope.maps = [{
                title: profile.name
            }];

            if ($scope.doctor.profile.address) {
                $scope.maps[0].lat = profile.address.lat;
                $scope.maps[0].lon = profile.address.lng;
                $scope.maps[0].des = profile.address.raw;
            }

            if (DoctorsService.results) {
                isRelated = true;
                $scope.relatedDoctors = DoctorsService.getRelatedDoctors(DoctorsService.getDoctors().results, $scope.doctor.id);
            }

            IdocRestService.getDoctors().then(function (response) {
                $scope.topDoctors = DoctorsService.formatDoctorsData(response.data);
                if (!isRelated) {
                    $scope.relatedDoctors = DoctorsService.getRelatedDoctors($scope.topDoctors.results, $scope.doctor.id);
                }
            }, function (error) {
                console.trace(error);
            });
        }, function (error) {

        });
    });