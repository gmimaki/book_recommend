//login.js
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var moment = require('moment');
var anti = require('../anti');
var hash = require('../password');

router.get('/', function(req, res, next){
  if(req.session.user_id){
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'ログイン'
    });
  }
});

router.post('/', function(req, res, next){
  var user_id = req.body.user_id;
  user_id = anti.antiSQLInjection_user_id(user_id);
  var password = req.body.password;
  password = hash.createHash(password);
  var query = 'SELECT user_id FROM users WHERE user_id = "' + user_id + '" AND password = "'
            + password + '" LIMIT 1;';
  connection.query(query, function(err, rows){
    if(typeof rows != 'undefined'){
      req.session.user_id = rows[0].user_id;
      res.redirect('/');
    } else {
      res.render('login', {
        title: 'ログイン',
        noUser: 'メールアドレスもしくはパスワードが間違っています。'
      });
    }
  });
});
module.exports = router;
