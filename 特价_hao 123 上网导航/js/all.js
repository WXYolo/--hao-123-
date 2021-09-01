/**
 * @函数header()
 * @作用 网页header头部区域js功能
 * */
const header=()=>{
	// 搜索框下方hotsword
	let time=new Date();
	Ajax(
			{
				url:"../json/header_word.json?"+time.getTime(),
				callback:function (xml){
					let str=``;
					Each(xml,(el,i)=>{
						str+=`<a href="#" class="word">${el}</a>`
					});
					$('.hotwords').innerHTML=str;
				}
			}
		);
	// 搜索框右边网址导航区域
	const hover_ajax=()=>{
		Ajax(
				{
					url:"../json/header_pindao.json?"+time.getTime(),
					callback:function (xml){
						let str=``;
						Each(xml,(el,i)=>{
							str+=`<div class="item">
									<div class="title">${el.title}</div>
									<div class="navList cf">
										${navigation_a(el)}
									</div>
								</div>`
								navigation_a(el)
						});
						$('.navigationBox').innerHTML=str;
					}
				}
			);
		const navigation_a=(ele)=>{
			var str=``;
			Each(ele.pindao,(el,i)=>{
				str+= `<a class="pindao_a" href="#">${el}</a>`
			});
			return str;
		};
	};
	$('.navigationDiv').addEventListener('mouseover',()=>{
		hover_ajax();
	});
	// 滚动时header头部区域始终置顶
	window.addEventListener('scroll',(e)=>{
		var top=document.documentElement.scrollTop;
		if(top>0){
			$('#header').classList.remove('header');
			$('#header').classList.add('header_fixed');
			$('.hotwords').style.display="none";
		}else{
			$('#header').classList.add('header');
			$('#header').classList.remove('header_fixed');
			$('.hotwords').style.display="block";
		};
	},false);
};
/*-------------------------------------------------------------------------------------*/
/*——————————————————————————————————————————————————————————————————————————————————————*/
/**
 * @函数banner()
 * @作用 网页banner轮播图区域js功能
 * */
