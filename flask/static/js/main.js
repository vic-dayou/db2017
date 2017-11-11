		$(function(){
			//alert("系统检测您还没有登录！请选择登录");
			$(".span_login").click(function(){
				$(".div_register").css("display","none");
				$(".div_login").css("display","block");
				//$(".div_body").css("top":"100px");
				
				});
			$(".span_register").click(function(){
				$(".div_login").css("display","none");
				$(".div_register").css("display","block");
				$(".div_register span").hide();
			});
			$(".div_body").click(function(){
				$(".div_login").css("display","none");
				$(".div_register").css("display","none");
			})
			$(".div_login span").hide();
			$('#btn').click(function(){
				var name = $("#register_name").val();
				var pwd = $("#register_pwd").val();
				var email = $("#email").val();
				var data = {"name":name,"pwd":pwd,"email":email};
		
				$.ajax({
					type:'POST',  
					dataType:'json',
					url:'/api/register',  
					contentType:'application/json;charset=UTF-8',
					data:JSON.stringify(data),  
					success: function(data) {
						if(data.errno == '0'){
							alert(data.errmsg);
						}
					}	  
					
				});
				
			});
		var ImageCodeId = "";
		function generateUUID(){
                 var d = new Date().getTime();
                 if(window.performance && typeof window.performance.now == "function"){
                         d += performance.now();
                 }
                 var uuid = 'xxxxxxxx-xxxx-4xxx-xxxxxxxx'.replace(/[xy]/g,function(c){
                         var r= (d + Math.random()*16)%16 | 0;
                         d = Math.floor(d/16);
                         return (c=='x' ? r : (r&0x3|0x8).toString(16));
                 });
                 return uuid;
         }
         function generateImageCode(){
                 var preImageId = ImageCodeId;
                 ImageCodeId = generateUUID();
                 $('#img').attr("src","/api/captcha?pcode="+preImageId+"&codeid="+ImageCodeId);
         }

         generateImageCode();
         $('#img').click(function(){
                generateImageCode();
        })

	$('#reg_captcha').blur(function(){
		check_captcha();
	})


	function check_captcha(){
                var ImgValue = $('#reg_captcha').val();
                var data = {"data":ImgValue,"imgcode":ImageCodeId};
                $.ajax({
                        type: 'POST',
                        dataType:'json',
                        contentType:'application/json;charset=UTF-8',
                        url: '/api/checkCaptcha',
                        data:JSON.stringify(data),
                        success: function(data){
                                if(data.errno == 1 ){
					alert("验证码错误")
                                        error_captcha = true;
                                }else if(data.errno == 2){
					alert("验证码过期")
                                        error_captcha = true;
                                }
                        }
                });
        }







});
	
