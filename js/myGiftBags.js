var dreamId = "";//手机号
var selectTabIndex;//默认选中的tab页索引：0-可领取，1-当前可使用，2-已失效
$(function(){
//	$("html,body").css("height" , $(window).height());
	dreamId = $cookie.get("dreamId");//登录人
	selectTabIndex = $.getUrlParam("selectTabIndex") || "0";
	queryMyPage();
});
/**
 * 查询我的礼包礼包
 */
function queryMyPage(){
	var width = Number($(window).width()) * 0.7;
	width = (width / 3).toFixed(2) + "px";
	var tabStr = '<div class="head-item">';
	["可领取","当前可使用","已失效"].forEach((item, index)=>{
		tabStr += '<div class="item" tabIndex="'+ index +'" style="width:'+ width +';">';
		tabStr += '		<span class="product-name">' + item +'</span>';
		tabStr += '</div>';
	})
	tabStr += '</div>';
	$(".tab").html(tabStr);
	$(".tab .item").unbind().click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var index = $(this).attr("tabindex");//保存切换的商品id
		var contentStr = "";
		var giftBagsList = [{
			"goodsId": "0",
			"productName": "物华天宝卡1",
			"monthTxt": "39元/月",
			"giftTxt": "每月最高领44元礼包",
			"list": [
				{
					"giftBageName": "肯德基大神卡",
					"giftBageId": "4",
					"giftBagetxt":"内含",
					"giftBageImg": "img/atest.png",
					"peopleNum": "588",
					"ticketList": ["10元代金券x1","5元代金券x1"],
				}
			]
		},{
			"goodsId": "1",
			"productName": "物华天宝卡1",
			"monthTxt": "39元/月",
			"giftTxt": "每月最高领44元礼包",
			"list": [
				{
					"giftBageName": "肯德基大神卡",
					"giftBageId": "4",
					"giftBagetxt":"内含",
					"giftBageImg": "img/atest.png",
					"peopleNum": "588",
					"ticketList": ["10元代金券x1","5元代金券x1"],
				}
			]
		},{
			"goodsId": "2",
			"productName": "物华天宝卡1",
			"monthTxt": "39元/月",
			"giftTxt": "每月最高领44元礼包",
			"list": [
				{
					"giftBageName": "肯德基大神卡",
					"giftBageId": "1",
					"giftBagetxt":"内含",
					"giftBageImg": "img/atest.png",
					"peopleNum": "588",
					"ticketList": ["10元代金券x1"],
				},{
					"giftBageName": "肯德基大神卡",
					"giftBageId": "2",
					"giftBagetxt":"内含",
					"giftBageImg": "img/atest.png",
					"peopleNum": "588",
					"ticketList": ["10元代金券x1","5元代金券x1"],
				},{
					"giftBageName": "肯德基大神卡",
					"giftBageId": "3",
					"giftBagetxt":"内含",
					"giftBageImg": "img/atest.png",
					"peopleNum": "588",
					"ticketList": ["10元代金券x1","5元代金券x1","5元代金券x1"],
				},{
					"giftBageName": "肯德基大神卡",
					"giftBageId": "4",
					"giftBagetxt":"内含",
					"giftBageImg": "img/atest.png",
					"peopleNum": "588",
					"ticketList": ["10元代金券x1","5元代金券x1","5元代金券x1","5元代金券x1"],
				},{
					"giftBageName": "肯德基大神卡",
					"giftBageId": "4",
					"giftBagetxt":"内含",
					"giftBageImg": "img/atest.png",
					"peopleNum": "588",
					"ticketList": ["10元代金券x1","5元代金券x1","5元代金券x1","5元代金券x1"],
				},{
					"giftBageName": "肯德基大神卡",
					"giftBageId": "4",
					"giftBagetxt":"内含",
					"giftBageImg": "img/atest.png",
					"peopleNum": "588",
					"ticketList": ["10元代金券x1","5元代金券x1","5元代金券x1","5元代金券x1"],
				}
			]
		}];
		giftBagsList.forEach((item) => {
			if(item.goodsId == selectTabIndex) {
				item.list.forEach((item2)=>{
					contentStr += '<div class="item">';
					contentStr += '		<div class="page-img">';
					contentStr += '			<img src="'+ item2.giftBageImg +'" />';
					contentStr += '		</div>';
					contentStr += '		<div class="page-content">';
					contentStr += '			<span class="name">'+ item2.giftBageName +'</span>';
					contentStr += '			<span class="txt">'+ item2.giftBagetxt +'</span>';
					contentStr += '			<div class="ticket">';
					item2.ticketList.forEach((item3)=>{
						contentStr += '			<div class="ticket-item">';
						contentStr += '				<div class="ticket-item-icon"><img src="img/ticket-item-icon.png" /></div>';
						contentStr += '				<div class="ticket-item-txt">'+ item3 +'</div>';
						contentStr += '			</div>'
					})
					contentStr += '			</div>';
					contentStr += '		</div>';
					if(selectTabIndex == item.goodsId){
						contentStr += '		<div class="page-btn" onclick="doNext(this)" giftBageId='+ item2.giftBageId +'>';
					} else {
						contentStr += '		<div class="page-btn dis" giftBageId='+ item2.giftBageId +'>';
					}
					contentStr += '			<div class="btn">';
					contentStr += '				<span class="btn1">选择</span>';
					contentStr += '				<span class="btn2">'+ '>' +'</span>';
					contentStr += '			</div>';
					contentStr += '			<div class="num">';
					contentStr += '				<span class="txt">'+ item2.peopleNum + '人关注' +'</span>';
					contentStr += '			</div>';
					contentStr += '		</div>';
					contentStr += '</div>';
				})
			}
		})
		$(".content").html(contentStr);
	});
	$(".tab .head-item .item:eq("+ selectTabIndex +")").click();
}


/**
* 登陆-注销
*/
function login(){
	if(dreamId){//注销
		$cookie.clear();
		dreamId = "";
		$("#phone").html("********");
		$(".info a").html("登陆");
	} else {//登陆
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
 * 登陆
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
		"verifyCode": phoneCode,
		"graphCode": graphCode,
	}
	alert(JSON.stringify(req));
	console.log('%c %s %c %o','color: #16a085','req:','color: #0000ff',req);
	
	shareOpt();//登陆成功，重置分享的dreamId
}
/**
 * 登陆必填校验
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