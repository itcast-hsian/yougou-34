// pages/order_enter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {}
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取本地的收货地址
    const address = wx.getStorageSync("address");

    this.setData({
      address
    })
  },

  
  
})