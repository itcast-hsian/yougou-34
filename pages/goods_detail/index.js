
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],

    // 商品详情
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options;

    // 请求商品详情
    request({
      url: "/goods/detail",
      data: {
        goods_id: id
      }
    }).then(res => {
      const {message} = res.data;

      this.setData({
        detail: message
      })
    })
  },

  // 添加到购物车
  handleAddCart(){

    // 弹窗消息：https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
    wx.showToast({
      title: '添加购物车成功',
      icon: 'success',
      duration: 2000
    });

    // 获取本地的goods列表
    const goods = wx.getStorageSync("goods") || {};

    // 把商品添加到本地的goods对象中
    const {detail} = this.data;

    //添加默认的选中状态和默认的数量
    detail.selected = true;
    detail.number = 1;

    goods[detail.goods_id] = detail;

    // 保存到本地
    wx.setStorageSync("goods", goods)

  }
})