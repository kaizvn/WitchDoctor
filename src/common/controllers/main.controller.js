"use strict";

angular.module('iDocApp')
    .controller('MainCtrl', function ($rootScope, $scope, IdocRestService, $uibModal) {

    	$rootScope.$watch('hideFooter', function(value) {
    		$scope.hideFooter = value;
    	});
    	
        $scope.openLogin = function() {
			var loginModel = $uibModal.open({
				size: 'sm',
				templateUrl: "/common/frag/modals/login.html",
				controller: 'LoginCtrl'
			});

	        loginModel.result.then(function () {
	            
	        });
		};

		$scope.openRegister = function() {
			var registerModel = $uibModal.open({
				size: 'lg',
				templateUrl: "/common/frag/modals/register.html",
				controller: 'RegisterCtrl'
			});

	        registerModel.result.then(function () {
	            
	        });
		};
    });