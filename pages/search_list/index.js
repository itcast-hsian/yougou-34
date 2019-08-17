// pages/search_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0
  },

  handleChange(event){
    const {index} = event.currentTarget.dataset;

    this.setData({
      current: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})