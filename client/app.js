//app.js
let _ = require("libs/lodash/lodash.js");
const params = require("constants/params.js");
App({
  onLaunch: function (options) {
    // console.log(options);
    this.login();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //获取openId
    //       wx.request({
    //         url: 'https://api.weixin.qq.com/sns/jscode2session',
    //         data: {
    //           　　　　　　　//小程序唯一标识
    //           appid: 'wxd2b0278f84002161',
    //           //小程序的 app secret
    //           secret: 'fe63efec8eb5b20958bef1f480c772a8',
    //           grant_type: 'authorization_code',
    //           js_code: res.code
    //         },
    //         method: 'GET',
    //         header: { 'content-type': 'application/json' },
    //         success: function (openIdRes) {
    //           console.info("登录成功返回的openId：" + openIdRes.data.openid);
    //           weChatUserInfo.openId = openIdRes.data.openid;
    //           // 判断openId是否获取成功
    //           if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {
    //             　　　　　　　　// 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
    //             wx.getUserInfo({
    //               success: function (data) {
    //                 // 自定义操作
    //                 // 绑定数据，渲染页面
    //                 that.setData({

    //                 });
    //               },
    //               fail: function (failData) {
    //                 console.info("用户拒绝授权");
    //               }
    //             });
    //           } else {
    //             console.info("获取用户openId失败");
    //           }
    //         },
    //         fail: function (error) {
    //           console.info("获取用户openId失败");
    //           console.info(error);
    //         }
    //       })
    //     }
    //   }
    // });
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    // wx.getUserInfo({
    //   success: res => {
    //     console.log(res);
    //   }
    // })
  },

  /**
   * 登录
   */
  login: function(){
    var _this = this;
    var globalData = _this.globalData;
    if (globalData.token){ //先看有没有登录的唯一token
      wx.request({
        url: params.apiHost + '/user/check-login',
        data: {
          token: token,
        },
        success: function (res) {
          if (res.statusCode == 200) {
            var data = res.data;
            if (data.code == 200) {
              var result = data.data;
              if (!result) {
                globalData.token = null;
                _this.login();
              }
              return ;
            } else {
              globalData.token = null;
              _this.login();
            }
          } else {
            globalData.token = null;
            _this.login();
          }
        },
        fail: function () {
          globalData.token = null;
          _this.login();
        },
        complete: function () {
        },
      })
    }else{
      wx.login({
        success: function(res){
          // console.log(res);
          if(res.code){
            _this.getUserInfo(function (data) {
              data.code = res.code;
              // console.log(data);
              wx.request({
                url: params.apiHost + '/user/login',
                method: "POST",
                data: {
                  code: res.code,
                },
                success: function (res) {
                  if (res.statusCode == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                      var result = data.data;
                      if (result) {
                        globalData.token = result.token;
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
                      content: "无法登陆，请重试。",
                      showCancel: false,
                    })
                  }
                },
                fail: function () {
                  wx.showModal({
                    title: '错误',
                    content: "无法登陆，请重试。",
                    showCancel: false,
                  })
                },
                complete: function () {
                },
              })
            });
          }else{
            wx.showModal({
              title: '错误',
              content: "登录失败!",
              showCancel: false,
            })
          }
        }
      })
    }
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function(call){
    var _this = this;
      wx.getUserInfo({
        success: function(res){
          _this.globalData.userInfo = res.userInfo;
          if(call){
            call(res);
          }
        },
        fail: function(){
          wx.showModal({
            title: '错误',
            content: '获取用户信息失败',
            showCancel: false,
          })
        },
      });
  },

  globalData: {
    userInfo: null,
    params: params,
    token: null,
  }
})