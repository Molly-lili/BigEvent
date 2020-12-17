// ajax的配置 ==> 优化根路径 ==> $.ajaxPrefilter()
$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url,
  options.headers= {
    Authorization: localStorage.getItem("token"),
    }
})
