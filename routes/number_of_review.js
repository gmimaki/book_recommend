//number_of_review

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:asin', function(req, res, next){
    var asin = req.params.asin;
    asin = anti.antiSQLInjection(asin);
    var query = 'SELECT user_id FROM register_book'
              + ' WHERE asin = "' + asin + '";';
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
