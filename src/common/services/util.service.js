'use strict';

function UtilService() {

    return {
        jsonToParams: function(obj) {
           return Object.keys(obj).map(function(key){ 
              return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]); 
            }).join('&');
        }
    };
};

angular
    .module('iDocApp')
    .service('UtilService', UtilService);