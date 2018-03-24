//search_user.js
var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');
var async = require('async');
var anti = require('../anti');

router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  //if(my_id){
    res.render('search_user', {
      title: 'ユーザー検索'
    });
  //} else {
  //  res.redirect('/');
  //}
});

router.post('/', function(req, res, next){
  var my_id = req.session.user_id;
//  if(my_id){
    var searchuser = req.body.searchuser;
    if(searchuser == ""){
      res.render('search_user', {
        title: 'ユーザー検索'
      });
      return;
    }
    var fixed_searchuser = anti.antiSQLInjection(searchuser);
    var query = "SELECT user_id, user_name, image FROM users WHERE user_id LIKE '%" + fixed_searchuser
              + "%' OR user_name LIKE '%" + fixed_searchuser + "%';";
    connection.query(query, function(err, users){
      res.render('search_user', {
        title: searchuser + 'の結果',
        userList: users
      });
    });
//  } else {
  //  res.redirect('/');
//  }
});


module.exports = router;
