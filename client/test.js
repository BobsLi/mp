
wx.request({
  url: host + '/user/login',
  data: {
    
  },
  success: function (res) {
    if (res.statusCode == 200) {
      var data = res.data;
      if (data.code == 200) {
        var result = data.data;
        if (result) {
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
  },
})