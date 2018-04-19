// pages/pl/detail.js
var WxParse = require("../../libs/wxParse/wxParse.js");
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
      }
    },
    "priceStepOptions": {
      "min": 0,
      "max": 999,
    },
    "numOptions": {
      "min": 1,
      "max": 999,
    },
    "real_price": "123",//实际价格
    "num": "1",//购买数量
    "productInfo": {
      "id": "DFDSDG",//产品id，加密
      "name": "产品名称",
      "img": ["http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzQ1NTM4MTg3Ni5wbmc=", "http://storage.genebang.com/image/cGF0aD0yMDE4MDIvMTUxNzg4NzgwNzQ4Ny5wbmc=", "http://storage.genebang.com/image/cGF0aD1kZWZhdWx0L3Byb2R1Y3QuanBn"],//产品图片
      "assemble_type": 1,//产品报价组成方式
      "supplier_id": '231', //供应商id
      "supplier_name": "基因帮优选品牌【Seqmore】",
      "spec": "规格",
      "period": "周期",
      "order_num": '1',//成交量
      "up": "1",//好评数
      "default_price": "1231", //产品默认价格
      "is_fav": false, //是否收藏了该商品
      "description": '<div class="content"><p><span> &nbsp; &nbsp;链特异性转录组测序（strand-specific RNA sequencing）是指在构建测序文库时，利用Illumina高保真Taq酶将mRNA链的方向信息保存到测序文库中。测序后的数据分析可确定转录本是来自正义还是反义DNA链。与普通转录组测序相比，它更能准确地统计转录本的数量和确定基因的结构，同时可以发现更多的反义转录本，目前被广泛地应用于研究基因结构和基因表达调控等领域范围。</span></p><div class="img-show-box"><img src="http://storage.genebang.com/image/cGF0aD0yMDE4MDMvMTUyMjMxMzYzOTUxOC5wbmcmdz0zNTAmaD0zNTA=" title="【Seqmore】原核有参链特异性转录组测序（有参）" alt="【Seqmore】原核有参链特异性转录组测序（有参）"></div></div>', //产品描述
      "extend": [ //扩展属性
        {
          'extend_name': '扩展名1',
          'extend_attr': "扩展值1",
        },
        {
          'extend_name': '扩展名2',
          'extend_attr': "扩展值2",
        },
        {
          'extend_name': '扩展名3',
          'extend_attr': "扩展值3",
        },
      ],
      "price_opt": [ //按选项报价数据
        {
          "part_name": "选项属性",
          "activeId": "1",//默认选中的id
          "items": { //选项列表
            "1": { //以组成部分id作为key
              "id": "1", //组成部分id，加密
              "part_display": "选项1",//该组成部分的可选值
              "part_price": "231", //该组成部分的服务单价
              "is_default_part": true, //是否是可选报价的默认选项
            },
            "2": { //以组成部分id作为key
              "id": "2", //组成部分id，加密
              "part_display": "选项2",//该组成部分的可选值
              "part_price": "623", //该组成部分的服务单价
              "is_default_part": false, //是否是可选报价的默认选项
            },
            "3": { //以组成部分id作为key
              "id": "3", //组成部分id，加密
              "part_display": "选项3",//该组成部分的可选值
              "part_price": "431", //该组成部分的服务单价
              "is_default_part": false, //是否是可选报价的默认选项
            },
            "4": { //以组成部分id作为key
              "id": "4", //组成部分id，加密
              "part_display": "选项4",//该组成部分的可选值
              "part_price": "643", //该组成部分的服务单价
              "is_default_part": false, //是否是可选报价的默认选项
            },
          },
        },
        {
          "part_name": "选项属性",
          "activeId": "1",//默认选中的id
          "items": { //选项列表
            "1": { //以组成部分id作为key
              "id": "1", //组成部分id，加密
              "part_display": "选项1",//该组成部分的可选值
              "part_price": "93", //该组成部分的服务单价
              "is_default_part": true, //是否是可选报价的默认选项
            },
            "2": { //以组成部分id作为key
              "id": "2", //组成部分id，加密
              "part_display": "选项2",//该组成部分的可选值
              "part_price": "222", //该组成部分的服务单价
              "is_default_part": false, //是否是可选报价的默认选项
            },
            "3": { //以组成部分id作为key
              "id": "3", //组成部分id，加密
              "part_display": "选项3",//该组成部分的可选值
              "part_price": "333", //该组成部分的服务单价
              "is_default_part": false, //是否是可选报价的默认选项
            },
          },
        },
      ],
      "price_step": [//按按步骤报价数据
        {
          "id": '1', //该组成部分id
          "part_name": "组成字段1", //服务组成部分的名称
          "default_part_num": '1', //该组成部分的默认服务数量
          "real_part_num": '1', //该组成部分的实际服务数量
          "part_price": '12321', //该组成部分的服务单价
        }, 
        { 
          "id": '2', //该组成部分id
          "part_name": "组成字段2", //服务组成部分的名称
          "default_part_num": '1', //该组成部分的服务数量
          "real_part_num": '1', //该组成部分的实际服务数量
          "part_price": '222', //该组成部分的服务单价
        },
      ],
    }
  },

  //价格组成改变
  selectedOpt: function(e){
    let data = e.currentTarget.dataset;
    let price_opt = this.data.productInfo.price_opt;
    price_opt[data.opt_id]['activeId'] = data.id;
    this.setData({
      "productInfo.price_opt": price_opt,
    });
    this.jisuan();
  },

  /**
   * 减数量
   */
  reduceNum: function (e) {
    let data = e.currentTarget.dataset;
    var _this = this;
    if (data.name == "step") {
      this.changeStepNum("reduce", data.id, null, function () {
        _this.jisuan();
      })
    }else{
      this.changeProductNum("reduce", null, function(newNum){
        _this.jisuan();
      })
    }
  },

  /**
   * 自定义数量
   */
  customNum: function(e){
    console.log(e);
    let data = e.currentTarget.dataset;
    let value = e.detail.value;
    var _this = this;
    if (data.name == "step") {
      this.changeStepNum("custom", data.id, value, function () {
        _this.jisuan();
      })
    } else {
      this.changeProductNum("custom", value, function (newNum) {
        _this.jisuan();
      })
    }
  },

  /**
   * 加数量
   */
  addNum: function (e) {
    let data = e.currentTarget.dataset;
    var _this = this;
    if (data.name == "step") {
      this.changeStepNum("add", data.id, null, function () {
        _this.jisuan();
      })
    } else {
      this.changeProductNum("add", null, function (newNum) {
        _this.jisuan();
      })
    }
  },

  /**
   * 改变按步骤报价的数量
   */
  changeStepNum: function(type, id, value, call){
    let priceStep = this.data.productInfo.price_step;
    let options = this.data.priceStepOptions;
    let _item = priceStep[id];
    let num = _item.default_part_num;
    let newNum = options.min;
    if (priceStep){
      newNum = this.changeNum(type, num, value, options);
      priceStep[id]['default_part_num'] = newNum;
      this.setData({
        "productInfo.price_step": priceStep
      });
      if(call){
        call(newNum);
      }
    }else{
      return false;
    }
  },

  /**
   * 改变产品数量
   */
  changeProductNum: function(type, value, call){
    let options = this.data.numOptions;
    let newNum = this.changeNum(type, this.data.num, value, options);
    this.setData({
      "num": newNum,
    });
    if(call){
      call(newNum);
    }
  },

  /**
   * 统一改变数量
   */
  changeNum: function(type, oldNum, value, options){
    let newNum = oldNum;
    oldNum = parseInt(oldNum);
    if (type == "reduce") { //减法
      newNum = oldNum - 1;
      if (newNum < options.min) {
        newNum = options.min;
      }
    } else if (type == "add") {//加法
      newNum = oldNum + 1;
      if (newNum > options.max) {
        newNum = options.max;
      }
    } else { //自定义
      if (value && !isNaN(value)) {
        value = parseInt(value);
        newNum = value;
        if (newNum < options.min || newNum > options.max) {
          newNum = oldNum;
        }
      }
    }
    return newNum;
  },

  /**
   * 计算价格
   */
  jisuan: function(){
    let info = this.data.productInfo;
    let total = 0;
    let price = 0;
    if (info.assemble_type == 1){
      let priceOpt = info.price_opt;
      for (var i = 0; i < priceOpt.length; i++){
        var _thisActiveId = priceOpt[i].activeId;
        price = price + parseFloat(priceOpt[i]['items'][_thisActiveId]['part_price']);
      }
      console.log(price);
    }else{
      let priceStep = info.price_step;
      console.log(priceStep);
      for(var i = 0; i < priceStep.length; i++){
        console.log(priceStep[i]['default_part_num']);
        price = price + priceStep[i]['default_part_num'] * priceStep[i]['part_price'];
      }
    }
    total = price * this.data.num;
    console.log(total);
    this.setData({
      'real_price': total,
    });
  },

  /**
   * 进入服务商页面
   */
  goSuppler: function(e){
    wx.navigateTo({
      url: '/pages/supplier-info/index?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 产品收藏
   */
  favProduct: function(e){
    var _this = this;
    let isFav = this.data.productInfo.is_fav;
    let text = isFav ? '取消收藏失败！' : "收藏失败！";
    wx.request({
      url: host + 'product/fav',
      data: {
        id: e.currentTarget.dataset.id,
      },
      success: function(res){
        if(res.statusCode == 200){
          let data = res.data;
          if(data.code == 200){
            _this.setData({
              "productInfo.is_fav": !isFav,
            });
          }else{
            wx.showModal({
              title: '错误',
              content: text,
              showCancel: false,
            })
          }
        }else{
          wx.showModal({
            title: '错误',
            content: text,
            showCancel: false,
          })
        }
      },
      fail: function(){
        wx.showModal({
          title: '错误',
          content: text,
          showCancel: false,
        })
      },
    })
  },

  /**
   * 组装下单的信息
   */
  bulidProductInfo: function(){
    var nowProductInfo = this.data.productInfo;
    var priceOpt = nowProductInfo.price_opt;
    var priceStep = nowProductInfo.price_step;
    var _priceOpt = [],
        _priceStep = []
        ;
    priceOpt.map(function(v, k){
      var _item = {
        "id": v.activeId,
        "part_name": v.part_name,
        "part_display": v.items[v.activeId]["part_display"],
        "part_price": v.items[v.activeId]["part_price"],
      };
      _priceOpt.push(_item);
    });

    // for(var i in priceStep){
    //   _priceOpt[i] = {
    //     "part_name": priceStep[i]['part_name'],
    //     "part_num": priceStep[i]['default_part_num'],
    //     "part_price": priceStep[i]['part_price'],
    //   };
    // }
    var orderInfo = {};
    orderInfo.id = nowProductInfo.id;
    orderInfo.name = nowProductInfo.name;
    orderInfo.img = nowProductInfo.img[0];
    orderInfo.assemble_type = nowProductInfo.assemble_type;
    orderInfo.supplier_name = nowProductInfo.supplier_name;
    orderInfo.spec = nowProductInfo.spec;
    orderInfo.period = nowProductInfo.period;
    orderInfo.num = this.data.num;
    orderInfo.real_price = this.data.real_price;
    orderInfo.extend = nowProductInfo.extend;
    orderInfo.price_opt = _priceOpt;
    orderInfo.price_step = priceStep;
    // console.log(orderInfo);
    return orderInfo;
  },

  /**
   * 立即下单
   */
  buyProduct: function(e){
    var orderInfo = this.bulidProductInfo();
    wx.setStorage({
      key: 'orderInfo',
      data: orderInfo,
      success: function(){
        wx.navigateTo({
          url: '/pages/comfirm-order/index',
        })
      },
      fail: function () {
        wx.showModal({
          title: '错误',
          content: "保存错误",
          showCancel: false,
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    if (query.id){
        // this.getProductInfo(query);
      var description = this.data.productInfo.description;
      var _this = this;
      console.log(description);
      WxParse.wxParse("description", 'html', description, _this, 5);
    }else{
      wx.navigateBack({
        
      })
    }
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

  },

  /**
   * 获取产品信息
   */
  getProductInfo: function(query){
    var _this = this;
    wx.showToast({
      title: '',
      icon: 'loading'
    })
    wx.request({
      url: host + '/product/get-product-info',
      data: query,
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          var data = res.data;
          if (data.code == 200) {
            var result = data.data;
            wx.showToast({
              title: '',
              icon: 'success'
            })
            wx.setNavigationBarTitle({
              title: result.info.name,
            })
            _this.setData({
              "productInfo": result,
            });
          } else {
            wx.showModal({
              title: '提示',
              content: '没有获取到数据',
              showCancel: false,
            })
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '获取数据失败!',
            showCancel: false,
          })
        }
      },
      fail: function (data) {
        console.log(data);
      },
      complete: function (data) {
        wx.hideToast();
      }
    })
  }
})