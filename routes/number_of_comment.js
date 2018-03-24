//number_of_comment.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:register_number', function(req, res, next){
  var register_number = req.params.register_number;
  register_number = anti.antiSQLInjection(register_number);
  var query = 'SELECT comment_number FROM comment WHERE register_number = ' + register_number + ';';
  connection.query(query, function(err, commentNumber){
    if(typeof commentNumber[0] != 'undefined'){
      var number_of_comment = String(commentNumber.length);
      res.send(number_of_comment);
    } else {
      res.send('0');
    }
  });
});

module.exports = router;
