//author.js
//著者情報
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

router.get('/:author_name', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    var author_name = req.params.author_name.replace(/\s/g, '').replace(/・/g, '');
    var query = 'SELECT * FROM books WHERE replace(replace(replace(author_name, \' \', \'\'), \'　\', \'\'), \'・\', \'\') LIKE "%'
              + author_name + '%";';
    connection.query(query, function(err, rows){
      if(rows[0]){
        res.render('author', {
          title: rows[0].author_name,
          bookList: rows
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
