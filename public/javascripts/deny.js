host_name = 'sophiliar.herokuapp.com';
redirect_deny_url = 'http://girlydrop.com/girls/1478';
redirect_millisec = 5000;
deny_message = '<h3>本ページは削除されました。(・ω<) ﾃﾍﾍﾟﾛ </h3>';
function main(){
    if ($(location).attr('hostname') == ''){
        return null;
    }
    if ($(location).attr('hostname').match(host_name)){
        return null;
    }else{
        disable();
    }
}

function disable(){
    document.getElementsByTagName("main").innerHTML = deny_message;
    setTimeout(function(){
        $(document).ready( function() {
            $(location).attr("href", redirect_deny_url);
        });
    },redirect_millisec);
}
$(main);
