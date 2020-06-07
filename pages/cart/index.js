// pages/cart/index.js
// 1.全选实现
//    -在onshow中获得购物车数据
//    -使用every方法判断购物车数组中的checked，如果全为true则全选就勾上
// 2.总商品和总价格
//    -获得购物车数据>遍历数组>如果checked=true则totalprice+=goods_num*goods_price,totalnum+=goods_num
//3.商品的选择复选框
//    -获得你点击的商品>将你点击的商品中的checked属性取反>在重新将这个商品放回缓存和data中>重新计算总价格和总数量
//4.商品的全选与反选
//    -将data中的allchecked属性设置成!allchecked>遍历cart数组将checked属性跟随allchecked>重新设置会data和缓存中
//5.商品数量的加减功能
//    -为加减按钮绑定同一个事件，区分加减的方法是根据传入的参数
//    -判断点击的是哪一个商品让后将这个商品的num+1或-1
//    -在设置回data和缓存
//6.商品的删除
//    -当商品数量为1时&&用户点击的是减号就弹出模态框(showModel)询问是否删除
//7.购物车空显示
//    -如果data中的cart长度为0则显示购物车空，不为0则正常显示
//8.点击结算跳转到支付页面
//    -判断用户是否选择商品和是否有收货地址>如果没有则showtoast提醒>如果都有则navigatorTo跳转
//引入ES7的async
import {getSetting, chooseAddress, openSetting, showToast, showModal} from '../../utils/async.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:{}, //用户地址信息
    cart:[], //购物车数据
    allChecked:false, //全选按钮是否勾上
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
    const cart = wx.getStorageSync('cart')||[];
    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    // let totalPrice = 0;
    // let totalNum = 0;
    // cart.forEach(v=>{
    //   if(v.checked){
    //     totalPrice += v.goods_price*v.num;
    //     totalNum += v.num;
    //   }
    // })
    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // });
    this.setCart(cart);
    this.setData({
      address
    })
  },
  //点击获取收货地址
   async handleChooseAddress(){
    //  try-catch:try里面是正确执行的代码，catch是出现错误后执行的
      try {
        const res1 = await getSetting();
        const scopeAddress = res1.authSetting["scope.address"];
        if(scopeAddress===true||scopeAddress===undefined){
          const res2 = await chooseAddress();
          //将获取到的地址信息添加到缓存中
          wx.setStorageSync('address', res2);
        }else{
          await openSetting();
          const res3 = await chooseAddress();
          //将获取到的地址信息添加到缓存中
          wx.setStorageSync('address', res2);
        }
      } catch (error) {
        console.log('报错了');
      }
  },
  //商品的选择
  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked = !cart[index].checked;
    
    // wx.setStorageSync('cart', cart);

    // const allChecked = cart.length?cart.every(v=>v.checked):false;
    // let totalPrice = 0;
    // let totalNum = 0;
    // cart.forEach(v=>{
    //   if(v.checked){
    //     totalPrice += v.goods_price*v.num;
    //     totalNum += v.num;
    //   }
    // })
    // this.setData({
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // });
    this.setCart(cart);
  },
  //封装购物车底部的全选总价格总数量变化
  setCart(cart){
    const allChecked = cart.length?cart.every(v=>v.checked):false;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.goods_price*v.num;
        totalNum += v.num;
      }
    })
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync('cart', cart);
  },
  //商品的全选反选
  handleItemAllchecked(){
    //获得data中的cart和allchecked
    let {cart,allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  //商品数量的加减按钮
  async handleItemNumEdit(e){
    let {id,operation} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      // wx.showModal({
      //   title: '提示',
      //   content: '是否删除此商品',
      //   success: (result) => {
      //     if (result.confirm) {
      //       cart.splice(index,1);
      //       this.setCart(cart);
      //     }
      //   },
      //   fail: () => {},
      //   complete: () => {}
      // });
      const res = await showModal({content:'是否删除此商品'});
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
      }
        
    }else{
      cart[index].num+=operation;
      this.setCart(cart);
    }
  },
  //点击结算跳转到支付页面
  async handlePay(){
    const {address, totalNum} = this.data;
    if(!address.userName){
      await showToast({title:'您还没有选择收货地址'});
      return;
    }
    if(totalNum===0){
      await showToast({title:'您还没有选择商品'});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})