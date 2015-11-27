"use strict";


function homeController($scope, IdocRestService) {
    $scope.content = 'Home';

    $scope.doSearch = function () {
        IdocRestService.getDoctors().then(function (response) {
            console.log(response.data);
        }, function (error) {
            console.trace(error);
        });
    }

}


homeController.$inject = ['$scope', 'IdocRestService'];

angular.module('iDocApp').controller('HomeCtrl', homeController);

