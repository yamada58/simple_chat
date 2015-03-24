var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = module.parent.exports.set('db');
  db.query('select * from todo_lists', function (err, rows) {
    res.render('index', { chat_lists: rows ,title: 'Express'});
  });
});

module.exports = router;
