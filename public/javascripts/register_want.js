function asyncWant(element){
  var req = getXHR();
  var asin = $(element).attr("value");
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          changeTextOfWantOrNot(req.responseText, element);
          update_number_of_wantread(element, asin);
      }
    }
  }
  req.open('GET', '/register_wantbook/' + asin, true);
  req.send(null);
}

function update_number_of_wantread(element, asin){
  var num_of_wantread = $(element).next()[0];
  asyncNumOfWantRead(num_of_wantread, asin)
}
