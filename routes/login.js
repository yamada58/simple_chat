var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.passport !== undefined && req.session.passport.user !== undefined) {
		res.redirect('/');
	}
  res.render('login', { title: 'login'});
});

module.exports = router;
