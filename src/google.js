const GoogleStrategy = require('passport-google-oauth2').Strategy
const url = require('url')

const addGoogleStrategy = (passport, cbRoute, config) => {
  if(!config.google_client_id || !config.google_secret){
    console.log(' missing google client id or secret! ')
    return false
  }
  passport.use(new GoogleStrategy({
    clientID: config.google_client_id,
    clientSecret: config.google_secret,
    callbackURL: cbRoute,
    passReqToCallback: true
  }, (request, accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken
    return done(null, profile)
  }))
  return true
}

const makeAuth = (app, passport, func, handleRespond, route, cbRoute, scope, config) => {
  if (!addGoogleStrategy(passport, cbRoute, config)) return
  app.get(route, passport.authenticate('google', { scope: scope || ['profile'] }))

  app.get(url.parse(cbRoute).pathname, (req, res, next) => {
    passport.authenticate('google', (err, data) => {
      req.body = data
      handleRespond(r => res.json(r), func, res, req)
    })(req, res, next)
  })
}

export default makeAuth
