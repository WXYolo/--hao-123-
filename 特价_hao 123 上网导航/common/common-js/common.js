/** 
 * @作者 张三
 * @功能 提供公共方法
 * @日期 2021.6.18
 */
/* -------------------------------------------------------------------------------------------------------------------- */
/** 
 *@方法 $
 *@描述 根据参数来获取元素
 *@参数 css css表达式 例如：span[name=aa]
 *@参数 el 元素对象 例如： document.getElementById('aa')
 *@返回 元素 
 *@示例 $('.aa',document.getElementById('aa'))
 *$('.aa',$('#bb'))
 */
const $ = (css, el) => {
    el = el || document;
    return el.querySelector(css);
};
/* -------------------------------------------------------------------------------------------------------------------- */
/** 
 *@方法 _
 *@描述 根据参数来获取元素集合
 *@参数 css css表达式 例如：span[name=aa]
 *@参数 el 元素对象 例如： document.getElementById('aa')
 *@返回 元素集合
 *@示例 _('.aa',document.getElementById('aa'))
 *_('.aa',$('#bb'))
 */
const _ = (css, el) => {
    el = el || document;
    return el.querySelectorAll(css);
};
/* -------------------------------------------------------------------------------------------------------------------- */
/** 
 * @方法 each
 * @描述 对数组循环并执行自定义函数
 * @参数 arr 数组(包含类数组)
 * @参数 callback 回调函数
 * @返回值 没有返回
 * @示例 each([1,2,3],function(el,index){
            console.log(el,index)
            //el代表元素，index代表下标
        })
 */
// call和apply
const Each = (arr, callBack) => {
    for (let i = 0; i < arr.length; i++) {
        callBack(arr[i], i);
    };
};

const EachCallYi = (arr, callBack) => {
    for (let i = 0; i < arr.length; i++) {
        callBack.call(arr[i], i);
    };
};

const EachCallEr = (arr, callBack) => {
    for (let i = 0; i < arr.length; i++) {
        callBack.call(arr, arr[i], i);
    };
};
// Each([1,2,3,4],function(el,index){
//     console.log(el,index);//el表示数组每一个元素 index表示下标
// });
// EachCallYi([1,2,3,"4"],function(index){
//     console.log(this,index);//this表示数组的每一项返回数组中每一个值得类型以及值（构造函数）（值可以直接使用）index表示下标

// });
// EachCallEr([1,2,3,4],function(el,index){
//     console.log(this,el,index)//this指向arr数组 el表示数组每一个元素 index表示下标
// });
/* -------------------------------------------------------------------------------------------------------------------- */
/** 
 * @方法 forIn
 * @描述 遍历对象并执行自定义函数
 * @参数 obj 对象
 * @参数 callback 回调函数
 * @返回值 没有返回
 * @示例 forIn({a:1,b:2,c:3},function(key,value){
            console.log(key,value)
            //key表示对象的键，value代表对象的值
        })
 */
const forIn = (obj, callback) => {
    for (let attr in obj) {
        callback.call(obj, attr, obj[attr]);
    };
};
/* -------------------------------------------------------------------------------------------------------------------- */
/** 
 * @方法 makeListToArray
 * @描述 将集合转换成数组
 * @参数 list 集合
 * @返回 将转换的数组返回
 */
const makeListToArray = list => {
    let arr = [];
    Each(list, (el, i) => {
        arr.push(el);
    });
    return arr;
};
/* -------------------------------------------------------------------------------------------------------------------- */
/**
 * @方法extend
 * @描述 将多个对象参数复制到一个对象中
 * @参数 第一个参数 是目标对象，其他所有的对象都复制到这个对象中
 * @示例 extend({},{name:123},{age:21})
 */
function Extend(object) {
    //arguments所有的参数集合
    let arr = makeListToArray(arguments);
    let obj = arr.shift();
    Each(arr, (el, i) => {
        for (let index in el) {
            obj[index] = el[index];
        };
    });
    return obj;
};
// var obj = { name: 'aa' }
// var obj_a = { age: 21 }
// var obj_b = { address: 'usoidufs' }
// extend(obj, obj_a, obj_b)
// console.log(obj)、、用法

/* ---------------------------------------COOKIE-------------------------------------COOKIE---------------------------------------- */
var cookie = {};
/**
 * @函数cookie.get
 * @描述 根据键来获取值
 * @参数 key键
 * */
cookie.get = function(key) {
    var ck = document.cookie;
    var arr = ck.split(';');
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i].split('=')[0]] = arr[i].split('=')[1];
        console.log(obj)
    };
    return obj[key] ? obj[key] : obj[' ' + key];
};
/**
 * @函数 cookie.set
 * @描述 设置cookie
 * @参数 key 键
 * @参数 value 值
 * */
cookie.set = function(key, value, day) {
    var date = new Date();
    day = day || 1;
    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + date.toGMTString();
    document.cookie = key + '=' + value + ';' + expires + ';path=/';
};
/**
 * @函数 cookie.remove
 * @描述 根据键删除cookie
 * @参数 key 要删除的键
 * */
cookie.remove = function(key) {
    cookie.set(key, cookie.get(key), -1);
};

/* -----------------------------------AJAX--------------------------------AJAX------------------------------------------------- */
/**
 * @描述 创建XMLHttpRequest
 * @函数getEequest
 * @返回 XMLHttpRequest对象
 * */
