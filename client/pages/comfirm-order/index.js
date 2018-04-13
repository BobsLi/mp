// pages/comfirm-order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "linker": {
      "id": "xxxx",
      "link_man": "收货人姓名",
      "mobile": "151****982", //收货人手机号码
      "addr": "四川省成都市高新西区xxxx", //收货人地址
    },
    "orderInfo": {},
    "invoice_title": "成都生命基线科技有限公司",//显示的发票抬头
    "tax_no": "91510100MA61RQNG42", //显示的税号,
    "form":{ //关于表单的信息
      "pay_mode": { //关于支付的
        "activeId": 1,
        "items": { //支付方式选项
          "1": {
            "label": "合同发票报账",
            "hidden": false, //是否显示这个选项
            "disabled": false, //是否禁用该选项
          },
          "2": {
            "label": "预付款支付",
            "hidden": false, //是否显示这个选项
            "disabled": false, //是否禁用该选项
          },
        },
      },
      "platform_ensure": { //平台保障
        "activeId": "0",
        "items": { //平台保障选项
          "0": {
            "label": "平台质保",
            "hidden": false, //是否显示这个选项
            "disabled": false, //是否禁用该选项
          },
          "1": {
            "label": "平台担保",
            "hidden": false, //是否显示这个选项
            "disabled": false, //是否禁用该选项
          },
        },
      },
      "invoice_title": { //发票抬头
        "default": "成都生命基线科技有限公司",
        "buyer": "boblee",
      },
      "tax_no": { //税号
        "default": "91510100MA61RQNG42",
        "buyer": "123123213213",
      },
      "total_amount": 123, //总金额
      "quality_amount": 100,//质保金额
      "vouch_amount": 0,//担保金额
      "real_amount": 123213,//实际成交金额
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var orderInfo = wx.getStorageSync("orderInfo");
    if(orderInfo){
      this.setData({
        "orderInfo": orderInfo
      });
      console.log(orderInfo);
    }else{
      wx.reLaunch({
        url: '/pages/pl/index',
      })
    }
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
  
  },

  /**
   * 支付方式改变
   */
  payChange: function(e){
    console.log(e);
  },

  /**
   * 表单提交
   */
  orderSubmit: function(e){
    console.log(e);
  },
})