const banner=()=>{
	// 轮播图banner区域左半部分区域
	Ajax(
			{
				url:"../json/banner_left.json",
				callback:(xml)=>{
					let str=``;
					Each(xml,(el,i)=>{
						str+=`
							<li>
								<img src="../img/${el.img}">
								<div>
									${menu(el)}
								</div>
							</li>
						`;
					});
					$('.banner_left_list').innerHTML=str;
				}
			}
		);
	const menu=(el)=>{
		let str=``;
		Each(el["menu_a"],(ele,i)=>{
			if(i==0){
				str+=`<a href="#" class="menu_a fl">${ele}</a>`;
			}else{
				str+=`
					<span class="menu_spa">.</span>
					<a href="#" class="menu_a fl">${ele}</a>
				`;
			};
		});
		return str;
	};
	// 轮播图banner区域右半部分上半部分区域
	Ajax(
			{
				url:"../json/banner_right_header.json",
				callback:(xml)=>{
					var str=``;
					Each(xml,(el,i)=>{
						str+=`<a href="#">${el}</a>`;
					});
					$(".wrap").innerHTML=str;
				}
			}
		);
	// 轮播图banner区域右半部分左半部分
	Ajax(
			{
				url:"../json/banner_right_left.json",
				callback:xml=>{
					let banner_right_list=$('.banner_right_list'),
						banner_right_left=$('.banner_right_left'),
						prev=$('.banner_right_left .prev'),
						next=$('.banner_right_left .next'),
						bar_first=$('.bar_first'),
						spa=_('.dd span');
					let index=0,tt=null;
					let str=``;
					Each(xml,(el,i)=>{
						str+=`
							<li index="${el.index}">
								<a href="#">
									<img src="../img/${el.img}">
								</a>
							</li>`;
					});
					Each(spa,(el,i)=>{
						el.setAttribute('xb',i);
						el.addEventListener('click',function(){
							let xb=this.getAttribute('xb');
							index=xb;
							$('span.on').classList.remove('on');
							this.classList.add('on');
							move(banner_right_list,{
								left:-703*xb
							});
							bar_first.innerHTML=this.getAttribute('xb')-0+1;
						});
					});
					banner_right_list.innerHTML+=str;
					let banner_right_lis=_('.banner_right_list li');
					const banner_move=()=>{
						index++;
						if(index>4){
							index=1;
							banner_right_list.style.left=0;
						};
						move(banner_right_list,{
							left:-703*index
						});
						let lis_index=banner_right_lis[index].getAttribute('index');
						bar_first.innerHTML=lis_index;
						$('span.on').classList.remove('on');
						spa[lis_index-1].classList.add('on');
					};
					const banner1=()=>{
						clearInterval(tt);
						tt=setInterval(function(){
							banner_move();
						},3000);
					};
					banner1();
					banner_right_left.addEventListener('mouseover',()=>{
						clearInterval(tt);
					});
					banner_right_left.addEventListener('mouseout',()=>{
						banner1();
					});
					next.addEventListener('click',()=>{
						banner_move();
					});
					prev.addEventListener('click',()=>{
						index--;
						if(index<0){
							banner_right_list.style.left="-2812px";
							index=3;
						};
						move(banner_right_list,{
							left:-703*index
						});
						let lis_index=banner_right_lis[index].getAttribute('index');
						bar_first.innerHTML=lis_index;
						$('span.on').classList.remove('on');
						spa[lis_index-1].classList.add('on');
					});
				}
			}
		);
	// 轮播图banner区域右半部分右半部分
	Ajax(
			{
				url:"../json/banner_right_right.json",
				callback:xml=>{
					let str=``;
					const lisOn=(i)=>{
							if(i==0){
								return `lis_on`;
							}else{
								return ``;
							};
						};
					Each(xml,(el,i)=>{
						str+=`
							<li class="${lisOn(i)}">
								<a href="#" class="banner_right_right_a">
									<img src="../img/${el.img}">
								</a>
								<div class="card_info">
									<a href="#" class="card_a">
										<img src="../img/c2a5cf54f411641020ee00c0c7a96f17.png">
										<span>${el.txt}</span>
									</a>
									<div class="card_tag">
										<span>包邮</span>
										<span>优质店铺</span>
									</div>
									<div class="card_detail">
										<div class="fl">
											<span class="card_price">
												<i>￥</i>${el.price}
											</span>
											<span class="card_initial">
												<i>￥</i>${el.original}
											</span>
										</div>
										<a href="#" class="pur_btn">领券购买</a>
									</div>
								</div>
							</li>`;
					});
					$('.banner_right_right_list').innerHTML+=str;
					// 轮播图功能
					let lis=_('.banner_right_right li'),
						prev=$('.banner_right_right .prev'),
						next=$('.banner_right_right .next'),
						bar_first=$('.banner_right_right .bar_first'),
						banner_right_right=$('.banner_right_right'),
						index=0,tt=null;
					// 定时轮播
					const move_fun=(tar)=>{
						if(tar=="prev"){
							index--;
							if(index<0){
								index=lis.length-1;
							};
						};
						if(tar=="next"){
							index++;
							if(index>lis.length-1){
								index=0;
							};
						};
						$('li.lis_on').classList.remove('lis_on');
						lis[index].classList.add('lis_on');
						bar_first.innerHTML=index+1;
					};
					const lis_move=()=>{
						clearInterval(tt);
						tt=setInterval(()=>{
							move_fun("next");
						},4000);
					};
					lis_move();
					prev.addEventListener('click',()=>{
						move_fun("prev");
					});
					next.addEventListener('click',()=>{
						move_fun("next");
					});
					banner_right_right.addEventListener('mouseover',()=>{
						clearInterval(tt);
					});
					banner_right_right.addEventListener('mouseout',()=>{
						lis_move();
					});
				}
			}
		);
};
/*-------------------------------------------------------------------------------------*/
/*——————————————————————————————————————————————————————————————————————————————————————*/
/**
 * @函数seckill()
 * @作用 网页seckill特价秒杀区域js功能
 * */
 const seckill=()=>{
 	// 国潮guochao特价秒杀左半部分
 	Ajax(
 			{
 				url:"../json/seckill_guochao.json",
 				callback:xml=>{
 					let str=``;
 					Each(xml,el=>{
 						str+=`
 						<li class="guochao-lis">
							<a href="#" class="guochao-a">
								<img src="../img/${el.img}">
								<div class="guochao-a-text">
									<img src="../img/c2a5cf54f411641020ee00c0c7a96f17.png">
									${el.title}
								</div>
								<div class="guochao-price">
									<span>${el.price}</span>
								</div>
							</a>
						</li>`;
 					});
 					$('.guochao-list').innerHTML=str;
 				}
 			}
 		);
 	// 国潮guochao特价秒杀右半部分下半部分
 	Ajax(
 			{
 				url:"../json/seck-b-list.json",
 				callback:xml=>{
 					let str=``;
 					Each(xml,el=>{
 						str+=`
 						<li>
							<a href="#">
								<div class="img-seck">
									<img src="../img/${el.img}">
								</div>
								<div class="desc">${el.txt}</div>
							</a>
						</li>`;
 					});
 					$('.seck-b-list').innerHTML=str;
 				}
 			}
 		);
 	// 国潮guochao特价秒杀右半部分上半部分
 	Ajax(
 			{
 				url:"../json/miaosha-list.json",
 				callback:xml=>{
 					let str=``;
 					Each(xml,(el,i)=>{
 						str+=`<li index="${i+1}">${swrap(el)}</li>`;
 					});
 					$('.miaosha-list').innerHTML=str;
 					$('.miaosha-list').appendChild(_('.miaosha-list>li')[0].cloneNode(true))
 				}
 			}
 		);
 	function swrap(el){
 		let str=``;
 		Each(el,ele=>{
 			str+=`
 				<div class="sWrap">
					<a href="#">
						<img src="../img/${ele.img}">
						<div class="sWrap-title">${ele.title}</div>
						<div class="prices">
							<span class="prices-spa">
								￥
								<span class="number">${ele.number}</span>
							</span>
							<span class="origin">¥${ele.origin}</span>
						</div>
					</a>
				</div>`;
 		});
 		return str;
 	};
 	// 轮播功能实现
 	const miaoshaMove=()=>{
 		let ms_obj={
 				prev:$('.miaosha>.prev'),
 				next:$('.miaosha>.next'),
 				ul:$('.miaosha-list'),
 				first:$('.progress-first'),
 				ms:$('.miaosha'),
 				index:0,
 				tt:null,
 				width:950,
 				event:function(e){
 					if(this.classList.contains('prev')){
 						ms_obj.index--;
 						if(ms_obj.index<0){
 							ms_obj.index=1;
 							ms_obj.ul.style.left="-1900px";
 						};
 						move(ms_obj.ul,{
 							left:-ms_obj.width*ms_obj.index
 						});
 						ms_obj.first.innerHTML=_('.miaosha-list>li')[ms_obj.index].getAttribute('index');
 					};
 					if(this.classList.contains('next')){
 						ms_obj.ms_move();
 					};
 				},
 				ms_move:function(){
 					ms_obj.index++;
					if(ms_obj.index>2){
						ms_obj.index=1;
						ms_obj.ul.style.left=0;
					};
					move(ms_obj.ul,{
						left:-ms_obj.width*ms_obj.index
					});
					ms_obj.first.innerHTML=_('.miaosha-list>li')[ms_obj.index].getAttribute('index');
 				},
 				ms_time:function(){
 					clearInterval(ms_obj.tt);
 					ms_obj.tt=setInterval(function(){
 						ms_obj.ms_move();
 					},4000);
 				}
 			};
 			ms_obj.ms_time();
 			ms_obj.prev.addEventListener('click',ms_obj.event,false);
 			ms_obj.next.addEventListener('click',ms_obj.event,false);
 			ms_obj.ms.addEventListener('mouseover',()=>{
 				clearInterval(ms_obj.tt);
 			});
 			ms_obj.ms.addEventListener('mouseout',()=>{
 				ms_obj.ms_time();
 			});
 	};
 	miaoshaMove();
 	// 限时秒杀计时
	 const msm=(sj,djs)=>{
	 	let timeTT=null;
	 	$('.time').innerText=`${sj}`;
	 	const ms_js=()=>{
	 		clearInterval(timeTT)
	 		timeTT=setInterval(function(){
	 			let datail=$('.time-datail'),
	 				wrap=$('.time-wrap'),
	 				title=$('.time-title');
	 			let time=new Date();
		 		let sj={
		 			n:time.getFullYear(),
		 			y:time.getMonth()+1,
		 			r:time.getDate(),
		 			s:time.getHours(),
		 			f:time.getMinutes(),
		 			m:time.getSeconds()
		 		};
		 		let newTime=new Date(`${sj.n}/${sj.y}/${sj.r} ${$('.time').innerHTML}`);
		 		let newHours=newTime.getHours();
		 		let newMinutes=newTime.getMinutes();
		 		let newSeconds=newTime.getSeconds();
		 		let wlTime=new Date(`${sj.n}/${sj.y}/${sj.r} ${newHours+djs}:${newMinutes}:${newSeconds}`);
	 			let down=wlTime-newTime;
	 			let ws,wf,wm;
	 			let sy=(wlTime-time)/1000;
	 			ws=parseInt(sy%(3600*24)/3600);
	 			wf=parseInt(sy%3600/60);
	 			wm=parseInt(sy%60);
	 			if(time>=newTime){
	 				if(ws<=0&&wf<=0&&wm<=0){
		 				clearInterval(timeTT);
		 				wrap.style.background="#f0f0f0";
		 				title.style.color="#999";
		 				datail.innerHTML=`
			 				<span>00</span>
							<i>:</i>
							<span>00</span>
							<i>:</i>
							<span>00</span>
			 			`;
		 			};
		 			if(ws>0||wf>0||wm>0){
		 				wrap.style.background="rgba(255,59,31,.1)";
		 				title.style.color="#333";
		 				datail.innerHTML=`
			 				<span style="color:#fff;background:#000;">${rep(ws)}</span>
							<i style="color:#000;">:</i>
							<span style="color:#fff;background:#000;">${rep(wf)}</span>
							<i style="color:#000;">:</i>
							<span style="color:#fff;background:#000;">${rep(wm)}</span>
			 			`;
		 			};
	 			}else{
	 				datail.innerHTML=`
			 				<span>00</span>
							<i>:</i>
							<span>00</span>
							<i>:</i>
							<span>00</span>
			 			`;
	 			};
	 		},1000);
	 		function rep(a){
	 			return a<10?"0"+a:a;
	 		};
	 	};
	 	ms_js();
	 };
	 msm("19:00",1)//开启或重置特价秒杀的倒计时时间
 };
 /*-------------------------------------------------------------------------------------*/
