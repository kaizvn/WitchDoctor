"use strict";

function iDocApiPath($http) {
    /* Base Url API */
    var url = 'https://api.betterdoctor.com/2015-09-22';


    /* Base Url API */
    this.getBaseUrl = function () {
        return 'http://api.khambacsi.com'
    };

    this.getDoctors = function () {
        return this.getBaseUrl() + '/doctors';
    };

    this.getDoctorsDetail = function (id) {
        return this.getBaseUrl() + '/doctors/' + id;
    };

    this.getCities = function () {
        return '/mocks/cities.json';
        //return this.getBaseUrl() + 'search/cities'
    };

    this.getSpecialties = function (value) {
        return this.getBaseUrl() + '/search/specialties?limit=10&query='+value;
    }

    this.getSpecialtiesByCondition = function (value) {
        return this.getBaseUrl() + '/conditions?limit=5&name='+value;
    }

    this.getConditions = function (value) {
        return this.getBaseUrl() + '/search/conditions?limit=10&query='+value;
    }

    this.getHospitals = function (value) {
        return this.getBaseUrl() + '/search/hospitals?limit=10&query='+value;
    };

    this.getNameDoctors = function (value) {
        return this.getBaseUrl() + '/search/doctors?limit=10&query='+value;
    };
}

iDocApiPath.$inject = ['$http'];

angular
    .module('iDocApp')
    .service('iDocApiPath', iDocApiPath);