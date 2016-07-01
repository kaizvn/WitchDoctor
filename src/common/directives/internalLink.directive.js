'use strict';

angular.module('iDocApp')
    .directive('internalLink', function ($interpolate, urlService, idocRestService) {
        return {
            restrict: 'A',
            // priority:1001, // compiles first
            scope: {
                page: '@internalLink' // evaluated, as opposed to '=' which is interpolated
            },

            link: function(scope, el, attrs) {
                var searchKeys = ['specialty', 'conditions', 'doctor'];
                var params = {};
                searchKeys.forEach(function (k) {
                    if(attrs[k]){
                        params[k] = attrs[k];
                        el.removeAttr(k);
                    }
                });
                el.removeAttr('internalLink');
                
                if(scope.page){
                    if(params.conditions){
                        idocRestService.getSpecialtiesByCondition(params.conditions).then(function (response) {
                            params = {
                                specialty:response.data.results[0].specialties[0].name
                            };
                            var uri = urlService.getUrlFor(scope.page, null, params, true);
                            el.attr('href', uri);
                        });
                    }else{
                        var uri = urlService.getUrlFor(scope.page, null, params, true);
                        el.attr('href', uri);
                    }
                }

                var text = params[Object.keys(params)[0]];
                el.text(text);
            }
        };
    });