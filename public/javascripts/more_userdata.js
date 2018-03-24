function more(){
  var more = document.getElementById('more');
  var offset = Number($(more).attr("value")) + 15;
  var books = $('.active').attr("id");
  var user_id = $('#registered_books').attr("value");
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
        if(req.responseText != '0'){
          var more_field = document.createElement('ul');
          $(more).before(more_field);
          $(more).attr({"value": offset});
          more_field.innerHTML = indicateRegisteredBooks(req.responseText);
          asyncPrepareReadOrNot();
          asyncPrepareWantOrNot();
          asyncPrepareIineNumber();
          asyncPrepareIineOrNot();
          asyncPrepareNumOfReview();
          asyncPrepareNumOfWantRead();
          asyncPrepareCommentNumber();
          $(more).find('button').removeClass('active');
        } else {
          var all_done = document.createElement('p');
          $(more).before(all_done);
          $(all_done).addClass('all_done');
          all_done.innerHTML = '<p class="btn btn-default btn-block btn-lg">すべて読み込み済みです。</p>';
          $(more).hide();
        }
      }
    }
  }
  var user_id_and_offset = user_id + '=' + offset;
  req.open('POST', '/indicate_registered_books/' + user_id_and_offset, true);
  req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  req.send(books);
}
