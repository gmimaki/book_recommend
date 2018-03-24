//change_sort.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');
//今の選択条件を確認
router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var query = 'SELECT sort FROM users WHERE user_id = "' + my_id + '";';
    connection.query(query, function(err, sort){
      var sort_object = {
        "registered_at DESC": "new",
         "registered_at": "old",
         "point DESC": "high",
         "point": "low"
      };
      var sort_value = sort_object[sort[0].sort];
      res.send(sort_value);
    });
  } else {
    res.send('new');
  }
});

router.get('/:sort', function(req, res, next){
  var sort = req.params.sort;
  sort = anti.antiSQLInjection(sort);
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var sort_object = {
      "new": "registered_at DESC",
       "old": "registered_at",
       "high": "point DESC",
       "low": "point"
    };
    var sort_subject = sort_object[sort];
    var query = 'UPDATE users SET sort = "' + sort_subject + '" WHERE user_id = "' + my_id + '";';
    connection.query(query, function(err, sort){
      res.send('0');
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
