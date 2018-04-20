// pages/comfirm-order/index.js
let _ = require("../../libs/lodash/lodash.js");
const app = getApp();
const host = app.globalData.params.apiHost;
const storageHost = app.globalData.params.storageHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "comfirm": {
      "loading": false,
    },
    "linker": {
      "id": "xxxx",//id，加密
      "link_man": "收货人姓名",
      "mobile": "151****982", //收货人手机号码
      "addr": "四川省成都市高新西区xxxx", //收货人地址
    },
    "orderInfo": {},
    "invoice_title": {
      "value": "成都生命基线科技有限公司",
      "disabled": false,//是否禁用
    },//显示的发票抬头
    "tax_no": {
      "value": "91510100MA61RQNG42",//税号
      "disabled": false,//是否禁用
    }, //显示的税号,
    "quality_amount": 100, //质保服务费
    "real_amount": 123213,//实际成交金额
    "pay_mode": 1, //支付方式
    "platform_ensure": [1], //平台保障
    "form":{ //关于表单的信息
      "pay_mode": { //支付方式选项, key对应数据库需保存的数据
        1: {
          "label": "合同发票报账",
          "hidden": false, //是否显示这个选项
          "disabled": false, //是否禁用该选项
          "checked": true,//是否选中
        },
        2: {
          "label": "预付款支付",
          "hidden": false, //是否显示这个选项
          "disabled": false, //是否禁用该选项
          "checked": false,//是否选中
        },
      },
      "platform_ensure": { //平台保障, key：1，平台质保；2：平台担保
        1: {
          "label": "平台质保",
          "hidden": false, //是否显示这个选项
          "disabled": false, //是否禁用该选项
          "checked": false,//是否选中
        },
        2: {
          "label": "平台担保",
          "hidden": false, //是否显示这个选项
          "disabled": false, //是否禁用该选项
          "checked": false,//是否选中
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
      this.getLinkInfo();
      this.getFormInfo(orderInfo.id, function(data){
        var realAmount = parseFloat(orderInfo.trade_amount) + parseFloat(data.quality_amount);
        _this.setData({
          "form": result,
        });
        this.installData(data);
        this.updateMoney();
        this.updateInvoiceTitle();
        this.updateTaxNo();
      });
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
    this.setData({
      "pay_mode": e.detail.value,
    });
    this.updatePlatForm();
    this.updateInvoiceTitle();
    this.updateTaxNo();
  },

  /**
   * 选择增值服务
   */
  platformChange: function(e){
    console.log(e);
    this.setData({
      "platform_ensure": e.detail.value,
    });
    this.updateMoney();
  },

  /**
   * 输入发票抬头
   */
  changeInvoiceTitle: function (e) {
    console.log(e);
    this.setData({
      "form.invoice_title.buyer": e.detail.value,
    })
  },

  /**
   * 输入税号
   */
  changeTaxNo: function (e) {
    console.log(e);
    this.setData({
      "form.tax_no.buyer": e.detail.value,
    })
  },

  /**
   * 表单提交
   */
  orderSubmit: function(e){
    console.log(e);
    var _this = this;
    var data = e.detail.value;
    var orderInfo = this.data.orderInfo;
    var elseData = {
      "linker_id": this.data.linker.id,
      "quality_amount": this.data.quality_amount,
      "real_amount": this.data.real_amount,
    };
    var newData = Object.assign({}, data, orderInfo, elseData);
    console.log(newData);
    this.setData({
      "comfirm.loading": true,
    });
    wx.request({
      url: host + '/product/save-order-info',
      data: newData,
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200) {
          var data = res.data;
          if (data.code == 200) {
            var result = data.data;
            if(result){
              wx.showToast({
                title: '订单已生成!',
                icon: "success",
                success: function(){
                  wx.reLaunch({
                    url: '/pages/buyer-order/index',
                  })
                }
              });
            }
          } else {
            wx.showModal({
              title: '错误',
              content: data.msg,
              showCancel: false,
            })
          }
        } else {
          wx.showModal({
            title: '错误',
            content: "数据获取失败",
            showCancel: false,
          })
        }
      },
      fail: function () {

      },
      complete: function () {
        _this.setData({
          "comfirm.loading": false,
        });
      },
    })
  },

  /**
   * 获取默认收货信息
   */
  getLinkInfo: function () {
    var _this = this;
    wx.request({
      url: host + '/product/get-link-info',
      data: {},
      success: function (res) {
        if (res.statusCode == 200) {
          var data = res.data;
          if (data.code == 200) {
            var result = data.data;
            _this.setData({
              "linker": result,
            });
          } else {
            wx.showModal({
              title: '错误',
              content: data.msg,
              showCancel: false,
            })
          }
        } else {
          wx.showModal({
            title: '错误',
            content: "数据获取失败",
            showCancel: false,
          })
        }
      },
      fail: function () {

      },
      complete: function () {

      },
    })
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
   * 初始化view显示数据
   */
  installData: function(data){
    var setData = {};
    var _this = this;
    _.forEach(data.pay_mode, function(value, key){
        if(!value.hidden && value.checked){
          setData.pay_mode = key;
        }
    });

    setData.platform = [];
    _.forEach(data.platform_ensure, function(value, key){
      if(!value.hidden && value.checked){
        setData.platform.push(key);
      }
    });

    this.setData(setData);

  },

  /**
   * 选项不同更改价格
   */
  updateMoney: function(e){
    var form = this.data.form;
    var platform = this.data.platform_ensure;
    var totalMoney = this.data.orderInfo.trade_amount;
    var real_amount = totalMoney;
    var quality_amount = 0;
    if(_.indexOf(platform, "1") > -1){
      quality_amount = form.quality_amount;
      real_amount = totalMoney + quality_amount;
    }
    this.setData({
      "quality_amount": quality_amount,
      "real_amount": real_amount,
    })
  },

  /**
   * 修改平台保障
   */
  updatePlatForm: function () {
    var form = this.data.form;
    var platform_ensure = this.data.platform_ensure;
    var pay_mode = this.data.pay_mode;
    var quality = form.platform_ensure["1"];
    var vouth = form.platform_ensure["2"];
    if (pay_mode == 1) { //合同发票报销，即现金支付
      vouth.disabled = false;
      //关于平台担保的 
      //这是es6写法
      // var index = platform_ensure.findIndex(function(value, key, arr){
      //   return value == "2";
      // });
      if (_.indexOf(platform_ensure, "2") > -1) { //判断平台担保是否是选中的 
        vouth.checked = true;
      } else {
        vouth.checked = false;
      }
    } else { //预付款
      vouth.checked = true;
      vouth.disabled = true;
    }

    //关于平台质保的
    if (_.indexOf(platform_ensure, "1") > -1) { //判断平台质保是否是选中的 
      quality.checked = true;
    } else {
      quality.checked = false;
    }

    this.setData({
      "form.platform_ensure": {
        "1": quality,
        "2": vouth,
      },
    });
  },

  /**
   * 修改支付方式
   */
  updatePayoffWay: function(){
  },

  /**
   * 修改发票抬头
   */
  updateInvoiceTitle: function () {
    var pay_mode = this.data.pay_mode;
    var form = this.data.form;
    var invoice_title = {};
    if(pay_mode == 1){
      invoice_title = {
        "value": form.invoice_title.buyer,
        "disabled": false,
      };
    } else {
      invoice_title = {
        "value": form.invoice_title.default,
        "disabled": true,
      };
    }

    this.setData({
      "invoice_title": invoice_title,
    });
  },

  /**
   * 修改税号
   */
  updateTaxNo: function () {
    var pay_mode = this.data.pay_mode;
    var form = this.data.form;
    var tax_no = {};
    if (pay_mode == 1) {
      tax_no = {
        "value": form.tax_no.buyer,
        "disabled": false,
      };
    } else {
      tax_no = {
        "value": form.tax_no.default,
        "disabled": true,
      };
    }

    this.setData({
      "tax_no": tax_no,
    });
  },
})