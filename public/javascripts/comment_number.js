function asyncPrepareCommentNumber(){
  var comment_elements = document.getElementsByClassName('number_of_comment');
  for(var i = 0; i < comment_elements.length; i++){
    var register_number = $(comment_elements[i]).attr("value");
    asyncCommentNumber(comment_elements[i], register_number);
  }
}

function asyncCommentNumber(element, register_number){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          changeTextOfCommentNumber(req.responseText, element);
      }
    }
  }
  req.open('GET', '/number_of_comment/' + register_number, true);
  req.send(null);
}

function changeTextOfCommentNumber(number_of_comment, element){
  if(number_of_comment != "0"){
    element.innerHTML = number_of_comment;
  } else {
    element.innerHTML = '';
  }
}
