"use strict";

angular
    .module('iDocApp')
    .service('IdocRestService', function ($http, IdocApiPath, $q, ApplicationManager) {
        this.getDoctors = function(params) {
            return $http.get(IdocApiPath.getDoctors(), {params: params});
        };
    });