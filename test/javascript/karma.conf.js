// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'main/bower_components/es5-shim/es5-shim.js',
            'main/bower_components/jquery/dist/jquery.js',
            'main/bower_components/modernizr/modernizr.js',
            'main/bower_components/jquery-ui/ui/jquery-ui.js',
            'main/bower_components/angular/angular.js',
            'main/bower_components/angular-ui-router/release/angular-ui-router.js',
            'main/bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
            'main/bower_components/angular-route/angular-route.js',
            'main/bower_components/angular-resource/angular-resource.js',
            'main/bower_components/angular-cookies/angular-cookies.js',
            'main/bower_components/angular-sanitize/angular-sanitize.js',
            'main/bower_components/ui-router-extras/release/ct-ui-router-extras.js',
            'main/bower_components/angular-translate/angular-translate.js',
            'main/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
            'main/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
            'main/bower_components/messageformat/messageformat.js',
            'main/bower_components/messageformat/locale/fr.js',
            'main/bower_components/messageformat/locale/en.js',
            'main/bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
            'main/bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
            'main/bower_components/angular-local-storage/dist/angular-local-storage.js',
            'main/bower_components/angular-cache-buster/angular-cache-buster.js',
            'main/bower_components/underscore/underscore.js',
            'main/bower_components/rangy/rangy-core.js',
            'main/bower_components/rangy/rangy-classapplier.js',
            'main/bower_components/rangy/rangy-highlighter.js',
            'main/bower_components/rangy/rangy-selectionsaverestore.js',
            'main/bower_components/rangy/rangy-serializer.js',
            'main/bower_components/rangy/rangy-textrange.js',
            'main/bower_components/textAngular/dist/textAngular.js',
            'main/bower_components/textAngular/dist/textAngular-sanitize.js',
            'main/bower_components/textAngular/dist/textAngularSetup.js',
            'main/bower_components/ngstorage/ngStorage.js',
            'main/bower_components/angular-mocks/angular-mocks.js',
            // endbower
            'main/resources/static/common/services/load.service.js',
            'main/resources/static/assets/js/app.js',
            'main/resources/static/assets/js/*.js',
            'main/resources/static/common/**/*.js',
            'test/javascript/**/!(karma.conf).js'
        ],


        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        //Configure proxies to mock
        proxies: {

        }
    });
};
