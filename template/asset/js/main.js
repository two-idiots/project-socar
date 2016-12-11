$(window).bind("load", function() {
$('.Faderight2').addClass('animated fadeInRight live');
$('.FadeIno').addClass('animated fadeIn live');
});
$(document).ready(function() {
$('.no-live').addClass('live');
     
/*---------  Inview Plugin + Animate.css  -------*/
	$('.FadeIno4').one('inview', function (event, visible) {
	    if (visible) {
	        $(this).addClass('animated fadeIn live');
	        
	
	    }
	     
	});
	
	$('.FadeIno3').one('inview', function (event, visible) {
	    if (visible) {
	        $(this).addClass('animated fadeInUpBig live');
	        
	
	    }
	     
	});
	
	$('.FadeIno2').one('inview', function (event, visible) {
	    if (visible) {
	        $(this).addClass('animated fadeInUpBig live');
	        
	
	    } 
	    
	});
	
	
		$('.FadeRight2').one('inview', function (event, visible) {
	    if (visible) {
	        $(this).addClass('animated fadeInRight');
	        
	
	    } 
	    
	});
	
		$('.FadeLeft2').one('inview', function (event, visible) {
	    if (visible) {
	        $(this).addClass('animated fadeInLeft');
	        
	
	    } 
	    
	});
	
	$('.Zoomi').one('inview', function (event, visible) {
	    if (visible) {
	        $(this).addClass('animated zoomIn');
	        
	
	    } 
	    
	});
	
	$('.Flippi').one('inview', function (event, visible) {
	    if (visible) {
	        $(this).addClass('animated fadeInDown live');
	        
	
	    }
	     
	});
	
	$('.Rolli, .Rolli2, .Rolli3').one('inview', function (event, visible) {
	    if (visible) {
	        $(this).addClass('animated rollIn live');
	        
	
	    }
	     
	});
	
	
	
	setInterval(function(){$('#cta a').toggleClass('animated pulse')}, 2000);
	
});
$(document).ready(function(){
$(".hiden").css({"display":"none"});
$(".spec").css({"display":"none"});
/* Button Hover Function */ 
$("ul.navi li a").hover(
function() {
	$(this).toggleClass("hoveri", 500);
},
function() {
	$(this).toggleClass("hoveri", 500);
});
/*---------  Input auto-clear -------*/
     $("input:text").each(function(){
    var origValue = $(this).val(); // Store the original value
    $(this).focus(function(){
        if($(this).val() == origValue) {
            $(this).val('');
        }
    });
    $(this).blur(function(){
        if($(this).val() == '') {
            $(this).val(origValue);
        }
    });
});
    
});
/* Fixed Nav Bar Function */ 
 
$(document).ready(function() {
    var s = $(".header");
    var pos = s.position();                   
    $(window).scroll(function() {
        var windowpos = $(window).scrollTop();
        
        if (windowpos >= pos.top) {
            s.addClass("stick");
            $(".hiden").fadeIn("100");
		    $(".spec").fadeIn("100");
		     	
 		 
        } else {
            s.removeClass("stick");
            $(".hiden").fadeOut("100");		
		    $(".spec").fadeOut("100");
        }
    });
});
$('#slider').cycle({ 
    fx:     'fade', 
    speed:  'fast', 
    timeout: 5000, 
    pager:  '#nav', 
    containerResize: 0,
    pagerAnchorBuilder: function(idx, slide) { 
        // return selector string for existing anchor 
        return '#nav li:eq(' + idx + ') a'; 
    } 
});
$('#slider2').cycle({ 
    fx:     'fade', 
    speed:  'slow', 
    timeout: 3000, 
    next:   '#next2', 
    prev:   '#prev2' 
});
$('#slider3').after('<div id="nav2">').cycle({ 
    fx:     'fade', 
    speed:  'fast', 
    timeout: 0, 
    pager:  '#nav2',
    containerResize: 0,
    pagerAnchorBuilder: function(idx, el) {
    return '<a href="#"></a>';
    }
});
$(document).ready(function(){
$("#pop-contact").click(function(){
$("#overlay_form").fadeIn(1000);
$("#popi-bg").css({
"opacity": "0.7"
}); 
$("#popi-bg").fadeIn("slow");
positionPopup();
});
$("#close2").click(function(){
$("#overlay_form").fadeOut(500);
$("#popi-bg").fadeOut("slow");
});
 
});
    
function positionPopup(){
if(!$("#overlay_form").is(':visible')){
return;
}
$("#overlay_form").css({
left: ($(window).width() - $('#overlay_form').width()) / 2,
top: ($(window).width() - $('#overlay_form').width()) / 6,
position:'absolute'
});
}
$(window).bind('resize',positionPopup);
function validateEmail(email) { 
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return reg.test(email);
	}
	$(document).ready(function() {
		 
		$("#contactform").submit(function() { return false; });
		
		$("#send").on("click", function(){
			var emailval  = $("#email").val();
			var msgval    = $("#message").val();
			var msglen    = msgval.length;
			var mailvalid = validateEmail(emailval);
			
			if(mailvalid == false) {
				$("#email").addClass("error");
			}
			else if(mailvalid == true){
				$("#email").removeClass("error");
			}
			
			if(msglen < 2) {
				$("#msg").addClass("error");
			}
			else if(msglen >= 2){
				$("#msg").removeClass("error");
			}
			
			if(mailvalid == true && msglen >= 2) {
				 $("input.submit-contact").replaceWith("<em>sending...</em>");
				
				$.ajax({
					type: 'POST',
					url: 'mailer.php',
					data: $("#contactform").serialize(),
					success: function(data) {
						if(data == "true") {
							$("em").fadeOut("fast", function(){
								$(this).before("<p> Your Message has been sent.</p>");
								setTimeout("$.fancybox.close()", 1000);
							});
						}
					}
				});
			}
		});
	});
 
