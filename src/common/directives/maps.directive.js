"use strict";

angular.module('iDocApp')
    .directive('maps', function($timeout
        ) {

        function adapSizeMap() {
            var wWeight = $(window).height(),
                wWidth = $(window).width(),
                resultWidth = $('.result__list').width();

            $('#maps').width(wWidth - resultWidth - 20).height(wWeight - 110);
        }

        function initMap(mapsData, id) {

            var firstLatlng = new google.maps.LatLng(mapsData[0].lat, mapsData[0].lon),
                mapOptions = {
                    zoom: 16,
                    center: firstLatlng,
                    scrollwheel: false
                },
                map = new google.maps.Map(document.getElementById(id), mapOptions),
                infoWindow = new google.maps.InfoWindow(),
                markers = [];

            var createMarker = function (info){
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(info.lat, info.lon),
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: info.title,
                    icon: '/assets/images/icon_map.png'
                });

                marker.content = '<p>' + info.des + '</p>';

                google.maps.event.addListener(marker, 'click', function(){
                    infoWindow.setContent('<h5 class="mapInfo__title">' + marker.title + '</h5>' + marker.content);
                    infoWindow.open(map, marker);
                });
                markers.push(marker);
            };

            for (var i = 0; i < mapsData.length; i++){
                createMarker(mapsData[i]);
            }
        }

        return {
            restrict: 'A',
            scope: {
                mapData: '='
            },
            link: function (scope, element, attributes) {
                var id = attributes.id;
                adapSizeMap();
                scope.$watch('mapData', function(maps) {
                    if(maps) {
                        google.maps.event.addDomListener(window, 'load', initMap(scope.mapData, id));
                        if(id === 'maps') {
                            $timeout(function(){
                                $(window).resize(function() {
                                    adapSizeMap();
                                });
                            }, 500);
                        }
                    }
                });              
            }
        };
    }
);