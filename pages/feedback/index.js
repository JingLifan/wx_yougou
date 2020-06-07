// pages/feedback/index.js
//1.点击+号触发事件
//  -调用小程序内置的 选择图片的api：chooseimg
//  -获取到图片的路径并存到data的数组中
//2.点击删除选中的图片
//  -首先获取点击图片的索引
//  -然后从原图片数组中删除
//  -将删除过的数组重新给到data
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isActive:false
      }
    ],
    chooseImgs:[]  //选择的图片数组
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },
  handleItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  //点击+号
  handleChooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result);
        this.setData({
          //对图片数组进行拼接
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      }
    });
      
  },
  //点击删除图片
  handleRemoveImg(e){
    console.log(e);
    const {index} = e.currentTarget.dataset;
    let {chooseImgs} = this.data;
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })
  }
})