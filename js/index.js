var dreamId = "";//手机号
$(function(){
//	$("html,body").css("height" , $(window).height());
	$cookie.set("dreamId","156******21")
	dreamId = $cookie.get("dreamId");//登录人
	if(dreamId){
		$("#phone").html(dreamId);
		$(".info a").html("注销");
	}
	queryInfo();
	shareOpt();//初始化分享
});
/**
* 登录-注销
*/
function login(){
	if(dreamId){//注销
		$cookie.clear();
		dreamId = "";
		$("#phone").html("********");
		$(".info a").html("登录");
	} else {//登录
		$("#phone_num").val("");
		$("#phone_code").val("");
		$("#graph_code").val("");
		$("#loginDialog").show();
		//绘制图形验证码
		let verVal = drawCode();
		sessionStorage.setItem("graphCode", hex_md5(verVal.toLowerCase()))	
	}
}
/**
 * 登录
 */
function doLogin(){
	var e = [];
	e.push("phone_num","phone_code","graph_code");
	if(!checkNullJsj(e)){
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
	$.ajaxReq("concent" , "/fzd/phoneVerificationCode/checkPhoneCode" , req , function(resp){
		if(resp.code == "0000"){
			$cookie.set("dreamId",phoneNumber);
			dreamId = phoneNumber;
			shareOpt();//登录成功，重置分享的dreamId
			$("#loginDialog").hide();
		} else {
			alert(resp.msg)
			return false;
		}
	});
}
/**
 * 登录必填校验
 */
function checkNullJsj(e){
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
	if(!checkNullJsj(["phone_num"])){
		return;
	}
	/* 校验手机号格式 */
	if(!inputCheck("phone" , phone)){
		return;
	}
	var timeOut = 60;
	$(t).addClass("disabled").html(timeOut + " S");
	reGetCodeTimeOut(t , timeOut);
	$.ajaxReq("concent" , "/contactcentre/phoneNoVerificationCode/sendVerifyCode" , {"phoneNumber" : phone} , function(resp){
		if(resp.code == "0000"){
			alert("验证码已发送至您的手机,请及时查收。");
		}else{
			alert("验证码获取失败,请重试");
		}
	});
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