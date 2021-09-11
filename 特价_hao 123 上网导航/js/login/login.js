const login=()=>{
	function tabShow(){
		let box=$('#container');
		box.addEventListener('click',e=>{
			let tar=e.target;
			if(tar.nodeName=="I"||tar.classList.contains("mmdl")){
				if(tar.classList.contains("iconfont")){
					tar.classList.toggle('iconfontOn');
					if(tar.classList.contains('iconfontOn')){
						$('.sm-login').style.display="block";
						$("#login").style.display="none";
						$('div.dl').classList.remove('dl');
						$('.passLogin').classList.add('dl');
						inPut()
					}else{
						$('.sm-login').style.display="none";
						$("#login").style.display="block";
						$('.login-error').style.display="none";
						$(".password-login-tab-item").classList.add('underLine');
						$(".sms-login-tab-item").classList.remove("underLine");
					};
				};
				if(tar.classList.contains('mmdl')){
					$('.iconfont').classList.remove("iconfontOn");
					$('.sm-login').style.display="none";
					inPut()
					$("#login").style.display="block";
					$('.login-error').style.display="none";
					$(".password-login-tab-item").classList.add('underLine');
					$(".sms-login-tab-item").classList.remove("underLine");
				};
			};
			if(tar.nodeName=="A"){
				if(tar.parentNode.classList.contains('login-blocks')){
					$("a.underLine").classList.remove('underLine');
					tar.classList.add('underLine');
					$('.login-error').style.display="none";
					$(".dl").classList.remove("dl");
					inPut()
					$(`div[index=${tar.getAttribute('xb')}]`).classList.add("dl");
				};
			};
		},false);
	};
	function inPut(){
		_('input').forEach(el=>{
			el.value='';
		});
	};
	function creat(){
		fetch('../json/login/number.json')
		.then(e=>e.json())
		.then(data=>{
			let arr=[];
			data.countryAreaConfig.countryList.forEach((el,i)=>{
				arr.push(`
						<option value="{&quot;areaName&quot;:&quot;${el.areaName}&quot;,&quot;checkKey&quot;:&quot;${el.checkKey}&quot;,&quot;countryCode&quot;:&quot;C${el.countryCode}&quot;,&quot;phoneCode&quot;:&quot;${el.phoneCode}&quot;}">+${el.phoneCode} ${el.areaName}</option>
					`);
			});
			$('.native-phone-code-select').innerHTML=arr.join('');
		});
	};
	function loginEventList(){
		$(".passLogin .fmbtn_submit").addEventListener('click',e=>{
			if($('[name=username]').value==""){
				$('.login-error').style.display="block";
				$('.login-error-msg').innerHTML="请输入账户名"
				return;
			};
			if($('[name=password]').value==""){
				$('.login-error').style.display="block";
				$('.login-error-msg').innerHTML="请输入密码"
				return;
			};
			fetch('../json/login/login.json')
			.then(e=>e.json())
			.then(data=>{
				let arr=[];
				data.forEach((el,i)=>{
					if($('[name=username]').value==el.username||$('[name=password]').value==el.password){
						$('.login-error').style.display="none";
						cookie.set('username',$('[name=username]').value);
					}else{
						$('.login-error').style.display="block";
						$('.login-error-msg').innerHTML="密码或账户名不正确";
						return;
					};
				});
				inPut()
			});

			// document.body.innerHTML=""
		});
		$('.numberLogin .fmbtn_submit').addEventListener('click',e=>{
			if($('[name=number]').value==""){
				$('.login-error').style.display="block";
				$('.login-error-msg').innerHTML="请输入手机号"
				return;
			};
			if($('[name=dx]').value==""){
				$('.login-error').style.display="block";
				$('.login-error-msg').innerHTML="请输入验证码"
				return;
			};
			$('.login-error').style.display="none";
		},false);
		$('.native-phone-code-select').addEventListener('change',e=>{
			let tar=e.target;
			console.log(tar);
			if(tar.nodeName=="SELECT"){
				let obj=eval("("+tar.value+")");
				console.log(obj)
				$('.native-phone-code-select-wrap').setAttribute('data-content','+'+obj.phoneCode);
				let reg=new RegExp(obj.checkKey);
				console.log(reg)
			};
		},false);
	};
	const init=()=>{
		tabShow();
		creat();
		loginEventList();
	};
	init();
};
login();