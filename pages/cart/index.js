// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货人的信息
    address: {
      userName: "", // 收货人
      telNumber: "", // 手机号码
      detailInfo: "", // 详细的收货地址，在返回的数据中拼接省份，城市..
    },

    // goods是来自于本地的购物车数据列表
    goods: {}, // Boolean(goods)

    // 总价格
    allPrice: 0,

    // 全部的选中状态
    allSelected: true,

    // 判断购物车是否为空
    isEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow(){
    // 判断全选的状态
    this.handleChangeAllSelected();

    // 判断对象是否为空
    if(Object.keys(this.data.goods).length === 0){
      this.setData({
        isEmpty: true
      })
    }
  },

  // 点击单个商品时候处理全选的状态
  handleChangeAllSelected(){
    // 获取本地的商品列表
    const goods = wx.getStorageSync("goods") || {};

    // 记录状态
    let selected = true;

    // 判断全选的状态
    Object.keys(goods).forEach(v => {
      // 只要有一项的选中状态时false，全选的状态就是false
      if(!selected) return;

      if(!goods[v].selected){
        selected = false
      }
    })

    this.setData({
      goods,
      allSelected: selected
    });
    // 计算总价格
    this.getAllPrice();
  },

  // 获取收货地址
  handleGetAddress(){
    // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/address/wx.chooseAddress.html
    wx.chooseAddress({
      success: res => {
        // 获取收货地址信息信息
        this.setData({
          address: {
            userName: res.userName,
            telNumber: res.telNumber,
            detailInfo: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
      }
    })
  },

  // 计算总价格
  getAllPrice(){

    let price = 0;

    Object.keys(this.data.goods).forEach(v => {
      // item是当前的商品
      const item = this.data.goods[v];

      //满足选中状态时true的时候才添加价格
      if (item.selected){
        price += item.goods_price * item.number;
      }
    });

    this.setData({
      allPrice: price
    });

    // 把当前的最新商品列表保存到本地
    wx.setStorageSync("goods", this.data.goods);
  },

  // 选中状态
  handleSelected(event){
    // 获取参数
    const {id} = event.currentTarget.dataset;

    const {goods} = this.data;

    // 把选中状态取反
    goods[id].selected = !goods[id].selected;
    
    this.setData({
      goods
    })

    // 计算总价格
    this.getAllPrice();

    // 如果当前的selected的值是false时候，要修改全选的状态
    this.handleChangeAllSelected();
  },

  // 增加数量
  handleAddNumber(event){
    const {id} = event.currentTarget.dataset;
    const { goods } = this.data;

    // 给商品的数量加1
    goods[id].number += 1;

    this.setData({
      goods
    });

    // 计算总价格
    this.getAllPrice();
  },

  // 减少数量
  handleReduceNumber(event) {
    const { id } = event.currentTarget.dataset;
    const { goods } = this.data;

    // 数量等于1时候
    if (goods[id].number === 1) {

      // 带有确定和取消的弹窗
      // 文档地址：https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html
      wx.showModal({
        title: '提示',
        content: '确定要删除商品吗？',
        success:(res) => {
          // 用户点击确定时候触发
          if (res.confirm) {

            // 删除data.goods的商品数据
            // delete是js原生的属性，用来删除对象的属性
            delete goods[id];

            // 重新赋值
            this.setData({
              goods
            });

            // 修改总价格和本地的数据
            this.getAllPrice();
          } 
        }
      })
    // 正常情况下
    }else{
      // 给商品的数量加1
      goods[id].number -= 1;

      this.setData({
        goods
      });

      // 计算总价格
      this.getAllPrice();
    }
  },

  //全选
  handleAllSelected(){
    const {goods} = this.data;

    // 循环商品的状态全部状态取反
    Object.keys(goods).forEach(v => {
      goods[v].selected = !this.data.allSelected;
    });

    // 同时修改data的goods和全部的状态
    this.setData({
      goods,
      allSelected: !this.data.allSelected
    });

    this.getAllPrice();
  }
})