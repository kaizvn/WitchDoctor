"use strict";


function ResultCtrl($scope, $state, $stateParams, IdocRestService, $localStorage, $sessionStorage, $anchorScroll) {

    var $storage = $sessionStorage,
        _this = this;
    $scope.isShowResult = false;

    var params = ($stateParams.query)
        ? $stateParams
        : JSON.parse($storage.lastSearchTerm || '{}');

    this.getDoctors = function (params) {
        $anchorScroll('#result');
        IdocRestService.getDoctors(params).then(function (response) {
            $scope.results = response.data;

            $scope.results.data = _.map($scope.results.data, function (doctor) {
                return {
                    full_name: [doctor.profile.first_name, doctor.profile.middle_name, doctor.profile.last_name].join(' '),
                    specialties: _.pluck(doctor.specialties, 'name').join(' | '),
                    ratings: doctor.ratings.map(function (rate) {
                        return {
                            provider: rate.provider,
                            provider_uid: rate.provider_uid,
                            review_count: rate.review_count,
                            rating: rate.rating,
                            image_url_small: rate.image_url_small
                        }
                    }),
                    uid: doctor.uid,
                    npi: doctor.npi,
                    visit_address: _.pluck(doctor.practices, 'visit_address'),
                    bio: doctor.profile.bio.substr(0, 155) + '...',
                    title: doctor.profile.title,
                    image_url: doctor.profile.image_url,
                    gender: doctor.profile.gender

                }
            });

            $scope.maps = _.map($scope.results.data, function (doctor) {
                console.log(doctor);
                return {
                    lat: doctor.visit_address[0].lat,
                    lon: doctor.visit_address[0].lon,
                    title: doctor.full_name,
                    desc: doctor.visit_address[0].street +'<br>'+ doctor.visit_address[0].city +', '+ doctor.visit_address[0].state +' '+ doctor.visit_address[0].zip
                }
            });

            $scope.isShowResult = true;
            $storage.lastSearchTerm = JSON.stringify(params);

        }, function (error) {
            console.trace(error);
        });
    };

    this.getDoctors(params);

    $scope.pageChanged = function (pageNumber) {
        $scope.isShowResult = false;
        params.skip = pageNumber - 1;
        _this.getDoctors(params);
    };
}


ResultCtrl.$inject = ['$scope', '$state', '$stateParams', 'IdocRestService', '$localStorage', '$sessionStorage', '$anchorScroll'];

angular.module('iDocApp').controller('ResultCtrl', ResultCtrl);