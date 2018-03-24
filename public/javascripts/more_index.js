function more(){
  var more = document.getElementById('more');
  var offset = Number($(more).attr("value")) + 15;
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
        var more_field = document.createElement('ul');
        $(more).before(more_field);
        if(req.responseText != '0'){
          $(more).attr({"value": offset});
          more_field.innerHTML = indicate_more(req.responseText);
          asyncPrepareIineOrNot();
          asyncPrepareReadOrNot();
          asyncPrepareWantOrNot();
          asyncPrepareIineNumber();
          asyncPrepareNumOfReview();
          asyncPrepareNumOfWantRead();
          asyncPrepareComment();
          asyncPrepareCommentNumber();
        } else {
          more_field.innerHTML = '<button class="btn btn-default btn-block btn-lg" disabled="disabled">すべて読み込み済みです。</button>';
          $(more).hide();
        }
      }
    }
  }
  req.open('get', '/more_index/' + offset, true);
  req.send(null);
}
function indicate_more(booksInfo){
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
      text += '<li style="margin-top:15px; margin-bottom:30px;"><div class="row"><div class="col-xs-3 col-md-1 col-sm-1">';
      text += '<a href="/userdata/"' + info.follow_id + '">' + '<img src="' + info.image + '" width="50" heigth="50" class="img-rounded"></a></div><div class="col-xs-9 col-md-3 col-sm-3">';
      text += '<h3><a href="/userdata/' + info.follow_id + '">' + info.user_name + '</a><h3></div><div class="col-xs-12 col-md-8 col-sm-8">';
      text += '<h3 style="margin-top: 0;"><a href="/books/' + info.asin + '">' + info.book_name + '</a></h3>';
      text += '<h4><a href="/author/' + info.author_name + '">' + info.author_name + '</a></h4></div></div>';
      text += '<div class="row"><div class="col-xs-4 col-md-3 col-sm-3"><a href="/books/' + info.asin + '"><img src="http://images-jp.amazon.com/images/P/';
      text += info.asin + '.09.LZZZZZZZ.jpg" style="width:100%;"></a><div class="row"><div class="col-xs-6">';
      text += '<p><a class="register_book" value="' + info.asin + '" href="/register_book/' + info.asin + '"></a></p>';
      text += '<p class="num_of_review" value="' + info.asin + '"></p></div><div class="col-xs-6"><p class="register_wantbook" value="';
      text += info.asin + '" onclick="asyncWant(this)"></p><p class="num_of_wantread" value="' + info.asin + '"></p></div></div></div>';
      text += '<div class="col-md-1 col-sm-1"></div><div class="col-xs-8 col-md-6 col-sm-6"><h4>おすすめ度: ' + info.point + ' /5</h4>';
      text += '<p>' + info.comment + '</p><p>' + registered_time + '</p><div class="comment"><div class="row">';
      text += '<p onclick="asyncIine(this, ' + info.register_number + ')" class="register_iine col-xs-3" value="' + info.register_number + '"></p>';
      text += '<p class="number_of_iine col-xs-3" style="font-size:2.0rem;" value="' + info.register_number + '"></p>';
      text += '<a class="col-xs-3 comment_icon"  href="/write_comment/' + info.register_number + '"><i class="fa fa-comment-o icons" style="font-size:3.0rem;" aria-hidden="true"></i></a>';
      text += '<p class="number_of_comment col-xs-3" style="font-size:2.0rem;" value="' + info.register_number + '"></p></div>';
      text += '<p class="comments" value="' + info.register_number + '" style="margin-top:10px;"></p>';
      text += '<form class="post_comment" method="post" value="' + info.register_number + '">';
      text += '<input type="text" class="comment_text" placeholder="コメントする" name="comment" style="width:65%;">';
      text += '<button type="submit" class="btn btn-default btn-sm">送信</button>';
      text += '</form></div></div><div class="col-sm-2 co-md-2 hidden-xs"><a href="https://px.a8.net/svt/ejp?a8mat=2TEDV0+CKHHAY+38M2+67C4H" target="_blank" rel="nofollow"><img border="0" width="125" height="125" alt="" src="https://www26.a8.net/svt/bgt?aid=170312364760&wid=002&eno=01&mid=s00000015113001042000&mc=1"></a><img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=2TEDV0+CKHHAY+38M2+67C4H" alt=""></div></div></li>';
    } else {
      text += '<li style="margin-top:15px; margin-bottom:30px;"><div class="row"><div class="col-xs-3 col-md-1 col-sm-1">';
      text += '<a href="/userdata/' + info.follow_id + '">' + '<img src="' + info.image + '" width="50" height="50" class="img-rounded"></a></div><div class="col-xs-9 col-md-3 col-sm-3">';
      text += '<h4><a href="/userdata/' + info.follow_id + '">' + info.user_name + '</a></h4></div></div>';
      text += '<h4><a href="/books/' + info.asin + '">' + info.book_name + '</a>を読みたい本に登録</h4>';
      text += '<h5><a href="/author/' + info.author_name + '">' + info.author_name + '</a></h5>';
      text += '<h6>' + registered_time + '</h6>';
      text += '</li>';
    }
  }
   text += '<div class="row"><div class="col-xs-12"><a href="https://px.a8.net/svt/ejp?a8mat=2TGARG+4Z7IMY+3CJQ+65EOH" target="_blank" rel="nofollow"><img border="0" width="468" height="240" alt="" src="https://www24.a8.net/svt/bgt?aid=170401660301&wid=002&eno=01&mid=s00000015623001033000&mc=1"></a><img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=2TGARG+4Z7IMY+3CJQ+65EOH" alt=""></div></div>';
   return text;
}
