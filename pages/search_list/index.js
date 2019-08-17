
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
    // 当前页数
    pagenum: 1,
    // 每页条数
    pagesize: 10
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

    // 请求列表数据
    this.getData();
  },

  // 请求列表数据
  getData(){

    const {keyword, pagenum, pagesize} = this.data;

    request({
      url: "/goods/search",
      data: {
        query: keyword,
        pagenum,
        pagesize
      }
    }).then(res => {
      const { goods } = res.data.message;

      // 循环给每个商品修改价格，保留两位小数点
      const newGoods = goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2);
        return v;
      })

      this.setData({
        // 合并新旧的数据
        goods: [...this.data.goods, ...newGoods]
      })
    })
  },

  // 加载下一页的数据
  onReachBottom(){
    
    // 页数加1
    this.setData({
      pagenum: this.data.pagenum + 1
    });

    // 请求列表数据
    this.getData();
  }
})