"use strict";

angular.module('iDocApp')
    .controller('RegisterCtrl', function ($scope, IdocRestService, $uibModalInstance) {
    	$scope.close = function () {
    		$uibModalInstance.dismiss('cancel');
    	}
        
    });
