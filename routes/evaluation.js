//evaluation.js
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:asin', function(req, res, next){
  var asin = req.params.asin;
  asin = anti.antiSQLInjection(asin);
  var query = 'SELECT (FLOOR(AVG(point) * POW(10, 1) + 0.5)) / POW(10, 1) AS average FROM register_book WHERE asin = "'
                   + asin + '";';
  connection.query(query, function(err, eva){
    if(eva[0].average != null){
      res.send(String(eva[0].average));
    } else {
      res.send('none');
    }
  });
});

module.exports = router;
