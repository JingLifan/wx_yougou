// pages/search/index.js
//1.防抖
//  -防抖(节流)一般用于输入框中，防止重复输入，重复发送请求
//  -节流一般是用在页面下拉和上拉
//  -方法：定义全局的定时器id
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],  //获取到的搜索内容
    isFocus:false, //取消按钮是否显示
    inputValue:'',  //输入框内容
  },
  onLoad: function (options) {

  },

  onShow: function () {

  },
  handleinput(e){
    //1.获取输入框的值
    const {value} = e.detail;
    //2.检测合法性trim()方法用于删除字符串的头尾空格trim()方法不会改变原始字符串。
    if(!value.trim()){
      //值不合法
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true
    })
    //3.值合法，准备发送请求
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  //发送请求获取搜索内容
  async qsearch(query){
    const res=await request({url:'/goods/qsearch',data:{query}});
    console.log(res);
    this.setData({
      goods:res.data.message
    })
  },
  //点击取消按钮
  handleCancel(){
    this.setData({
      inputValue:'',
      isFocus:false,
      goods:[]
    })
  }
})