var activityId;//活动id
var developMan;//发展人
var developChannel;//发展渠道
var shareId;//分享人的手机号

var dreamId = "";//手机号
var sltGoodsId = ""; //首页选中的商品Id
var lokGoodsId = "";//礼包页切换的商品Id
$(function(){
//	$("html,body").css("height" , $(window).height());
	activityId = $.getUrlParam("activityId") || "";
	developMan = $.getUrlParam("developMan") || "";
	developChannel = $.getUrlParam("developChannel") || "";
	shareId = $.getUrlParam("shareId") || "";
	sltGoodsId = $.getUrlParam("sltGoodsId") || "";
	
	var shareOptFlag = $.getUrlParam("shareOptFlag") || "";//成卡分享跳转过来的页面：shareOptFlag=1
    if (shareOptFlag) {
        var link = window.location.href.replace("&shareOptFlag=" + shareOptFlag, "");
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf71dfa4539d2f215&redirect_uri=http%3A%2F%2Fwx1.unisk.cn%2FweixinLinksucaiController.do%3Flink%26id%3Dff80808168aa0cf401690a3e133107a4%26jwid%3Dgh_a1d4f56be7af&response_type=code&scope=snsapi_base&state=" + encodeURIComponent(link) + "&connect_redirect=1#wechat_redirect";
        return;
    }
	dreamId = $cookie.get("dreamId");//登录人
	choosePage();
});
/**
 * 选择礼包
 */
function choosePage(){
	var giftBagsList = $store.get("giftBagsList");
	var width = Number($(window).width()) * 0.7;
	var widthStr;
	var widthStr1;
	if(giftBagsList.length >= 3){
		widthStr = "auto";
		widthStr1 = (width / 3).toFixed(2) + "px";
	} else {
		widthStr = "100%";
		widthStr1 = (width / giftBagsList.length).toFixed(2) + "px";
	}
	var tabStr = '<div id="cont" class="head-item"><div style="display: flex; width:'+ widthStr +';">';
	var sltIndex = "";//控制默认选中
	giftBagsList.forEach((item,index) => {
		tabStr += '<div class="item" goodsId="'+ item.goodsId +'" style="width:'+ widthStr1 +';">';
		tabStr += '		<span class="product-name">' + item.productName +'</span>';
		tabStr += '</div>';
		if(item.goodsId == sltGoodsId) {
			sltIndex = index;
		}
	})
	tabStr += '</div></div>';
	$(".tab").html(tabStr);
	$(".tab .item").unbind().click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		lokGoodsId = $(this).attr("goodsId");//保存切换的商品id
		var contentStr = "";
		giftBagsList.forEach((item) => {
			if(item.goodsId == lokGoodsId) {
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
					if(sltGoodsId == item.goodsId){
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
	$(".tab .item:eq("+ sltIndex +")").click();
	if(giftBagsList.length > 3 && sltIndex+1 > 3){//控制tab初始化滑动
		var itemWidth = (width / 3).toFixed(2);
		var scrollLeftWidth = (sltIndex - 2) * itemWidth;
		$("#cont").scrollLeft(scrollLeftWidth);
	}
}
/**
 * 选择礼包
 * @param v：按钮节点
 */
function doNext(v){
	var giftbageid = $(v).attr("giftbageid");
	alert("sltGoodsId:" + sltGoodsId +"——"+"giftbageid:" + giftbageid);
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