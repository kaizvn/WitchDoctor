'use strict';

function utilService() {

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
    .service('utilService', utilService);