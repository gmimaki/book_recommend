//logout.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  if(req.headers.referer.match(/^https:\/\/sophiliar\.herokuapp\.com/)){
    req.session.destroy();
    res.redirect('/login');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
