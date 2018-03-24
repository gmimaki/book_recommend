//search_books.js
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var async = require('async');
var anti = require('../anti');

router.get('/', function(req, res, next){
  var referer = req.headers.referer;
  if(req.headers.referer.match(/^https:\/\/sophiliar\.herokuapp\.com/)){
    var my_id = req.session.user_id;
  //  if(my_id){
      res.render('search_books', {
        title: '本を検索'
      });
  //  } else {
    /*  res.redirect('/');
  }*/
  } else {
    res.redirect('/');
  }
});

router.get('/:keyword', function(req, res, next){
  if(req.headers.referer.match(/^https:\/\/sophiliar\.herokuapp\.com/)){
    var my_id = req.session.user_id;
    //if(my_id){
      var notFixedKeyword = req.params.keyword;
      if(notFixedKeyword == ""){
        res.render('search_books', {
          title: '本を検索'
        });
        return;
      }
      var keyword = anti.antiSQLInjection(notFixedKeyword);
      keyword = keyword.replace(/・/g, '');
      keyword = keyword.replace(/\s/g, '|').split('|');
      keyword = keyword.filter(function(e){return e !== "";});

      var query = 'SELECT * FROM books';
      var count = 0;
      async.each(keyword, function(i, callback){
        if(count >= 1){
          query += ' AND ';
        } else if(count === 0){
          query += ' WHERE ';
        }
        query += '(replace(replace(replace(author_name, \' \', \'\'), \'　\', \'\'), \'・\', \'\') LIKE "%'
              + keyword[count] + '%" OR replace(replace(replace(book_name, \' \', \'\'), \'　\', \'\'), \'・\', \'\') LIKE "%'
              + keyword[count] + '%")';
        if(count == keyword.length - 1){
            query += ';';
        }
        count++;
        callback();
      }, function(err){
          connection.query(query, function(err, rows){
            res.render('search_books', {
              title: notFixedKeyword + 'の結果',
              bookList: rows,
              api: '0'
            });
          });
      });
  //  } else {
    //  res.redirect('/');
    //}
  } else {
    res.redirect('/');
  }
});

router.post('/', function(req, res, next){
  if(req.headers.referer.match(/^https:\/\/sophiliar\.herokuapp\.com/)){
    var notFixedKeyword = req.body.search;
    if(notFixedKeyword == ""){
      res.render('search_books', {
        title: '本を検索',
      });
      return;
    }
    var keyword = anti.antiSQLInjection(notFixedKeyword);
    var my_id = req.session.user_id;
    keyword = keyword.replace(/・/g, '');
    keyword = keyword.replace(/\s/g, '|').split('|');
    keyword = keyword.filter(function(e){return e !== "";});

    var query = 'SELECT * FROM books';
    var count = 0;
    async.each(keyword, function(i, callback){
      if(count >= 1){
        query += ' AND ';
      } else if(count === 0){
        query += ' WHERE ';
      }
      query += '(replace(replace(replace(author_name, \' \', \'\'), \'　\', \'\'), \'・\', \'\') LIKE "%'
            + keyword[count] + '%" OR replace(replace(replace(book_name, \' \', \'\'), \'　\', \'\'), \'・\', \'\') LIKE "%'
            + keyword[count] + '%")';
      if(count == keyword.length - 1){
          query += ';';
      }
      count++;
      callback();
    }, function(err){
        connection.query(query, function(err, rows){
          res.render('search_books', {
            title: notFixedKeyword + 'の結果',
            bookList: rows,
            api: '0'
          });
        });
    });
  } else {
    res.redirect('/');
  }
});
module.exports = router;
