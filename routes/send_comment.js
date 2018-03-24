//send_comment.js
//登録した本表示
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var moment = require('moment');
var anti = require('../anti');

router.post('/:register_number', function(req, res, next){
  if(req.headers.referer.match(/^https:\/\/sophiliar\.herokuapp\.com/)){
    var my_id = req.session.user_id;
    if(my_id){
      my_id = anti.antiSQLInjection_user_id(my_id);
      var comment = Object.keys(req.body)[0];
      if(comment != ''){
        comment = anti.antiSQLInjection(comment);
        var register_number = req.params.register_number;
        register_number = anti.antiSQLInjection(register_number);
        var commented_at = moment().format('YYYY-MM-DD HH:mm:ss');
        var query = 'INSERT INTO comment(register_number, user_id, comment, commented_at) VALUES '
                  + '(' + register_number + ', "' + my_id + '", "' + comment + '", "' + commented_at
                  + '");';
        connection.query(query, function(err, comment){
          if(err){
            res.send('');
          } else {
            res.send(req.body);
          }
        });
      } else {
        res.send('');
      }
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
