//more_books.js
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');
var async = require('async');

router.get('/:asin_offset', function(req, res, next){
  var asin_offset = req.params.asin_offset;
  asin_offset = asin_offset.split('_');
  var asin = asin_offset[0];
  asin = anti.antiSQLInjection(asin);
  var offset = parseInt(asin_offset[1]);
  var my_id = req.session.user_id;
  //数字.matchはエラーになるらしい
  if(Number.isFinite(offset) && my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var followQuery = "SELECT A.follow_id FROM (SELECT * FROM follows WHERE user_id = '" + my_id
                    + "') AS A INNER JOIN (SELECT user_id, asin FROM register_book WHERE "
                    + "asin = '" + asin + "') AS B ON A.user_id = B.user_id;";
    var evaluateQuery = "SELECT BR.asin, BR.comment, BR.point, US.user_id, US.user_name, US.image, DATE_FORMAT(BR.registered_at, '%Y/%m/%d %H:%i:%s') AS registered_at, BR.register_number FROM "
                      + "(SELECT * FROM register_book WHERE asin = '" + asin + "' ORDER BY registered_at DESC) AS BR "
                      + 'INNER JOIN (SELECT user_id, user_name, image FROM users) AS US ON BR.user_id = US.user_id '
                      + "ORDER BY US.user_id = '" + my_id + "' DESC";
    connection.query(followQuery, function(err, follow){
      if(typeof follow[0] != 'undefined'){
        var follow_length = follow.length;
        var count = 1;
        async.mapSeries(follow, function(data, next){
          evaluateQuery += ", US.user_id = '" + data.follow_id + "' DESC";
          if(count === follow_length){
            evaluateQuery += ', comment DESC LIMIT 15 OFFSET ' + offset + ';';
          }
          count++;
          next(null, data);
        }, function(err, follow){
          connection.query(evaluateQuery, function(err, books){
            if(typeof books[0] != 'undefined'){
              res.send(books);
            } else {
              res.send('0');
            }
          });
        });
      } else {
        evaluateQuery += ', comment DESC LIMIT 15 OFFSET ' + offset + ';';
        connection.query(evaluateQuery, function(err, books){
          if(typeof books[0] != 'undefined'){
            res.send(books);
          } else {
            res.send('0');
          }
        });
      }
    });
  } else {
    res.send('0');
  }
});

module.exports = router;
