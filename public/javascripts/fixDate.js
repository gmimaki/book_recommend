function fixDate(date){
  var date = new Date(date);
  var second = date.getSeconds();
  var minute = date.getMinutes();
  var hour = date.getHours();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
}
