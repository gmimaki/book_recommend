//register_book.js
//本を登録する

var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:asin', function(req, res, next){
  var asin = req.params.asin;
  asin = anti.antiSQLInjection(asin);
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var registerOrNotQuery = 'SELECT * FROM register_book WHERE user_id = "'
                           + my_id + '" AND asin = "' + asin + '";'
    connection.query(registerOrNotQuery, function(err, registerOrNot){
      var registerOrNot = registerOrNot;
      if(typeof registerOrNot[0] != 'undefined'){
        var query = 'SELECT * FROM books WHERE asin = "' + asin + '";';
        connection.query(query, function(err, book){
          if(typeof book[0] != 'undefined'){
            res.render('register_book', {
              title: book[0].book_name,
              bookList: book[0],
              comment: registerOrNot[0].comment,
              point: registerOrNot[0].point
            });
          } else {
            res.redirect('error');
          }
        });
      } else {
        var query = 'SELECT * FROM books WHERE asin = "' + asin + '";';
        connection.query(query, function(err, book){
          if(typeof book[0] != 'undefined'){
            res.render('register_book', {
              title: book[0].book_name,
              bookList: book[0],
              comment: '',
              point: 2.5
            });
          } else {
            res.redirect('/error');
          }
        });
      }
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/:asin', function(req, res, next){
  var my_id = req.session.user_id;
  var comment = req.body.comment;
  if(comment != ''){
    comment = anti.antiSQLInjection(comment);
  }
  var point = req.body.point;
  point = anti.antiSQLInjection(point);
  var asin = req.params.asin;
  asin = anti.antiSQLInjection(asin);
  var registered_at = moment().format('YYYY-MM-DD HH:mm:ss');
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var registerOrNotQuery = 'SELECT * FROM register_book WHERE user_id = "'
                           + my_id + '" AND asin = "' + asin + '";'
    connection.query(registerOrNotQuery, function(err, registerOrNot){
      if(typeof registerOrNot[0] != 'undefined'){
        var updateQuery = '';
        updateQuery = 'UPDATE register_book SET comment = "' + comment + '", point = '
                    + point + ' WHERE user_id = "' + my_id + '" AND asin = "'
                    + asin + '";';
        connection.query(updateQuery, function(err, registerBook){
          res.redirect('/books/' + asin);
        });
      } else {
        var registerQuery = '';
        registerQuery = 'INSERT INTO register_book(user_id, asin, registered_at, comment, point) VALUES ("'
                      + my_id + '", "' + asin + '", "' + registered_at
                      + '", "' + comment + '", ' + point + ');';
        connection.query(registerQuery, function(err, registerBook){
          res.redirect('/books/' + asin);
        });
      }
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
