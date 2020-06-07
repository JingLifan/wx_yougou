//1.商品收藏
//  -在onshow的中拿到缓存中收藏商品的数据
//  -如果该商品被收藏，则改变商品图标
//  -点击收藏商品按钮>判断该商品是否在缓存数组中>在则删除>不在则加入
// pages/goods_detail/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js';
import { showToast } from '../../utils/async.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false //商品是否被收藏
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let currentPages =  getCurrentPages();
    const {goods_id} = currentPages[currentPages.length-1].options;
    this.getGoodsDetail(goods_id);

    
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const res = await request({url:'/goods/detail', data:{goods_id}});
    const goodsObj = res.data.message;
    this.GoodsInfo = goodsObj;

    let collect = wx.getStorageSync('collect')||[];
    let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);

    this.setData({
      // 优化data中的数据，因为data中有一些无用的数据会影响体验
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        // 富文本中可能存在.webp格式的图片，iphone部分手机无法识别此类型的图片
        // 所以我们要做替换
        // goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        goods_introduce:goodsObj.goods_introduce,
        pics:goodsObj.pics,
      },
      isCollect
    })
  },
  //点击轮播图 放大预览
  handlePreviewImage(e){
    const current = e.currentTarget.dataset.url;
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    wx.previewImage({
      current,
      urls
    })
  },
  // 点击加入购物车
  handleCartAdd(){
    // 获取缓存中的数据，如果没有就是一个空数组类型
    let cart = wx.getStorageSync('cart')||[];
    // findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index === -1){
      //不存在
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      //存在
      cart[index].num++;
    }
    //把购物车重新添加回缓存中
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  },
  //点击收藏商品
  handleCollect(){
    let isCollect = true;
    //1.获取缓存中的收藏数组
    let collect = wx.getStorageSync('collect')||[];
    //2.判断该商品是否被收藏
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    //3.如果index！=-1则表示被收藏过,就将该商品从缓存数组中删除
    if(index!==-1){
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: true
      });
    }else{
      //没有收藏过
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    //4.把数组存入缓存中
    wx.setStorageSync('collect', collect);
    //5.修改data中iscollect的值
    this.setData({
      isCollect
    })
  }
})