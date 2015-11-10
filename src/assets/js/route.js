'use strict';

angular.module('iDocApp')
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
                .state({
                    name: 'home',
                    url: "/",
                    views: {
                        "content-view": {
                            "controller": "HomeCtrl",
                            "templateUrl": "idoc/home/home.html"
                        }
                    }
                })

        $urlRouterProvider.otherwise('/');
    });