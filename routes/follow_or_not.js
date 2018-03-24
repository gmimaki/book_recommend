//follow_or_not.js
//フォロワー表示
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:user_id', function(req, res, next){
  var user_id = req.params.user_id;
  user_id = anti.antiSQLInjection_user_id(user_id)
  var my_id = req.session.user_id;
  my_id = anti.antiSQLInjection_user_id(my_id);
  var query = 'SELECT follow_id FROM follows WHERE user_id = "' + my_id + '" AND follow_id = "' + user_id + '";';
  if(my_id === user_id){
    res.send('2');
  } else {
    connection.query(query, function(err, followOrNot){
      if(typeof followOrNot[0] != 'undefined'){
        res.send('1');
      } else {
        res.send('0');
      }
    });
  }
});

module.exports = router;
