'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const GitHubStrategy = require('passport-github2');
const url = require('url');

const addGitHubStrategy = (passport, cbRoute, config) => {
  if (!config.github_client_id || !config.github_secret) {
    console.log(' missing github client id or secret! ');
    return false;
  }

  passport.use(new GitHubStrategy({
    clientID: config.github_client_id,
    clientSecret: config.github_secret,
    callbackURL: cbRoute
  }, (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    done(null, profile);
    return true;
  }));
};

const makeAuth = (app, passport, func, handleRespond, route, cbRoute, scope, config) => {
  if (!addGitHubStrategy(passport, cbRoute, config)) return;

  app.get(route, passport.authenticate('github', { scope: scope || ['user:email'] }));

  app.get(url.parse(cbRoute).pathname, (req, res, next) => {
    passport.authenticate('github', (err, data) => {
      req.body = data;
      handleRespond(r => res.json(r), func, res, req);
    })(req, res, next);
  });
};

exports.default = makeAuth;