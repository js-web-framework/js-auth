'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const FacebookStrategy = require('passport-facebook');
const url = require('url');

const addFacebookStrategy = (passport, cbRoute, config) => {
  if (!config.facebook_client_id || !config.facebook_secret) {
    console.log(' missing facebook client id or secret! ');
    return false;
  }

  passport.use(new FacebookStrategy({
    clientID: config.facebook_client_id,
    clientSecret: config.facebook_secret,
    callbackURL: cbRoute
  }, (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    return done(null, profile);
  }));
  return true;
};

const makeAuth = (app, passport, func, handleRespond, route, cbRoute, scope, config) => {
  if (!addFacebookStrategy(passport, cbRoute, config)) {
    return;
  }

  app.get(route, passport.authenticate('facebook', { scope: scope || [] }));

  app.get(url.parse(cbRoute).pathname, (req, res, next) => {
    passport.authenticate('facebook', (err, data) => {
      req.body = data;
      handleRespond(r => res.json(r), func, res, req);
    })(req, res, next);
  });
};

exports.default = makeAuth;