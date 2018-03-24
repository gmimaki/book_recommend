//register_wantbook.js
//読みたい本を登録する
var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:asin', function(req, res, next){
  var my_id = req.session.user_id;
  var asin = req.params.asin;
  asin = anti.antiSQLInjection(asin);
  var registered_at = moment().format('YYYY-MM-DD HH:mm:ss');
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var registerQuery = '';
    var confirmQuery = 'SELECT * FROM register_wantbook WHERE user_id = "'
                 + my_id + '" AND asin = "' + asin + '";';
    var registerQuery = 'INSERT INTO register_wantbook(user_id, asin, registered_at) VALUES ("'
                  + my_id + '", "' + asin + '", "' + registered_at + '");';
    var deleteQuery = 'DELETE FROM register_wantbook WHERE user_id = "'
                    + my_id + '" AND asin = "' + asin + '";';
    connection.query(confirmQuery, function(err, result){
      if(typeof result[0] != 'undefined'){
        connection.query(deleteQuery, function(err, deletewantbook){
          res.send('0');
        });
      } else {
        connection.query(registerQuery, function(err, registerBook){
          res.send('1');
        });
      }
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
