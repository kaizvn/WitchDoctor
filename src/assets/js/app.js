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
                          $translateProvider, $provide, tmhDynamicLocaleProvider, httpRequestInterceptorCacheBusterProvider, $localStorageProvider) {
            //enable htmlmode - remove #! on url
            //$locationProvider.html5Mode(true);

            /* $locationProvider.html5Mode({
             enabled: true,
             requireBase: false
             });*/

            //$localStorageProvider.setKeyPrefix('iDoc_');

            //enable CSRF
            $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

            //Cache everything except rest api requests
            httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/, /.*protected.*/], true);

            // Initialize angular-translate
            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: 'i18n/{lang}/{part}.json'
            });

            $translateProvider.preferredLanguage('vi');
            $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
            $translateProvider.useLoaderCache(true);
            $translateProvider.useCookieStorage();

            tmhDynamicLocaleProvider.defaultLocale("vi-vn");
            tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');
            tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');

            $locationProvider.hashPrefix('!');

        })
        .run(function ($rootScope, $location, $http, $translate, ENV, VERSION, tmhDynamicLocale, $window) {
            $rootScope.ENV = ENV;
            $rootScope.VERSION = VERSION;

            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

                if (toState.name === 'result') {
                    $rootScope.hideFooter = true;
                } else {
                    $rootScope.hideFooter = false;
                }

                $rootScope.previousStateName = fromState.name;
                $rootScope.previousStateParams = fromParams;
            });

            $rootScope.$on('$translateChangeSuccess', function (event, data) {
                document.documentElement.setAttribute('lang', data.language);// sets "lang" attribute to html

                // asking angular-dynamic-locale to load and apply proper AngularJS $locale setting
                tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
            });

            $rootScope.$on('$translateLoadingEnd', function (event) {
                setTimeout(function () {
                    $rootScope.isDOMReady = true;
                    $('body').show();
                }, 0);
            });


        });
})();