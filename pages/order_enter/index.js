import request from "../../utils/request.js"

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


  // 创建订单 / 支付
  handlePay(){

    const {allPrice, address, goods} = this.data;

    // 返回后台需要的商品的数据格式
    const newGoods = goods.map(v => {
      return {
        goods_id: v.goods_id, // 商品id
        goods_number: v.number,  // 单个商品的数量
        goods_price: v.goods_price // 商品的单价
      }
    })

    // 创建订单的接口
    request({
      url: "/my/orders/create",
      method: "POST",
      data: {
        order_price: allPrice, //总价格
        consignee_addr: `${address.userName} ${address.telNumber} ${address.detailInfo}`, // 收货地址
        goods: newGoods // 筛选过来的商品数据
      },
      header: {
        // 带上本地的token
        Authorization: wx.getStorageSync("token") || ""
      }
    }).then(res => {

      // 订单编号
      const { order_number} = res.data.message;

      // 获取支付的参数
      request({
        url: "/my/orders/req_unifiedorder",
        method: "POST",
        data: { 
          order_number
        },
        header: {
          // 带上本地的token
          Authorization: wx.getStorageSync("token") || ""
        }
      }).then(res => {

        // 获取支付的参数
        wx.requestPayment( res.data.message.pay )

      })
    })
  }
  
})