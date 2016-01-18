"use strict";

angular.module('iDocApp')
    .controller('RegisterCtrl', function ($scope, IdocRestService, $uibModalInstance, UtilService) {
    	$scope.close = function () {
    		$uibModalInstance.dismiss('cancel');
    	}
        
        $scope.register = function(user) {
            var data = UtilService.jsonToParams(user);
        	IdocRestService.register(data).then(function (response) {
        		/* To do */
                $uibModalInstance.close();
        	});
        }
    });
