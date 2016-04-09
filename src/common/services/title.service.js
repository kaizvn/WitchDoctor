'use strict';

function titleService() {
    var title = '';
    return {
        setTitle : function(title){
            this.title = title;
        },

        getTitle: function() {
            return this.title;
        }
    };
}

angular
    .module('iDocApp')
    .service('titleService', titleService);