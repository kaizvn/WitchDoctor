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
                        "templateUrl": "/idoc/home/home.html"
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
                name: 'results',
                url: "/results",
                params: {
                    query: null,
                    location: null
                },
                views: {
                    "content-view": {
                        "controller": "ResultsCtrl",
                        "templateUrl": "/idoc/results/results.html"
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
                        "templateUrl": "/idoc/detail/detail.html"
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
                        "templateUrl": "/idoc/about/about.html"
                    }
                },
                resolve: {
                    translatePartialLoader: function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('common');
                        return $translate.refresh();
                    }
                }
            }).state({
                name: 'booking',
                url: "/booking",
                params: {
                    bookingDate: null
                },
                views: {
                    "content-view": {
                        "controller": "BookingCtrl",
                        "templateUrl": "/idoc/booking/booking.html"
                    }
                },
                resolve: {
                    translatePartialLoader: function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('common');
                        return $translate.refresh();
                    }
                }
            }).state({
                name: 'user',
                abstract: true,
                url: '/user',
                views: {
                    'content-view': {
                        'templateUrl': '/idoc/user/user.html'
                    }
                },
                resolve: {
                    translatePartialLoader: function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('common');
                        return $translate.refresh();
                    }
                }
            }).state('user.updateInformation', {
                url: '/updateInformation',
                views: {
                    'user-view': {
                        'templateUrl': '/idoc/user/doctorInformation.html'
                    }
                },
                resolve: {
                    translatePartialLoader: function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('common');
                        return $translate.refresh();
                    }
                }
            }).state('user.changePassword', {
                url: '/changePassword',
                views: {
                    'user-view': {
                        'templateUrl': '/idoc/user/changePassword.html'
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