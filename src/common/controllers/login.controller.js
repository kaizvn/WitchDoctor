"use strict";

angular.module('iDocApp')
    .controller('LoginCtrl', function ($scope, IdocRestService, $uibModalInstance) {
    	$scope.close = function () {
    		$uibModalInstance.dismiss('cancel');
    	}
        
    });