/*——————————————————————————————————————————————————————————————————————————————————————*/
/**
 * @函数recommend()
 * @作用 网页recommoned热门推荐区域js功能
 * */
 const recommend=()=>{
 	hmd.ajax(
 			{
 				url:"../json/recomend.json",
 				callback:xml=>{
 					let str=``;
 					Each(xml,el=>{
 						str+=`
 							<div class="fl pindao">
								<h2>${el.pindao.title}</h2>
								<ul class="tar-list cf">
									${tarLis(el)}
								</ul>
								<ul class="card-list cf">
									${cardLis(el)}
								</ul>
							</div>
 						`;
 					});
 					$('#recommend').innerHTML=str;
 				}
 			}
 		);
 	function tarLis(el){
 		let str=``;
 		EachCallEr(el["pindao"]["tar"],ele=>{
 			str+=`
 				<li class="tar-lis fl">
					<a class="tar-lisa" href="#">
						${ele}
						<span class="tar-icon"></span>
					</a>
				</li>
 			`;
 		});
 		return str;
 	};
 	function cardLis(el){
 		let str=``;
 		EachCallEr(el["pindao"]["card"],ele=>{
 			str+=`
 				<li class="card-lis">
					<a href="#">
						<img src="../img/${ele.img}">
						<div class="card-txt">${ele.text}</div>
						<div class="card-price">
							￥
							<span class="card-num">${ele.price}</span>
						</div>
					</a>
				</li>
 			`;
 		});
 		return str;
 	};
 };
 /*-------------------------------------------------------------------------------------*/
