//show_info.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var query = 'SELECT user_id, user_name, introduction, image, created_at FROM users WHERE user_id = "'
              + my_id + '";';
    connection.query(query, function(err, user){
      var created_at = new Date(user[0].created_at);
      var year = created_at.getFullYear();
      var month = created_at.getMonth() + 1;
      var day = created_at.getDate();
      user[0].created_at = year + '/' + month + '/' + day;
      res.render('show_info', {
        title: '登録情報',
        user: user[0]
      });
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
