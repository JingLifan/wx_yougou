// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部订单",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待收货",
        isActive:false
      },
      {
        id:3,
        value:"退款\退货",
        isActive:false
      }
    ],
    content:'',
  },
  
  onLoad: function (options) {

  },

  onShow: function () {
    //获取页面参数type
    let Pages =  getCurrentPages();
    const {type} = Pages[Pages.length-1].options;
    this.changeTitleByIndex(type-1);
    this.setData({
      content:'当前type值为' + type
    })
  },
  handleItemChange(e){
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    let type = index+1;
    this.setData({
      content:'当前type值为' + type
    })
  },
  //根据type来判断哪个标题被选中
  changeTitleByIndex(index){
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  }
})