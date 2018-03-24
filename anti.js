var anti = function(str){
  var ret = {};
    ret.antiSQLInjection = function(str) {
      var p = /[\*\/%;\(\)\\\+\-:_'"]/;
      if(str.match(p)){
        var AntiSQLInjection = (function(){
          var character = {
            '\*': '\\*',
            '\/': '\\/',
            '%': '\\%',
            '\(': '\\(',
            '\)': '\\)',
            '\\': '\\\\',
            '\+': '\\+',
            '\-': '\\-',
             '\;': '\\;',
             "'": "''",
             ';': '\\;',
             ':': '\\:',
             '\_': '\\_',
             '"': '""'
         };
         return function(t){
           return t.replace(/[\*\/%;\(\)\\\+\-:_'"]/g, function(c){
             return character[c];
           });
         };
       })();
       str = AntiSQLInjection(str);
       return str;
     } else {
       return str;
     }
   };

   ret.antiSQLInjection_user_id = function(str) {
     var p = /[\*\/%;\(\)\\\+\-:'"]/;
     if(str.match(p)){
       var AntiSQLInjection_user_id = (function(){
         var character = {
           '\*': '\\*',
           '\/': '\\/',
           '%': '\\%',
           '\(': '\\(',
           '\)': '\\)',
           '\\': '\\\\',
           '\+': '\\+',
           '\-': '\\-',
            '\;': '\\;',
            "'": "''",
            ';': '\\;',
            ':': '\\:',
            '"': '""'
        };
        return function(t){
          return t.replace(/[\*\/%;\(\)\\\+\-:_'"]/g, function(c){
            return character[c];
          });
        };
      })();
      str = AntiSQLInjection_user_id(str);
      return str;
    } else {
      return str;
    }
  };

    ret.antiXSS = function(str) {
      if(str.match(/[<>'&"\\]/g)){
        var AntiXSS = (function(){
          var character = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#39',
            '\\': '\\\\'
          };
          return function(t){
            return t.replace(/[<>'&"\\]/g, function(c){
              return character[c];
            });
          };
        })();
        str = AntiXSS(str);
        return str;
      } else {
        return str;
      }
    };

    ret.registerAPI = function(str){
      if(str.match(/['"]/g)){
        var api = (function(){
          var character = {
            '"': '""',
            "'": "''"
          };
          return function(t){
            return t.replace(/["']/g, function(c){
              return character[c];
            });
          };
        })();
        str = api(str);
        return str;
      } else {
        return str;
      }
    };
    return ret;
};

var antiattack = anti();

module.exports = antiattack;
