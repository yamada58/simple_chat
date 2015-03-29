var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('url---->>>>>>  ' + req.route.path);
	var User = global.db.User;
	User.find(req.session.passport.user.id )
		.error(function(err){})
		.success(function(rows){
			res.contentType('application/json');
			var view = { user: rows};
			res.send(JSON.stringify(view));
		});
});

router.get('/:id', function(req, res, next) {
  console.log('url---->>>>>>  ' + req.route.path);
	var id = req.session.passport.user.id === req.params.id ? req.params.id : 0;
	var User = global.db.User;
	User.find(id)
		.error(function(err){})
		.success(function(user){
			res.contentType('application/json');
			var view = { user: user};
  console.log(JSON.stringify(view));
			res.send(JSON.stringify(view));
		});
});

//router.post('/', function(req, res, next) {
//  console.log('url---->>>>>>  ' + req.route.path);
//	var User = global.db.User;
//	User.create({
//		comment: req.body.comment,
//		status: 0,
//		name: req.session.passport.user.displayName,
//		image_path: req.session.passport.user.image_path
//		})
//		.error(function(err){})
//		.success(function(result){
//			res.contentType('application/json');
//			var view = { chat: req.body.comment, id: result.dataValues.id};
//			res.send(JSON.stringify(view));
//		});
//});

router.put('/:id', function(req, res, next) {
  console.log('url---->>>>>>  ' + req.route.path);
	var User = global.db.User;
	User.get({id : req.params.id})
		.error(function(err){})
		.success(function(user){
			user.name = req.body.name ? req.body.name : user.name;
			user.image_path = req.body.image_path ? req.body.image_path : user.image_path;
			user.save(function(){
				res.contentType('application/json');
				var view = { user: user};
				res.send(JSON.stringify(view));
			});
		});
});

router.delete('/:id', function(req, res, next) {
  console.log('url---->>>>>>  ' + req.route.path);
	var User = global.db.User;
	User.destroy({id : req.params.id})
		.error(function(err){})
		.success(function(user){
			res.contentType('application/json');
			var view = { user: user};
			res.send(JSON.stringify(view));
		});
});

module.exports = router;
