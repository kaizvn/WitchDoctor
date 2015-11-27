"use strict";

angular
    .module('iDocApp')
    .service('IDocApiPath', function () {

        /* Base Url API */
        this.getBaseUrl= function() {
            return '/srv/idoc/api/v1';
        };

        this.getDoctors = function() {
        	return this.getBaseUrl() + '/doctors';
        };
    });