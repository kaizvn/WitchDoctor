'use strict';

function Principal($q, localStorageService, idocRestService) {
    var _identity,
        _authenticated = false;

    return {
        isIdentityResolved: function () {
            return angular.isDefined(_identity);
        },
        getToken: function () {
            return localStorageService.get('token');
        },
        isInRole: function (role) {
            if (!_authenticated || !_identity || !_identity.user_type) {
                return false;
            }
            return _identity.user_type.indexOf(role) !== -1;
        },
        isInAnyRole: function (roles) {
            if (!_authenticated || !_identity.user_type) {
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
        },
        authenticate: function (identity) {
            _identity = identity;
            _authenticated = identity !== null;
        },
        identity: function (force) {
            var deferred = $q.defer();

            if (force === true) {
                _identity = undefined;
            }

            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            idocRestService.getInfo().then(function (account) {
                _identity = account.data;
                _authenticated = true;
                deferred.resolve(_identity);
            })
            .catch(function() {
                _identity = null;
                _authenticated = false;
                deferred.resolve(_identity);
            });
            return deferred.promise;
        }
    };
};

Principal.$inject = ['$q', 'localStorageService', 'idocRestService'];

angular
    .module('iDocApp')
    .service('Principal', Principal);