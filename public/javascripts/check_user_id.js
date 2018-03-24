function check_user_id(user_id){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          if(req.responseText == '1'){
            document.getElementById('check_user_id').innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ユーザーID ' + user_id + ' は既に登録されております。'
          } else if(req.responseText == '0'){
            document.getElementById('check_user_id').innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ユーザーID ' + user_id + ' は使用可能です。'
          }
      }
    }
  }
  req.open('GET', '/check_user_id/' + user_id, true);
  req.send(null);
}
