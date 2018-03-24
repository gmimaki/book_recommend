//settings.js
//プロフィール設定変更
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    res.render('settings', {
      title: '設定変更'
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
