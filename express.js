/**
 * Created by HungNguyen on 11/18/15.
 */

var express = require('express');
var app = express(); // create our app w/ express
var proxy = require('express-http-proxy');
var proxyConfig = require('./proxy.config.js');
var path = require('path'); // use for static page
var _ = require('lodash');
var passport = require('passport');
/*var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
 var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)*/


var CONFIG = require('./config/default.json')
    , ENV = process.env.NODE_ENV || 'dev'
    , ENV_CONFIG = require(['.', 'config', ENV + '.json'].join('/'));

_.extend(CONFIG, ENV_CONFIG);

var STATIC_PATH = path.join(__dirname, CONFIG['static_path']);


// configuration =================
app.use(express.static(STATIC_PATH));                 // set the static files location /public/img will be /img for users
app.use('/bower_components', express.static(__dirname + '/bower_components'));


// authenticate
app.use('/hung-temp', function (req, res) {
    passport.use(new FacebookStrategy({
            clientID: '154366684653118',
            clientSecret: 'd0fee9ba6a86c6043bf7faeb92dda805',
            callbackURL: "http://localhost:8080/",
            enableProof: false
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(accessToken, refreshToken, profile, done);
            return true;
        }
    ));

});


// API
app.use(CONFIG['api_path'], proxy(CONFIG['api_server'], proxyConfig[CONFIG['proxy_config']]));

// STATIC files
app.get('*', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'src/dist')});
});

if (process.env.NODE_ENV !== 'dev')
    app.listen(CONFIG['port']);
else
    module.exports = app;

// listen (start app with node server.js) ======================================
console.log("App listening on port %s", CONFIG['port']);