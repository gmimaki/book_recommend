function more(){
  var more = document.getElementById('more');
  var offset = Number($(more).attr("value")) + 15;
  var asin = $(more).attr("class");
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
          asyncPrepareIineNumber();
          asyncPrepareCommentNumber();
          $(more).find('button').removeClass('active');
        } else {
          more_field.innerHTML = '<button class="btn btn-default btn-block btn-lg" disabled="disabled">すべて読み込み済みです。</button>';
          $(more).hide();
        }
      }
    }
  }
  var asin_offset = asin + '_' + offset;
  req.open('get', '/more_books/' + asin_offset, true);
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
    text += '<li style="margin-top:30px;"><div class="row"><div class="col-xs-2 col-md-1 col-sm-1">';
    text += '<img src="' + info.image + '" width="40" heigth="40" class="img-rounded"></div><div class="col-md-1 col-sm-1"></div>';
    text += '<div class="col-xs-10 col-md-10 col-sm-10"><h4><a href="/userdata/' + info.user_id + '">' + info.user_name + '</a></h4>';
    text += '<h4>おすすめ度: ' + info.point + '</h4><p>' + registered_time + '</p><div class="row"><p onclick="asyncIine(this, ';
    text += info.register_number + '" class="register_iine col-xs-2" value="' + info.register_number + '"></p>';
    text += '<p class="number_of_iine col-xs-2" value="' + info.register_number + '" style="margin-top:5px; font-size:2.0rem;"></p>';
    text += '<p class="write_comment col-xs-2"><a href="/write_comment/' + info.register_number + '"><i class="fa fa-comment-o icons" style="font-size:3.0rem;" aria-hidden="true"></i></a></p>';
    text += '<p class="number_of_comment col-xs-2" value="' + info.register_number + '" style="margin-top:5px; font-size:2.0rem"></p>';
    text += '</div></div></div></li>';
  }
  return text;
}
