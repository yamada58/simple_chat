var express = require('express');
var router = express.Router();
var passport = require.main.exports.passport;

router.get('/', passport.authenticate('facebook'));
router.get('/callback', passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/login' }));

module.exports = router;
