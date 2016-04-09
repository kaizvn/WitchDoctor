'use strict';

angular.module('iDocApp')
    .controller('RegisterCtrl', function ($scope, idocRestService, $uibModalInstance, utilService) {
        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.regFacebook = function () {
            console.log('/auth');
            return window.location.href = '/auth/facebook';
        };

        $scope.register = function (user) {
            var data = utilService.jsonToParams(user);
            idocRestService.register(data).then(function (response) {
                /* To do */
                $uibModalInstance.close();
            });
        }
    });
