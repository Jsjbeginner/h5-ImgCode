var dreamId = "";//手机号
/**
* 登录-注销
*/
function login(){
	$("#phone_num").val("");
	$("#phone_code").val("");
	$("#graph_code").val("");
	$("#loginDialog").show();
	//绘制图形验证码
	let verVal = drawCode();
	sessionStorage.setItem("graphCode", hex_md5(verVal.toLowerCase()))	
}
/**
 * 登录
 */
function doLogin(){
	var e = [];
	e.push("phone_num","phone_code","graph_code");
	if(!checkNull(e)){
		return;
	}
	var phoneNumber = $('#phone_num').val();
	var phoneCode = $('#phone_code').val();
	var graphCode = $('#graph_code').val();
	if(hex_md5(graphCode.toLowerCase()) != sessionStorage.getItem("graphCode")){
		alert('图形验证码错误，请重新输入');
		resetCode();
        return
    }
	var req = {
		"phoneNumber": phoneNumber,
		"verificationCode": phoneCode,
	}
	console.log('%c %s %c %o','color: #16a085','req:','color: #0000ff',req);
}
/**
 * 登录必填校验
 */
function checkNull(e){
	for(var i = 0 ; i < e.length ; i ++){
		var value = $("#" + e[i]).val();
		if(value == ""){
			var text = "请填写" +  $("#" + e[i]).attr("placeholder");
			alert(text);
			return false;
		}
	}
	return true;
}
/**
 * 发送短信验证码
 */
function getCode(t){
	if($(t).hasClass("disabled")){
		return;
	}
	var phone = $("#phone_num").val();
	/* 校验必填 */
	if(!checkNull(["phone_num"])){
		return;
	}
	/* 校验手机号格式 */
	if(!inputCheck("phone" , phone)){
		return;
	}
	var timeOut = 60;
	$(t).addClass("disabled").html(timeOut + " S");
	reGetCodeTimeOut(t , timeOut);
	setTimeout(function(){
		alert("验证码已发送至您的手机,请及时查收。"); 
	}, 200);
}
/**
 * 重获取验证码倒计时
 */
function reGetCodeTimeOut(t , timeOut){
	setTimeout(function(){
		timeOut --;
		if(timeOut < 0){
			$(t).removeClass("disabled").html("获取验证码");
			return;
		}else{
			$(t).html(timeOut + " S");
		}
		reGetCodeTimeOut(t , timeOut);
	},1000);
}
function dialogHide(v){
	$(v).hide();
}
function inputCheck(type , value){
    try{
        /*身份证格式验证*/
        var isIDCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
        /*手机号格式验证*/
        var isPhone = /^1[3456789]\d{9}$/;
        /*邮箱格式验证*/
        var isMailBox = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if(type && value){
            if(type == "id" && !isIDCard.test(value)){
                alert("身份证号格式不正确");
                return false;
            }
            if(type == "phone" && !isPhone.test(value)){
                alert("手机号格式不正确");
                return false;
            }
            if(type == "mail" && !isMailBox.test(value)){
                alert("邮箱格式不正确");
                return false;
            }
            return true;
        }else{
            return false;
        }
    }catch(e){
        return false;
    }
}