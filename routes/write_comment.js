//write_comment.js

var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/:register_number', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    var register_number = req.params.register_number;
    register_number = anti.antiSQLInjection(register_number);
    var query = "SELECT A.book_name, A.asin, B.register_number, DATE_FORMAT(B.registered_at, '%Y/%m/%d %H:%i:%s') AS registered_at, B.comment, B.point, C.user_name, C.user_id, C.image FROM "
              + '(SELECT book_name, asin FROM books) AS A INNER JOIN '
              + '(SELECT register_number, user_id, asin, registered_at, comment, point FROM '
              + 'register_book WHERE register_number = ' + register_number
              + ') AS B ON A.asin = B.asin INNER JOIN (SELECT user_name, user_id, image FROM users) AS C'
              + ' ON B.user_id = C.user_id'
    connection.query(query, function(err, comment){
      if(err){
        res.redirect('/error');
      } else {
        if(typeof comment[0] != 'undefined'){
          res.render("write_comment", {
            title: comment[0].user_name,
            comment: comment[0]
          });
        } else {
          res.redirect('/error');
        }
      }
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
