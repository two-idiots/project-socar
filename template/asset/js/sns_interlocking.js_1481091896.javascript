(function($){
	'use strict';
	
	var opts = null;
	$.snsInterlock = {
		init : function(options) {
			opts = $.extend({}, uiConfigure, options);
			if(typeof getUrlVars()['code'] !== 'undefined' && opts.fb_init) {
				var code = getUrlVars()['code'];
				_set_fb_interlocking(code);
			}
			if(typeof getUrlVars()['oauth_verifier'] !== 'undefined' && opts.twit_init) {
				var oauth_verifier = getUrlVars()['oauth_verifier'];
				_set_twit_interlocking(oauth_verifier);
			}
			
			if(typeof getUrlVars()['naver_code'] !== 'undefined' && opts.naver_init) {
				var naver_code = getUrlVars()['naver_code'];
				var naver_state = getUrlVars()['state'];
				_set_naver_interlocking(naver_code, naver_state);
			}
			
			if(typeof getUrlVars()['kakao_code'] !== 'undefined' && opts.kakao_init) {
				var kakao_code = getUrlVars()['kakao_code'];
				_set_kakao_interlocking(kakao_code);
			}
			return this;
		},
		
		fb_login : function() {
			if( $(document).data('fb_login_process') ) {
				alert("페이스북 연동 처리 중입니다.");
				return false;
			}
			$.ajax({
				url: opts.fb_request_uri,
				crossDomain: true,
				data: {
					redirect_uri: opts.currentURL
				},
				type: 'GET',
				dataType: 'jsonp',
				beforeSend: function(xhr){
					$(document).data("fb_login_process", true);
					if(typeof opts.handler.fb_before_login_hdlr === "function") {
						opts.handler.fb_before_login_hdlr.apply(this,[]);
					}
				},
				success: function(json){
					$(document).data('fb_login_process',false);
					if(json.retCode == 1){
						var result = json.result,
							oauth_uri = result.uri;
						top.location.href = oauth_uri;
					}
					else{
						alert(json.retMsg + ' 코드 : ' + json.retCode);
					}
				},
				error: function(xhr){
					$(document).data('fb_login_process',false);
					alert('일시적인 오류입니다. 잠시 후 다시 시도해 주세요. 코드 : ' + xhr.status);
				}
			});
		},
		twit_login : function() {
			if( $(document).data('twit_login_process') ) {
				alert("트위터 연동 처리 중입니다.");
				return false;
			}
			$.ajax({
				url: opts.twit_request_uri,
				crossDomain: true,
				data: {
					redirect_uri: opts.currentURL
				},
				type: 'GET',
				dataType: 'jsonp',
				beforeSend: function(xhr){
					$(document).data("twit_login_process", true);
					if(typeof opts.handler.twit_before_login_hdlr === "function") {
						opts.handler.twit_before_login_hdlr.apply(this,[]);
					}
				},
				success: function(json){
					$(document).data('twit_login_process',false);
					if(json.retCode == 1){
						var result = json.result,
							request_token	= result.oauth_token,
							request_token_secret = result.oauth_token_secret,
							oauth_url = result.url;
							
						(opts.btwit_login_force) ? oauth_url + "&force_login=true" : oauth_url;
						set_cookie('request_token', request_token);
						set_cookie('request_token_secret', request_token_secret);
						top.location.href = oauth_url;
					}
					else{
						alert(json.retMsg + ' 코드 : ' + json.retCode);
					}
				},
				error: function(xhr){
					$(document).data('twit_login_process',false);
					alert('일시적인 오류입니다. 잠시 후 다시 시도해 주세요. 코드 : ' + xhr.status);
				}
			});
			return false;
		},
		
		naver_login : function(){
			// 네이버 연동위한 작업 시작. 
			if( $(document).data('naver_login_process') ) {
				alert("네이버 연동 처리 중입니다.");
				return false;
			}
			$.ajax({
				url: opts.naver_request_uri,
				crossDomain : true,
				data : {
					redirect_uri: opts.currentURL,
					type : opts.device_type
				},
				type : 'GET',
				dataType : 'jsonp',
				success : function(res) {
					$(document).data('naver_login_process',false);
					if (res.retCode == 1) {
						// 성공
						$.cookie('naver_state', null);
						$.cookie('naver_state', res.result.state);
						//alert(res.result.uri);
						top.location.href = res.result.uri;
					} else {
						alert(json.retMsg + ' 코드 : ' + json.retCode);
					}
				},
				error : function(xhr) {
					$(document).data('naver_login_process',false);
					alert('일시적인 오류입니다. 잠시 후 다시 시도해 주세요. 코드 : ' + xhr.status);
				}
			});
		},
		
		kakao_login : function(){
			if( $(document).data('kakao_login_process') ) {
				alert("카카오 연동 처리 중입니다.");
				return false;
			}
			
			$.ajax({
				url: opts.kakao_request_uri,
				crossDomain : true,
				data : {
					redirect_uri: opts.currentURL,
					type : opts.device_type
				},
				type : 'GET',
				dataType : 'jsonp',
				success : function(res) {
					$(document).data('kakao_login_process',false);
					if (res.retCode == 1) {
						// 성공
						top.location.href = res.result.uri;
					} else {
						alert(res.retMsg + ' 코드 : ' + res.retCode);
						top.location.href = '/user'; // 연동 이전상황으로 되돌아간다.
					}
				},
				error : function(xhr) {
					$(document).data('kakao_login_process',false);
					alert('일시적인 오류입니다. 잠시 후 다시 시도해 주세요. 코드 : ' + xhr.status);
				}
			});
		},
		
		fb_logout : function(fb_logout) {
			_sns_connect_close('facebook');
			return false;
		},
		twit_logout: function() {
			_sns_connect_close('twitter');
			return false;
		},
		
		naver_logout: function() {
			_sns_connect_close('naver');
			return false;
		},
		
		kakao_logout: function() {
			_sns_connect_close('kakao');
			return false;
		},
		getOptionValue : function(item) {
			return opts[item];
		},
		
		setOptionValue : function(item, value) {
			opts[item] = value;
			return false;
		}
		
	};
	
	var _set_fb_interlocking = function(code) {
		$.ajax({
			url : opts.fb_oauth_uri,
			type : "GET",
			data : {
				ctype: opts.conType,
				auth_token: opts.auth_token,
				code: code,
				redirect_uri: opts.currentURL
			},
			crossDomain: true,
			dataType: "jsonp",
			beforeSend: function(xhr){
				$(document).data("fb_login_process", true);
			},
			success : function(data){
				$(document).data("fb_login_process", false);
				if(data.retCode == '1'){
					opts.fb_init = false;
					if( typeof opts.handler.fb_login_hdlr === "function" ) {
						opts.handler.fb_login_hdlr.apply(this,[data.result]);
					}
				}
				else{
					alert(data.retMsg + " 코드: 400");
					document.location.href = opts.currentURL;
				}
			},
			error:function(request,status,error){
				$(document).data("fb_login_process", false);
				alert('일시적인 오류로 페이스북 연동설정에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
				document.location.href = opts.currentURL;
			}
		});
		return false;
	};
	var _set_twit_interlocking = function(oauth_verifier) {
		$.ajax({
			url : opts.twit_oauth_uri,
			type : "GET",
			data : {
				ctype: opts.conType,
				auth_token: opts.auth_token,	
				oauth_verifier: oauth_verifier,
				request_token : $.cookie('request_token'),
				request_token_secret : $.cookie('request_token_secret')
			},
			crossDomain: true,
			dataType: "jsonp",
			beforeSend: function(xhr){
				$(document).data("twit_login_process", true);
			},
			success : function(data){
				set_cookie('request_token', null);
				set_cookie('request_token_secret', null);
				$(document).data("twit_login_process", false);
				if(data.retCode == '1'){
					opts.twit_init = false;
					if( typeof opts.handler.twit_login_hdlr === "function" ) {
						opts.handler.twit_login_hdlr.apply(this,[data.result]);
					}
				}
				else{
					alert(data.retMsg + " 코드: 400");
					document.location.href = opts.currentURL;
				}
			},
			error:function(request,status,error){
				$(document).data("twit_login_process", false);
				alert('일시적인 오류로 트위터 연동설정에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
				document.location.href = opts.currentURL;
			}
		});
		return false;
	};
	
	var _set_naver_interlocking = function(naver_code, state) {
		// 네이버 연동 키 저장.
		var stored_state = $.cookie('naver_state');
		var member_email = get_cookie('tmp_user_email');
		$.ajax({
			url : opts.naver_oauth_uri,
			type : "GET",
			data : {
				auth_token: opts.auth_token,
				ctype: opts.conType,
				code : naver_code,
				state : state,
				stored_state : stored_state
			},
			crossDomain: true,
			dataType: "jsonp",
			beforeSend: function(xhr){
				$(document).data("naver_login_process", true);
			},
			success : function(data){
				set_cookie('request_token', null);
				set_cookie('request_token_secret', null);
				$(document).data("naver_login_process", false);
				if(data.retCode == '1'){
				opts.naver_init = false;
					if( typeof opts.handler.naver_login_hdlr === "function" ) {
						opts.handler.naver_login_hdlr.apply(this,[data.result]);
					}
				}else{
					alert(data.retMsg + " 코드: 400");
					document.location.href = opts.currentURL;
				}
			},
			error:function(request,status,error){
				$(document).data("naver_login_process", false);
				alert('일시적인 오류로 네이버 연동설정에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
				
				document.location.href = opts.currentURL;
			}
		});
		return false;
	};
	
	var _set_kakao_interlocking = function(kakao_code) {
		$.ajax({
			url :  opts.kakao_oauth_uri,
			type : "POST",
			data : {
				auth_token: opts.auth_token,
				kakao_code : kakao_code,
				type : opts.device_type,
				ctype : opts.conType
			},
			crossDomain: true,
			dataType: "jsonp",
			beforeSend: function(xhr){
				$(document).data("kakao_login_process", true);
			},
			success : function(data){
				$(document).data("kakao_login_process", false);
				if(data.retCode == '1'){
					opts.kakao_init = false;
					if( typeof opts.handler.kakao_login_hdlr === "function" ) {
						opts.handler.kakao_login_hdlr.apply(this,[data.result]);
					}
				}else{
					alert(data.retMsg + " 코드: 400");
				}
			},
			error:function(request,status,error){
				$(document).data("kakao_login_process", false);
				alert('일시적인 오류로 카카오 연동설정에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
			}
		});
		return false;
	};
	var _sns_connect_close = function(provider) {
		if(provider == 'facebook') {
			if(!confirm('페이스북 연동을 해제하시겠습니까?')){
				return false;
			}
		}
		else if(provider == 'naver') {
			if(!confirm('네이버 연동을 해제하시겠습니까?')){
				return false;
			}
			
		}
		else if(provider == 'twitter'){
			if(!confirm('트위터 연동을 해제하시겠습니까?'))
			{
				return false;
			}
		}
		else{
			if(!confirm('카카오 연동을 해제하시겠습니까?'))
			{
				return false;
			}
		}
		
		$.ajax({
			url : opts.sns_logout_url,
			type : "GET",
			data : {
				auth_token: opts.auth_token,	
				oauth_provider: provider
			},
			crossDomain: true,
			dataType: "jsonp",
			success : function(data){
				if(data.retCode == 1) {
					if(provider == 'facebook') {
						if( typeof opts.handler.fb_logout_hdlr === "function" ) {
							opts.handler.fb_logout_hdlr.apply(this, ['facebook']);
						}
					}
					else if(provider == 'naver') {
						if( typeof opts.handler.naver_logout_hdlr === "function" ) {
							opts.handler.naver_logout_hdlr.apply(this, ['naver']);
						}
					}
					else if(provider == 'twitter'){
						if( typeof opts.handler.twit_logout_hdlr === "function" ) {
							opts.handler.twit_logout_hdlr.apply(this, ['twitter']);
						}
					}
					else{
						if( typeof opts.handler.kakao_logout_hdlr === "function" ) {
							opts.handler.kakao_logout_hdlr.apply(this, ['kakao']);
						}
					}
				}
				else{
					if(data.retMsg == "") {
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
	};
	
	//url query string 유무 및 query key, value 체크하는 함수 by tary 2013-11-15
	var getUrlVars = function()	{
		var vars = [], hash;
		if(window.location.href.indexOf('?') != -1)
		{
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
		}
		return vars;
	};
	var uiConfigure = {
		auth_token : null,
		currentURL : null,
		conType : 'interlock',
		set_sns_info : null,
		fb_init : false,
		twit_init : false,
		naver_init : false,
		kakao_init : false,
		btwit_login_force : true,
		fb_request_uri	: null,
		fb_oauth_uri	: null,
		fb_get_profile	: null,
		fb_redirect_uri : null,
		twit_request_uri: null,
		twit_oauth_uri	: null,
		twit_get_profile: null,
		twit_redirect_uri : null,
		naver_request_uri: null,
		naver_oauth_uri  : null,
		naver_get_profile: null,
		naver_redirect_uri : null,
		kakao_request_uri	: null,
		kakao_oauth_uri	: null,
		sns_logout_url : null,
		device_type : 'mobile',
		handler : {
			fb_login_hdlr : null,
			fb_logout_hdlr : null,
			fb_before_login_hdlr : null,
			fb_after_login_hdlr : null,
			twit_login_hdlr : null,
			twit_logout_hdlr : null,
			twit_before_login_hdlr : null,
			twit_after_login_hdlr : null,
			naver_login_hdlr : null,
			naver_logout_hdlr : null,
			naver_before_login_hdlr : null,
			naver_after_login_hdlr : null,
			kakao_login_hdlr : null,
			kakao_logout_hdlr : null,
			kakao_before_login_hdlr : null,
			kakao_after_login_hdlr : null
		}
	};
	$.fn.snsInterlock = function(options) {
		return $.snsInterlock.init(options);
	};
})(jQuery);
