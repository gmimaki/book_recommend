var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var OperationHelper = require('apac').OperationHelper;
var cheerio = require('cheerio');
var anti = require('../anti');

router.get('/', function(req, res, next){
  res.render('index', {title: 'Sophiliar'});
});

router.post('/', function(req, res, next){
  if(req.headers.referer.match(/^https:\/\/sophiliar\.herokuapp\.com/)){
    var my_id = req.session.user_id;
    if(my_id){
      var searchword = req.body.search;
      var opHelper = new OperationHelper({
        awsId: 'XXXXXXXXXXXXXXXXXXXXX',
        awsSecret: 'YYYYYYYYYYYYYYYYYYYY',
        assocId: 'ZZZZZZZZZZZZZZZZZZ',
        AssociateTag: 'WWWWWWWWWWWWWWWW',
        endPoint: 'ecs.amazonaws.jp'
      });

      opHelper.execute('ItemSearch', {
        'SearchIndex': 'Books',
        'BrowseNode': 465610,
        'Keywords': searchword,
        'ResponseGroup': 'Small',
        'MinimumPrice': 10,
        'MaximumPrice': 8000
      }, function(err, results, xml){
        var $ = cheerio.load(xml);
        var resultArray = [];
        $("Items > Item").each(function(idx, item){
          resultArray[idx] = {};
          var ASIN = $(item).find("ASIN").text();
          resultArray[idx].asin = ASIN;
          var author = $(item).find("Author").text();
          author = anti.registerAPI(author);
          resultArray[idx].author_name = author;
          var title = $(item).find("Title").text();
          title = anti.registerAPI(title);
          resultArray[idx].book_name = title;
          var confirmQuery = 'SELECT * FROM books WHERE asin = "' + ASIN
                           + '";';
          var insertQuery = 'INSERT INTO books(book_name, author_name, asin) VALUES ("'
                          + title + '", "' + author + '", "' + ASIN + '");';
          connection.query(confirmQuery, function(err, rows){
            if(typeof rows[0] != 'undefined'){
            } else {
              connection.query(insertQuery, function(err, books){
              });
            }
          });
        });
        res.render('search_books', {
          title: searchword + 'の結果',
          bookList: resultArray,
          api: '0'
        });
      });
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
