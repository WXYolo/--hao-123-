const getData=()=>{
	fetch("../../json/shopping/shop.json")
	.then(e=>e.json())
	.then(data=>{
		
		function locationToMake(search){
			search=search||location.search;
			if(search){
				let arr=search.substring(1).split("&");
				let obj={};
				arr.forEach((el,i)=>{
					obj[el.split('=')[0]]=el.split('=')[1]
				});
				return obj;
			};
			return null;
		};
		let obj=locationToMake();
		console.log(obj)
		data.forEach((el,i)=>{
			forIn(obj,(key,value)=>{
				if(value==el.id){
					console.log(el);
					{
						let arr=[];
						el.listImg.forEach((el,i)=>{
							arr.push(`
									<li style="overflow: hidden;">
										<a class="">
											<img price="${el.price}" style="cursor:pointer" src="${el.img}">

										</a>
									</li>
								`);
						});
						$('.tabul').innerHTML=arr.join('');
					}
					{
						let arr=[];
						el.sImg.forEach((el,i)=>{
							arr.push(`
									<li class="">
										<a href="#" class="${i==0?"on":""}">
											<img src="${el}">
										</a>
									</li>
								`);
						});
						$('.tb-thumb').innerHTML=arr.join('');
					}
					{
						$('.tm-price').innerHTML=el.price;
					}
					{
						$('.tb-detail-hd h1').innerHTML=el.title;
						$('.tb-detail-hd p').innerHTML=el.newp;
						$('.tm-count').innerHTML=el.count;
						$(".J_CollectCount").innerHTML=el.J_CollectCount;
					}
					{
						let arr=[];
						el.bannerImg.forEach(el=>{
							arr.push(`
									<li>
										<div>
											<a href="#">
												<img src="${el.img}">
											</a>
											<p>${el.price}</p>
										</div>
									</li>
								`);
						});
						$('.wrapCon ul').innerHTML=arr.join('');
						banner();
					}	
				}else{
					document.body.innerHTML=''
				};
			});
		});
	});
	function eventList(){
		let ul=$('.tabul');
		ul.addEventListener('click',e=>{
			let tar=e.target;
			let tab=_('.tab',ul);
			if(tar.nodeName=="IMG"){
				if(tar.parentNode.classList.contains('tab')){
					tar.parentNode.classList.remove('tab');
					tar.parentNode.removeChild(tar.parentNode.children[tar.parentNode.children.length-1]);
					$('.tm-price').innerHTML=`5.20-13.60`;
					$('.s-img').setAttribute('src',$('a.on').children[0].getAttribute('src'));
					$('.b-img').setAttribute('src',$('a.on').children[0].getAttribute('src'));
					return;
				};
				if($('.tab',ul)){
					$('.tab',ul).removeChild($('.tab i',ul));
					$('.tab',ul).classList.remove('tab');
					tar.parentNode.classList.add('tab');
					taab(tar);
					return;
				}else{
					tar.parentNode.classList.add('tab');
					taab(tar);
					return;
				};
			};
		},false);
		$(".tb-amount-widge").addEventListener('click',e=>{
			let tar=e.target;
			if(tar.nodeName=="SPAN"){
				let input=$(".tb-amount-widge input");
				if(tar.classList.contains('topMui')){
					input.value=input.value-0+1;
				};
				if(tar.classList.contains('botMui')){
					if(input.value>1){
						input.value=input.value-0-1;
					};
				};
			};
		},false);
		function taab(tar){
			$('.tm-price').innerHTML=tar.getAttribute('price');
			$('.s-img').setAttribute('src',tar.getAttribute('src'));
			$('.b-img').setAttribute('src',tar.getAttribute('src'));
			tar.parentNode.appendChild(document.createElement('i'));
		};
	};
	eventList();
};
const zoom=()=>{
	const ele={
		s_box:$('.tb-booth'),
		f_box:$('.fldiv'),
		sImg:$('.s-img'),
		bImg:$('.b-img'),
		b_box:$('.ks-overlay'),
		tabBox:$('.tb-thumb-warp'),
		list:$('.tb-thumb'),
		box:$('.J_DetailMeta'),
		topScroll:0
	};
	ele.s_box.addEventListener('mouseover',e=>{
		ele.f_box.style.display="block";
		ele.b_box.style.display="block";
	});
	ele.s_box.addEventListener('mouseout',e=>{
		ele.f_box.style.display="none";
		ele.b_box.style.display="none";
	});
	window.addEventListener('scroll',e=>{
		let top=document.documentElement.scrollTop;
		ele.topScroll=top;
	});
	ele.s_box.addEventListener('mousemove',e=>{
		let x=e.clientX-ele.box.offsetLeft-15-ele.f_box.offsetWidth/2;
		let y=e.clientY+ele.topScroll-ele.box.offsetTop-25-ele.f_box.offsetHeight/2;
		let w=ele.s_box.offsetWidth-ele.f_box.offsetWidth;
		let h=ele.s_box.offsetHeight-ele.f_box.offsetHeight;
		if(x<0){x=0};
		if(y<0){y=0};
		if(x>w){x=w};
		if(y>h){y=h};
		ele.f_box.style.left=x+'px';
		ele.f_box.style.top=y+'px';
		let bx=x/w;
		let by=y/h;
		ele.bImg.style.left=-(bx*(ele.bImg.offsetWidth-ele.b_box.offsetWidth))+'px';
		ele.bImg.style.top=-(by*(ele.bImg.offsetHeight-ele.b_box.offsetHeight))+'px';
	},false);
	ele.tabBox.addEventListener('mouseover',e=>{
		let tar=e.target;
		if(tar.nodeName=="IMG"){
			$('a.on').classList.remove('on');
			tar.parentNode.classList.add('on');
			ele.sImg.setAttribute('src',tar.getAttribute('src'));
			ele.bImg.setAttribute('src',tar.getAttribute('src'));
		};
	},false);
};
//右半部分的无缝轮播
const banner=()=>{
	let e={
		index:0,
		hig:480,
		leng:Math.ceil(_('.wrapCon li').length/3),
		ul:$('.wrapCon ul'),
		prev:$('.prev_a'),
		next:$(".next_a")
	};
	e.ul.appendChild(e.ul.children[0].cloneNode(true));
	e.ul.appendChild(e.ul.children[1].cloneNode(true));
	e.ul.appendChild(e.ul.children[2].cloneNode(true));
	e.prev.addEventListener('click',a=>{
		e.index--;
		if(e.index<0){
			e.index=e.leng-1;
			e.ul.style.top=-e.hig*(e.leng)+'px';
		};
		move(e.ul,{
			top:-e.hig*e.index
		})
	},false);
	e.next.addEventListener('click',a=>{
		e.index++;
		if(e.index>e.leng){
			e.index=1;
			e.ul.style.top=0;
		};
		move(e.ul,{
			top:-e.hig*e.index
		})
	},false);
};