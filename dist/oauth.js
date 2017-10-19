'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeAuth = undefined;

var _google = require('./google');

var _google2 = _interopRequireDefault(_google);

var _facebook = require('./facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _twitter = require('./twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _linkedin = require('./linkedin');

var _linkedin2 = _interopRequireDefault(_linkedin);

var _github = require('./github');

var _github2 = _interopRequireDefault(_github);

var _steam = require('./steam');

var _steam2 = _interopRequireDefault(_steam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passport = require('passport');

const makeAuth = exports.makeAuth = (app, config = {}, handleRespond) => ({
  googleAuth: (route, cbRoute, func, scope = null) => (0, _google2.default)(app, passport, func, handleRespond, route, cbRoute, scope, config),

  facebookAuth: (route, cbRoute, func, scope = null) => (0, _facebook2.default)(app, passport, func, handleRespond, route, cbRoute, scope, config),

  twitterAuth: (route, cbRoute, func, scope = null) => (0, _twitter2.default)(app, passport, func, handleRespond, route, cbRoute, scope, config),

  linkedinAuth: (route, cbRoute, func, scope = null) => (0, _linkedin2.default)(app, passport, func, handleRespond, route, cbRoute, scope, config),

  githubAuth: (route, cbRoute, func, scope = null) => (0, _github2.default)(app, passport, func, handleRespond, route, cbRoute, scope, config),

  steamAuth: (route, cbRoute, func, scope = null) => (0, _steam2.default)(app, passport, func, handleRespond, route, cbRoute, scope, config)
});