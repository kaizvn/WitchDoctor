'use strict';

angular.module('iDocApp')
    .controller('LoginCtrl', function ($scope, Auth, $uibModalInstance, utilService) {
    	$scope.close = function () {
    		$uibModalInstance.dismiss('cancel');
    	}

    	$scope.login = function (user) {
        	Auth.login(user, $uibModalInstance);
    	}
        
    });
