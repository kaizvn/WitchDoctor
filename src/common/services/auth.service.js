'use strict';

function Auth($rootScope, Principal, localStorageService, idocRestService, $state) {

    return {
        login: function(user, $uibModalInstance) {
            var _this = this;
            idocRestService.login(user).then(function (response) {
                localStorageService.set('token', response.data);
                $uibModalInstance.close();
                Principal.identity(true).then(function (response) {
                    localStorageService.set('user', response);
                });
            });
        },
        logout: function() {
            idocRestService.logout(Principal.getToken()).then(function (response) {
                localStorageService.clearAll();
                Principal.authenticate(null);
            });
        },
        authorize: function(force) {
            return Principal.identity(force)
                .then(function() {
                    var isAuthenticated = Principal.isAuthenticated();

                    if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !Principal.isInAnyRole($rootScope.toState.data.roles)) {
                        if (isAuthenticated) {
                            $state.go('accessdenied');
                        }
                        else {
                            $rootScope.returnToState = $rootScope.toState;
                            $rootScope.returnToStateParams = $rootScope.toStateParams;
                            $state.go('login');
                        }
                    } 
                });
        }
    };
};

Auth.$inject = ['$rootScope', 'Principal', 'localStorageService', 'idocRestService', '$state'];

angular
    .module('iDocApp')
    .service('Auth', Auth);