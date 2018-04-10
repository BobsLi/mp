// pages/pl/detail.js
const app = getApp();
const host = app.globalData.params.apiHost;
const storageHost = app.globalData.params.storageHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: null, 
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.showToast({
      title: '',
      icon: 'loading'
    })
    wx.request({
      url: host + 'test/get-product-info',
      data: options,
      success: function (data) {
        console.log(data);
        if (data.data.code == 200) {
          var result = data.data.data;
          wx.showToast({
            title: '',
            icon: 'success'
          })
          wx.setNavigationBarTitle({
            title: result.info.name,
            success: function(){

            }
          })
          console.log(result.img);
          _this.setData({
            imgArr: result.img,
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '没有获取到数据',
            showCancel: false,
          })
        }
      },
      fail: function (data) {
        console.log(data);
      },
      complete: function (data) {
        wx.hideToast();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})