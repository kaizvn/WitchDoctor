'use strict';

function MainCtrl($rootScope, $scope, idocRestService, $uibModal, titleService, $translate, doctorsService) {

    var _this = this;

    // this.setTitle = function(route) {
    //     switch (route.name) {
    //         case 'home':
    //             $translate('global.pageTitle.home').then(function(txt) {
    //                 titleService.setTitle(txt);
    //             });
    //             break;

    //         case 'results':
    //             $translate('global.pageTitle.results').then(function(txt) {
    //                 titleService.setTitle(txt);
    //             });
    //             break;

    //         case 'about':
    //             $translate('global.pageTitle.about').then(function(txt) {
    //                 titleService.setTitle(txt);
    //             });
    //             break;

    //         default:
    //             $translate('global.pageTitle.home').then(function(txt) {
    //                 titleService.setTitle(txt);
    //             });
    //             break;
    //     }
    // };

    // $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //     _this.setTitle(toState);
    // });

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

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
    
    $scope.getCurrentLanguage = function(){
        return $translate.use();
    };

    $(document).mouseup(function(e){
        $('.input-group-btn').removeClass('open');
    });
}

MainCtrl.$inject = ['$rootScope', '$scope', 'idocRestService', '$uibModal', 'titleService', '$translate', 'doctorsService'];

angular.module('iDocApp')
    .controller('MainCtrl', MainCtrl);