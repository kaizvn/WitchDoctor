"use strict";


function ResultCtrl($scope, $state, $stateParams, DoctorsService, IdocRestService, $localStorage, $sessionStorage, $anchorScroll) {

    var $storage = $sessionStorage,
        _this = this;
    $scope.isShowResult = false;

    var params = ($stateParams.query)
        ? $stateParams
        : JSON.parse($storage.lastSearchTerm || '{}');

    this.getDoctors = function (params) {
        $anchorScroll('#result');
        IdocRestService.getDoctors(params).then(function (response) {
            $scope.results = DoctorsService.formatDoctorsData(response.data);

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


ResultCtrl.$inject = ['$scope', '$state', '$stateParams', 'DoctorsService', 'IdocRestService', '$localStorage', '$sessionStorage', '$anchorScroll'];

angular.module('iDocApp').controller('ResultCtrl', ResultCtrl);