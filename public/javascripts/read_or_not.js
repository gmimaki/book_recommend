function asyncPrepareReadOrNot(){
  var register_book_elements = document.getElementsByClassName('register_book');
  for(var i = 0; i < register_book_elements.length; i++){
    var asin = $(register_book_elements[i]).attr("value");
    asyncReadOrNot(register_book_elements[i], asin);
  }
}

function asyncReadOrNot(element, asin){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          changeTextOfReadOrNot(req.responseText, element);
      }
    }
  }
  req.open('GET', '/read_or_not/' + asin, true);
  req.send(null);
}

function changeTextOfReadOrNot(readornot, element){
  if(readornot == '1'){
    element.innerHTML = '<i class="fa fa-pencil-square icons" style="font-size:4.0rem" aria-hidden="true"></i>';
  } else if(readornot == "0"){
    element.innerHTML = '<i class="fa fa-pencil-square-o icons" style="font-size:4.0rem" aria-hidden="true"></i>';
  }
}
