// 引入用来发送请求的方法
import { request } from '../../request/index.js';
Page({
  data: {
    swipeList:[],
    catesList:[],
    floorList:[],
  },
  onLoad: function(options) {
    this.getSwipeList();
    this.getCatesList();
    this.getFloorList();
  },
  //获取轮播图数据
  getSwipeList(){
    request({url:'/home/swiperdata'})
    .then(res => {
      this.setData({
        swipeList : res.data.message
      })
    })
  },
  //获取分类导航图片
  getCatesList(){
    request({url:'/home/catitems'})
    .then(res => {
      this.setData({
        catesList : res.data.message
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    request({url:'/home/floordata'})
    .then(res => {
      this.setData({
        floorList : res.data.message
      })
    })
  }
});
  