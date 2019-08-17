
import request from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,

    keyword: "",

    // 商品列表
    goods: [],
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


    // 假设关键字 小米
    // let keyword = "小米";

    // options返回url的参数，类似this.$router.query
    this.setData({
      keyword: options.keyword
    })

    request({
      url: "/goods/search?query=" + options.keyword,
    }).then(res => {
      const { goods } = res.data.message;

      // 循环给每个商品修改价格，保留两位小数点
      const newGoods = goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2);
        return v;
      })

      this.setData({
        goods: newGoods
      })
    })
  },
})