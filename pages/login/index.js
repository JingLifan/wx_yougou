// pages/login/index.js
Page({

  data: {

  },
  getUserInfo(e){
    console.log(e);
    const {userInfo} = e.detail;
    wx.setStorageSync('userInfo', userInfo);
    //返回上一级
    wx.navigateBack({
      delta: 1
    });
  }
})