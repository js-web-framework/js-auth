const SteamStrategy = require('passport-steam')
const url = require('url')

const addSteamStrategy = (passport, cbRoute, config) => {
  if(!config.steam_api_key){
    console.log(' missing stream api key ')
    return false
  }

  passport.use(new SteamStrategy({
    apiKey: config.steam_api_key,
    realm: url.parse(cbRoute).origin,
    returnURL: cbRoute
  }, (identifier, profile, done) => {
    profile.identifier = identifier
    done(null, profile)
    return true
  }))
}

const makeAuth = (app, passport, func, handleRespond, route, cbRoute, scope, config) => {
  if (!addSteamStrategy(passport, cbRoute, config)) return
  app.get(route, passport.authenticate('steam'))

  app.get(url.parse(cbRoute).pathname, (req, res, next) => {
    passport.authenticate('steam', (err, data) => {
      req.body = data
      handleRespond(r => res.json(r), func, res, req)
    })(req, res, next)
  })
}

export default makeAuth
