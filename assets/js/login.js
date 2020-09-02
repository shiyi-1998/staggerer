$(function(){
    // 登录页面转换成注册页面
    $("#link_reg").on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 注册页面转换成登录页面
    $("#link_login").on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 获取要操作的 layui 模块
    var form = layui.form
    var layer = layui.layer
    // 添加表达的自定义校验规则
    console.dir(form)
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            //还需要进行一次等于的判断
            //如果判断失败，则 return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return '两次密码不一致'
            }
        }
    })
    // 注册新用户
    $('#form_reg').on('submit',function(e){
        //1.阻止表单默认行为
        e.preventDefault()
        //2.发起Ajax的post请求
        var data = {
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',data,function(res){
            console.log(res);
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                // console.log(res)

                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })

})