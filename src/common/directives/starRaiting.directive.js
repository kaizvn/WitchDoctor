"use strict";

angular.module('iDocApp')
    .directive('starRating', function () {
        return {
            restrict: 'AE',
            templateUrl: '/common/directives/starRating.html',
            scope: {
                ratingValue: '=',
                readonly: '@',
                onRatingSelected: '&'
            },
            link: function (scope) {
                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < 5; i++) {
                        scope.stars.push({
                            'filled': i < scope.ratingValue,
                            'isHalf': scope.ratingValue % 1 > 0 && i === Math.floor(scope.ratingValue)
                        });
                    }
                };
                scope.toggle = function (index) {
                    if (angular.isUndefined(scope.readonly)) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelected({rating: index + 1});
                    }
                };
                scope.$watch('ratingValue', function () {
                    updateStars();
                });
            }
        };
    })
;