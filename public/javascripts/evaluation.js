function asyncPrepareEvaluation(){
  var evaluation_elements = document.getElementsByClassName('evaluation');
  for(var i = 0; i < evaluation_elements.length; i++){
    var asin = $(evaluation_elements[i]).attr("value");
    asyncEvaluation(evaluation_elements[i], asin);
  }
}
function asyncEvaluation(element, asin){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
          changeTextOfEvaluation(req.responseText, element);
      }
    }
  }
  req.open('GET', '/evaluation/' + asin, true);
  req.send(null);
}
function changeTextOfEvaluation(evaluation, element){
  if(evaluation != 'none'){
    element.innerHTML = evaluation + ' <span style="font-size:2.0rem;">/5</span>';
  } else {
    element.innerHTML = "-";
  }
}
