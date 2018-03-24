function asyncFollowOrNot(element, user_id){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
        if(req.responseText === '0'){
           element.innerHTML = '<button class="btn btn-info">フォローする</button>';
        } else if(req.responseText === '1'){
           element.innerHTML = '<button class="btn btn-default">フォロー中</button>';
        } else if(req.responseText === '2'){
           element.innerHTML = '<button class="btn btn-default" disabled="disabled">You</button>';
        }
      }
    }
  }
  req.open('GET', '/follow_or_not/' + user_id, true);
  req.send(null);
}
