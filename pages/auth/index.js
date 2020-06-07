// pages/auth/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from '../../request/index.js';
Page({
  data: {

  },
  onLoad: function (options) {

  },
  //获取用户信息
  async getUserInfo(e){
    console.log(e);
    const {encryptedData,rawData,iv,signature} = e.detail;
    //获取用户登录小程序后的code
    wx.login({
      timeout:10000,
      success: (result) => {
        const {code} = result;
        console.log(code);
      },
      fail: () => {},
      complete: () => {}
    });
    //发送请求，获取token
  }
})