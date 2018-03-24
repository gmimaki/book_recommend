//check_user_id.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:user_id', function(req, res, next){
  var user_id = req.params.user_id;
  user_id = anti.antiSQLInjection_user_id(user_id);
  var query = 'SELECT user_number FROM users WHERE user_id = "' + user_id + '";';
  if(user_id.length >= 4 && user_id.length <= 20){
    connection.query(query, function(err, user){
      if(user[0]){
        res.send('1');
      } else {
        res.send('0');
      }
    });
  }
});


module.exports = router;
