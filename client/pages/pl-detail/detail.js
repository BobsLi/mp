// pages/pl/detail.js
const app = getApp();
const host = app.globalData.params.apiHost;
const storageHost = app.globalData.params.storageHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "productImg": {
      "options": {
        "indicatorDots": true,
        "autoplay": true,
        "interval": 3000,
        "duration": 500,
        "displayMultipleItems": 1
      },
      "items": [
        {
          'id': '1',
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzQ1NTM4MTg3Ni5wbmc="
        },
        {
          'id': '1',
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzg4NzgwNzQ4Ny5wbmc="
        },
        {
          'id': '1',
          "img": "http://storage.genebang.com/image/cGF0aD1kZWZhdWx0L3Byb2R1Y3QuanBn"
        },
      ], 
    },
    "productInfo": {
      "id": "DFDSDG",
      "name": "【Seqmore】人全外显子测序-15G_建库测序&标准分析（Agilent V6",
      "assemble_type": 1,
      "supplier_name": "基因帮优选品牌【Seqmore】",
      "spec": ""
    }
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
    // wx.request({
    //   url: host + 'test/get-product-info',
    //   data: options,
    //   success: function (data) {
    //     console.log(data);
    //     if (data.data.code == 200) {
    //       var result = data.data.data;
    //       wx.showToast({
    //         title: '',
    //         icon: 'success'
    //       })
    //       wx.setNavigationBarTitle({
    //         title: result.info.name,
    //         success: function(){

    //         }
    //       })
    //       console.log(result.img);
    //       _this.setData({
    //         imgArr: result.img,
    //       });
    //     } else {
    //       wx.showModal({
    //         title: '提示',
    //         content: '没有获取到数据',
    //         showCancel: false,
    //       })
    //     }
    //   },
    //   fail: function (data) {
    //     console.log(data);
    //   },
    //   complete: function (data) {
    //     wx.hideToast();
    //   }
    // })
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