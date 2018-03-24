//indicate_registered_books.js
//userdataで読んだ本読みたい本表示

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.post('/:user_id_and_offset', function(req, res, next){
  var str = JSON.stringify(req.body);
  var user_id_and_offset = req.params.user_id_and_offset;
  user_id_and_offset = user_id_and_offset.split('=');
  var user_id = user_id_and_offset[0];
  user_id = anti.antiSQLInjection_user_id(user_id);
  var offset = (Number(user_id_and_offset[1]) || 0);
  //offset = offsetに数字以外のものが入って来たら0にする
  var my_id = req.session.user_id;
  if (str.match(/registered_books/)) {
    if(my_id){
      my_id = anti.antiSQLInjection_user_id(my_id);
      var sortQuery = 'SELECT sort FROM users WHERE user_id = "' + my_id + '";';
      connection.query(sortQuery, function(err, sort){
        if(typeof sort[0] != 'undefined'){
          var sort_subject = sort[0].sort;
          sort_subject = anti.antiSQLInjection_user_id(sort_subject);
          var query = 'SELECT A.asin, A.registered_at, A.comment, A.point, A.register_number, B.book_name, B.author_name'
                    + ' FROM ( SELECT * FROM register_book WHERE user_id = "'
                    + user_id + '") AS A INNER JOIN books AS B'
                    + ' ON A.asin = B.asin ORDER BY A.' + sort_subject + ' LIMIT 15 OFFSET ' + offset + ';';
          connection.query(query, function(err, results){
            if(err || typeof results[0] == 'undefined'){
              res.send('0');
            } else {
              res.send(results);
            }
          });
        } else {
          var query = 'SELECT A.asin, A.registered_at, A.comment, A.point, A.register_number, B.book_name, B.author_name'
                    + ' FROM ( SELECT * FROM register_book WHERE user_id = "'
                    + user_id + '") AS A INNER JOIN books AS B'
                    + ' ON A.asin = B.asin ORDER BY A.registered_at DESC LIMIT 15;';
          connection.query(query, function(err, results){
            if(err || typeof results[0] == 'undefined'){
              res.send('0');
            } else {
              res.send(results);
            }
          });
        }
      });
    } else {
      var query = 'SELECT A.asin, A.registered_at, A.comment, A.point, A.register_number, B.book_name, B.author_name'
                + ' FROM ( SELECT * FROM register_book WHERE user_id = "'
                + user_id + '") AS A INNER JOIN books AS B'
                + ' ON A.asin = B.asin ORDER BY A.registered_at DESC LIMIT 15 OFFSET ' + offset + ';';
      connection.query(query, function(err, results){
        if(err || typeof results[0] == 'undefined'){
          res.send('0');
        } else {
          res.send(results);
        }
      });
    }
  } else if (str.match(/registered_wantbooks/)){
    var query = 'SELECT A.asin, A.registered_at, B.book_name, B.author_name'
              + ' FROM ( SELECT * FROM register_wantbook WHERE user_id = "'
              + user_id + '") AS A INNER JOIN books AS B'
              + ' ON A.asin = B.asin ORDER BY A.registered_at DESC LIMIT 15 OFFSET ' + offset + ';';
    connection.query(query, function(err, results){
      if(err || typeof results[0] == 'undefined'){
        res.send('0');
      } else {
        res.send(results);
      }
    });
  }
});

module.exports = router;
