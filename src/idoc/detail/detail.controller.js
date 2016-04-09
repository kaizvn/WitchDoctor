'use strict';

function DetailCtrl($scope, idocRestService, doctorsService, $stateParams, $anchorScroll, $translate, titleService) {
    var isRelated;
    idocRestService.getDoctorDetail($stateParams.id).then(function (response) {
        isRelated = false;
        $scope.doctor = response.data;
        $scope.doctor.profile.image_url = $scope.doctor.profile.images && $scope.doctor.profile.images.length > 0 ? $scope.doctor.profile.images[0].image : '';
        $scope.doctor.profile.address = doctorsService.getAddressDoctor($scope.doctor);
        $scope.doctor.experience_in_years = accumulateExperience(response.data.experiences);

        function accumulateExperience(ar) {
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

        /* Set Title For SEO */
        $translate('global.pageTitle.detail', {
            doctor: profile.name
        }).then(function(txt) {
            titleService.setTitle(txt);
        });

        if (doctorsService.results) {
            isRelated = true;
            $scope.relatedDoctors = doctorsService.getRelatedDoctors(doctorsService.getDoctors().results, $scope.doctor.id);
        }

        idocRestService.getDoctors().then(function (response) {
            $scope.topDoctors = doctorsService.formatDoctorsData(response.data);
            if (!isRelated) {
                $scope.relatedDoctors = doctorsService.getRelatedDoctors($scope.topDoctors.results, $scope.doctor.id);
            }
        }, function (error) {
            console.trace(error);
        });

        $anchorScroll('#result');
    }, function (error) {

    });
}

DetailCtrl.$inject = ['$scope', 'idocRestService', 'doctorsService', '$stateParams', '$anchorScroll', '$translate', 'titleService'];

angular.module('iDocApp')
    .controller('DetailCtrl', DetailCtrl);