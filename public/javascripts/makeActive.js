function makeActive(element){
  $(element).addClass('active');
  $(element).siblings().removeClass('active');
  var more = document.getElementById('more');
  $('.all_done').hide();
  $(more).show();
  more.innerHTML = '<button class="btn btn-default btn-block">もっと読む</button>';
  var active = document.getElementsByClassName('active');
  var active_id = $(active).attr('id');
  var form = document.getElementById('form');
  if(active_id == 'registered_books'){
    form.innerHTML = '<select name="sort" onChange="asyncSort()" class="form-control" style="width:50%;"><option value="new">新しい順</option>' +
                     '<option value="old">古い順</option><option value="high">評価が高い順</option><option value="low">評価が低い順</option></select>';
  } else {
    form.innerHTML = '';
  }
}
