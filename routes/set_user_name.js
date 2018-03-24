//set_user_name.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var query = 'SELECT user_name FROM users WHERE user_id = "' + my_id + '"';
    connection.query(query, function(err, user_name){
        res.render('set_user_name', {
          title: 'ユーザー名変更',
          user_name: user_name[0].user_name
        });
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/', function(req, res, next){
  if(req.headers.referer.match(/^https:\/\/sophiliar\.herokuapp\.com/)){
    var user_name = req.body.user_name;
    user_name = user_name.replace(/\s+/g, "");
    user_name = anti.registerAPI(user_name);
    var my_id = req.session.user_id;
    if(my_id){
      my_id = anti.antiSQLInjection_user_id(my_id);
      var query = 'UPDATE users SET user_name = "' + user_name + '" WHERE user_id = "'
                + my_id + '";';
      connection.query(query, function(err, user_name){
        if(err){
          res.render('set_user_name', {
            title: 'ユーザー名変更',
            user_name: user_name[0].user_name,
            message: 'エラーです。'
          });
        } else {
          res.redirect('/settings');
        }
      });
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
