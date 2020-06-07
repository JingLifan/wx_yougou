import {getSetting, chooseAddress, openSetting, showToast, showModal} from '../../utils/async.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:{}, //用户地址信息
    cart:[], //购物车数据
    totalPrice:0, //总价格
    totalNum:0    //总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //因为购物车经常被用户频繁打开，所以可以写到onshow方法里
  onShow: function () {
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart')||[];
    //过滤 只将购物车中checked=true的商品渲染
    cart = cart.filter(v => v.checked);
    this.setData({
      address
    })

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      totalPrice += v.goods_price*v.num;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum
    });
  },
  handlePay(){
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
    }else{
      console.log('已经有token');
    }
  }
})