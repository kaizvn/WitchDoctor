'use strict';

angular.module('iDocApp')
    .directive('internalLink', function ($rootScope, $translate, $interpolate, urlService, idocRestService) {
        return {
            restrict: 'A',
            // priority:1001, // compiles first
            scope: {
                page: '@internalLink', // evaluated, as opposed to '=' which is interpolated
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
                            var spec = response.data.results[0].specialties[0];
                            params = {
                                specialty: spec.name,
                                eng_specialty: spec.eng_name ? spec.eng_name : spec.name
                            };
                            var uri = urlService.getUrlFor(scope.page, null, params, true);
                            el.attr('href', uri);
                        });
                    }else{
                        var uri = urlService.getUrlFor(scope.page, null, params, true);
                        el.attr('href', uri);
                    }
                }

                var key = Object.keys(params)[0];
                var text = params[key];
                el.text(text);

                function getTranslationId(key, txt){
                    function isSubstring(big, small){
                        return big.indexOf(small) >= 0;
                    }
                    if(isSubstring(key, 'specialt')){
                        return 'specialties.' + txt;
                    }else{
                        return txt; //implement for conditions later
                    }
                }

                var deregister = $rootScope.$on('$translateChangeSuccess', function () {
                    $translate(getTranslationId(key, text)).then(function(translation){
                        el.text(translation);
                    });
                });

                scope.$on('$destroy', deregister); //gc
            }
        };
    });