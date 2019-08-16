import request from "./utils/request.js";

//app.js
App({
  //项目运行时候触发，只会执行一次
  onLaunch: function () {
    // 初始化reqeust基准路径
    request.defaults.baseURL = "https://api.zbztb.cn/api/public/v1";

    // 错误拦截
  }
})