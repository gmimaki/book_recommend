function asyncComment(element, register_number){
  var req = getXHR();
    req.onreadystatechange = function(){
      if(req.readyState == 4){
        if(req.status == 200){
            indicateComments(req.responseText, element);
        }
      }
    }
    req.open('GET', '/comment/' + register_number, true);
    req.send(null);
}
function indicateComments(comments, element){
  var text = '';
  comments = comments.substr(0, comments.length - 1);
  comments = comments.substr(1);
  comments = comments.split('},{');
  comments = $.grep(comments, function(e){return e !== "";});
  text += '<div class="commetList">'
  var register_number = 0;
  for(var i = 0; i < comments.length; i++){
    if(i == comments.length - 1 && i >= 1){
      comments[i] = '{' + comments[i];
    } else if(i >= 1 && i != comments.length - 1){
      comments[i] = '{' + comments[i] + '}';
    } else if(i == 0 && i != comments.length - 1){
      comments[i] = comments[i] + '}';
    }
    var info = JSON.parse(comments[i]);
    var registered_time = new Date(info.commented_at);
    registered_time = fixDate(registered_time);
    register_number = info.register_number;
    text += '<div class="each_comment"><div class="row"><div class="col-xs-2 col-md-1 col-sm-1">';
    text += '<img src="' + info.image + '" width="30" height="30" class="img-rounded"></div><div class="col-xs-10 col-md-11 col-sm-11>"';
    text += '<p><a href="/userdata/' + info.user_id + '">' + info.user_name + '</a></p>';
    text += '<p>' + info.comment + '</p>';
    text += '<h6>' + registered_time + '</h6>';
    text += '</div></div>'
  }
  text += '</div>'
  element.innerHTML = text;
}
