function asyncFollowing_num(element, user_id){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          element.innerHTML = req.responseText;
      }
    }
  }
  req.open('GET', '/following_num/' + user_id, true);
  req.send(null);
}

function asyncFollower_num(element, user_id){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          element.innerHTML = req.responseText;
      }
    }
  }
  req.open('GET', '/follower_num/' + user_id, true);
  req.send(null);
}
