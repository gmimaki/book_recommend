function getXHR(){
  var req;
  try{
    req = new XMLHttpRequest();
  } catch(e){
    try{
      req = new ActiveObject('Msxml2.XMLHTTP');
    } catch(e){
      req = new ActiveXObject('Microsoft.XMLHTTP');
    }
  }
  return req;
}
