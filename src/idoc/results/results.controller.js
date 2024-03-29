'use strict';


function ResultsCtrl($scope, $state, $stateParams, $location, doctorsService, idocRestService,
    $anchorScroll, urlService, queryService, $translate, seoService) {

    var _this = this;
    $scope.params = $stateParams.query || {};

    this.getDoctors = function (params) {
        $scope.loader.active = true;
        $scope.isShowResult = false;
        idocRestService.getDoctors(params).then(function (response) {


            /*SEO*/
            var seoData = '';
            switch(true) {
                case queryService.isSearchBy('name'):
                    seoData = 'tên bác sĩ: ' + queryService.getParam('name');
                    break;
                case queryService.isSearchBy('specialty'):
                    seoData = 'tên chuyên khoa: ' + queryService.getParam('specialty');
                    break;
                // more to come, condition, diseases
            };
            seoService.update({data:seoData});

            $scope.data = doctorsService.formatDoctorsData(response.data);

            $scope.data.currentPage = ($scope.data.skip / 5) + 1;

            $scope.maps = _.chain($scope.data.results)
                // remove doctors without addresses on maps
                .filter(function(d){
                    return d.address;
                })
                .map(function(d){
                    var obj = {title: d.full_name};
                    obj.lat = d.address.lat;
                    obj.lon = d.address.lng;
                    obj.des = d.address.raw;
                    return obj;
                })
                .value();

            $scope.isShowResult = true;
            $scope.loader.active = false;
            $anchorScroll('#result');

        }, function (error) {
            $scope.loader.active = false;
        });
    };

    this.updateUrl = function(params) {
        var url = urlService.getUrlFor('results', null, params, true);
        $location.url(url);
    };

    this.initSearch = function() {
        var paramsQuery = JSON.parse($location.search().query);
        queryService.setQueryFromParams(paramsQuery);
        _this.getDoctors(paramsQuery);
    }

    this.init = function() {
        if ($location.search().query) {
            _this.initSearch();
        } else {
            queryService.setQueryFromParams($scope.params);
            var params = queryService.getParams();
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
        queryService.setSkip((pageNumber - 1) * 5);
        var params = queryService.getParams();
        _this.updateUrl(params);
    };

    $scope.booking = function (doctor, bookingDate) {
        doctorsService.setSelectedDoctor(doctor);
        $state.go('booking', {bookingDate: bookingDate});
    }
}

ResultsCtrl.$inject = ['$scope', '$state', '$stateParams', '$location', 'doctorsService',
'idocRestService', '$anchorScroll', 'urlService', 'queryService', '$translate', 'seoService'];

angular.module('iDocApp')
    .controller('ResultsCtrl', ResultsCtrl);