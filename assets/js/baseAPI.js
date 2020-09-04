// 发送请求之前执行
// options:请求参数对象
$.ajaxPrefilter(function(options){
    // 在真正发起 Ajax 请求之前，统一拼接请求的根路径
    options.url ='http://ajax.frontend.itheima.net' + options.url
    // 统一为有权限的接口， 设置headers设置请求头
    if(options.url.indexOf('/my/') !== -1){
       options.headers={
            Authorization:localStorage.getItem('token') || ''
        }   
    }
    //无论成功或者失败，都会执行 complete 函数
    options.complete=function(res){
        // console.log('执行了complete回调')
        console.log(res);
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //1. 强制清空本地 token
            localStorage.removeItem('token')
            //2. 强制跳转到本地页面
            location.href = '/login.html'
        }
    }
})