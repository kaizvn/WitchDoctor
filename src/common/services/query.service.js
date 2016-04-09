'use strict';

function queryService() {
    var specialty = null,
        name = null,
        //limit: 5,
        skip = 0;
    return {
        getCurrentPage: function() {
            return (this.skip / 5) - 1;
        },
        setSkip: function(skip) {
            this.skip = skip;
        },
        getSkip: function() {
            return this.skip;
        },
        reset: function () {
            this.specialty = null;
            this.name = null;
        },
        addParamIfExist: function (params, key) {
            if (this[key]) {
                params[key] = this[key];
            }
            return params;
        },
        addParamToQueryIfExist: function (params, key) {
            if (params[key]) {
                this[key] = params[key];
            }
        },
        getParams: function () {
            var params = {
                //limit: 5
            };

            params = this.addParamIfExist(params, 'skip');
            params = this.addParamIfExist(params, 'name');
            params = this.addParamIfExist(params, 'specialty');

            return params;
        },
        setQueryFromParams: function (params) {
            this.reset();

            this.skip = params.skip;
            //this.limit = params.limit;
            this.addParamToQueryIfExist(params, 'name');
            this.addParamToQueryIfExist(params, 'specialty');
        }
    };
};

queryService.$inject = ['$http', 'localStorageService', 'idocRestService'];

angular
    .module('iDocApp')
    .service('queryService', queryService);