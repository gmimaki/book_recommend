//bells.js

var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var anti = require('../anti');

router.get('/', function(req, res, next){
  var my_id = req.session.user_id;
  if(my_id){
    my_id = anti.antiSQLInjection_user_id(my_id);
    var query = 'SELECT A.register_number AS register_number, B.comment AS comment, B.commented_at AS commented_at, '
              + 'C.user_id AS user_id, C.user_name AS user_name, C.image AS image FROM (SELECT register_number, user_id FROM register_book WHERE user_id = "' + my_id + '") AS A '
              + 'INNER JOIN (SELECT register_number, user_id, comment, commented_at FROM comment) AS B ON A.register_number = B.register_number '
              + 'INNER JOIN (SELECT user_id, user_name, image FROM users) AS C ON B.user_id = C.user_id WHERE NOT C.user_id = "' + my_id + '" UNION '
              + 'SELECT D.register_number AS register_number, NULL AS comment, E.iined_at AS commented_at, '
              + 'F.user_id AS user_id, F.user_name AS user_name, F.image AS image FROM (SELECT register_number, user_id FROM register_book WHERE user_id = "' + my_id + '") AS D '
              + 'INNER JOIN (SELECT register_number, user_id, iined_at FROM iine) AS E ON D.register_number = E.register_number '
              + 'INNER JOIN (SELECT user_id, user_name, image FROM users) AS F ON E.user_id = F.user_id WHERE NOT F.user_id = "' + my_id + '" '
              + 'ORDER BY commented_at DESC LIMIT 60'
    connection.query(query, function(err, bells){
      if(typeof bells[0] != 'undefined'){
        res.send('1');
      } else {
        res.send('0');
      }
    });
  } else {
    res.send('0');
  }
});

module.exports = router;
