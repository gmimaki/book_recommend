function asyncPrepareWantOrNot(){
  var register_wantbook_elements = document.getElementsByClassName('register_wantbook');
  for(var i = 0; i < register_wantbook_elements.length; i++){
    var asin = $(register_wantbook_elements[i]).attr("value");
    asyncWantOrNot(register_wantbook_elements[i], asin);
  }
}

function asyncWantOrNot(element, asin){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          changeTextOfWantOrNot(req.responseText, element);
      }
    }
  }
  req.open('GET', '/want_or_not/' + asin, true);
  req.send(null);
}

function changeTextOfWantOrNot(wantornot, element){
  if(wantornot == '1'){
    element.innerHTML = '<i class="fa fa-check-square icons" style="font-size:4.0rem" aria-hidden="true"></i>';
  } else if(wantornot == "0"){
    element.innerHTML = '<i class="fa fa-check-square-o icons" style="font-size:4.0rem" aria-hidden="true"></i>';
  }
}
