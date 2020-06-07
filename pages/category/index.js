// pages/category/index.js
//引入es7的async await语法的必备文件
import regeneratorRuntime from '../../lib/runtime/runtime';
//引入request方法
import { request } from '../../request/index.js';
Page({
  data: {
    leftMenuList:[],//左侧tap栏数据
    rightContent:[],//右侧内容数据
    currentIndex:0,//左侧tap栏索引
    scrollTop:0,//右侧scroll距离顶部距离
  },
  //定义一个接口的返回数据
  Cates:[],
  onLoad: function (options) {
    //使用缓存，逻辑：首先判断缓存中是否有数据，如果有就将数据放在data中;如果没有就重新发送请求
    const Cates = wx.getStorageSync('cates'); //从缓存中拿数据
    if(!Cates){ //如果缓存中没有数据
      this.getCates();
    }else{//缓存中有数据
      //如果有旧数据就先判断数据是否过时
      if(Date.now() - Cates.time > 1000*10){ //当前时间-缓存中数据的时间>1000毫秒*10
        this.getCates();
      }else{
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类数据
 async getCates(){
    // request({
    //   url:'/categories'
    // }).then((res => {
    //   this.Cates = res.data.message;
    //   //将请求到的数据放到缓存中去
    //   wx.setStorageSync('cates', {time:Date.now(), data:this.Cates});
    //   let leftMenuList = this.Cates.map(v => v.cat_name);//循环Cates数组中的数据并将Cates中的cate_name合并成一个新的数组
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // }))
    const res=await request({url:"/categories"});
    this.Cates = res.data.message;
    //将请求到的数据放到缓存中去
    wx.setStorageSync('cates', {time:Date.now(), data:this.Cates});
    let leftMenuList = this.Cates.map(v => v.cat_name);//循环Cates数组中的数据并将Cates中的cate_name合并成一个新的数组
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //左侧Tap栏点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset; //ES6解构关键字
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  }
})