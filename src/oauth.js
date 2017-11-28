import googleAuth from './google'
import facebookAuth from './facebook'
import twitterAuth from './twitter'
import linkedinAuth from './linkedin'
import githubAuth from './github'
import steamAuth from './steam'
import instaAuth from './insta'

const passport = require('passport')

export const makeAuth = (app, config = {}, handleRespond) => ({
  googleAuth: (route, cbRoute, func, scope = null) =>
    googleAuth(app, passport, func, handleRespond, route, cbRoute, scope, config),

  facebookAuth: (route, cbRoute, func, scope = null) =>
    facebookAuth(app, passport, func, handleRespond, route, cbRoute, scope, config),

  twitterAuth: (route, cbRoute, func, scope = null) =>
    twitterAuth(app, passport, func, handleRespond, route, cbRoute, scope, config),

  linkedinAuth: (route, cbRoute, func, scope = null) =>
    linkedinAuth(app, passport, func, handleRespond, route, cbRoute, scope, config),

  githubAuth: (route, cbRoute, func, scope = null) =>
    githubAuth(app, passport, func, handleRespond, route, cbRoute, scope, config),

  steamAuth: (route, cbRoute, func, scope = null) =>
    steamAuth(app, passport, func, handleRespond, route, cbRoute, scope, config),

  instaAuth: (route, cbRoute, func, scope = null) =>
    instaAuth(app, passport, func, handleRespond, route, cbRoute, scope, config)
})
