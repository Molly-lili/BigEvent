$(function () {
    let form = layui.form;
    let layer = layui.layer
    getUserInfo();
    //利用表单获取表单的内容
    function getUserInfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                //给表单赋值
                form.val("form", res.data);
            }
        })
    }
    //实现重置功能
    $("#resetBtn").click(function (e) {
        e.preventDefault();
        getUserInfo();
    })
    //点击提交将form的表单内容添加
    $(".layui-form").submit(function (e) {
        e.preventDefault();
        //利用serialize来收集表单数据
        let data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data,
            success: function (res) {
                //  console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败');
                }
                layer.msg('修改用户信息成功！');
                window.parent.getUserInfo()
            }
        })
    })

})