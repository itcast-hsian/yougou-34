import request from "../../utils/request.js";

// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取用户详细信息
  handleGetUserInfo(msg){
    // 获取code
    wx.login({
      success(res) {
        if (res.code) {

          // 拼接参数
          const data = {
            code: res.code,
            encryptedData: msg.detail.encryptedData,
            rawData: msg.detail.rawData,
            iv: msg.detail.iv,
            signature: msg.detail.signature,
          }

          // 开始调用后台接口获取token
          request({
            url: "/users/wxlogin",
            data,
            method: "POST"
          }).then(res => {
            console.log(res)
          })


        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})