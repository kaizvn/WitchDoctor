"use strict";
var SECRET_KEY = 'a6ca4d508fa19d1cea5fd1eeebbed9f3';
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
            limit: 10
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
        limit: 10
    }
};


function iDocRestService($http, iDocApiPath, $q) {
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

    api.getAutocompleteTags = function (keyword) {
        return $http.get('/mocks/data.json');
    };

    api.getCity = function () {
        return $http.get(iDocApiPath.getCity());
    };

    api.getHospital = function () {
        return $http.get(iDocApiPath.getHospital());
    };

    api.getSpecialtiesBy = function (value) {
        return $http.get(iDocApiPath.getSpecialtiesBy(value));
    };

    return api;

}

iDocRestService.$inject = ['$http', 'iDocApiPath', '$q'];


angular
    .module('iDocApp')
    .service('IdocRestService', iDocRestService);
