var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var compression = require('compression');
var helmet = require('helmet');
var MySQLStore = require('express-mysql-session')(session);
var options = {
  host: 'XXXXXXXXXXXXXXXXXXXXX',
  port: 3306,
  user: 'YYYYYYYYYYYYYYY',
  password: 'ZZZZZZZZZZZZZZ',
  database: 'WWWWWWWWWWWWWWW'
};
var routes = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var search_books = require('./routes/search_books');
var search = require('./routes/search');
var register_user = require('./routes/register_user');
var login = require('./routes/login');
var logout = require('./routes/logout');
var author = require('./routes/author');
var search_user = require('./routes/search_user');
var userdata = require('./routes/userdata');
var follow = require('./routes/follow');
var register_book = require('./routes/register_book');
var following = require('./routes/following');
var follower = require('./routes/follower');
var register_wantbook = require('./routes/register_wantbook');
var indicate_registered_books = require('./routes/indicate_registered_books');
var setUser = require('./setUser');
var settings = require('./routes/settings');
var iine = require('./routes/iine');
var readbooks_num = require('./routes/readbooks_num');
var wantreadbooks_num = require('./routes/wantreadbooks_num');
var number_of_review = require('./routes/number_of_review');
var number_of_wantread = require('./routes/number_of_wantread');
var number_of_iine = require('./routes/number_of_iine');
var read_or_not = require('./routes/read_or_not');
var want_or_not = require('./routes/want_or_not');
var evaluation = require('./routes/evaluation');
var comment = require('./routes/comment');
var send_comment = require('./routes/send_comment');
var set_image = require('./routes/set_image');
var set_introduction = require('./routes/set_introduction');
var set_user_name = require('./routes/set_user_name');
var set_password = require('./routes/set_password');
var show_info = require('./routes/show_info');
var following_num = require('./routes/following_num');
var follower_num = require('./routes/follower_num');
var number_of_comment = require('./routes/number_of_comment');
var write_comment = require('./routes/write_comment');
var change_sort = require('./routes/change_sort');
var bells = require('./routes/bells');
var isBell = require('./routes/isBell');
var more_index = require('./routes/more_index');
var iine_or_not = require('./routes/iine_or_not');
var more_books = require('./routes/more_books');
var check_user_id = require('./routes/check_user_id');
var pre_search_books = require('./routes/pre_search_books');
var pre_search_user = require('./routes/pre_search_user');
var exit = require('./routes/exit');
var follow_or_not = require('./routes/follow_or_not');

var app = express();

app.use(helmet());
app.use(compression({
  threshold: 0,
  level: 7,
  memLevel: 7
}));
// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'XXXXXXXXXXXXXXX',
  store: new MySQLStore(options),
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 200000
  }
}));

app.use('/', setUser, routes);
app.use('/users', users);
app.use('/books', setUser, books);
app.use('/pre_search_books', pre_search_books);
app.use('/search_books', setUser, search_books);
app.use('/search', search);
app.use('/check_user_id', check_user_id);
app.use('/register_user', register_user);
app.use('/login', login);
app.use('/logout', logout);
app.use('/author', setUser, author);
app.use('/pre_search_user', pre_search_user);
app.use('/search_user', setUser, search_user);
app.use('/userdata', setUser, userdata);
app.use('/follow', follow);
app.use('/register_book', setUser, register_book);
app.use('/following', setUser, following);
app.use('/follower', setUser, follower);
app.use('/follow_or_not', follow_or_not);
app.use('/register_wantbook', register_wantbook);
app.use('/indicate_registered_books', indicate_registered_books);
app.use('/settings', setUser, settings);
app.use('/iine', iine);
app.use('/readbooks_num', readbooks_num);
app.use('/wantreadbooks_num', wantreadbooks_num);
app.use('/number_of_review', number_of_review);
app.use('/number_of_wantread', number_of_wantread);
app.use('/number_of_iine', number_of_iine);
app.use('/read_or_not', read_or_not);
app.use('/want_or_not', want_or_not);
app.use('/evaluation', evaluation);
app.use('/comment', comment);
app.use('/send_comment', send_comment);
app.use('/set_image', setUser, set_image);
app.use('/set_introduction', setUser, set_introduction);
app.use('/set_user_name', setUser, set_user_name);
app.use('/set_password', setUser, set_password);
app.use('/show_info', setUser, show_info);
app.use('/following_num', following_num);
app.use('/follower_num', follower_num);
app.use('/number_of_comment', number_of_comment);
app.use('/write_comment', setUser, write_comment);
app.use('/change_sort', change_sort);
app.use('/bells', setUser, bells);
app.use('/isBell', isBell);
app.use('/more_index', more_index);
app.use('/iine_or_not', iine_or_not);
app.use('/more_books', more_books);
app.use('/exit', exit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('ページが見つかりません。 Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('Error has occurred here ' + err + ' This is error code ' + err.code + ' Message is as ' + err.message + ' And this is error status ' + err.status);
  //handleDisconnect();
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
