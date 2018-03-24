//number_of_iine.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:register_number', function(req, res, next){
  var register_number = req.params.register_number;
  register_number = anti.antiSQLInjection(register_number);
  var query = 'SELECT * FROM iine WHERE register_number = ' + register_number + ';';
  connection.query(query, function(err, iineNumber){
    if(typeof iineNumber[0] != 'undefined'){
      var number_of_iine = String(iineNumber.length);
      res.send(number_of_iine);
    } else {
      res.send('0');
    }
  });
});

module.exports = router;
