function asyncSend(element, books){
  var user_id = $(element).attr("value");
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          var bookList = document.getElementById('bookList');
          bookList.innerHTML = indicateRegisteredBooks(req.responseText);
          asyncPrepareNumOfReview();
          asyncPrepareNumOfWantRead();
          asyncPrepareReadOrNot();
          asyncPrepareWantOrNot();
          asyncPrepareIineNumber();
          asyncPrepareCommentNumber();
          asyncPrepareIineOrNot();
      }
    }
  }
  req.open('POST', '/indicate_registered_books/' + user_id, true);
  req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  req.send(books);
}

function indicateRegisteredBooks(booksInfo){
  var text = '';
  var books = booksInfo.substr(0, booksInfo.length - 1);
  books = books.substr(1);
  books = books.split('},{');
  books = $.grep(books, function(e){return e !== "";});
  for(var i = 0; i < books.length; i++){
    if(i == books.length - 1 && i >= 1){
      books[i] = '{' + books[i];
    } else if(i >= 1 && i != books.length - 1){
      books[i] = '{' + books[i] + '}';
    } else if(i == 0 && i != books.length - 1){
      books[i] = books[i] + '}';
    }
    var info = JSON.parse(books[i]);
    var registered_time = fixDate(info.registered_at);
    if(info.point != null){
      text += '<li style="margin-top:15px; margin-bottom:30px;"><div class="row"><div class="col-xs-4 col-md-3 col-sm-3">';
      text += '<a href="/books/' + info.asin + '"><img src="http://images-jp.amazon.com/images/P/' + info.asin + '.09.LZZZZZZZ.jpg" style="width:100%;"></a>';
      text += '<div class="row"><div class="col-xs-6"><p><a class="register_book" value="' + info.asin + '" href="/register_book/' + info.asin + '"></a></p>';
      text += '<p class="num_of_review" value="' + info.asin + '"></p></div><div class="col-xs-6"><p class="register_wantbook" value="' + info.asin;
      text += '" onclick="asyncWant(this)"></p><p class="num_of_wantread" value="' + info.asin + '"></p></div></div></div>';
      text += '<div class="col-md-1 col-sm-1"></div><div class="col-xs-8 col-md-8 col-sm-8">';
      text += '<h3><a href="/books/' + info.asin + '">' + info.book_name + '</a></h3><h4><a href="/author/' + info.author_name + '">';
      text += info.author_name + '</a></h4><h4>おすすめ度: ' + info.point + ' <small>/5</small></h4><p>' + info.comment + '</p>';
      text += '<p>' + registered_time + '</p><div class="comment"><div class="row">';
      text += '<p onclick="asyncIine(this, ' + info.register_number + ')" class="register_iine col-xs-3" value="' + info.register_number + '"></p>';
      text += '<p class="number_of_iine col-xs-3" style="font-size:2.0rem;" value="' + info.register_number + '"></p>';
      text += '<a class="col-xs-3 comment_icon"  href="/write_comment/' + info.register_number + '"><i class="fa fa-comment-o icons" style="font-size:3.0rem;" aria-hidden="true"></i></a>';
      text += '<p class="number_of_comment col-xs-3" style="font-size:2.0rem;" value="' +info.register_number + '"></p></div></div></div></div></li>';
    } else {
      text += '<li style="margin-bottom:30px;"><h4><a href="/books/' + info.asin + '">' + info.book_name + '</a></h4><div class="row">';
      text += '<div class="col-xs-4 col-md-3 col-sm-3"><a href="/books/' + info.asin + '"><img src="http://images-jp.amazon.com/images/P/';
      text += info.asin + '.09.LZZZZZZZ.jpg" style="width:100%;"></a></div><div class="col-md-1 col-sm-1"></div>';
      text += '<div class="col-xs-8 col-md-8 col-sm-8"><div class="row"><div class="col-md-3 col-sm-3">';
      text += '<h3 class="evaluation" value="' + info.asin + '"></h3></div><div class="col-md-1 col-sm-1"></div>';
      text += '<div class="col-md-8 col-sm-8"><h5 style="margin-top:20px;"><a href="/author/' + info.author_name + '">';
      text += info.author_name + '</a></h5></div></div><div class="row" style="margin-top:10px;"><div class="col-xs-4 col-md-3 col-sm-3">';
      text += '<p><a class="register_book" value="' + info.asin + '" href="/register_book/' + info.asin + '"></a></p>';
      text += '<p class="num_of_review" value="' + info.asin + '"></p></div><div class="col-xs-4 col-md-3 col-sm-3">';
      text += '<p class="register_wantbook" value="' + info.asin + '" onclick="asyncWant(this)"></p><p class="num_of_wantread" value="';
      text += info.asin + '"></p></div><div class="col-xs-4 col-md-6 col-sm-6"><a href="' + 'https://www.amazon.co.jp/' + info.book_name + '/dp/' + info.asin + '%3FSubscriptionId%3DAKIAIZCCZT5YEEPPJHHQ%26tag%3Dassocmimaki06-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3D' + info.asin + '" target="_blank"><button class="btn btn-default">'
      text += '購入</button></a></div></div class="row"></div></div></li>';
    }
  }
   return text;
}
