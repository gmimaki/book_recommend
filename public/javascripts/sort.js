function asyncConfirmSort(){
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
        var sort_subject = req.responseText;
        $('select[name="sort"] option[value="' + sort_subject + '"]').prop('selected',true);
      }
    }
  }
  req.open('GET', '/change_sort', true);
  req.send(null);
}

function asyncSort(){
  var sort = $(document.getElementById('form').sort).val();
  var req = getXHR();
  req.onreadystatechange = function(){
    if(req.readyState == 4){
      if(req.status == 200){
        var element = document.getElementById('registered_books');
        asyncSend(element, 'registered_books');
      }
    }
  }
  req.open('GET', '/change_sort/' + sort, true);
  req.send(null);
}
