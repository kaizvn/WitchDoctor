"use strict";

function iDocApiPath($http) {
    /* Base Url API */
    var url = 'https://api.betterdoctor.com/2015-09-22';
    //location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=


    /* Base Url API */
    this.getBaseUrl = function () {
        return 'http://ec2-54-254-217-169.ap-southeast-1.compute.amazonaws.com';
    };

    this.getDoctors = function () {
        return this.getBaseUrl() + '/doctors';
    };

    this.getDoctorsDetail = function (id) {
        return this.getBaseUrl() + '/doctors/' + id;
    };

    this.getCity = function () {
        return '/mocks/city.json';
        //return this.getBaseUrl() + '/city'
    };

    this.getSpecialtiesBy = function (value) {
        return this.getBaseUrl() + '/conditions?name='+value;
    }

    this.getHospital = function () {
        return '/mocks/hospital.json';
        //return this.getBaseUrl() + '/hospital'
    };
}

iDocApiPath.$inject = ['$http'];

angular
    .module('iDocApp')
    .service('iDocApiPath', iDocApiPath);