'use strict';

angular.module('iDocApp')
    .directive('idocSearch', function (idocRestService, $state) {
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

                // _.each($scope.actionGroup, function(obj, key, list) {
                //     if(obj.value) {
                //        $scope.selectedType = obj.text;
                //         // $scope.selectedType = key;
                //     }
                // });

                $scope.onSelectType = function($event, type){
                    _.each($scope.actionGroup, function (value, key, list) {
                        return list[key].value = false;
                    });

                    // $scope.selectedType = $scope.actionGroup[type].text;
                    $scope.selectedType = $event.currentTarget.text;
                    $scope.actionGroup[type].value = true;

                    $scope.showSearchType = !$scope.showSearchType;
                    $scope.specialty = null;
                    $scope.doctor = null;
                };

                idocRestService.getCities().then(function (response){
                    $scope.cities = response.data;
                });

                $scope.getParams = function (input) {
                    if($scope.actionGroup.specialty.value) {
                        return idocRestService.getSpecialties(input).then(function (response) {
                            return response.data.results;
                        });
                    } else {
                        return idocRestService.getNameDoctors(input).then(function (response) {
                            return response.data.results;
                        });
                    }
                }

                $scope.getConditions = function (input) {
                    return idocRestService.getConditions(input).then(function (response) {
                        return response.data.results;
                    });
                }

                $scope.getCities = function (input) {
                    return idocRestService.getCities(input).then(function (response) {
                        return response.data.results;
                    });
                }

                $scope.getHospitals = function (input) {
                    return idocRestService.getHospitals(input).then(function (response) {
                        return response.data.results;
                    });
                }

                $scope.onSelectCondition = function (item) {
                    idocRestService.getSpecialtiesByCondition(item.name).then(function (response) {
                       querySearch.specialty = response.data.results[0].specialties[0].name;
                    });
                }

                $scope.search = function (specialty, doctor) {
                    querySearch.specialty = querySearch.specialty ? querySearch.specialty : specialty;
                    querySearch.name =  doctor ? doctor : null;
                    querySearch.actionGroup = $scope.actionGroup;

                    $state.go('results', {query: querySearch});
                }

                $scope.onSelectedCity = function(city) {
                    //Search Here
                };

                $('.dropdown-toggle').click(function() {
                    $(this).parent('.input-group-btn').addClass('open');
                });
            }
        };
    })
;