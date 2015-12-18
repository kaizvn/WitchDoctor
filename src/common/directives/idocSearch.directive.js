"use strict";

angular.module('iDocApp')
    .directive('idocSearch', function (IdocRestService, $state) {
        return {
            restrict: 'E',
            templateUrl: '/common/directives/idocSearch.html',
            link: function ($scope) {
                $scope.action = {
                    specialties: {
                        value: false,
                        text: 'Triệu chứng'
                    },
                    name: {
                        value: true,
                        text: 'Bác sĩ'
                    }
                };

                $scope.selectedType = $scope.action.name.text;

                $scope.onSelectType = function(type){
                    _.each($scope.action, function (value, key, list) {
                        return list[key].value = false;
                    });

                    $scope.selectedType = $scope.action[type].text;
                    $scope.action[type].value = true;

                    $scope.showSearchType = !$scope.showSearchType;
                };

                IdocRestService.getCity().then(function (response){
                    $scope.citys = response.data;
                });

                IdocRestService.getHospital().then(function (response){
                    $scope.hospitals = response.data;
                });

                $scope.getSpecialties = function (input) {
                    return IdocRestService.getSpecialtiesBy(input).then(function (response) {
                        return _.map(response.data.results, function (data) {
                            return data.specialties[0] && data.specialties[0].name ? data.specialties[0].name : null
                        });
                    });
                }

                $scope.search = function (specialties) {
                    var querySearch = {
                        specialties: specialties
                    }

                    $state.go('result', {query: querySearch});
                }

                $scope.onSelectedCity = function(city) {
                    //Search Here
                };
            }
        };
    })
;