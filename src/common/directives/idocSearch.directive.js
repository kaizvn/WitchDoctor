"use strict";

angular.module('iDocApp')
    .directive('idocSearch', function (IdocRestService, $state) {
        return {
            restrict: 'E',
            templateUrl: '/common/directives/idocSearch.html',
            scope: {
                actionGroup: '=?',
                doctor: '@',
                specialty: '@'
            },
            link: function ($scope) {
                if(!$scope.actionGroup) {
                    $scope.actionGroup = {
                        specialty: {
                            value: false,
                            text: 'Chuyên Khoa'
                        },
                        name: {
                            value: true,
                            text: 'Bác sĩ'
                        }
                    };
                }

                $scope.selectedType = $scope.actionGroup.name.value ? $scope.actionGroup.name.text : $scope.actionGroup.specialty.text;

                $scope.onSelectType = function(type){
                    _.each($scope.actionGroup, function (value, key, list) {
                        return list[key].value = false;
                    });

                    $scope.selectedType = $scope.actionGroup[type].text;
                    $scope.actionGroup[type].value = true;

                    $scope.showSearchType = !$scope.showSearchType;
                };

                IdocRestService.getCities().then(function (response){
                    $scope.cities = response.data;
                });

                $scope.getParams = function (input) {
                    if($scope.actionGroup.specialty.value) {
                        return IdocRestService.getSpecialties(input).then(function (response) {
                            return response.data.results;
                        });
                    } else {
                        return IdocRestService.getNameDoctors(input).then(function (response) {
                            return response.data.results;
                        });
                    }                    
                }

                $scope.getHospitals = function (input) {
                    return IdocRestService.getHospitals(input).then(function (response) {
                        return response.data.results;
                    });
                }

                $scope.search = function (specialty, doctor) {
                    var querySearch = {
                        specialty: specialty,
                        name: doctor,
                        actionGroup: $scope.actionGroup
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