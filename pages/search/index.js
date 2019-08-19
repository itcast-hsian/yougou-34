// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "", // 输入框的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 没次输入搜索关键字时候都会触发
  handleInput(event){
    const {value} = event.detail;

    this.setData({
      inputValue: value
    })
  },

  // 清空输入框的值
  handleCancel(){
    this.setData({
      inputValue:""
    })
  }
})