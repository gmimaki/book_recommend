function asyncPrepareNumOfReview(){
  var num_of_review_elements = document.getElementsByClassName('num_of_review');
  for(var i = 0; i < num_of_review_elements.length; i++){
    var asin = $(num_of_review_elements[i]).attr("value");
    asyncNumOfReview(num_of_review_elements[i], asin);
  }
}

function asyncNumOfReview(element, asin){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          element.innerHTML = '<p style="font-size:2.0rem;">' + req.responseText + '</p>';
      }
    }
  }
  req.open('GET', '/number_of_review/' + asin, true);
  req.send(null);
}
