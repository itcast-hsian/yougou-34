// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货人的信息
    address: {
      userName: "", // 收货人
      telNumber: "", // 手机号码
      detailInfo: "", // 详细的收货地址，在返回的数据中拼接省份，城市..
    },

    // goods是来自于本地的购物车数据列表
    goods: {},

    // 总价格
    allPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow(){
    // 获取本地的商品列表
    const goods = wx.getStorageSync("goods") || {};

    this.setData({
      goods
    });
    // 计算总价格
    this.getAllPrice();
  },

  // 获取收货地址
  handleGetAddress(){
    // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/address/wx.chooseAddress.html
    wx.chooseAddress({
      success: res => {
        // 获取收货地址信息信息
        this.setData({
          address: {
            userName: res.userName,
            telNumber: res.telNumber,
            detailInfo: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
      }
    })
  },

  // 计算总价格
  getAllPrice(){

    let price = 0;

    Object.keys(this.data.goods).forEach(v => {
      price += this.data.goods[v].goods_price;
    });

    this.setData({
      allPrice: price
    })
  }
})