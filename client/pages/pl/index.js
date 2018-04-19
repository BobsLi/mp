const app = getApp();
const params = app.globalData.params;
const host = params.apiHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    "carousel": {
      "options": {
        "indicatorDots": false,
        "autoplay": true,
        "interval": 3000,
        "duration": 500,
        "displayMultipleItems": 1
      },
      "items": [
        {
          "id": "xdfnek",
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzU0MzI1NTM3MS5wbmc=",
          "link": null
        },
        {
          "id": "EGGSGX",
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDEvMTUxNzM5OTI2MTEyNi5wbmc=",
          "link": null
        },
        {
          "id": "WEHDGDF",
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDEvMTUxNzM5OTI4MDczNS5wbmc=",
          "link": null
        }
      ],
    },

    "keywords": null,//搜索关键字
    "inputShowed": false,//是否显示搜索框
    "keywords_list": ["转录组测序", "lncRNA", "16S/18S/ITS", "SNP", "GWAS", "抗体制备"],//默认显示的搜索关键字

    //技术服务类型
    "type": {
      "activeId": "ChIP-seq",
      "items": [
        {
          "id": 'ChIP-seq',
          "name": "ChIP-seq",
          "img": "https://www.genebang.com/img/home/tech-type/ChIP-seq.png",
          "hoverImg": "https://www.genebang.com/img/home/tech-type/ChIP-seq-hl.png"
        },
        {
          "id": 'qPCR',
          "name": "qPCR",
          "img": "https://www.genebang.com/img/home/tech-type/qPCR.png",
          "hoverImg": "https://www.genebang.com/img/home/tech-type/qPCR-hl.png"
        },
        {
          "id": 'RNA-Seq',
          "name": "RNA-Seq",
          "img": "https://www.genebang.com/img/home/tech-type/RNA-Seq.png",
          "hoverImg": "https://www.genebang.com/img/home/tech-type/RNA-Seq-hl.png"
        },
        {
          "id": 'SNP',
          "name": "SNP",
          "img": "https://www.genebang.com/img/home/tech-type/SNP.png",
          "hoverImg": "https://www.genebang.com/img/home/tech-type/SNP-hl.png"
        },
        {
          "id": 'Viruses',
          "name": "Viruses",
          "img": "https://www.genebang.com/img/home/tech-type/Viruses.png",
          "hoverImg": "https://www.genebang.com/img/home/tech-type/Viruses-hl.png"
        },
      ],
    },

    //技术服务产品对象
    "product": {
      "page": 1, //当前页数
      "per_page": 10, //每一页显示的条数,
      "is_last": false, //获取的是否是最后一页的数据,
      "items": [ //数据列表
        {
          "id": 'vQJ0Ma',//产品id，加密
          "name": "【Seqmore】真核有参转录组_建库测序&标准分析",
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzQ1NTM4MTg3Ni5wbmc=",
          "tag": "RNA-seq,真核转录组,基因差异表达,mRNA,信号通路分析,KEGG,GO",
          "price": "151",
          "supplier_id": "sdfa",
          "supplier_name": "服务商名称",
          "address": "四川省 成都市 市辖区",
          "vouch": true,
          "trade_num": "1+"
        },
        {
          "id": '1',
          "name": "【Seqmore】真核有参转录组_建库测序&标准分析",
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzQ1NTM4MTg3Ni5wbmc=",
          "tag": "RNA-seq,真核转录组,基因差异表达,mRNA,信号通路分析,KEGG,GO",
          "price": "151",
          "supplier_id": "sdfa",
          "supplier_name": "服务商名称",
          "address": "四川省 成都市 市辖区",
          "vouch": true,
          "trade_num": "1+"
        },
        {
          "id": '1',
          "name": "【Seqmore】真核有参转录组_建库测序&标准分析",
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzQ1NTM4MTg3Ni5wbmc=",
          "tag": "RNA-seq,真核转录组,基因差异表达,mRNA,信号通路分析,KEGG,GO",
          "price": "151",
          "supplier_id": "sdfa",
          "supplier_name": "服务商名称",
          "address": "四川省 成都市 市辖区",
          "vouch": true,
          "trade_num": "1+"
        },
        {
          "id": '1',
          "name": "【Seqmore】真核有参转录组_建库测序&标准分析",
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzQ1NTM4MTg3Ni5wbmc=",
          "tag": "RNA-seq,真核转录组,基因差异表达,mRNA,信号通路分析,KEGG,GO",
          "price": "151",
          "supplier_id": "sdfa",
          "supplier_name": "服务商名称",
          "address": "四川省 成都市 市辖区",
          "vouch": true,
          "trade_num": "1+"
        },
        {
          "id": '1',
          "name": "【Seqmore】真核有参转录组_建库测序&标准分析",
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzQ1NTM4MTg3Ni5wbmc=",
          "tag": "RNA-seq,真核转录组,基因差异表达,mRNA,信号通路分析,KEGG,GO",
          "price": "151",
          "supplier_id": "sdfa",
          "supplier_name": "服务商名称",
          "address": "四川省 成都市 市辖区",
          "vouch": true,
          "trade_num": "1+"
        },
        {
          "id": '1',
          "name": "【Seqmore】真核有参转录组_建库测序&标准分析",
          "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzQ1NTM4MTg3Ni5wbmc=",
          "tag": "RNA-seq,真核转录组,基因差异表达,mRNA,信号通路分析,KEGG,GO",
          "price": "151",
          "supplier_id": "sdfa",
          "supplier_name": "服务商名称",
          "address": "四川省 成都市 市辖区",
          "vouch": true,
          "trade_num": "1+"
        }
      ],
    },

    "isFixed": false, //搜索栏是否浮动
    "isShowLoading": false,
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
    //   url: params.apiHost + 'test/get-product-list',
    //   data: {},
    //   success: function (data) {
    //     console.log(data);
    //     if(data.data.code == 200){
    //       wx.showToast({
    //         title: '',
    //         icon: 'success'
    //       })
    //       var productList = data.data.data;
    //       console.log(productList);
    //       _this.setData({
    //         list: productList,
    //       });
    //     }else{
    //       wx.showModal({
    //         title: '提示',
    //         content: '没有获取到数据',
    //         showCancel: false,
    //       })
    //     }
    //   },
    //   fail: function(data){
    //     console.log(data);
    //   },
    //   complete: function(data){
    //     wx.hideToast();
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getStaticData();
    
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
    if (this.data.product.is_last){
      this.setData({
        "isShowLoading": false,
      });
    }else{
      this.setData({
        "isShowLoading": true,
      });
    }
    // this.getProduct(true);
  },

  /**
   * 页面滚动
   */
  onPageScroll: function (e) {
    console.log(e);
    this.setData({
      "isFixed": (e.scrollTop > 160) ? true : false,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取一些静态数据
   */
  getStaticData: function(){
    var _this = this;
    wx.request({
      url: host + '/test/static-data',
      success: function(res){
        console.log(res);
        if (res.statusCode == 200){
          var data = res.data;
          _this.setData({
            "keywords_list": data.keywords_list,
            "type": {
              "activeId": data.type_arr[0].id,
              "items": data.type_arr,
            },
          });
        } else {
          wx.showModal({
            title: '错误',
            content: '获取数据失败，请重试',
            showCancel: false,
          });
        }
      },
      fail: function () {
        wx.showModal({
          title: '错误',
          content: '获取数据失败，请重试',
          showCancel: false,
        });
      }
    })
  },

  /**
   * 获取banner图
   */
  getBanner: function(){
    var _this = this;
    wx.request({
      url: host + '/product/get-carousel-img',
      success: function(res){
        if(res.statusCode == 200){
          let data = res.data;
          if(data.code == 200){
            _this.setData({
              "carousel.items": data.data,
            });
          } else {
            wx.showModal({
              title: '错误',
              content: data.msg,
              showCancel: false,
            });
          }
        }else{
          wx.showModal({
            title: '错误',
            content: '获取数据失败，请重试',
            showCancel: false,
          });
        }
      },
      fail: function(){
        wx.showModal({
          title: '错误',
          content: '获取数据失败，请重试',
          showCancel: false,
        });
      }
    })
  },

  /**
   * 获取产品列表
   */

  getProduct: function (add) {
    let data = this.data;
    let product = data.product;
    var options = {
      "type_id": data.type.activeId,
      "keywords": data.keywords,
      "page": parseInt(product.page) + 1,
      "per_page": product.per_page,
    };
    var _this = this;
    wx.request({
      url: host + '/product/get-product-list',
      data: options,
      fail: function (e) {
        wx.showModal({
          title: '错误',
          content: "获取产品列表错误",
          showCancel: false,
        })
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            var _data = res.data.data;
            var newData = {};
            if(_data){
              var _items = _data.items;
              if(_items.length > 0){
                if (add) { //这是下拉添加数据
                  _items = _this.data.product.items.push(_items);
                  _data["items"] = _items;
                  newData = _data;
                } else { //这是过滤数据
                  newData = _data;
                }
              }else{
                newData = {};
              }
            }else{
              newData = {};
            }
            _this.setData({
              "product": newData,
            });
          } else {
            wx.showModal({
              title: '错误',
              content: res.data.msg,
              showCancel: false
            });
          }
        } else {
          wx.showModal({
            title: '错误',
            content: '获取请求失败！',
            showCancel: false,
          })
        }
      },
      complete: function(){
        _this.setData({
          "isShowLoading": false,
        });
      }
    })
  },

  showInput: function () {
    var _opt = {
      "keywords": null,
      "inputShowed": true
    }
    this.changeInput(_opt);
  },
  hideInput: function () {
    var _opt = {
      "keywords": null,
      "inputShowed": false
    }
    this.changeInput(_opt);
  },
  clearInput: function () {
    var _opt = {
      "keywords": null,
    }
    this.changeInput(_opt);
  },
  inputTyping: function (e) {
    var _opt = {
      "keywords": e.detail.value
    }
    this.changeInput(_opt);
  },

  //获取关键字
  getKeywords: function (e) {
    console.log(e);
    var _opt = {
      "keywords": e.currentTarget.dataset.key,
      "inputShowed": true,
    }
    this.changeInput(_opt);
  },

  //选择类型
  selectType: function (e) {
    console.log(e);
    var _typeId = e.currentTarget.id;
    if (_typeId == this.data.type.activeId) {
      _typeId = null;
    }
    var _opt = {
      "type.activeId": _typeId,
    }
    this.changeInput(_opt);
  },

  //改变搜索框的状态和搜索条件
  changeInput: function (opt) {
    opt["product.page"] = 1;
    opt["product.per_page"] = 10;
    opt["product.is_last"] = false;
    this.setData(opt);
    this.getProduct();
  },
})