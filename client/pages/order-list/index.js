const app = getApp();
Page({
  data:{
    statusType: ["所有订单", "未处理", "进行中", "已完成", "已取消"],
    currentType:0,
    tabClass: ["", "", "", "", ""],
    hiddenmodalput: true,
    discountFee:0,
    auditNotes:'',
    nowPage:1,
  },

  discountInput: function (e) {
    this.setData({
      discountFee: e.detail.value
    })
  },

  discountText: function (e) {
    this.setData({
      auditNotes: e.detail.value
    })
  },

  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    console.log(this.data.orderId), 
    console.log(this.data.discountFee), 
    console.log(this.data.auditNotes), 
    wx.showToast({
      title: '提交中',
      icon: 'loading',
      duration: 3000
    });
    var postData = {
      order_id: this.data.orderId,
      discount_fee: this.data.discountFee,
      audit_notes: this.data.auditNotes,
    };
    console.log(postData);
    wx.request({
      url: 'http://wapi.gbv3.cn/supplier/receive-order',
      data: postData,
      success: (res) => {
        console.log(res);
        if (res.data.code == 200) {
          wx.showToast({
            title: '已完成',
            icon: 'success',
            duration: 3000
          });
          wx.hideLoading();
          wx.redirectTo({
            url: '../order-list/index',
          })
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'success',
            duration: 3000
          });
          wx.hideLoading();
        }
      }
    })
    this.setData({
      hiddenmodalput: true
    })
  },
  statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.setData({
       currentType: curType
     });
     if (curType > 1){
       curType = curType + 1;
     }
     this.setData({
       nowPage: 1,
     });
     this.data.currentType = curType
     this.onShow();
  },
  orderDetail : function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },

  //接单
  receiveOrderTap: function (e) {
    var that = this;
    this.setData({
      orderId: e.currentTarget.dataset.id,
    })
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
    })  
  },

  //拒绝订单
  cancelOrderTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
     wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: 'http://wapi.gbv3.cn/supplier/refuse-order',
            data: {
              order_id: orderId
            },
            success: (res) => {
              wx.showToast({
                title: '已拒绝此订单',
                icon: 'success',
                duration: 3000
              });
              wx.hideLoading();
              wx.redirectTo({
                url: '../order-list/index',
              })
              if (res.data.code == 0) {
                that.onShow();
              }
            }
          })
        }
      }
    })
  },

  //完成收款
  finishCashTap: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确定已收款吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: 'http://wapi.gbv3.cn/supplier/finish-cash',
            data: {
              order_id: orderId
            },
            success: (res) => {
              console.log(res);
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 3000
              });
              wx.hideLoading();
              wx.redirectTo({
                url: '../order-list/index',
              })
              if (res.data.code == 0) {
                that.onShow();
              }
            }
          })
        }
      }
    })
  },

  //完成订单
  finishOrderTap: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确定要完成该订单吗？',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: 'http://wapi.gbv3.cn/supplier/finish-order',
            data: {
              order_id: orderId
            },
            success: (res) => {
              console.log(res);
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 3000
              });
              wx.hideLoading();
              wx.redirectTo({
                url: '../order-list/index',
              })
              if (res.data.code == 0) {
                that.onShow();
              }
            }
          })
        }
      }
    })
  },
  toPayTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/amount',
      data: {
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 0) {
          // res.data.data.balance
          money = money - res.data.data.balance;
          if (money <= 0) {
            // 直接使用余额支付
            wx.request({
              url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/pay',
              method:'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                token: app.globalData.token,
                orderId: orderId
              },
              success: function (res2) {
                that.onShow();
              }
            })
          } else {
            wxpay.wxpay(app, money, orderId, "/pages/order-list/index");
          }
        } else {
          wx.showModal({
            title: '错误',
            content: '无法获取用户资金信息',
            showCancel: false
          })
        }
      }
    })    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
   
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },
  getOrderStatistics : function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/statistics',
      data: { token: app.globalData.token },
      success: (res) => {
        wx.hideLoading();
        if (res.data.code == 0) {
          var tabClass = that.data.tabClass;
          if (res.data.data.count_id_no_pay > 0) {
            tabClass[0] = "red-dot"
          } else {
            tabClass[0] = ""
          }
          if (res.data.data.count_id_no_transfer > 0) {
            tabClass[1] = "red-dot"
          } else {
            tabClass[1] = ""
          }
          if (res.data.data.count_id_no_confirm > 0) {
            tabClass[2] = "red-dot"
          } else {
            tabClass[2] = ""
          }
          if (res.data.data.count_id_no_reputation > 0) {
            tabClass[3] = "red-dot"
          } else {
            tabClass[3] = ""
          }
          if (res.data.data.count_id_success > 0) {
            //tabClass[4] = "red-dot"
          } else {
            //tabClass[4] = ""
          }

          that.setData({
            tabClass: tabClass,
          });
        }
      }
    })
  },
  onShow:function(){
    // 获取订单列表
    wx.showLoading();
    var that = this;
    var postData = {
      openid: app.globalData.token,
      status: that.data.currentType,
    };
    this.setData({
      nowStatus: that.data.currentType,
    })
    console.log(postData);
    this.getOrderStatistics();
    wx.request({
      url: 'http://wapi.gbv3.cn/supplier/order-list',
      data: postData,
      success: (res) => {
        console.log(res);
        wx.hideLoading();
        if (res.data.code == 200) {
          console.log(res.data.data);
          that.setData({
            orderList: res.data.data,
          });
        } else {
          this.setData({
            orderList: null,
            logisticsMap: {},
            goodsMap: {}
          });
        }
      }
    })
    
  },

  //加载更多
  onReachBottom: function () {
    console.log('加载更多')
    var that = this;
    this.setData({
      nowPage: that.data.nowPage + 1,
    });
    var postData = {
      openid: app.globalData.token,
      status: that.data.nowStatus,
      page: that.data.nowPage,
    };
    console.log(postData);
    this.getOrderStatistics();
    wx.request({
      url: 'http://wapi.gbv3.cn/supplier/order-list',
      data: postData,
      success: (res) => {
        console.log(res);
        wx.hideLoading();
        if (res.data.code == 200) {
          console.log(res.data.data);
          that.setData({
            orderList: this.data.orderList.concat(res.data.data),
          });
          this.setData({
            isHideLoadMore: false,
          })
        } else {
          this.setData({
            orderList: null,
            logisticsMap: {},
            goodsMap: {}
          });
        }
      }
    })
    setTimeout(() => {
      this.setData({
        isHideLoadMore: true,
      })
    }, 1000);
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  // onReachBottom: function() {
  //   // 页面上拉触底事件的处理函数
  
  // }
})
