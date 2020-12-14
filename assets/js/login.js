$(function () {
    $("#goToRegi").click(function () {
        //显示注册界面 隐藏登录界面
        $(".register").show()
        $(".login").hide()
    })
    $("#goToLogin").click(function () {
        //显示注册界面 隐藏登录界面
        $(".register").hide()
        $(".login").show()
    })
    //表单的校验
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });
    //注册的表单验证
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            $(".repassInt").val()
            if (value !== $(".repassInt").val()) {
                return "两次输入不一致"
            }

        }
    });

    $("#regiForm").on("submit", function (e) {
        e.preventDefault();
        let data = $(this).serialize()
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    // 注册失败
                    // return console.log(res.message);
                    return layer.msg(res.messag8e);
                }
                layer.msg("登录成功")
                $("#goToLogin").click()
            },

        })
    })

    //登录
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        let data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "/api/login",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //layer.msg("登录成功")
                ////跳转页面
                //location.href = "/home/index.html"
                //在登录成功的时候将token数据存储起来
                localStorage.setItem("token", res.token)
                layer.msg('登录成功,即将跳转', {
                    time: 2000 //2秒关闭
                }, function () {
                    location.href = "/home/index.html"


                });
            }
        })


    })

})