
import request from "../../utils/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "", // 输入框的值
    history: [] // 本地的历史记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地历史记录
    // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html
    const history = wx.getStorageSync('history') || [];

    this.setData({
      history
    })
  },

  // 没次输入搜索关键字时候都会触发
  handleInput(event){
     // value是输入框的值
    const {value} = event.detail;

    // 把输入框的值保存到data
    this.setData({
      inputValue: value
    });

    // 查询搜索建议
    // request({
    //   url:"/goods/qsearch",
    //   data: {
    //     query: value
    //   }
    // }).then(res => {
    //   console.log(res)
    // })
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

    // 保存新的搜索关键字前，要把关键字添加已有的列表
    const arr = [this.data.inputValue, ...this.data.history];

    this.setData({
      history: [...new Set(arr)]
    })

    // 把搜索关键字保存到本地
    // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html
    wx.setStorageSync("history", this.data.history)
  },

  // 清除所有的记录
  handleClearAll(){
    // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorage.html
    wx.removeStorageSync('history');
    this.setData({ 
      history: [] 
    })
  }
})