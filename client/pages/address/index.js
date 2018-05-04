var app = getApp()
Page( {
  data: {
    addressList: [ 
      { name: '胡先森', mobile: '158****2365', address: '成都市武侯区移动互联大厦906' },
      { name: '胡先森', mobile: '158****2365', address: '成都市武侯区移动互联大厦906' },
      { name: '胡先森', mobile: '158****2365', address: '成都市武侯区移动互联大厦906' }
    ]
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  }
})