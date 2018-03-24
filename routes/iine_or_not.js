//iine_or_not.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:register_number', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var register_number = req.params.register_number;
    register_number = anti.antiSQLInjection(register_number);
    var query = 'SELECT * FROM iine WHERE user_id = "' + my_id + '" AND register_number = '
              + register_number + ';';
    connection.query(query, function(err, iine){
      if(err){
        res.send('0');
      } else {
        if(typeof iine[0] != 'undefined'){
          res.send('1');
        } else {
          res.send('0');
        }
      }
    });
  } else {
    res.redirect('0');
  }
});

module.exports = router;
