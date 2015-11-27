"use strict";

function iDocApiPath($http) {
    /* Base Url API */
    var url = 'https://api.betterdoctor.com/2015-09-22/doctors?location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=a6ca4d508fa19d1cea5fd1eeebbed9f3';


    /* Base Url API */
    this.getBaseUrl = function () {
        return '/srv/idoc/api/v1';
    };

    this.getDoctors = function (params) {
        //return this.getBaseUrl() + '/doctors';
        return url;
    };
}

iDocApiPath.$inject = ['$http'];

angular
    .module('iDocApp')
    .service('iDocApiPath', iDocApiPath);