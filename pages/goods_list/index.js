// pages/goods_list/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js';
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[],
  },
  //接口需要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPage:'',
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodsList();
  },
  handleItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  //获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search", data:this.QueryParams});
    this.totalPage = Math.ceil(res.data.message.total / this.QueryParams.pagesize);
    this.setData({
      // goodsList:res.data.message.goods
      goodsList:[...this.data.goodsList, ...res.data.message.goods]//解构
    })

    //数据请求结束后直接停止下拉刷新loading
    wx.stopPullDownRefresh();
  },
  //监听用户上拉触底事件
  onReachBottom(){
    // 1.首先获得总页数
    //判断当前页数是否是最后一页
    if(this.QueryParams.pagenum>this.totalPage){
      wx.showToast({
        title: '到底了，别滑了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
    }else{
      this.QueryParams.pagenum ++;
      this.getGoodsList();
    }
  },
  //监听用户下拉动作
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  }
})