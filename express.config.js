var express = require('express');
var app = express();                               // create our app w/ express
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path = require('path'); //use for static page
var PORT = process.env.PORT || 8080;
var proxy = require('express-http-proxy');
var proxyConfig = require('./proxy.config.js');
var busboy = require('connect-busboy');
var fs = require('fs-extra');
// configuration =================

var API_SERVER = 'api.khambacsi.com:56765';

/*app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
 app.use(bodyParser.json());                                     // parse application/json
 app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
 app.use(methodOverride());
 */

app.use(busboy());
//app.use(express.static(path.join(__dirname, '.tmp')));
app.use(express.static(path.join(__dirname, 'src/')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


app.use('/api', proxy(API_SERVER, proxyConfig.defaultProxyConfig));

app.get('*', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'src')});
});


module.exports = app;

console.log('Express server listening on port ' + app.get('port'));