"use strict";

angular.module('iDocApp')
    .controller('MainCtrl', function ($rootScope, $scope, IdocRestService, $uibModal) {

    	$scope.hideFooter = $rootScope.hideFooter;
    	
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

		$scope.citys = [
			{
				value: 1,
				text: 'Hồ Chí Minh'
			},
			{
				value: 2,
				text: 'Hà Nội'
			},
			{
				value: 3,
				text: 'Đà Nẵng'
			},
			{
				value: 4,
				text: 'Huế'
			}
		];

		$scope.onSelectedCity = function(city) {
			//Search Here
		};
    });