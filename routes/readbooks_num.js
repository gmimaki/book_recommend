//readbook_num.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:user_id', function(req, res, next){
    var user_id = req.params.user_id;
    user_id = anti.antiSQLInjection_user_id(user_id);
    var query = 'SELECT user_id, asin FROM register_book'
              + ' WHERE user_id = "' + user_id + '";';
    connection.query(query, function(err, user){
      if(typeof user[0] != 'undefined'){
        var readbooks_num = String(user.length);
        res.send(readbooks_num);
      } else {
        res.send('0');
      }
    });
});

module.exports = router;
