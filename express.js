/**
 * Created by HungNguyen on 11/18/15.
 */


var express = require('express');
var app = express();                               // create our app w/ express
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path = require('path'); //use for static page
var PORT = process.env.PORT || 8080;
var proxy = require('express-http-proxy');


// configuration =================

var API_SERVER = 'api.khambacsi.com:56765';

app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());


app.use(express.static(__dirname + '/src/dist'));                 // set the static files location /public/img will be /img for users


app.use('/api', proxy(API_SERVER, {
    forwardPath: function (req, res) {
        return require('url').parse(req.url).path;
    },
    /*intercept: function(rsp, data, req, res, callback) {
     // rsp - original response from the target
     data = JSON.parse(data.toString('utf8'));
     callback(null, JSON.stringify(data));
     },*/
    decorateRequest: function (req) {
        //req.headers['Content-Type'] = '';
        //req.method = 'GET';
        //req.bodyContent = wrap(req.bodyContent);
        console.log(req);
        console.log(req.body);
        console.log(req.url);
        req.params.secret = 'HELLOWORD';
        return req;
    }
}));


app.use('/hung', function (req, res) {
    passport.use(new FacebookStrategy({
            clientID: '154366684653118',
            clientSecret: 'd0fee9ba6a86c6043bf7faeb92dda805',
            callbackURL: "http://localhost:8080/",
            enableProof: false
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(accessToken, refreshToken, profile, done);
            return true;
            /*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
             return done(err, user);
             });*/
        }
    ));

});

app.get('*', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, 'src/dist')});
    //res.sendfile(__dirname + '/src/dist/index.html'); // load the single view file (angular will handle the page changes on the front-end
});



// listen (start app with node server.js) ======================================
app.listen(PORT);
console.log("App listening on port %s", PORT);