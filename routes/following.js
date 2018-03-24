//following.js
//フォローしてる人表示
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var async = require('async');
var anti = require('../anti');

router.get('/:user_id', function(req, res, next){
  var user_id = req.params.user_id;
  user_id = anti.antiSQLInjection_user_id(user_id);
  var my_id = req.session.user_id;
  var query = 'SELECT FO.user_id, FO.follow_id, US.user_id, US.user_name, US.image FROM follows AS FO'
            + ' INNER JOIN (SELECT user_id, user_name, image FROM users) AS US ON FO.follow_id = US.user_id WHERE FO.user_id = "'
            + user_id + '" ORDER BY FO.followed_at;';
  if(my_id){
    connection.query(query, function(err, following){
      res.render('following', {
        title: 'フォロー',
        followingList: following
      });
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
