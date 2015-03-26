var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = module.parent.exports.set('db');
  console.log('url---->>>>>>  ' + req.route.path);
  db.query('select * from chat_lists', function (err, rows) {
    res.contentType('application/json');
    var view = { chat_lists: rows ,title: 'chat'};
    res.send(JSON.stringify(view));
  });
});

router.get('/:id', function(req, res, next) {
  var db = module.parent.exports.set('db');
  console.log('url---->>>>>>  ' + req.route.path);
  db.query('select * from chat_lists where id = ?', [ req.params.id ], function (err, rows) {
    res.contentType('application/json');
    var view = { chat: rows};
    res.send(JSON.stringify(view));
  });
});

router.post('/', function(req, res, next) {
  var db = module.parent.exports.set('db');
  console.log('url---->>>>>>  ' + req.route.path);
  db.query('insert into chat_lists (comment, status, name) values (?, 0, ?)', [ req.body.comment, req.session.passport.user.displayName ], function (err, result) {
    res.contentType('application/json');
    var view = { chat: req.body.comment, id: result.insertId};
    res.send(JSON.stringify(view));
  });
});

router.put('/:id', function(req, res, next) {
  var db = module.parent.exports.set('db');
  console.log('url---->>>>>>  ' + req.route.path);
  console.log('url---->>>>>>  ' + req.body.status);
  db.query('update chat_lists set comment = ?, status = ? where id = ?', [ req.body.comment, req.body.status, req.params.id ], function (err, result) {
    res.contentType('application/json');
    var view = { chat: req.body.comment, id: req.params.id};
    res.send(JSON.stringify(view));
  });
});

router.delete('/:id', function(req, res, next) {
  var db = module.parent.exports.set('db');
  console.log('url---->>>>>>  ' + req.route.path);
  db.query('delete from chat_lists where id = ?', [ req.params.id ], function (err, result) {
    res.contentType('application/json');
    var view = { chat: req.body.comment, id: req.params.id};
    res.send(JSON.stringify(view));
  });
});

module.exports = router;
