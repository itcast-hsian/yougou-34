// pages/order_enter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    // 商品列表
    goods: [],
    // 总价格
    allPrice: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取本地的收货地址
    const address = wx.getStorageSync("address");

    // 获取商品列表
    const goods = wx.getStorageSync("selected_goods");

    // 总价格
    let allPrice = 0;
    goods.forEach(v => {
      allPrice += v.goods_price * v.number;
    })

    this.setData({
      address,
      goods,
      allPrice
    })
  },

  
  
})