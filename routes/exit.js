//exit.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var hash = require('../password');
var anti = require('../anti');

router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    res.render('exit', {
      title: '退会手続き'
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/', function(req, res, next){
  var my_id = req.session.user_id;
  var password = req.body.password;
  password = hash.createHash(password);
  var comment = req.body.comment;
  comment = anti.antiSQLInjection(comment);
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var confirmQuery = 'SELECT password FROM users WHERE user_id = "'
                     + my_id + '";';
    connection.query(confirmQuery, function(err, confirm){
      if(password == confirm[0].password){
        var deleteQuery = 'DELETE FROM users WHERE user_id = "' + my_id + '";';
        connection.query(deleteQuery, function(err, deleted){
          var deleteIine = 'DELETE FROM iine WHERE user_id = "' + my_id + '";';
          connection.query(deleteIine, function(err, iine){
            var deleteComment = 'DELETE FROM comment WHERE user_id = "' + my_id + '";';
            connection.query(deleteComment, function(err, deletecomment){
              var deleteRegister_books = 'DELETE FROM register_book WHERE user_id = "' + my_id + '";';
              connection.query(deleteRegister_books, function(err, register_books){
                var deleteWant_book = 'DELETE FROM register_wantbook WHERE user_id = "' + my_id + '";';
                connection.query(deleteWant_book, function(err, deleteWant){
                  if(comment != ''){
                    var query = 'INSERT INTO opinion (comment) VALUE ("' + comment + '");';
                    connection.query(query, function(err, comment){
                      res.redirect('/');
                    });
                  } else {
                    res.redirect('/');
                  }
                });
              });
            });
          });
        });
      } else {
        res.render('exit', {
          title: '退会手続き',
          message: 'メールアドレスもしくはパスワードが間違っています。'
        });
      }
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
