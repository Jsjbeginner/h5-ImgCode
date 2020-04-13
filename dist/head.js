const ownStore = {
    set : function(key , value){
        if(value != null){
            localStorage.setItem(key , JSON.stringify(value));
        }
    },
    get : function(key){
        return JSON.parse(localStorage.getItem(key)) || "";
    },
    remove : function(key){
        localStorage.removeItem(key);
    },
    clear : function(){
        localStorage.clear();
    }
};
const ownCookie = {
    set : function(key , value){
        if(value != null){
            document.cookie = key + "=:" + value + ";path=/;";
        }
    },
    get : function(key){
        var cookieList = document.cookie.split("; ");
        for(var i = 0 ; i < cookieList.length ; i ++){
            if(cookieList[i].split("=:")[0] == key){
                return cookieList[i].split("=:")[1];
            }
        }
        return null;
    },
    remove : function(key){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=$.cookie.get(key);
        if(cval!=null)
        document.cookie= key + "=:"+cval+";expires="+exp.toUTCString() + ";path=/;";
    },
    clear : function(){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cookieList = document.cookie.split("; ");
        for(var i = 0 ; i < cookieList.length ; i ++){
            document.cookie= cookieList[i].split("=:")[0] + "=:"+cookieList[i].split("=:")[1]+";expires="+exp.toUTCString() + ";path=/;";
        }
    }
};