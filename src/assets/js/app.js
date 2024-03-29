(function () {
    'use strict';

    /**
     * Declare and configure app
     */
    angular.module('iDocApp',
        [
            'LocalStorageModule',
            'tmh.dynamicLocale',
            'angularUtils.directives.dirPagination',
            'ngResource',
            'ngCookies',
            'ui.router',
            'ui.router.metatags',
            'ct.ui.router.extras',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.bootstrap.typeahead',
            'ngCacheBuster',
            'textAngular',
            'ngLocale',
            'ngSanitize',
            'ngStorage'
        ]);

    angular.module('iDocApp')
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider,
                          $translateProvider, $provide, tmhDynamicLocaleProvider, httpRequestInterceptorCacheBusterProvider,
                          $localStorageProvider) {
            //enable htmlmode - remove #! on url
            //$locationProvider.html5Mode(true);

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            //$localStorageProvider.setKeyPrefix('iDoc_');

            //enable CSRF
            $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

            //Cache everything except rest api requests
            httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/, /.*protected.*/], true);

            // Initialize angular-translate
            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: '/i18n/{lang}/{part}.json'
            });

            $translateProvider.preferredLanguage('vi');
            $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
            $translateProvider.useLoaderCache(true);
            $translateProvider.useCookieStorage();
            $translateProvider.fallbackLanguage('vi');

            tmhDynamicLocaleProvider.defaultLocale("vi-vn");
            tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');
            tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');

            $locationProvider.hashPrefix('!');
        })
        .factory('authInterceptor', function ($rootScope, $q, $location, localStorageService) {
            return {
                request: function (config) {
                    if (getHostName(config.url) === $location.host()) {
                        config.headers = config.headers || {};
                        var token = localStorageService.get('token');
                        if (token && token.token && token.token.expires && token.token.expires > new Date().getTime()) {
                            config.headers['x-auth-token'] = token.token.token;
                        }
                    }
                    return config;
                },
                responseError: function (response) {
                    if (response.status === 401) {
                        $rootScope.$broadcast('unauthorized');
                    }
                    return $q.reject(response);
                }
            };
        })
        .run(function ($rootScope, $location, $http, $translate, ENV, VERSION, tmhDynamicLocale, $window, $timeout) {
            $rootScope.ENV = ENV;
            $rootScope.VERSION = VERSION;
            $rootScope.loader = {active: true};

            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                $rootScope.loader.active = true;
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

                if (toState.name === 'results') {
                    $rootScope.hideFooter = true;
                } else {
                    $rootScope.hideFooter = false;
                }

                if (toState.name !== 'home') {
                    $rootScope.hideFacebookComments = true;
                } else {
                    $rootScope.hideFacebookComments = false;
                }

                $rootScope.previousStateName = fromState.name;
                $rootScope.previousStateParams = fromParams;

                var unbindLoader = $rootScope.$watch(function () {
                    return $http.pendingRequests.length < 1;
                }, function (arePendingRequests) {
                    if (arePendingRequests === true) {
                        $rootScope.loader.active = false;
                        unbindLoader();
                    }
                });
            });

            $rootScope.$on('$translateChangeSuccess', function (event, data) {
                document.documentElement.setAttribute('lang', data.language); // sets "lang" attribute to html

                // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
                tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
            });

            $rootScope.$on('$translateLoadingEnd', function (event) {
                setTimeout(function () {
                    $rootScope.isDOMReady = true;
                    $('body').show();
                }, 0);
            });

            /*$window.fbAsyncInit = function() {
             FB.init({
             appId: '***************',
             channelUrl: 'app/channel.html',
             status: true,
             cookie: true,
             xfbml: true
             });
             sAuth.watchAuthenticationStatusChange();
             };

             (function(d){
             var js,
             id = 'facebook-jssdk',
             ref = d.getElementsByTagName('script')[0];

             if (d.getElementById(id)) {
             return;
             }

             js = d.createElement('script');
             js.id = id;
             js.async = true;
             js.src = "//connect.facebook.net/en_US/all.js";

             ref.parentNode.insertBefore(js, ref);

             } (document));*/
        })
        .config(['UIRouterMetatagsProvider', function(UIRouterMetatagsProvider){
            UIRouterMetatagsProvider
                .setTitlePrefix('')
                // .setTitleSuffix(' | Khambacsi')
                .setDefaultTitle("home.title")
                .setDefaultDescription('The best doctors for you and your loved ones, qualified and experienced.')
                .setDefaultKeywords('keywords')
                // .setStaticProperties({
                //         'fb:app_id': 'your fb app id',
                //         'og:site_name': 'your site name'
                //     })
                .setOGURL(true);
        }])
        .run([ '$translatePartialLoader', '$translate', function run($translatePartialLoader, $translate) {
            $translatePartialLoader.addPart('common');
            $translatePartialLoader.addPart('specialties');
            // $translate.use('vi');
        } ])
        .run(['$rootScope', 'MetaTags', function($rootScope, MetaTags) {
            $rootScope.MetaTags = MetaTags;
        }])
        ;
})();
