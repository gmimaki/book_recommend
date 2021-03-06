//index.js
var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    //自分のコメントとフォローしてる人のコメント表示ている。
    //pointとcommentをnullにして、pointがnullだったら読みたい本になるようにejsでやればよい
    var query = 'SELECT A.follow_id AS follow_id, B.user_name AS user_name, B.user_id AS user_id, B.image AS image, '
              + 'C.asin AS asin, D.book_name AS book_name, D.author_name AS author_name,'
              + " C.comment AS comment, C.point AS point, DATE_FORMAT(C.registered_at, '%Y/%m/%d %H:%i:%s') AS registered_at, C.register_number AS register_number"
              + ' FROM (SELECT follow_id FROM follows WHERE user_id = "' + my_id
              + '" ) AS A INNER JOIN (SELECT user_id, user_name, image FROM users) AS B'
              + ' ON A.follow_id = B.user_id INNER JOIN (SELECT user_id, asin, comment, point, registered_at , register_number FROM register_book) AS C'
              + ' ON B.user_id = C.user_id INNER JOIN (SELECT asin, book_name, author_name FROM books) AS D'
              + ' ON C.asin = D.asin UNION SELECT E.user_id AS user_id, E.user_name AS user_name, E.user_id'
              + ' AS user_id, E.image AS image, F.asin AS asin, G.book_name AS book_name, G.author_name AS author_name,'
              + " F.comment AS comment, F.point AS point, DATE_FORMAT(F.registered_at, '%Y/%m/%d %H:%i:%s') AS registered_at, F.register_number AS register_number FROM"
              + ' (SELECT user_id, user_name, image FROM users WHERE user_id = "' + my_id + '") AS E'
              + ' INNER JOIN (SELECT user_id, asin, comment, point, registered_at, register_number FROM register_book)'
              + ' AS F ON E.user_id = F.user_id INNER JOIN (SELECT book_name, author_name, asin FROM books)'
              + ' AS G ON F.asin = G.asin UNION SELECT H.follow_id AS follow_id, I.user_name AS user_name, I.user_id AS user_id, I.image AS image, '
              + 'J.asin AS asin, K.book_name AS book_name, K.author_name AS author_name, NULL AS comment, NULL AS point, '
              + "DATE_FORMAT(J.registered_at , '%Y/%m/%d %H:%i:%s') AS registered_at, NULL AS register_number FROM (SELECT follow_id FROM follows "
              + ' WHERE user_id = "'
              + my_id + '" ) AS H INNER JOIN (SELECT user_id, user_name, image FROM users) AS I ON H.follow_id = I.user_id '
              + 'INNER JOIN (SELECT user_id, asin, registered_at FROM register_wantbook) AS J ON I.user_id = J.user_id INNER JOIN '
              + '(SELECT asin, book_name, author_name FROM books) AS K ON J.asin = K.asin UNION SELECT L.user_id AS user_id, '
              + 'L.user_name AS user_name, L.user_id AS user_id, L.image AS image, M.asin AS asin, N.book_name AS book_name, N.author_name AS author_name, '
              + "NULL AS comment, NULL AS point, DATE_FORMAT(M.registered_at, '%Y/%m/%d %H:%i:%s') AS registered_at, NULL AS register_number FROM "
              + '(SELECT user_id, user_name, image FROM users WHERE user_id = "' + my_id + '") AS L '
              + 'INNER JOIN (SELECT user_id, asin, registered_at FROM register_wantbook) AS M ON L.user_id = M.user_id '
              + 'INNER JOIN (SELECT book_name, author_name, asin FROM books) AS N ON M.asin = N.asin '
              + 'ORDER BY registered_at DESC LIMIT 15;';
    connection.query(query, function(err, timeline){
      if(typeof timeline[0] != 'undefined'){
        res.render('index', {
          title: 'Sophiliar',
          Timeline: timeline
        });
      } else {
        res.render('index', {
          title: 'Sophiliar'
        });
      }
    });
  } else {
    res.render('index', {
      title: 'Sophiliar',
      btns: '1'
    });
  }
});

module.exports = router;
