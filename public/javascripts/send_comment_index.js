function asyncSendComment(element, comment, register_number){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          var changedText = $(element).parent("div").children(".comments")[0];
          asyncComment(changedText, register_number);
          element.reset();
          asyncPrepareCommentNumber();
      }
    }
  }
  req.open('POST', '/send_comment/' + register_number, true);
  req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  req.send(encodeURIComponent(comment));
}
