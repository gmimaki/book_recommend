function asyncPrepareNumOfWantRead(){
  var num_of_wantread_elements = document.getElementsByClassName('num_of_wantread');
  for(var i = 0; i < num_of_wantread_elements.length; i++){
    var asin = $(num_of_wantread_elements[i]).attr("value");
    asyncNumOfWantRead(num_of_wantread_elements[i], asin);
  }
}

function asyncNumOfWantRead(element, asin){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          element.innerHTML = '<p style="font-size:2.0rem">' + req.responseText + '</p>';
      }
    }
  }
  req.open('GET', '/number_of_wantread/' + asin, true);
  req.send(null);
}
