const TwitterStrategy = require('passport-twitter')
const url = require('url')

const addTwitterStrategy = (passport, cbRoute, config) => {
  if(!config.twitter_consumer_key || !config.twitter_consumer_secret){
    console.log(' missing twitter consumer key or secret! ')
    return false
  }

  passport.use(new TwitterStrategy({
    consumerKey: config.twitter_consumer_key,
    consumerSecret: config.twitter_consumer_secret,
    callbackURL: cbRoute
  }, (token, tokenSecret, profile, done) => {
    profile.tokenSecret = tokenSecret
    profile.token = token
    done(null, profile)
    return true
  }))
}

const makeAuth = (app, passport, func, handleRespond, route, cbRoute, scope, config) => {
  if (!addTwitterStrategy(passport, cbRoute, config)) return
  app.get(route, passport.authenticate('twitter'))

  app.get(url.parse(cbRoute).pathname, (req, res, next) => {
    passport.authenticate('twitter', (err, data) => {
      req.body = data
      handleRespond(r => res.json(r), func, res, req)
    })(req, res, next)
  })
}

export default makeAuth
