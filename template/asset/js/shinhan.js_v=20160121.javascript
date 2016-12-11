// 앱카드 연동.
function request_shinhan_appcard(){
	$.ajax({
		url: shinhanConfigure.send_memberid,
		crossDomain : true,
		dataType: 'jsonp',
		type : 'GET',
		data : {
			auth_token: $.cookie('auth_token')
		},
		success : function(res) {
			$(document).data('shinhan_login_process',false);
			var msgKey = res.result.MSG_UQE_VL;
			msgKey = msgKey.trim();
			// 저 메시지 키 붙여서 앱 호출....
			if(!shinhan_ccd) shinhan_ccd = "1";
			if('android' == shinhanConfigure.os_type){
				var url = 'shinhan-sr-ansimclick://socar?ccd='+shinhan_ccd+'&msgKey=' + msgKey;
				url = encodeURIComponent(url);
				url += "#windowopen";
				window.location = "http://m.socar.kr/url_repeater?repeat_url=" + url;
				return false;
			}else{
				var url = 'shinhan-appcard://socar?ccd='+shinhan_ccd+'&msgKey=' + msgKey;
				//window.open(url, 'share');
				window.location = url;
				return false;
			}
		},
		error : function(xhr) {
			$(document).data('shinhan_login_process',false);
			alert('일시적인 오류입니다. 잠시 후 다시 시도해 주세요. 코드 : ' + xhr.status);
		}
	});
}
function _set_shinhan_interlocking(shinhan_code) {
	$.ajax({
		url: shinhanConfigure.appcard_register,
		crossDomain : true,
		dataType: 'jsonp',
		type : 'GET',
		data : {
			auth_token : $.cookie('auth_token'),
			ts_id : shinhan_code,
			uqe_vl : shinhan_code
		},
		success : function(res) {
			$(document).data('shinhan_login_process',false);
			//alert(res.retMsg);
      document.location.href = shinhanConfigure.site_url;
		},
		error : function(xhr) {
			$(document).data('shinhan_login_process',false);
			alert('일시적인 오류입니다. 잠시 후 다시 시도해 주세요. 코드 : ' + xhr.status);
		}
	});
	return false;
}
function _shinhan_appcard_register(ts_id, uqe_vl){
	//실제로 로그인 과정에 쓰이지는 않는데, 연동됐다는거 표시하기 위해 저장은 해야함.
	$.ajax({
		url: shinhanConfigure.appcard_register,
		crossDomain : true,
		dataType: 'jsonp',
		type : 'GET',
		data : {
			auth_token : $.cookie('auth_token'),
			ts_id : ts_id,
			uqe_vl : uqe_vl
		},
		success : function(res) {
			$(document).data('shinhan_login_process',false);
			//alert(res.retMsg);
      document.location.href = shinhanConfigure.site_url;
		},
		error : function(xhr) {
			$(document).data('shinhan_login_process',false);
			alert('일시적인 오류입니다. 잠시 후 다시 시도해 주세요. 코드 : ' + xhr.status);
		}
	});
	return false;
}
function shinhan_logout(){
	$.ajax({
		url : shinhanConfigure.sns_logout_url,
		type : "GET",
		data : {
			auth_token: shinhanConfigure.auth_token,
			oauth_provider: 'shinhan'
		},
		crossDomain: true,
		dataType: "jsonp",
		success : function(data){
			if(data.retCode == 1) {
				return;
			}
			else{
				if(data.retMsg === "") {
					alert(provider + " 로그아웃에 실패 하였습니다. 잠시 후 다시 시도해주세요.");
				}else{
					alert(provider + " 로그아웃에 실패 하였습니다." + data.retMsg);
				}
			}
		},
		error:function(request,status,error){
		}
	});
	return false;
}
function shinhan_appcard_login_proc(){
	shinhan_appcard_open();
	return false;
}
function shinhan_appcard_open(){
	//window.open("/url_repeater?repeat_url=" +  url);
	if('android' == shinhanConfigure.os_type){
		var url = 'shinhan-sr-ansimclick://socar?ccd=1';
		url = encodeURIComponent(url);
		url += "#windowopen";
		window.location = "http://m.socar.kr/url_repeater?repeat_url=" + url;
		return false;
	}else{
		var url = 'shinhan-appcard://socar?ccd=1';
		window.location = url;
		return false;
	}
}
function shinhan_appcard_login(shinhan_code) {
	// 신한서버에서 멤버 아이디 확인....
	$.ajax({
		url: shinhanConfigure.check_login,
		crossDomain : true,
		dataType: 'jsonp',
		type : 'GET',
		data : {
			skey: shinhan_code
		},
		success : function(res) {
			// 우리 회원 아이디 전달됨.
      get_info_appcard(res.result.SCAR_CUS_N);
			return false;
		},
		error : function(xhr) {
			$(document).data('shinhan_login_process',false);
			alert('일시적인 오류입니다. 잠시 후 다시 시도해 주세요. 코드 : ' + xhr.status);
		}
	});
	return false;
}
function get_info_appcard(member_id){
  $.ajax({
		url: shinhanConfigure.get_info_appcard,
		crossDomain : true,
		dataType: 'jsonp',
		type : 'GET',
		data : {
			member_id : member_id
		},
		success : function(res) {
			// 우리 회원 아이디 전달됨.
      SNSlogInHdlr(res.result[0]);
			return false;
		},
		error : function(xhr) {
			$(document).data('shinhan_login_process',false);
			alert('일시적인 오류입니다. 잠시 후 다시 시도해 주세요. 코드 : ' + xhr.status);
		}
	});
	return false;
}
var shinhanConfigure = {
  auth_token : null,
	currentURL : null,
  send_memberid	: null,
	check_login	: null,
	appcard_register : null,
	sns_logout_url : null,
  get_info_appcard : null,
  site_url : null,
	url_repeater : null,
	device_type : null,
	os_type : null,
	SNSLoginHdlr : null
};
