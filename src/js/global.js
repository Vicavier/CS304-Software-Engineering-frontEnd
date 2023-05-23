
export const setCookie=function(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.info(document.cookie);
    }

export const getCookie=function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

export const clearCookie=function () { //删除cookie方法
        this.setCookie("username", "", -1);
    }

export const checkCookie=function () {
        var hasLogin = this.getCookie("checked");
        return hasLogin //true-已登录
    }



