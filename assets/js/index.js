getUserInfo();
let layer = layui.layer;
function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        //是为了拿到请求头的信息
        //headers: {
        //   Authorization: localStorage.getItem("token"),
        //},
        success: function (res) {
            //如果有昵称则先用昵称，如果无再用用户名
            let name = res.data.nickname || res.data.username
            $("#welcome").text("欢迎  " + name)
            if (res.data.user_pic) {
                //说明是有图片的
                $(".layui-nav-img").attr("src", res.data.user_pic).show()
                $(".textAvatar").hide()
            } else {
                let first = name[0].toUpperCase()
                $(".textAvatar").show().text(first)
                //隐藏没有设置图片的头像图片
                $(".layui-nav-img").hide()
            }
        },
        complete: function (res) {
           // console.log(res);
            let data = res.responseJSON
            if (data.status === 1 && data.message === "身份认证失败！") {
                location.href = "/home/login.html";
                localStorage.removeItem("token")
            }
        }
    })
}
//t退出功能
$("#logoutBtn").click(function () {
    // 点击确认执行的函数
    // 思路：和登录做的事情是完全相反的
    // 1. 把本地存储的token给移出掉
    // 2. 跳转到登录页面
    layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function (index) {
        //1.把本地存储的token给移除掉
        localStorage.removeItem("token")
        //2.跳转到登录页面
        location.href = "/home/login.html"
        //关闭询问框
        layer.close(index);
    });
})
