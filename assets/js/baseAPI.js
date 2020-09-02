// 发送请求之前执行
// options:请求参数对象
$.ajaxPrefilter(function(options){
    // 在真正发起 Ajax 请求之前，统一拼接请求的根路径
    options.url ='http://ajax.frontend.itheima.net' + options.url
})