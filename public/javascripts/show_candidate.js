function show_books_candidate(keyword, element){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
        var results = req.responseText;
        var text = '<table class="table table-hover">';
          var keywords = results.substr(0, results.length - 1);
          keywords = keywords.substr(1);
          keywords = keywords.split('},{');
          keywords = $.grep(keywords, function(e){return e !== "";});
          for(var i = 0; i < keywords.length; i++){
            if(i == keywords.length - 1 && i >= 1){
              keywords[i] = '{' + keywords[i];
            } else if(i >= 1 && i != keywords.length - 1){
              keywords[i] = '{' + keywords[i] + '}';
            } else if(i == 0 && i != keywords.length - 1){
              keywords[i] = keywords[i] + '}';
            }
            var info = JSON.parse(keywords[i]);
            text += '<tr><td><a style="display:block; width:100%; height:100%;" href="/search_books/' + info.keyword + '">' + info.keyword + '</a></td></tr>';
          }
        text += '</table>'
        element.innerHTML = text;
      }
    }
  };
  req.open('POST', '/pre_search_books', true);
  req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  req.send(keyword);
}

function show_user_candidate(keyword, element){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
        var results = req.responseText;
        var text = '<table class="table table-hover">';
          var keywords = results.substr(0, results.length - 1);
          keywords = keywords.substr(1);
          keywords = keywords.split('},{');
          keywords = $.grep(keywords, function(e){return e !== "";});
          for(var i = 0; i < keywords.length; i++){
            if(i == keywords.length - 1 && i >= 1){
              keywords[i] = '{' + keywords[i];
            } else if(i >= 1 && i != keywords.length - 1){
              keywords[i] = '{' + keywords[i] + '}';
            } else if(i == 0 && i != keywords.length - 1){
              keywords[i] = keywords[i] + '}';
            }
            var info = JSON.parse(keywords[i]);
            text += '<tr><td><a style="display:block; width:100%; height:100%;" href="/userdata/' + info.user_id + '"><img src="' + info.image + '" width="35" height="35">'
                 + info.user_name + ' / ' + info.user_id + '</a></td></tr>';
          }
        text += '</table>'
        element.innerHTML = text;
      }
    }
  };
  req.open('POST', '/pre_search_user', true);
  req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  req.send(keyword);
}
