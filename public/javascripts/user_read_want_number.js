function num_of_read(user_id){
  var readbooks_num = document.getElementById('readbooks_num');
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          readbooks_num.innerHTML = req.responseText;
      }
    }
  }
  req.open('GET', '/readbooks_num/' + user_id, true);
  req.send(null);
}

function num_of_wantread(user_id){
  var wantreadbooks_num = document.getElementById('wantreadbooks_num');
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          wantreadbooks_num.innerHTML = req.responseText;
      }
    }
  }
  req.open('GET', '/wantreadbooks_num/' + user_id, true);
  req.send(null);
}
