//register_user.js

var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');
var anti = require('../anti');
var hash = require('../password');

router.get('/', function(req, res, next){
  if(req.headers.referer.match(/^https:\/\/sophiliar\.herokuapp\.com/)){
    res.render('register_user', {
      title: '会員登録'
    });
  } else {
    res.redirect('/');
  }
});

router.post('/', function(req, res, next){
  if(req.headers.referer.match(/^https:\/\/sophiliar\.herokuapp\.com/)){
    var user_name = req.body.user_name;
    user_name = user_name.replace(/\s+/g, "");
    user_name = anti.registerAPI(user_name);
    var user_id = req.body.user_id;
    user_id = anti.antiSQLInjection_user_id(user_id);
    var user_id_confirm = req.body.user_id_confirm;
    user_id_confirm = anti.antiSQLInjection_user_id(user_id_confirm);
    var password = req.body.password;
    var password_confirm = req.body.password_confirm;
    var created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    if(user_id == user_id_confirm && password == password_confirm){
      password = hash.createHash(password);
      var idExistsQuery = 'SELECT user_number FROM users WHERE user_id = "' + user_id
                        + '" LIMIT 1;';
      var registerQuery = 'INSERT INTO users(user_id, user_name, password, created_at, sort) VALUES ("'
                        + user_id + '", "' + user_name + '", "' + password + '", "' + created_at + '", "registered_at DESC");';
      connection.query(idExistsQuery, function(err, id){
        if(typeof id[0] != 'undefined'){
          res.render('register_user', {
            title: '会員登録',
            message: '入力されたID' + user_id + 'はすでに使用されています。申し訳ございませんが、別のIDを入力ください'
          });
        } else {
              connection.query(registerQuery, function(err, rows){
                if(err){
                  res.render('register_user', {
                    title: '会員登録',
                    message: 'エラーです。ユーザー名に無効な文字が含まれている可能性があります。'
                  });
                } else {
                  res.redirect('/login');
                }
              });
        }
      });
    } else {
      res.render('register_user', {
        title: '会員登録',
        message: 'ユーザーIDもしくはパスワードが、一度目と二度目の入力で異なっております。お手数ですが、再度ご登録ください'
      });
    }
  } else {
    res.redirect('/');
  }
});
module.exports = router;
