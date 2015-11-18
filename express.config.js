var express = require('express');
var busboy = require('connect-busboy');
var path = require('path');
var fs = require('fs-extra');
var proxy = require('express-http-proxy');

var app = express();

app.use(busboy());
app.use(express.static(path.join(__dirname, '.tmp')));
//app.use(express.static(path.join(__dirname, 'src/dist')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var proxyConfig = require('./proxy.config.js');

module.exports = app;

console.log('Express server listening on port ' + app.get('port'));