/**
 * Created by HungNguyen on 2/25/16.
 */

var express = require('express');
var Router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var request = require('request');
// authenticate

module.exports = function (app, CONFIG) {
    //Authentication
    var fbConfig = CONFIG['FB_AUTH'];
    //ggConfig = CONFIG.AUTH.GG;

    passport.use(new FacebookStrategy({
            clientID: fbConfig['APP_ID'],
            clientSecret: fbConfig['APP_SECRET'],
            callbackURL: fbConfig['CALLBACK_URL'],
            profileFields: ['id', 'name', 'name_format', 'birthday', 'bio', 'about', 'age_range', 'currency', 'education', 'devices', 'gender', 'email', 'link', 'likes']
            //enableProof: false
        },
        function (accessToken, refreshToken, profile, done) {
            // register here
            console.log(accessToken, refreshToken, profile);

            request.post(['http://', CONFIG['api_server'], CONFIG['api_path'], '/auth/convert-token/'].join(''),
                {
                    form: {
                        client_id: CONFIG['client_id'],
                        client_secret: CONFIG['secret_key'],
                        grant_type: 'convert_token',
                        token: accessToken,
                        backend: 'facebook-oauth2'
                    }
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body); // Show the HTML for the Google homepage.
                        return done(null, profile);
                    } else
                        return done(error);
                });


            //then ok return done();
            return done(null, profile);
        }
    ));
    Router.use(passport.initialize());
    //app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });


    Router.get('/', function (req, res) {
        res.send('hello');
    });

    Router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

    Router.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login',
            errorRedirect: '/'
        })
    );

    /* auth google account */

    passport.use(new GoogleStrategy({
            clientID: CONFIG['GOOGLE_APP_ID'],
            clientSecret: CONFIG['GOOGLE_APP_SECRET'],
            callbackURL: 'http://morementapp1.com:9000/auth/google/return',
            passReqToCallback: true

        },
        function (request, accessToken, refreshToken, profile, done) {
            console.log(accessToken, refreshToken, profile);

            request.post(['http://', CONFIG['api_server'], CONFIG['api_path'], '/auth/convert-token/'].join(''),
                {
                    form: {
                        client_id: CONFIG['client_id'],
                        client_secret: CONFIG['secret_key'],
                        grant_type: 'convert_token',
                        token: accessToken,
                        backend: 'google-oauth2'
                    }
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body); // Show the HTML for the Google homepage.
                        return done(null, profile);
                    } else
                        return done(error);
                });
        }
    ));


    Router.get('/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read']
    }));

    // Google will redirect the user to this URL after authentication.  Finish
    // the process by verifying the assertion.  If valid, the user will be
    // logged in.  Otherwise, authentication has failed.
    Router.get('/google/return',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));


    app.use('/auth', Router);
};