var activityId;//活动id
var developMan;//发展人
var developChannel;//发展渠道
var shareId;//分享人的手机号

var dreamId = "";//手机号
var sltGoodsId = ""; //选中的商品Id
$(function(){
//	$("html,body").css("height" , $(window).height());
	activityId = $.getUrlParam("activityId") || "";
	developMan = $.getUrlParam("developMan") || "";
	developChannel = $.getUrlParam("developChannel") || "";
	shareId = $.getUrlParam("shareId") || "";
	
	var shareOptFlag = $.getUrlParam("shareOptFlag") || "";//成卡分享跳转过来的页面：shareOptFlag=1
    if (shareOptFlag) {
        var link = window.location.href.replace("&shareOptFlag=" + shareOptFlag, "");
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf71dfa4539d2f215&redirect_uri=http%3A%2F%2Fwx1.unisk.cn%2FweixinLinksucaiController.do%3Flink%26id%3Dff80808168aa0cf401690a3e133107a4%26jwid%3Dgh_a1d4f56be7af&response_type=code&scope=snsapi_base&state=" + encodeURIComponent(link) + "&connect_redirect=1#wechat_redirect";
        return;
    }
	$cookie.set("dreamId","15640876721")
	dreamId = $cookie.get("dreamId");//登录人
	if(dreamId){
		$("#phone").html(dreamId);
		$(".info a").html("注销");
	}
	queryInfo();
	shareOpt();//初始化分享
});
/**
 * 查询首页信息
 */
function queryInfo(){
	var req = {
		"activity_type" : "7",
		"activity_source" : "6"
	};
	var link = "/contactcentre/memberDay/activity/getActivityCommon"
	$.ajaxReq("concent" , link , req , function(resp){
		if(resp.code == "0000"){
			$(".shop").css("background", "none");
			$("#banner").attr("src", "img/shop_banner.png");
			$("#information").attr("src", "img/shop_information.png");
			$(".button").css("display", "block");
			var rule = "活动规则1231";
			$("#acRuleDialog .dialog-body").html(rule.replace(/\n/g , "<br />"));
			
			var indexInfo = [{
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
						"giftBageId": "4",
						"giftBagetxt":"内含",
						"giftBageImg": "img/atest.png",
						"peopleNum": "588",
						"ticketList": ["10元代金券x1","5元代金券x1"],
					}
				]
			},{
				"goodsId": "3",
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
				"goodsId": "4",
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
			$store.set("giftBagsList", indexInfo)
			var width = Number($(window).width()) * 0.8;
			var widthStr;
			var widthStr1;
			if(indexInfo.length >= 3){
				widthStr = "auto";
				widthStr1 = (width / 3).toFixed(2) + "px";
			} else {
				widthStr = "100%";
				widthStr1 = (width / indexInfo.length).toFixed(2) + "px";
			}
			var tabStr = '<div class="head-item"><div style="display: inline-flex; width:'+ widthStr +';">';
			indexInfo.forEach((item) => {
				tabStr += '<div class="item" goodsId="'+ item.goodsId +'" style="width:'+ widthStr1 +';">';
				tabStr += '		<span class="product-name">' + item.productName +'</span>';
				tabStr += '		<span class="month-txt">' + item.monthTxt +'</span>';
				tabStr += '		<span class="gift-txt">' + item.giftTxt +'</span>';
				tabStr += '</div>';
			})
			tabStr += '</div></div>';
			$(".tab").html(tabStr);
			$(".tab .item").unbind().click(function(){
				$(this).addClass("on").siblings().removeClass("on");
				sltGoodsId = $(this).attr("goodsId");
			});
			$(".tab .item:eq(0)").click();
		} else {
			alert(resp.detail);
		}
	},false,true,0);
}
/**
 * 查看活动规则
 */
function lookRule(){
	$("#acRuleDialog").show();
}
/**
 * 隐藏活动规则
 */
function dialogHide(v){
	$(v).hide();
}
/**
 * 我的订单
 */
function myOrder(){
	if(!dreamId) {
		login();
		return
	}
}
/**
 * 我的礼包
 */
function myGiftBags(){
	if(!dreamId) {
		login();
		return
	}
	var link = bUrl + "/pages/contactCentrePhone/rightsEcosphere/myGiftBags.html";
	link += "?activityId=" + activityId;
	link += "&developMan=" + developMan;
	link += "&developChannel=" + developChannel;
	link += "&shareId=" + shareId;
	link += "&sltGoodsId=" + sltGoodsId;
	link += "&selectTabIndex=1";
	window.location.href = link;
}

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
/**
 * 立即申请加入
 */
function doNext(){
	if(sltGoodsId == "") return false;
	if(!dreamId){
		login();
		return false;
	}
	var link = bUrl + "/pages/contactCentrePhone/rightsEcosphere/chooseGiftBags.html";
	link += "?activityId=" + activityId;
	link += "&developMan=" + developMan;
	link += "&developChannel=" + developChannel;
	link += "&shareId=" + shareId;
	link += "&sltGoodsId=" + sltGoodsId;
	window.location.href = link;
}
/**
 * 分享指引
 */
function showShare(){
	$(".shareFollowDiv").addClass("show");
	shareOpt();
}
/**
 * 分享指引关闭
 */
function hideShare(){
	$(".shareFollowDiv").removeClass("show");
}
/**
 * 分享
 */
function shareOpt(){
	var link = bUrl + "/pages/contactCentrePhone/rightsEcosphere/index.html?activityId="+ activityId +"&shareId="+ dreamId +"&shareOptFlag=1";
	setConf("权益生态圈", link, bUrl + "/pages/contactCentrePhone/rightsEcosphere/img/share_logo.png" , function(){
		if(activityStart <= nowT &&activityEnd >= nowT){
			
		}
	});
}

/**
 * 调用新增PV/UV统计量信息接口（用于统计）
 * 入参：大活动id，专区id，小活动id，手机号
 * 模块标识：moduleFlag
 * 第三方链接当moduleFlag为101时，必传，统计类型：1分享量；2访问量；3扫码量/参与量；
 */																
function addMemberdayPVUVStatistic(bigActivityId,specialAreaId,smallActivityId,phoneNumber,moduleFlag,url,pvUvType){
	var req ={
		"bigActivityId": bigActivityId,//大活动id
		"specialAreaId": specialAreaId,//专区id
		"smallActivityId": smallActivityId,//小活动id
		"phoneNumber": phoneNumber,//手机号
		"moduleFlag": moduleFlag,//模块标识：101第三方链接；102转盘；103砍价；104竞猜；105积分兑换；106客户日红包;107刮刮卡
		"url": url || "",//第三方链接当moduleFlag为101时，必传
		"pvUvType": pvUvType,//统计类型：1分享量；2访问量；3扫码量/参与量
		"shareId": "",//全局变量，分享的手机号，有则传，没有则空
		"openId": "",//防止当前用户没有绑定手机号，记录openid
	};
    $.ajaxReq("concent" , "/contactcentre/memberDay/addMemberdayPVUVStatistic" , req);
}