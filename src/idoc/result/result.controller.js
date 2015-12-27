"use strict";


function ResultCtrl($scope, $state, $stateParams, DoctorsService, IdocRestService, $localStorage, $anchorScroll) {

    var _this = this;
    $scope.isShowResult = false;
    $scope.params = $stateParams.query || {};

    this.getDoctors = function (params) {
        $anchorScroll('#result');
        IdocRestService.getDoctors(params).then(function (response) {
            $scope.data = DoctorsService.formatDoctorsData(response.data);

            $scope.maps = _.map($scope.data.results, function (doctor) {
                var obj = {title: doctor.full_name};
                if (doctor.address) {
                    obj.lat = doctor.address.lat;
                    obj.lon = doctor.address.lng;
                    obj.des = doctor.address.raw;
                }
                return obj;
            });

            $scope.isShowResult = true;

        }, function (error) {
            console.trace(error);
        });
    };

    this.getDoctors($scope.params);

    $scope.sortOptions = [{
        label: 'Raiting',
        value: 'raiting'
    }, {
        label: 'Location',
        value: 'location'
    }];

    $scope.pageChanged = function (pageNumber) {
        $scope.isShowResult = false;
        $scope.params.skip = (pageNumber - 1) * 10;
        _this.getDoctors($scope.params);
    };
}


ResultCtrl.$inject = ['$scope', '$state', '$stateParams', 'DoctorsService', 'IdocRestService', '$localStorage', '$anchorScroll'];

angular.module('iDocApp').controller('ResultCtrl', ResultCtrl);