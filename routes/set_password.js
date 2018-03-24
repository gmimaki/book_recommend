//set_password.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var hash = require('../password');
var anti = require('../anti');

router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    res.render('set_password', {
      title: 'パスワード変更'
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/', function(req, res, next){
  var my_id = req.session.user_id;
  var password = req.body.password;
  var new_password = req.body.new_password;
  var confirm_new_password = req.body.confirm_new_password;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var confirmQuery = 'SELECT user_number, password FROM users WHERE user_id = "'
                     + my_id + '";';
    connection.query(confirmQuery, function(err, confirm){
      password = hash.createHash(password);
      if(confirm[0].password == password){
        if(new_password == confirm_new_password){
          new_password = hash.createHash(new_password);
          var query = 'UPDATE users SET password = "' + new_password + '" WHERE user_id = "' + my_id + '"';
          connection.query(query, function(err, password){
            res.redirect('/settings');
          });
        } else {
          res.render('set_password', {
            title: 'パスワード変更',
            message: '新しく登録ご希望のパスワードが、一度目と二度目で入力値が異なっています。再度ご登録をお願い致します。'
          });
        }
      } else {
        res.render('set_password', {
          title: 'パスワード変更',
          message: '入力した現在のパスワードに誤りがあります。'
        });
      }
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
