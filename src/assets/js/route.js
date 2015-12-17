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
                params: {
                    query: null,
                    location: null
                },
                views: {
                    "content-view": {
                        "controller": "ResultCtrl",
                        "templateUrl": "idoc/result/result.html"
                    }
                },
                resolve: {
                    translatePartialLoader: function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('common');
                        return $translate.refresh();
                    }
                }
            }).state({
                name: 'detail',
                url: "/detail/:id",
                views: {
                    "content-view": {
                        "controller": "DetailCtrl",
                        "templateUrl": "idoc/detail/detail.html"
                    }
                },
                resolve: {
                    translatePartialLoader: function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('common');
                        return $translate.refresh();
                    }
                }
            }).state({
                name: 'about',
                url: "/about",
                views: {
                    "content-view": {
                        "controller": "AboutCtrl",
                        "templateUrl": "idoc/about/about.html"
                    }
                },
                resolve: {
                    translatePartialLoader: function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('common');
                        return $translate.refresh();
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    });