'use strict';

function urlService($http, localStorageService, idocRestService) {

    var formatParams = function (params) {
        var chain = '';
        for (var i = 0, l = params.length; i < l; i++) {
            chain += '/' + params[i];
        }
        return chain;
    };

    var formatQuery = function (oQuery) {
        if (oQuery && typeof oQuery === 'object' && $(oQuery).size()) {
            return '?query=' + encodeURIComponent(JSON.stringify(oQuery));
        } else {
            return '';
        }
    };

    return {
        getUrlFor: function (page, params, query, removeHashbang, excludeSearch) {
            var hashbang = '#!/';
            if (!page || typeof page !== 'string') {
                throw new Error(errors.getUrlFor);
            }

            if (!params || params === undefined || params === '') {
                params = [];
            }

            if (typeof params === 'string') {
                params = [params];
            }

            if (arguments.length === 2) {
                if (typeof params === 'object' && !(params instanceof Array)) {
                    query = params;
                    params = [];
                }
            }

            if (removeHashbang) {
                hashbang = '/';
            }

            if(excludeSearch){
                return hashbang + page + formatParams(params);
            } else {
                return hashbang + page + formatParams(params) + formatQuery(query);
            }
        }
    };
};

urlService.$inject = ['$http', 'localStorageService', 'idocRestService'];

angular
    .module('iDocApp')
    .service('urlService', urlService);