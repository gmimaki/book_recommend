function asyncBells(){
  var bells = document.getElementById('bells');
  var req = getXHR();
    req.onreadystatechange = function(){
      if(req.readyState == 4){
        if(req.status == 200){
            if(req.responseText == '1'){
              bells.innerHTML = '<button class="btn btn-default"><i class="fa fa-bell icons" style="font-size:2.0rem" aria-hidden="true"></i></button>';
            } else if(req.responsetext == '0'){
              bells.innerHTML = '<button class="btn btn-default"><i class="fa fa-bell-o icons" style="font-size:2.0rem" aria-hidden="true"></i></button>';
            }
        }
      }
    }
    req.open('GET', '/isBell', true);
    req.send(null);
}
