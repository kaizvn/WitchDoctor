"use strict";


function ResultsCtrl($scope, $state, $stateParams, $location, DoctorsService, IdocRestService, $anchorScroll, UrlService, QueryService) {

    var _this = this;
    $scope.params = $stateParams.query || {};

    this.getDoctors = function (params) {
        $scope.loader.active = true;
        $scope.isShowResult = false;
        IdocRestService.getDoctors(params).then(function (response) {
            $scope.data = DoctorsService.formatDoctorsData(response.data);

            $scope.data.currentPage = ($scope.data.skip / 5) + 1;

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
            $scope.loader.active = false;
            $anchorScroll('#result');

        }, function (error) {
            $scope.loader.active = false;
        });
    };

    this.updateUrl = function(params) {
        var url = UrlService.getUrlFor('results', null, params, true);
        $location.url(url);
    };

    this.initSearch = function() {
        var paramsQuery = JSON.parse($location.search().query);
        QueryService.setQueryFromParams(paramsQuery);
        _this.getDoctors(paramsQuery);
    }

    this.init = function() {
        if ($location.search().query) {
            _this.initSearch();
        } else {
            QueryService.setQueryFromParams($scope.params);
            var params = QueryService.getParams();
            _this.updateUrl(params);
            _this.getDoctors(params);
        }
    };

    _this.init();

    $scope.$on('$locationChangeSuccess', function() {
        if($location.url().indexOf('result') > -1){
            _this.initSearch();
        }
    });

    $scope.sortOptions = [{
        label: 'Rating',
        value: 'rating'
    }, {
        label: 'Location',
        value: 'location'
    }];

    $scope.pageChanged = function (pageNumber) {
        QueryService.setSkip((pageNumber - 1) * 5);
        var params = QueryService.getParams();
        _this.updateUrl(params);
    };

    $scope.booking = function (doctor, bookingDate) {
        DoctorsService.setSelectedDoctor(doctor);
        $state.go('booking', {bookingDate: bookingDate});
    }
}


ResultsCtrl.$inject = ['$scope', '$state', '$stateParams', '$location', 'DoctorsService', 'IdocRestService', '$anchorScroll', 'UrlService', 'QueryService'];

angular.module('iDocApp').controller('ResultsCtrl', ResultsCtrl);