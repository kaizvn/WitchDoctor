'use strict';


function HomeCtrl($scope, $state, idocRestService, $timeout, $http, kbsSeo) {
    $scope.content = 'Home';
    var querySearch = {};

    $scope.actionGroup = {
        conditions: {
            value: true,
            text: 'Bệnh'
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

    $scope.selectedType = $scope.actionGroup.conditions.text,

    $scope.onSelectType = function(type){
        _.each($scope.actionGroup, function (value, key, list) {
            return list[key].value = false;
        });

        $scope.selectedType = $scope.actionGroup[type].text;
        $scope.actionGroup[type].value = true;

        $scope.showSearchType = !$scope.showSearchType;
        querySearch = {};
    };

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

    $scope.onSelectResult = function (item) {
        if($scope.actionGroup.specialty.value) {
            querySearch.specialty = item;
        } else {
            querySearch.name = item;
        }
    }

    $scope.onSelectCondition = function (item) {
        idocRestService.getSpecialtiesByCondition(item.name).then(function (response) {
           querySearch.specialty = response.data.results[0].specialties[0].name;
        });
    }

    $scope.doSearch = function () {
        querySearch.actionGroup = $scope.actionGroup;
        if($scope.actionGroup.conditions.value) {
            $scope.condition = querySearch.specialty;
            $timeout(function () {
                $state.go('results', {query: querySearch});
            }, 500);
        } else {
            $state.go('results', {query: querySearch});
        }        
    };

    $('.dropdown-toggle').click(function() {
        $(this).parent('.input-group-btn').addClass('open');
    });
}


HomeCtrl.$inject = ['$scope', '$state', 'idocRestService', '$timeout', '$http'];

angular.module('iDocApp')
    .controller('HomeCtrl', HomeCtrl);

