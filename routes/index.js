var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.passport === undefined || req.session.passport.user === undefined) {
		res.redirect('/login/');
	} else {
		var ChatLists = global.db.ChatLists;
		ChatLists.findAll({order: 'id DESC'})
			.error(function(err){})
			.success(function(rows){
				res.render('index', { chat_lists: rows ,user: req.session.passport.user});
			});
	}
});

module.exports = router;
