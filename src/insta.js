const InstagramStrategy = require('passport-instagram')
const url = require('url')

const addInstagramStrategy = (passport, cbRoute, scope, config) => {
  if(!config.Instagram_client_id || !config.Instagram_secret){
    console.log(' missing Instagram client id or secret! ')
    return false
  }

  passport.use(new InstagramStrategy({
    clientID: config.instagram_client_id,
    clientSecret: config.instagram_secret,
    callbackURL: cbRoute
  }, (accessToken, refreshToken, profile, done) => {
    profile.refreshToken = refreshToken
    profile.accessToken = accessToken
    return done(null, profile)
  }))
  return true
}

const makeAuth = (app, passport, func, handleRespond, route, cbRoute, scope, config) => {
  if (!addInstagramStrategy(passport, cbRoute, scope, config)) return
  app.get(route, passport.authenticate('Instagram'))

  app.get(url.parse(cbRoute).pathname, (req, res, next) => {
    passport.authenticate('instagram', (err, data) => {
      req.body = data
      handleRespond(r => res.json(r), func, res, req)
    })(req, res, next)
  })
}

export default makeAuth
