//pre_search_books.js
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var async = require('async');
var anti = require('../anti');

router.post('/', function(req, res, next){
  var keyword = req.body;
  keyword = Object.keys(keyword);
  if(typeof keyword[0] != 'undefined'){
    keyword = anti.antiSQLInjection(keyword[0]);
    var query = 'SELECT DISTINCT replace(replace(replace(author_name, \' \', \'\'), \'　\', \'\'), \'・\', \'\') AS keyword FROM books WHERE author_name LIKE "' + keyword + '%" '
              + 'UNION SELECT DISTINCT replace(replace(replace(book_name, \' \', \'\'), \'　\', \'\'), \'・\', \'\') AS keyword FROM books WHERE book_name LIKE "' + keyword + '%" '
              + 'LIMIT 10;';
    connection.query(query, function(err, results){
      res.send(results);
    });
  } else {
    res.send('[]');
  }
});

module.exports = router;
