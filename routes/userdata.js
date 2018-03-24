//userdata.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

//TopぺーじからMyPageへ
router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var query = 'SELECT user_id, user_name, introduction, image FROM users'
              + ' WHERE user_id = "' + my_id + '";';
    connection.query(query, function(err, user){
      var user = user;
      user[0].follow_or_not = 'Your account';
      res.render('userdata', {
        title: user[0].user_name,
        userInfo: user[0]
      });
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/:user_id', function(req, res, next){
  var my_id = req.session.user_id;
  //if(my_id){
    var user_id = req.params.user_id;
    user_id = anti.antiSQLInjection_user_id(user_id);
    var query = 'SELECT user_id, user_name, introduction, image FROM users WHERE user_id = "' + user_id + '";';
    connection.query(query, function(err, user){
      if(typeof user[0] != 'undefined'){
        res.render('userdata', {
          title: user[0].user_name,
          userInfo: user[0]
        });
      } else {
        res.redirect('/error');
      }
    });
  //} else {
    //res.redirect('/');
  //}
});

module.exports = router;
