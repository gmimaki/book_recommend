var mysql = require('mysql');

var dbConfig = {
  host: 'XXXXXXXXXXXXXXXXXXXXXX',
  user: 'YYYYYYYYYYYYYYYYYY',
  password: 'ZZZZZZZZZZZ',
  database: 'WWWWWWWWWWWWW'
};

var connection = mysql.createConnection(dbConfig);
//HerokuのMysqlのためのハック
setInterval(function(){
  connection.query('SELECT 1');
}, 5000);
module.exports = connection;
