'use strict';

angular.module('iDocApp')
    .directive('skinSelect', function ($timeout, $rootScope) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function postLink(scope, element, attrs, controller) {
                var options;
                var skinSelect = {
                    init: function () {
                        $timeout($.proxy(function () {
                            options = angular.extend(attrs, {
                                width: attrs.widthElt || '100%',
                                disable_search: attrs.disableSearch || false,
                                placeholder_text_single: attrs.placeholder,
                                no_results_text: 'No result'
                            });
                            
                            element.chosen(options);

                        }, 0), this);
                    }
                }

                skinSelect.init();

                scope.$watch(function () {
                    var options = $(element).find('option');
                    var strOptions = "";
                    options.each(function (index, opt) {
                        strOptions += $(opt).text();
                    });
                    return strOptions;
                }, function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        element.trigger('chosen:updated');
                    }
                });

                scope.$watch(function () {
                    var isDisabled = $(element).attr('disabled');
                    return isDisabled;
                }, function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        element.trigger('chosen:updated');
                    }
                });

                if (controller) {
                    scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            $timeout(function() {
                                element.trigger('chosen:updated');
                            }, 0);                            
                        }
                    });
                }
            }}
    });
