import request from "../../utils/request.js"

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 总的数据
    navs: [],
    // 索引
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 请求菜单栏数据
    request({
      url: "/categories"
    }).then(res => {
      const {message} = res.data;

      this.setData({
        navs: message
      })
    })
  },  

  //  菜单栏点击时候触发
  handleChange(event){
    const {index} = event.currentTarget.dataset;

    this.setData({
      current: index
    })
  }
})