var getRequest = () => {
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    };
    return xmlHttp;
};
/**
 * @描述 发送请求，接收数据 
 * @函数ajax 
 * */
var Ajax = (obj) => {
    var url = obj.url,
        method = obj.method || 'GET',
        param = obj.param || '',
        //async必须是字符串
        async = obj.async || true,
        callback = obj.callback || function() {};
    var xmlHttp = getRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if (xmlHttp.responseXML) {
                callback(xmlHttp.responseXML);
                return;
            }
            // JSON.stringify 将json转成字符串
            // JSON.parse 将字符串转为json
            callback(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open(method, url, eval(async));
    if (method === 'POST') {
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    };
    xmlHttp.send(param);
};
/* -------------------------------------------------------------------------------------------------------------------- */
/**
 * @加载页面
 * @函数 load
 * @参数 obj 里面包括obj.el 元素对象
 * @参数obj.url 地址
 * @示例 load({
 * el:$('#id'),
 * url:'地址'
 * })
 * */
const load = obj => {
    let xmlHttp = getRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            obj.el.innerHTML = xmlHttp.responseText;
        };
    };
    xmlHttp.open('GET', obj.url, true);
    xmlHttp.send();
};
/* -------------------------------------------------------------------------------------------------------------------- */
// 完美运动
/** 
 * getStyle 获取样式 
 * startMove 运动主程序 
 */

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]; //for ie 
    } else {
        return getComputedStyle(obj, false)[attr]; // for ff
    };
};

function move(obj, json, fn) {
    //停止上一次定时器  
    clearInterval(obj.timer); //关闭前一个定时器，解决对同个对象同时调用多个Move()时，定时器叠加问题。使用obj.timer给每个调用Move()的对象赋予各自的定时器，防止多个对象同时调用Move()时，同用一个定时器，而导致相关干扰问题。 
    //保存每一个物体运动的定时器  
    obj.timer = setInterval(function() {
        //判断同时运动标志  
        var bStop = true;
        for (var attr in json) {
            //取当前值    
            var iCur = 0; //创建一个变量，用于存储 attr属性每时每刻的值
            if (attr == 'opacity') {
                //针对在FF中opacity属性值为浮点数值问题，将属性值 四舍五入、转换成浮点型。乘以100，使opacity属性值与IE统一为百分数
                iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr)); //将除opacity外的属性(width/fontSize/MarginLeft等)的初始值 转换为整型 
            };
            //计算速度  
            var iSpeed = (json[attr] - iCur) / 8; //创建 递减的速度speed变量。实现属性值的变速改变
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //取整，解决浏览器忽略小于1px的数值 导致运动结束时，离目标值Itarget少几个像素的问题
            //检测同时到达标志  
            if (iCur != json[attr]) {
                bStop = false;
            };
            //更改属性，获取动画效果  
            if (attr == 'opacity') {
                iCur += iSpeed;
                obj.style.filter = 'alpha(opacity:' + iCur + ')';
                obj.style.opacity = iCur / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            };
        };
        //检测停止  
        if (bStop) {
            clearInterval(obj.timer);
            if (fn) fn.call(obj);
        };
    }, 30);
};
/* -------------------------------------------------------------------------------------------------------------------- */
let method = {};
/**
 * @描述 所有方法的集合
 * @参数 obj 键值对集合
 * */
method.show = function(obj) {
    let el = obj.el;
    let attr = obj.attr; //fade淡入 slide淡出
    if (attr === "fade") {
        el.style.display = "block";
        move(el, {
            opacity: 100
        });
    };
    if (attr === "slide") {
        el.style.display = "block";
        move(el, {
            width: parseInt(el.width),
            height: parseInt(el.height)
        });
    };
    if (attr === "roll") {
        el.style.display = "block";
        move(el, {
            height: parseInt(el.height)
        });
    };
};
/**
 * @ 描述元素隐藏
 * @参数 obj 键值对集合
 * */
method.hide = function(obj) {
    let el = obj.el;
    let attr = obj.attr; //fade淡入 slide淡出
    if (attr === "fade") {
        move(el, {
            opacity: 0
        }, function() {
            this.style.display = "none";
        });
    };
    if (attr === "slide") {
        el.width = getStyle(el, "width");
        el.height = getStyle(el, "height");
        move(el, {
            width: 0,
            height: 0
        }, function() {
            this.style.display = "none";
        });
    };
    if (attr === "roll") {
        el.height = getStyle(el, "height");
        move(el, {
            height: 0
        }, function() {
            this.style.display = "none";
        });
    };
};
/**
 * @给元素上设置键值对
 * */
method.data = function(el, key, value) {
    if (!value) {
        return el[key];
    };
    el[key] = value;
};
method.removeData = function(el, key) {
    if (!el[key]) {
        throw TypeError(`没有${key}`);
    };
    delete(el[key]);
};
/*例子
let fadeIn=$('[name=fadeIn]'),
        fadeOut=$('[name=fadeOut]');
    fadeIn.onclick=function() {
        method.show({
            el:$('#m-a'),
            attr:"slide"
        });、、显示
    };
    fadeOut.onclick=function() {
        method.hide({
            el:$('#m-a'),
            attr:"fade"
        });、、隐藏
    };
*/