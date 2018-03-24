//comment.js

var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:register_number', function(req, res, next){
  var register_number = req.params.register_number;
  register_number = anti.antiSQLInjection(register_number);
  var query = 'SELECT A.register_number, A.comment, A.commented_at, B.user_id, B.user_name, B.image FROM ('
            + 'SELECT register_number, user_id, comment, commented_at FROM comment WHERE '
            + 'register_number = ' + register_number + ') AS A INNER JOIN users AS B ON '
            + 'A.user_id = B.user_id ORDER BY A.commented_at;';
  connection.query(query, function(err, comment){
    res.send(comment);
  });
});

module.exports = router;
