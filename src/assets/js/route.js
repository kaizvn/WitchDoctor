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
                    },
                    resolve: {
                        translatePartialLoader: function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('common');
                            return $translate.refresh();
                        }
                    }
                })

        $urlRouterProvider.otherwise('/');
    });