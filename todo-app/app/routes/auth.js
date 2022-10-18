
var qs = require('querystring');

var express = require('express');
var passport = require('passport');

// var OpenIDConnectStrategy = require('passport-openidconnect');
// const config = require("../configuration");

// const openIdConfig = {
//   issuer: config.AUTH0_DOMAIN + '/',
//   authorizationURL: config.AUTH0_DOMAIN + '/protocol/openid-connect/auth',
//   userInfoURL: config.AUTH0_DOMAIN + '/userinfo',
//   clientID: config.AUTH0_CLIENT_ID,
//   clientSecret: config.AUTH0_CLIENT_SECRET,
//   callbackURL: '/oauth2/redirect',
//   scope: [ 'profile' ]
// }
// console.log(openIdConfig)
// passport.use(new OpenIDConnectStrategy(openIdConfig, function verify(issuer, profile, cb) {
//   return cb(null, profile);
// }));

// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, { id: user.id, username: user.username, name: user.displayName });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });


var router = express.Router();

// router.get('/login', passport.authenticate('openidconnect'));

// router.get('/oauth2/redirect', passport.authenticate('openidconnect', {
//   successReturnToOrRedirect: '/',
//   failureRedirect: '/login'
// }));

// router.post('/logout', function(req, res, next) {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     var params = {
//       client_id: config.AUTH0_CLIENT_ID,
//       returnTo: `http://todo.addictive.local/`
//     };
//     res.redirect(config.AUTH0_DOMAIN + '/v2/logout?' + qs.stringify(params));
//   });
// });

module.exports = router;