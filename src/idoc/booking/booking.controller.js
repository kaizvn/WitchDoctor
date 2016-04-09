'use strict';


function BookingCtrl($scope, $state, $stateParams, doctorsService, idocRestService) {

    if(!doctorsService.hasSelectedDoctor()) {
        $state.go('home');
    } else {
        $scope.doctor = doctorsService.getSelectedDoctor();
    }

    $scope.data = {booking: {}, user: {}};

    $scope.data.booking.date = $stateParams.bookingDate || null;

    $scope.listTimeAvailable = [
        {
            date: '01-01-2016',
            time: '09:30'
        },
        {
            date: '01-01-2016',
            time: '10:30'
        },
        {
            date: '01-01-2016',
            time: '11:30'
        },
        {
            date: '01-01-2016',
            time: '12:30'
        },
        {
            date: '01-01-2016',
            time: '14:30'
        },
        {
            date: '01-01-2016',
            time: '15:30'
        },
        {
            date: '01-01-2016',
            time: '16:30'
        },
        {
            date: '01-01-2016',
            time: '17:30'
        },
        {
            date: '01-01-2016',
            time: '18:30'
        },
        {
            date: '01-01-2016',
            time: '19:30'
        }
    ]

    var _this = this;
    $scope.step = 1;
    
    $scope.selectTime = function (index, dateTime) {
        $scope.selected = index; 
        $scope.data.booking.date = dateTime.date + ' ' + dateTime.time;
    }    
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

BookingCtrl.$inject = ['$scope', '$state', '$stateParams', 'doctorsService', 'idocRestService'];

angular.module('iDocApp')
    .controller('BookingCtrl', BookingCtrl);