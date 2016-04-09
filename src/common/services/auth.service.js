'use strict';

function authService($http, localStorageService, idocRestService) {
    var _identity,
        _authenticated = false;

    return {
        login: function(user) {
            idocRestService.login(user).then(function (response) {
                _authenticated = true;
                _identity = response.data;
                localStorageService.set('token', response.data);
            });
        },
        logout: function() {
            idocRestService.logout().then(function (response) {
                localStorageService.clearAll();
                this.authenticate(null);
            });
        },
        getToken: function () {
            return localStorageService.get('token').access_token;
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

authService.$inject = ['$http', 'localStorageService', 'idocRestService'];

angular
    .module('iDocApp')
    .service('authService', authService);