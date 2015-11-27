"use strict";


function iDocRestService($http, iDocApiPath, $q) {
    var api = {};
    console.log(iDocApiPath.getBaseUrl);
    var path = iDocApiPath.getBaseUrl();


    api.getDoctors = function () {
        return $http.get(iDocApiPath.getDoctors(), {});
    };

    return api;

}

iDocRestService.$inject = ['$http', 'iDocApiPath', '$q'];


angular
    .module('iDocApp')
    .service('IdocRestService', iDocRestService);
