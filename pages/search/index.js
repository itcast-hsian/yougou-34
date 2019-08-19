
import request from "../../utils/request.js";

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

    // 把输入框的值保存到data
    this.setData({
      inputValue: value
    });

    // 查询搜索建议
    request({
      url:"/goods/qsearch",
      data: {
        query: value
      }
    }).then(res => {
      console.log(res)
    })
  },

  // 清空输入框的值
  handleCancel(){
    this.setData({
      inputValue:""
    })
  },

  // 输入框点击确定（enter）按钮时候触发，手机上右下角的键
  handleConfirm(){
    // 跳转到搜索列表页
    // 类似vue中this.$router.push()
    // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html
    wx.navigateTo({
      url: "/pages/search_list/index?keyword=" + this.data.inputValue
    });

    // 把搜索关键字保存到本地
    // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html
    wx.setStorageSync("history", [this.data.inputValue])
  }
})