/*——————————————————————————————————————————————————————————————————————————————————————*/
/**
 * @函数center()
 * @作用 网页主体内容center区域js功能
 * */
 const center=()=>{
 	hmd.ajax(
 			{
 				url:"../json/center.json",
 				callback:xml=>{
 					let str=``;
 					Each(xml,el=>{
 						str+=`
 							<li>
								<a target="_blank" xb="${el.id}" href="#" class="cen-a">
									<img src="${el.img}">
									<div class="cen-txt">
										<div class="cen-inner">${el.num}人购买</div>
									</div>
								</a>
								<div class="cardInfo">
									<div class="cardTit">
										<a target="_blank" xb="${el.id}" href="#">
											<span>${el.title}</span>
										</a>
									</div>
									<div class="cardPrice">
										<a target="_blank" xb="${el.id}" href="#">
											<span class="discount-price">
												<i>￥</i>
												${el["discount-price"]}
											</span>
											<span class="initial-price">
												<i>￥</i>
												${el["initial-price"]}
											</span>
											<span class="cardTag">${el.cardTag}折</span>
										</a>
									</div>
								</div>
							</li>
 						`;
 					});
 					$('.center-list').innerHTML=str;
 					let cent_a=_('.center-list a');
 					EachCallYi(cent_a,function(index){
 						this.addEventListener('click',()=>{
 							window.open("tianmaoShopping.html?id="+this.getAttribute('xb'),target="_blank");
 						});
 					});
 				}
 			}
 		);
 };
 /*-------------------------------------------------------------------------------------*/
/*——————————————————————————————————————————————————————————————————————————————————————*/
/**
 * @函数footer()
 * @作用 网页底部footer区域js功能
 * */
 const footer=()=>{
 	window.onscroll=function(e) {
 		console.log()
 		if(document.documentElement.scrollTop>=4200){
 			$('#footer').style.display="block";
 		}else{
 			$('#footer').style.display="none";
 		};
 	};
 };