//follow.js
//ユーザーをフォローする
var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');
var async = require('async');
var anti = require('../anti');

router.get('/:user_id', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    var follow_id = req.params.user_id;
    my_id = anti.antiSQLInjection_user_id(my_id);
    follow_id = anti.antiSQLInjection_user_id(follow_id);
    if(my_id != follow_id){
      var followed_at = moment().format('YYYY-MM-DD HH:mm:ss');
      var confirmQuery = 'SELECT * FROM follows WHERE (user_id = "'
                       + my_id + '") AND (follow_id = "'
                       + follow_id + '");';
      connection.query(confirmQuery, function(err, followOrNot){
        if(typeof followOrNot[0] != 'undefined'){
          var deleteQuery = 'DELETE FROM follows WHERE (user_id = "'
                          + my_id + '") AND (follow_id = "'
                          + follow_id + '");';
          connection.query(deleteQuery, function(err, unfollow){
            res.send('unfollow');
          });
        } else {
          var insertQuery = 'INSERT INTO follows(user_id, follow_id, followed_at) VALUES ("'
                          + my_id + '", "' + follow_id + '", "'
                          + followed_at + '");';
          connection.query(insertQuery, function(err, followuser){
            res.send('follow');
          });
        }
      });
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
