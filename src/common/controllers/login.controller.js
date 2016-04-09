'use strict';

angular.module('iDocApp')
    .controller('LoginCtrl', function ($scope, idocRestService, $uibModalInstance, utilService) {
    	$scope.close = function () {
    		$uibModalInstance.dismiss('cancel');
    	}

    	$scope.login = function (user) {
    		var data = utilService.jsonToParams(user);
        	authService.login(data).then(function (response) {
        		/* To do */
        		$uibModalInstance.close();
        	});
    	}
        
    });
