"use strict";


function ResultCtrl($scope, $state, $stateParams, DoctorsService, IdocRestService, $localStorage, $sessionStorage, $anchorScroll) {

    var $storage = $sessionStorage,
        _this = this;
    $scope.isShowResult = false;

    var params = $stateParams.query;

    this.getDoctors = function (params) {
        $anchorScroll('#result');
        IdocRestService.getDoctors(params).then(function (response) {
            $scope.results = DoctorsService.formatDoctorsData(response.data);

            $scope.maps = _.map($scope.results, function (doctor) {
                console.log(doctor);
                var obj = {title: doctor.full_name};
                if (doctor.address) {
                    obj.lat = doctor.address.lat;
                    obj.lon = doctor.address.lng;
                    obj.des = doctor.address.raw;
                }
                return obj;
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


ResultCtrl.$inject = ['$scope', '$state', '$stateParams', 'DoctorsService', 'IdocRestService', '$localStorage', '$sessionStorage', '$anchorScroll'];

angular.module('iDocApp').controller('ResultCtrl', ResultCtrl);