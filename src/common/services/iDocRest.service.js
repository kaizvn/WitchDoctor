'use strict';
var SECRET_KEY = 'a6ca4d508fa19d1cea5fd1eeebbed9f3';
var SECRET_PARAMS = {
    'client_id': 'rY1dYhZVV4eb2jIeHiaHC6r57E1O3n6BIEtCJhhj',
    'client_secret': '1lg43tMbInULuivsR7WYnu2ZiQyo8DCxduMTq9KlWLGFdNrFuSNHpVDSWVCCIqgOf2y93tEmyLcygGIZuLz2l1fxjSMnnzq51E8VSYIyv3KWChYJnxWFisCHSLVFO96R'
};
var defaultParams = function (type) {
    if (type == void 0) return {};

    var DEFAULT_PARAMS = {
        'getDoctor': {
            user_key: SECRET_KEY,
            /*name: null,
             first_name: null,
             last_name: null,
             query: null,
             special_uid: null,
             insurance_uid: null,*/
            location: '37.773,-122.413,100',
            user_location: '37.773,-122.413',
            /*gender: null,
             sort: null,
             fields: null,*/
            skip: 0,
            limit: 5
        }
    };

    return DEFAULT_PARAMS[type] || {};
};


var DEFAULT_PARAMS = {
    'getDoctor': {
        /*name: null,
         first_name: null,
         last_name: null,
         query: null,
         special_uid: null,
         insurance_uid: null,
         gender: null,
         sort: null,
         fields: null,*/
        user_key: SECRET_KEY,
        location: '37.773,-122.413,100',
        user_location: '37.773,-122.413',
        skip: 0,
        limit: 5
    }
};


function idocRestService($http, iDocApiPath, $q, utilService) {
    var api = {};

    api.getDoctors = function (params) {
        params = params || {};

        _.defaults(params, DEFAULT_PARAMS['getDoctor']);

        return $http({
            method: 'GET',
            url: iDocApiPath.getDoctors(),
            params: params
        });
    };

    api.getDoctorDetail = function (id) {
        return $http.get(iDocApiPath.getDoctorsDetail(id), {
            params: {
                user_key: SECRET_KEY
            }
        })
    };

    api.getCities = function () {
        return $http.get(iDocApiPath.getCities());
    };

    api.getHospitals = function (value) {
        return $http.get(iDocApiPath.getHospitals(value));
    };

    api.getSpecialties = function (value) {
        return $http.get(iDocApiPath.getSpecialties(value));
    };

    api.getSpecialtiesByCondition = function (value) {
        return $http.get(iDocApiPath.getSpecialtiesByCondition(value));
    };

    api.getConditions = function (value) {
        return $http.get(iDocApiPath.getConditions(value));
    };

    api.getNameDoctors = function (value) {
        return $http.get(iDocApiPath.getNameDoctors(value));
    };

    /* Auth */
    api.register = function (data) {
        return $http.post(iDocApiPath.register(), data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    };

    api.login = function (data) {
        var data = _.extend(data, SECRET_PARAMS);
        data.grant_type = 'password';
        data = utilService.jsonToParams(data);
        return $http.post(iDocApiPath.login(), data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    };

    api.logout = function (token) {
        var data = {
            'token': token
        };
        data = _.extend(data, SECRET_PARAMS);
        data = utilService.jsonToParams(data);
        return $http.post(iDocApiPath.logout(), data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    };

    api.getInfo = function() {
        return $http.get(iDocApiPath.getInfo());
    };

    return api;

}

idocRestService.$inject = ['$http', 'iDocApiPath', '$q', 'utilService'];


angular
    .module('iDocApp')
    .service('idocRestService', idocRestService);
