// pages/user/index.js
const app = getApp();
Page({

  data: {
    userInfo: {},
    balance: 0,
    freeze: 0,
    score: 0,
    score_sign_continuous: 0
  },
  onLoad() {

  },
  onShow() {
    // this.getUserInfo();
  },
  
  /**
   * 获取用户信息
   */
  getUserInfo: function (cb) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo: res.userInfo
        });
      },
      fail: function(){
        wx.showModal({
          title: '错误',
          content: '获取用户信息失败',
          showCancel: false,
        })
      }
    })
  },
})