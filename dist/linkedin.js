'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const url = require('url');

const addLinkedInStrategy = (passport, cbRoute, scope, config) => {
  if (!config.linkedin_client_id || !config.linkedin_secret) {
    console.log(' missing linkedin client id or secret! ');
    return false;
  }

  passport.use(new LinkedInStrategy({
    clientID: config.linkedin_client_id,
    clientSecret: config.linkedin_secret,
    callbackURL: cbRoute,
    scope: scope || ['r_emailaddress', 'r_basicprofile']
  }, (accessToken, refreshToken, profile, done) => {
    profile.refreshToken = refreshToken;
    profile.accessToken = accessToken;
    return done(null, profile);
  }));
  return true;
};

const makeAuth = (app, passport, func, handleRespond, route, cbRoute, scope, config) => {
  if (!addLinkedInStrategy(passport, cbRoute, scope, config)) return;
  app.get(route, passport.authenticate('linkedin'));

  app.get(url.parse(cbRoute).pathname, (req, res, next) => {
    passport.authenticate('linkedin', (err, data) => {
      req.body = data;
      handleRespond(r => res.json(r), func, res, req);
    })(req, res, next);
  });
};

exports.default = makeAuth;