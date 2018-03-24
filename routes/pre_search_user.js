//pre_search_user.js
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var async = require('async');
var anti = require('../anti');

router.post('/', function(req, res, next){
  var keyword = req.body;
  keyword = Object.keys(keyword);
  if(typeof keyword[0] != 'undefined'){
    keyword = anti.antiSQLInjection(keyword[0]);
    var query = 'SELECT DISTINCT user_id, user_name, image FROM users WHERE user_name LIKE "' + keyword + '%" '
              + 'OR user_id LIKE "' + keyword + '%" '
              + 'LIMIT 10;';
    connection.query(query, function(err, results){
      res.send(results);
    });
  } else {
    res.send('[]');
  }
});

module.exports = router;
