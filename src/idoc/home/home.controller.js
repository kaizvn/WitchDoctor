"use strict";


function homeController($scope, $state, IdocRestService, $timeout, $http) {
    $scope.content = 'Home';
    var querySearch = {};

    $scope.getConditions = function (input) {
        return IdocRestService.getConditions(input).then(function (response) {
            return response.data;
        });
    }

    $scope.doSearch = function () {
        $state.go('result', {query: querySearch});
    };
}


homeController.$inject = ['$scope', '$state', 'IdocRestService', '$timeout', '$http'];

angular.module('iDocApp').controller('HomeCtrl', homeController);

