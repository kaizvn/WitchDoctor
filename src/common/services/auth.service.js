'use strict';

function AuthService($http, localStorageService, iDocRestService) {
    var _identity,
        _authenticated = false;

    return {
        login: function(user) {
            iDocRestService.login(user).then(function (response) {
                _authenticated = true;
                _identity = response.data;
                localStorageService.set('token', response.data.token);
            });
        },
        logout: function() {
            iDocRestService.logout().then(function (response) {
                localStorageService.clearAll();
                this.authenticate(null);
            });
        },
        getToken: function () {
            return localStorageService.get('token');
        },
        isInRole: function (role) {
            if (!_authenticated || !_identity || !_identity.roles) {
                return false;
            }
            return _identity.roles.indexOf(role) !== -1;
        },
        authenticate: function (identity) {
            _identity = identity;
            _authenticated = identity !== null;
        },
        isInAnyRole: function (roles) {
            if (!_authenticated || !_identity.roles) {
                return false;
            }
            for (var i = 0; i < roles.length; i++) {
                if (this.isInRole(roles[i])) {
                    return true;
                }
            }
            return false;
        },
        isAuthenticated: function () {
            return _authenticated;
        }
    };
};

AuthService.$inject = ['$http', 'localStorageService', 'iDocRestService'];

angular
    .module('iDocApp')
    .service('AuthService', AuthService);