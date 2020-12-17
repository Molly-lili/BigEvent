$(function () {
    let form = layui.form
    //给form添加自定义校验规则
    form.verify({
        pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        oldPass: (value) => {
            console.log(value);
            let oldpwd = $("[name=oldPwd]").val()
            if (value === oldpwd) {
                return "新密码不能和原密码一样！"
            }
        },
        //两次新密码的要一样
        newPass: (value) => {
            let newPwd = $("[name=newPwd]").val()
            if (value !== newPwd) {
                return "两次输入的新密码不相同！"
            }
        }

    })
    //发送ajax请求,给表单注册submit事件
    $(".layui-form").submit(function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("更新密码失败" + res.message)
                }
                layer.msg("更新密码成功")
                $(".layui-form")[0].reset()
            }
        })
    })
})