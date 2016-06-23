'use strict';

function translatePartialLoader($translate, $translatePartialLoader) {
    $translatePartialLoader.addPart('common');
    return $translate.refresh();
}

// function selectMetaTags(state){
//     return {
//         title: "{{'" + state + ".title' | translate}}",
//         description: "{{'" + state + ".meta.description' | translate}}"
//     }
// }

function selectMetaTags(state){
    return {
        title: state + '.title',
        description: state + '.meta.description'
    }
}

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
                    translatePartialLoader: translatePartialLoader
                },
                metaTags: selectMetaTags('home')
            })
            .state({
                name: 'results',
                url: "/results",
                metaTags: selectMetaTags('results'),
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
                    translatePartialLoader: translatePartialLoader
                }
            }).state({
                name: 'detail',
                url: "/doctors/:id",
                metaTags: selectMetaTags('detail'),
                views: {
                    "content-view": {
                        "controller": "DetailCtrl",
                        "templateUrl": "/idoc/detail/detail.html"
                    }
                },
                resolve: {
                    translatePartialLoader: translatePartialLoader
                }
            }).state({
                name: 'about',
                url: "/about/",
                metaTags: selectMetaTags('about'),
                views: {
                    "content-view": {
                        "controller": "AboutCtrl",
                        "templateUrl": "/idoc/about/about.html"
                    }
                },
                resolve: {
                    translatePartialLoader: translatePartialLoader
                }
            }).state({
                name: 'booking',
                url: "/booking",
                metaTags: selectMetaTags('booking'),
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
                    translatePartialLoader: translatePartialLoader
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
                    translatePartialLoader: translatePartialLoader
                }
            }).state('user.updateInformation', {
                url: '/updateInformation',
                views: {
                    'user-view': {
                        'templateUrl': '/idoc/user/doctorInformation.html'
                    }
                },
                resolve: {
                    translatePartialLoader: translatePartialLoader
                }
            }).state('user.changePassword', {
                url: '/changePassword',
                views: {
                    'user-view': {
                        'templateUrl': '/idoc/user/changePassword.html'
                    }
                },
                resolve: {
                    translatePartialLoader: translatePartialLoader
                }
            });

        $urlRouterProvider.otherwise('/');
    });