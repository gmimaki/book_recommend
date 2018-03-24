//iine.js
//いいねボタンを押す
var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:register_number', function(req, res, next){
  var my_id = req.session.user_id;
  var register_number = req.params.register_number;
  register_number = anti.antiSQLInjection(register_number);
  var iined_at = moment().format('YYYY-MM-DD HH:mm:ss');
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var registerQuery = '';
    var confirmQuery = 'SELECT * FROM iine WHERE user_id = "'
                 + my_id + '" AND register_number = ' + register_number + ';';
    var registerQuery = 'INSERT INTO iine(user_id, register_number, iined_at) VALUES ("'
                  + my_id + '", ' + register_number + ', "' + iined_at + '");';
    var deleteQuery = 'DELETE FROM iine WHERE user_id = "'
                    + my_id + '" AND register_number = ' + register_number + ';';
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
