"use strict";

angular.module('iDocApp')
    .controller('MainCtrl', function ($scope, IdocRestService, $uibModal) {
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
			}
		];

		$scope.onSelectedCity = function(city) {
			//Search Here
		};
    });