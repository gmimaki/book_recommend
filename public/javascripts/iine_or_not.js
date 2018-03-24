function asyncPrepareIineOrNot(){
  var register_iine_elements = document.getElementsByClassName('register_iine');
  for(var i = 0; i < register_iine_elements.length; i++){
    var register_number = $(register_iine_elements[i]).attr("value");
    asyncIineOrNot(register_iine_elements[i], register_number);
  }
}
function asyncIineOrNot(element, register_number){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          changeTextOfIine(req.responseText, element);
      }
    }
  }
  req.open('GET', '/iine_or_not/' + register_number, true);
  req.send(null);
}
function changeTextOfIine(IineOrNot, element){
  if(IineOrNot == '0'){
    element.innerHTML = '<i class="fa fa-heart-o icons" style="font-size:3.0rem" aria-hidden="true"></i>';
  } else if(IineOrNot == '1'){
    element.innerHTML = '<i class="fa fa-heart icons" style="font-size:3.0rem" aria-hidden="true"></i>';
  }
}
