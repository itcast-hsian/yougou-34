
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
})