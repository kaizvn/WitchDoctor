"use strict";

angular.module('iDocApp')
    .directive('maps', function($timeout) {

        function initMap(lat, lon, id) {
            var myLatlng = new google.maps.LatLng(lat, lon),
                mapOptions = {
                    zoom: 17,
                    center: myLatlng,
                    scrollwheel: false
                },
                map = new google.maps.Map(document.getElementById(id), mapOptions);
                
            var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: '/assets/images/icon_map.png'
                });
        };

        return {
            restrict: 'A',
            scope: {
                lat: '@',
                lon: '@'
            },
            link: function (scope, element, attributes) {
                google.maps.event.addDomListener(window, 'load', initMap(scope.lat, scope.lon, 'maps'));
            }
        };
    }
);