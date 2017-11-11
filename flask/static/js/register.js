$(function(){

	var error_name = false;
	var error_password = false;
	var error_check_password = false;
	var error_email = false;
	var error_check = false;
	var errno_captcha = false;

	$('#register_name').blur(function() {
		check_user_name();
	});

	$('#register_pwd').blur(function() {
		check_pwd();
	});

	$('#register_cpwd').blur(function() {
		check_cpwd();
	});

	$('#email').blur(function() {
		check_email();
	});









	$('#allow').click(function() {
		if($(this).is(':checked'))
		{
			error_check = false;
			$(this).siblings('span').hide();
		}
		else
		{
			error_check = true;
			$(this).siblings('span').html('请勾选同意');
			$(this).siblings('span').show();
		}
	});
	function check_user_name(){
		var len = $('#register_name').val().length;
		if(len<5||len>20)
		{
			$('#register_name').next().html('请输入5-20个字符的用户名')
			$('#register_name').next().show();
			error_name = true;
		}
		else
		{
			$('#register_name').next().hide();
			error_name = false;
		}
	}

	function check_pwd(){
		var len = $('#register_pwd').val().length;
		if(len<8||len>20)
		{
			$('#register_pwd').next().html('密码最少8位，最长20位')
			$('#register_pwd').next().show();
			error_password = true;
		}
		else
		{
			$('#register_pwd').next().hide();
			error_password = false;
		}		
	}


	function check_cpwd(){
		var pass = $('#register_pwd').val();
		var cpass = $('#register_cpwd').val();

		if(pass!=cpass)
		{
			$('#register_cpwd').next().html('两次输入的密码不一致')
			$('#register_cpwd').next().show();
			error_check_password = true;
		}
		else
		{
			$('#register_cpwd').next().hide();
			error_check_password = false;
		}		
		
	}

	function check_email(){
		var re = /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/;

		if(re.test($('#email').val()))
		{
			$('#email').next().hide();
			error_email = false;
		}
		else
		{
			$('#email').next().html('你输入的邮箱格式不正确')
			$('#email').next().show();
			error_email = true;
		}

	}

})
