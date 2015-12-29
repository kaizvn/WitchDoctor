"use strict";


function homeController($scope, $state, IdocRestService, $timeout, $http) {
    $scope.content = 'Home';
    var querySearch = {};

    $scope.getConditions = function (input) {
        return IdocRestService.getConditions(input).then(function (response) {
            return response.data;
        });
    }

    $scope.onSelectCondition = function (item) {
        IdocRestService.getSpecialtiesByCondition(item.name).then(function (response) {
            querySearch.specialty = response.data.results[0].specialties[0].name;
            $scope.doSearch();
        });
    }

    $scope.doSearch = function () {
        $state.go('result', {query: querySearch});
    };
}


homeController.$inject = ['$scope', '$state', 'IdocRestService', '$timeout', '$http'];

angular.module('iDocApp').controller('HomeCtrl', homeController);

