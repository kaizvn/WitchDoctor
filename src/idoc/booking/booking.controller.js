"use strict";


function BookingCtrl($scope, $state, $stateParams, DoctorsService, IdocRestService) {

    var _this = this;
    $scope.step = 1;
    
    $scope.showStep = function (step) {
        return $scope.step === step;
    }

    $scope.goStep = function (step, number) {
        $scope.step = $scope.step + number;
    }

    $scope.isFinishedStep = function (steps) {
        return _.some(steps, function(step) {
            return step == $scope.step; 
        });
    }
}


BookingCtrl.$inject = ['$scope', '$state', '$stateParams', 'DoctorsService', 'IdocRestService'];

angular.module('iDocApp').controller('BookingCtrl', BookingCtrl);