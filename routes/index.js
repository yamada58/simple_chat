var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
	if (req.session.passport === undefined || req.session.passport.user === undefined) {
		res.redirect('/login/');
	} else {
		var db = module.parent.exports.set('db');
		db.query('select * from chat_lists', function (err, rows) {
			res.render('index', { chat_lists: rows ,user: req.session.passport.user});
		});
	}
});

module.exports = router;
