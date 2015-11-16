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
            .state({
                name: 'result',
                url: "/result",
                views: {
                    "content-view": {
                        "controller": "ResultCtrl",
                        "templateUrl": "idoc/result/result.html"
                    }
                } ,
                resolve: {
                    translatePartialLoader: function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('common');
                        return $translate.refresh();
                    }
                }
            })

        $urlRouterProvider.otherwise('/');
    });