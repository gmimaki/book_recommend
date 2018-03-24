function protect(str){
  if(str.match(/[<>'&"]/g)){
    var AntiXSS = (function(){
      var character = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39'
      };
      return function(t){
        return t.replace(/[<>'&"]/g, function(c){
          return character[c];
        });
      };
    })();
    str = AntiXSS(str);
    return str;
  } else {
    return str;
  }
}
function checkURL(){
  var a_elements = $("a");
  for(var i = 0; i < a_elements.length; i++){
    var href = $(a_elements[i]).attr("href");
    if(typeof href != 'undefined'){
      if(href.match(/^http/) || href.match(/^https/) || href.match(/^\//)){
      } else {
        $(a_elements[i]).addClass('disable');
      }
    }
  }
}
$('.btn').on("click", function(){
  $(this).addClass('active');
});
