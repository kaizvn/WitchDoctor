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

            $scope.results.results = _.map($scope.results.results, function (doctor) {
                return {
                    full_name: doctor.profile.name,
                    specialties: _.pluck(doctor.specialties, 'name').join(' | '),
                    rating: doctor.ratings.length > 0 ? doctor.ratings[0].rating : 0,
                    uid: doctor.id,
                    visit_address: _.pluck(doctor.practices, 'visit_address'),
                    bio: doctor.profile.bio ? doctor.profile.bio.substr(0, 155) + '...' : '',
                    title: doctor.profile.title,
                    image_url: doctor.profile.images && doctor.profile.images.length > 0 ? doctor.profile.images[0].image : '',
                    gender: doctor.profile.gender

                }
            });

            /*$scope.maps = _.map($scope.results.results, function (doctor) {
                return {
                    lat: doctor.visit_address[0].lat,
                    lon: doctor.visit_address[0].lon,
                    title: doctor.full_name,
                    desc: doctor.visit_address[0].street +'<br>'+ doctor.visit_address[0].city +', '+ doctor.visit_address[0].state +' '+ doctor.visit_address[0].zip
                }
            });*/

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