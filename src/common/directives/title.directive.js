'use strict';

angular.module('iDocApp')
    .directive('title', function (titleService) {
        return {
            restrict: 'E',
            link: function postLink($scope) {
                var title;
                $scope.$watch(function () {
                    return titleService.title;
                }, function(newValue,oldValue) {
                    if(newValue !== oldValue) {
                        title = titleService.title;
                        try {
                            document.getElementsByTagName('title')[0].innerHTML = title.replace('<', '&lt;').replace('>', '&gt;').replace(' & ', ' &amp; ');
                        } catch (Exception) {
                        }
                        document.title = title;
                    }
                });
            }
        };
    });
