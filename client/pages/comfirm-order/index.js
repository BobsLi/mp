// pages/comfirm-order/index.js
const app = getApp();
const host = app.globalData.params.apiHost;
const storageHost = app.globalData.params.storageHost;
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
    "real_amount": 123213,//实际成交金额
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
      "quality_amount": 100,//质保金额
      "vouch_amount": 0,//担保金额
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
    var orderInfo = wx.getStorageSync("orderInfo");
    console.log(orderInfo);
    var _this = this;
    if(orderInfo){
      this.setData({
        "orderInfo": orderInfo
      });
      // this.getFormInfo(orderInfo.id, function(data){
      //   var realAmount = parseFloat(orderInfo.real_price) + parseFloat(data.quality_amount);
      //   _this.setData({
      //     "form": result,
      //   });
      //   this.updateMoney();
      //   this.updateInvoiceTitle();
      //   this.updateTaxNo();
      //   this.updatePayoffWay();
      // });
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

  /**
   * 获取表单信息
   */
  getFormInfo: function(id, call){
    var _this = this;
    wx.request({
      url: host + '/product/get-form-info',
      data: {id: id},
      success: function(res){
        if(res.statusCode == 200){
          var data = res.data;
          if(data.code == 200){
            var result = data.data;
            if(call){
              call(result);
            }
          } else {
            wx.showModal({
              title: '错误',
              content: data.msg,
              showCancel: false,
            })
          }
        }else{
          wx.showModal({
            title: '错误',
            content: "数据获取失败",
            showCancel: false,
          })
        }
      },
      fail: function(){

      },
      complete: function(){

      },
    })
  },

  /**
   * 选项不同更改价格
   */
  updateMoney: function(e){
    var form = this.data.form;
    var activeId = form.platform_ensure.activeId;
    var totalMoney = this.data.orderInfo.real_price;
    var real_amount = 0;
    if(activeId == 0){
      real_amount = totalMoney + form.quality_amount;
    }else{
      real_amount = totalMoney + form.vouch_amount;
    }
    this.setData({
      "real_amount": real_amount,
    })
  },

  /**
   * 修改增值服务
   */
  updatePayoffWay: function(){
    var form = this.data.form;
    var pay_mode = form.pay_mode.activeId;
    if(pay_mode == 1){
      
    }else{

    }
  },

  /**
   * 修改发票抬头
   */
  updateInvoiceTitle: function () {

  },

  /**
   * 修改税号
   */
  updateTaxNo: function () {

  },
})