function asyncPrepareIineNumber(){
  var iine_elements = document.getElementsByClassName('number_of_iine')
  for(var i = 0; i < iine_elements.length; i++){
    var register_number = $(iine_elements[i]).attr("value");
    asyncIineNumber(iine_elements[i], register_number);
  }
}

function asyncIineNumber(element, register_number){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          changeTextOfIineNumber(req.responseText, element);
      }
    }
  }
  req.open('GET', '/number_of_iine/' + register_number, true);
  req.send(null);
}

function changeTextOfIineNumber(number_of_iine, element){
  if(number_of_iine != "0"){
    element.innerHTML = number_of_iine;
  } else {
    element.innerHTML = '';
  }
}
