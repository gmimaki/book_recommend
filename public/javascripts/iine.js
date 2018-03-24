function asyncIine(element, register_number){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          changeTextOfIine(req.responseText, element);
          asyncPrepareIineNumber();
      }
    }
  }
  req.open('GET', '/iine/' + register_number, true);
  req.send(null);
}
