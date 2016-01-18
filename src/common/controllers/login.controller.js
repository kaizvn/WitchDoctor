"use strict";

angular.module('iDocApp')
    .controller('LoginCtrl', function ($scope, IdocRestService, $uibModalInstance, UtilService) {
    	$scope.close = function () {
    		$uibModalInstance.dismiss('cancel');
    	}

    	$scope.login = function (user) {
    		var data = UtilService.jsonToParams(user);
        	IdocRestService.login(data).then(function (response) {
        		/* To do */
        		$uibModalInstance.close();
        	});
    	}
        
    });
