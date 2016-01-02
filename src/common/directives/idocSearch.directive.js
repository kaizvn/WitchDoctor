"use strict";

angular.module('iDocApp')
    .directive('idocSearch', function (IdocRestService, $state) {
        return {
            restrict: 'E',
            templateUrl: '/common/directives/idocSearch.html',
            scope: {
                actionGroup: '=?'
            },
            link: function ($scope) {
                var querySearch = {};
                if(!$scope.actionGroup) {
                    $scope.actionGroup = {
                        conditions: {
                            value: true,
                            text: 'Triệu chứng'
                        },
                        specialty: {
                            value: false,
                            text: 'Chuyên khoa'
                        },
                        name: {
                            value: false,
                            text: 'Bác sĩ'
                        }
                    };
                }

                _.each($scope.actionGroup, function(obj, key, list) {
                    if(obj.value) {
                       $scope.selectedType = obj.text;
                    }
                });

                $scope.onSelectType = function(type){
                    _.each($scope.actionGroup, function (value, key, list) {
                        return list[key].value = false;
                    });

                    $scope.selectedType = $scope.actionGroup[type].text;
                    $scope.actionGroup[type].value = true;

                    $scope.showSearchType = !$scope.showSearchType;
                    $scope.specialty = null;
                    $scope.doctor = null;
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

                $scope.getConditions = function (input) {
                    return IdocRestService.getConditions(input).then(function (response) {
                        return response.data.results;
                    });
                }

                $scope.getCities = function (input) {
                    return IdocRestService.getCities(input).then(function (response) {
                        return response.data.results;
                    });
                }

                $scope.getHospitals = function (input) {
                    return IdocRestService.getHospitals(input).then(function (response) {
                        return response.data.results;
                    });
                }

                $scope.onSelectCondition = function (item) {
                    IdocRestService.getSpecialtiesByCondition(item.name).then(function (response) {
                       querySearch.specialty = response.data.results[0].specialties[0].name;
                    });
                }

                $scope.search = function (specialty, doctor) {
                    querySearch.specialty = querySearch.specialty ? querySearch.specialty : specialty;
                    querySearch.name =  doctor ? doctor : null;
                    querySearch.actionGroup = $scope.actionGroup;

                    $state.go('result', {query: querySearch});
                }

                $scope.onSelectedCity = function(city) {
                    //Search Here
                };
            }
        };
    })
;