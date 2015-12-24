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

                IdocRestService.getCities().then(function (response){
                    $scope.cities = response.data;
                });

                $scope.getSpecialties = function (input) {
                    if($scope.action.specialties.value) {
                        return IdocRestService.getSpecialties(input).then(function (response) {
                            return response.data;
                        });
                    } else {
                        return IdocRestService.getNameDoctors(input).then(function (response) {
                            return response.data;
                        });
                    }                    
                }

                $scope.getHospitals = function (input) {
                    return IdocRestService.getHospitals(input).then(function (response) {
                        return response.data;
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