//follower.js
//フォロワー表示
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:user_id', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    var user_id = req.params.user_id;
    user_id = anti.antiSQLInjection_user_id(user_id)
    var query = 'SELECT A.user_id, A.follow_id, B.user_id, B.user_name, B.image'
              + ' FROM( SELECT * FROM follows WHERE follow_id = "' + user_id
              + '") AS A INNER JOIN (SELECT user_id, user_name, image FROM users) AS B ON A.user_id = B.user_id'
              + ' ORDER BY A.followed_at;';
    connection.query(query, function(err, followers){
      res.render('follower', {
        title: 'フォロワー',
        followerList: followers
      });
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
