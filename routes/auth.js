var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log('facebook--->>>>');
	var passport = module.parent.exports.set('passport');
  console.log(passport);
	passport.authenticate('facebook');
});
/* GET home page. */
router.get('/callback', function(req, res, next) {
  console.log('facebook--->>>>callback');
	var passport = module.parent.exports.set('passport');
	passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' });
});

module.exports = router;
