function asyncFollow(element, user_id){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          changeTextOfFollow(req.responseText, element);
      }
    }
  }
  req.open('GET', '/follow/' + user_id, true);
  req.send(null);
}

function changeTextOfFollow(followOrNot, element){
  if(followOrNot == 'follow'){
    element.innerHTML = '<button class="btn btn-default">フォロー中</button>';
  } else if(followOrNot == 'unfollow'){
    element.innerHTML = '<button class="btn btn-info">フォローする</button>';
  }
  var following_num_element = document.getElementById('following_num');
  if(typeof following_num_element != 'undefined'){
    var user_id = $(following_num_element).attr("value");
    asyncFollowing_num(following_num_element, user_id);
  }
  var follower_num_element = document.getElementById('follower_num');
  if(typeof follower_num_element != 'undefined'){
    var user_id = $(follower_num_element).attr("value");
    asyncFollower_num(follower_num_element, user_id);
  }
}
