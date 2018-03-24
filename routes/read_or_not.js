//read_or_not.js
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:asin', function(req, res, next){
  var asin = req.params.asin;
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    asin = anti.antiSQLInjection(asin);
    var query = 'SELECT * FROM register_book WHERE user_id = "' + my_id + '" AND '
              + ' asin = "' + asin + '";';
    connection.query(query, function(err, readornot){
      if(typeof readornot[0] != 'undefined'){
        res.send("1");
      } else {
        res.send("0");
      }
    });
  } else {
    res.send('0');
  }
});

module.exports = router;
