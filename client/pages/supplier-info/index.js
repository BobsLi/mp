// pages/supplier-info/index.js
var WxParse = require("../../libs/wxParse/wxParse.js");
const app = getApp();
const host = app.globalData.params.apiHost;
const storageHost = app.globalData.params.storageHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "isShowLoading": false,
    "supplier_id": null,
    "supplier": {//供应商信息
      "id": "2", //供应商id,加密
      "name": "ChIP关联分析工作室", //供应商名称
      "logo": "http://storage.genebang.com/image/cGF0aD1kZWZhdWx0L3N1cHBsaWVyLnBuZyZ3PTE2MCZoPTE2MA==", //供应商logo
      "address": "天津市 武清区 天津市武清区创业总部基地C08号楼南栋二层", //供应商地址
      "introduction": '<img src="http://www.prorevolab.com/data/upload/image/20161228/1482905066486775.png" alt="1482905066486775.png">style="font-size: 16px">ISO27001</span><span style="font-size: 16px">数据安全体系认证。</span></p><p><br/></p>',//公司简介
    },
    "productOptions": {
      "page": 1, //当前页数
      "per_page": 10, //每一页显示的条数,
    },
    "product": { //产品信息
      "is_last": false, //获取的是否是最后一页的数据,
      "items": [ //产品信息
        {
          "id": "1", //产品id，加密
          "name": "【Seqmore】3万条tags_16S_18S_ITS扩增子测序&标准分析_Miseq", //产品名称
          "praise": "1+", //好评数
          "trade_num": "1", //成交量
          "img": "http://storage.genebang.com/image/cGF0aD1kZWZhdWx0L3Byb2R1Y3QuanBn", //第一张图片
          "spec": "tags/样品", //产品规格,包括单位
          "period": "40工作日",//服务周期,包括单位
          "price": "4000",//价格
        },
        {
          "id": "2", //产品id，加密
          "name": "【Seqmore】全长转录组_有参/无参_标准分析", //产品名称
          "praise": "10+", //好评数
          "trade_num": "23", //成交量
          "img": "http://storage.genebang.com/image/cGF0aD1kZWZhdWx0L3Byb2R1Y3QuanBn", //第一张图片
          "spec": "12G&10M/样品", //产品规格,包括单位
          "period": "10工作日",//服务周期,包括单位
          "price": "8000",//价格
        },
      ],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id || 1;
    this.setData({
      "supplier_id": id,
    });
    this.getSupplierInfo();
    this.getProductInfo();
    // console.log(options);
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
    // this.switchRichText();
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
    this.getProductInfo(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 获取供应商信息
   */
  getSupplierInfo: function(){
    var _this = this;
    let id = this.data.supplier_id;
    wx.request({
      url: host + '/supplier/get-info',
      
      data: {
        id: id,
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var data = res.data;
          if (data.code == 200) {
            var result = data.data;
            if (result) {
              _this.setData({
                "supplier": result,
              });
              _this.switchRichText();
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
  },

  /**
   * 获取供应商产品信息
   */
  getProductInfo: function(isAdd){
    var productObj = this.data.product;
    if (!productObj.is_last) {
      var _this = this;
      var opt = this.data.productOptions;
      var oldProductList = this.data.product.items;
      var newOpt = Object.assign({}, opt, { id: this.data.supplier_id });
      this.setData({
        'isShowLoading': true,
      });
      wx.request({
        // url: host + '/supplier/get-product-list',
        url: host + '/test/get-product-list',
        data: newOpt,
        success: function (res) {
          if (res.statusCode == 200) {
            var data = res.data;
            if (data.code == 200) {
              var result = data.data;
              if (result) {
                if (isAdd) {
                  for (var i in result.items){
                    oldProductList.push(result.items[i]);
                  }
                  result.items = oldProductList;
                }
                _this.setData({
                  "product": result,
                  "productOptions.page": parseInt(_this.data.productOptions.page) + 1,
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
          wx.showModal({
            title: '错误',
            content: "数据获取失败",
            showCancel: false,
          })
        },
        complete: function () {
          _this.setData({
            'isShowLoading': false,
          });
        },
      })
    }
  },

  /**
   * 转换富文本
   */
  switchRichText: function(){
    var description = this.data.supplier.introduction;
    var _this = this;
    WxParse.wxParse("description", 'html', description, _this, 5);
  }
})