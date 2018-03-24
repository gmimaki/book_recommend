//books.js
//ほんのページ
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var async = require('async');
var anti = require('../anti');

router.get('/:asin', function(req, res, next){
  var my_id = req.session.user_id;
  var asin = req.params.asin;
  if(my_id){
    asin = anti.antiSQLInjection(asin);
    my_id = anti.antiSQLInjection_user_id(my_id);
    var query = 'SELECT * FROM books WHERE asin = "' + asin + '";';
    var followQuery = "SELECT A.follow_id FROM (SELECT * FROM follows WHERE user_id = '" + my_id
                    + "') AS A INNER JOIN (SELECT user_id, asin FROM register_book WHERE "
                    + "asin = '" + asin + "') AS B ON A.user_id = B.user_id;";
    var evaluateQuery = "SELECT BR.asin, BR.comment, BR.point, US.user_id, US.user_name, US.image, DATE_FORMAT(BR.registered_at, '%Y/%m/%d %H:%i:%s') AS registered_at, BR.register_number FROM "
                      + "(SELECT * FROM register_book WHERE asin = '" + asin + "' ORDER BY registered_at DESC) AS BR "
                      + 'INNER JOIN (SELECT user_id, user_name, image FROM users) AS US ON BR.user_id = US.user_id '
                      + 'ORDER BY US.user_id = "' + my_id + '" DESC';
    /*--小数点以下第Ｎ位を四捨五入する
    FLOOR( 数値 * POW( 10, N-1 ) + 0.5 ) / POW( 10, N-1 )*/
    var averageQuery = 'SELECT (FLOOR(AVG(point) * POW(10, 1) + 0.5)) / POW(10, 1) AS average FROM register_book WHERE asin = "'
                     + asin + '";';
    connection.query(query, function(err, books){
      var books = books;
      if(err){
        res.redirect('/error');
      }
      if(books[0]){
        if(err){
          res.redirect('/error');
        }
        connection.query(averageQuery, function(err, avg){
          books[0].average = avg[0].average
          if(books[0].average == null){
            books[0].average = '-';
          }
          connection.query(followQuery, function(err, follow){
            if(follow[0]){
              var follow_length = follow.length;
              var count = 1;
              async.mapSeries(follow, function(data, next){
                evaluateQuery += ", US.user_id = '" + data.follow_id + "' DESC";
                if(count === follow_length){
                  evaluateQuery += ', comment DESC LIMIT 15;';
                }
                count++;
                next(null, data);
              }, function(err, follow){
                connection.query(evaluateQuery, function(err, evaluates){
                  res.render('books', {
                    title: books[0].book_name,
                    average: books[0].average,
                    bookList: books[0],
                    evaluateList: evaluates
                  });
                });
              });
            } else {
              evaluateQuery += ', comment DESC LIMIT 15;';
              connection.query(evaluateQuery, function(err, evaluates){
                res.render('books', {
                  title: books[0].book_name,
                  average: books[0].average,
                  bookList: books[0],
                  evaluateList: evaluates
                });
              });
            }
          });
        });
      } else {
        res.redirect('/error');
      }
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
