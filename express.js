/**
 * Created by HungNguyen on 11/18/15.
 */
var PORT = 8080;
var STATIC_PATH = '/src/dist';
var API_SERVER = 'api.khambacsi.com:56765';
var PROXY_CONFIG = 'ProdProxyConfig';


var express = require('express');
var app = express();                               // create our app w/ express
/*var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
 var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)*/
var proxy = require('express-http-proxy');
var proxyConfig = require('./proxy.config.js');
var path = require('path'); //use for static page

if ((process.env.NODE_ENV == 'development')) {
    STATIC_PATH = '/src';
    PROXY_CONFIG = 'defaultProxyConfig';
}

PORT = process.env.PORT || PORT;
STATIC_PATH = path.join(__dirname, STATIC_PATH);

console.log(PORT, STATIC_PATH, API_SERVER);

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
app.use('/api', proxy(API_SERVER, proxyConfig[PROXY_CONFIG]));

// STATIC files
app.get('*', function (req, res) {
    res.sendFile('index.html', {root: STATIC_PATH});
});

if (process.env.NODE_ENV !== 'development')
    app.listen(PORT);
else
    module.exports = app;

// listen (start app with node server.js) ======================================
console.log("App listening on port %s", PORT);