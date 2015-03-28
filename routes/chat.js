var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('url---->>>>>>  ' + req.route.path);
	var ChatLists = global.db.ChatLists;
	ChatLists.findAll({order: 'id ASC'})
		.error(function(err){})
		.success(function(rows){
			res.contentType('application/json');
			var view = { chat_lists: rows ,title: 'chat'};
			res.send(JSON.stringify(view));
		});
});

router.get('/:id', function(req, res, next) {
  console.log('url---->>>>>>  ' + req.route.path);
	var ChatLists = global.db.ChatLists;
	ChatLists.get(req.params.id)
		.error(function(err){})
		.success(function(rows){
			res.contentType('application/json');
			var view = { chat: rows};
			res.send(JSON.stringify(view));
		});
});

router.post('/', function(req, res, next) {
  console.log('url---->>>>>>  ' + req.route.path);
	var ChatLists = global.db.ChatLists;
	ChatLists.create({
		comment: req.body.comment,
		status: 0,
		name: req.session.passport.user.displayName
		})
		.error(function(err){})
		.success(function(result){
			res.contentType('application/json');
			var view = { chat: req.body.comment, id: result.dataValues.id};
			res.send(JSON.stringify(view));
		});
});

router.put('/:id', function(req, res, next) {
  console.log('url---->>>>>>  ' + req.route.path);
	var ChatLists = global.db.ChatLists;
	ChatLists.get({id : req.params.id})
		.error(function(err){})
		.success(function(chat){
			chat.comment = req.body.comment ? req.body.comment : chat.comment;
			chat.status = req.body.status ? req.body.status : chat.status;
			chat.save(function(){
				res.contentType('application/json');
				var view = { chat: req.body.comment, id: req.params.id};
				res.send(JSON.stringify(view));
			});
		});
});

router.delete('/:id', function(req, res, next) {
  console.log('url---->>>>>>  ' + req.route.path);
	var ChatLists = global.db.ChatLists;
	ChatLists.destroy({id : req.params.id})
		.error(function(err){})
		.success(function(chat){
			res.contentType('application/json');
			var view = { chat: req.body.comment, id: req.params.id};
			res.send(JSON.stringify(view));
		});
});

module.exports = router;
