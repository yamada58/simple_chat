var express = require('express');
var router = express.Router();
var passport = require.main.exports.passport;

router.get('/', passport.authenticate('facebook'));
router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
  console.log('何かきた');
	res.redirect('/');
});

module.exports = router;
