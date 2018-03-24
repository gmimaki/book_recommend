//set_introduction.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var confirmQuery = 'SELECT introduction FROM users WHERE user_id = "' + my_id + '"';
    connection.query(confirmQuery, function(err, introduction){
      if(introduction[0].introduction != null){
        res.render('set_introduction', {
          title: 'プロフィール文設定',
          introduction: introduction[0].introduction
        });
      } else {
        res.render('set_introduction', {
          title: 'プロフィール文設定',
          introduction: ''
        });
      }
    });
  } else {
    res.redirect('/login');
  }
});


router.post('/', function(req, res, next){
  var introduction = req.body.introduction;
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    if(introduction != ''){
      introduction = anti.antiSQLInjection(introduction);
      var query = 'UPDATE users SET introduction = "' + introduction + '" WHERE user_id = "'
                + my_id + '";';
      connection.query(query, function(err, introduction){
        res.redirect('/settings');
      });
    } else {
      res.redirect('/settings');
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
