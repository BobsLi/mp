// pages/search/index.js
let _ = require("../../libs/lodash/lodash.js");
const app = getApp();
const host = app.globalData.params.apiHost;
const storageHost = app.globalData.params.storageHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "activeId":null,
    "activeObj": {},
    "typeList": {},//类型列表
    "showTypeList": [],//需要显示的类型列表
    "keywords": null,
    "productList": [
      {
        "id": "1", //产品id，加密
        "name": "同型半胱氨酸精确定量检测",//产品名称
        "img": "http://storage.genebang.com/image/cGF0aD1kZWZhdWx0L3Byb2R1Y3QuanBn",
        "price": 300, //产品价格
      },
      {
        "id": "2", //产品id，加密
        "name": "必须氨基酸检测",//产品名称
        "img": "http://storage.genebang.com/image/cGF0aD0yMDE4MDMvMTUyMDk5Njg5NjY5Ny5qcGc=",
        "price": 4500, //产品价格
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTypeList();
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
    console.log('show');
    this.calculate();
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
   * 输入搜索内容
   */
  changeInput: function(e){
    this.setData({
      "keywords": e.detail.value,
    });
  },

  /**
   * 点击搜索按钮
   */
  searchInput: function (e) {
    var keywords = this.data.keywords;
    if (!keywords ||  keywords.length < 2){
      wx.showModal({
        title: '提示',
        content: "请输入至少2字符进行搜索",
        showCancel: false,
      });
      return false;
    }
    this.getProduct();
  },

  /**
   * 获取产品列表
   */
  getProduct: function () {
    let data = this.data;
    var options = {
      "type_id": data.activeObj.id,
      "keywords": data.keywords,
      "page": 1,
      "per_page": 100,
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
            if (_data) {
              _this.setData({
                "productList": _data.items,
              });
            }
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
      complete: function () {
      }
    })
  },

  /**
   * 获取类型列表
   */
  getTypeList: function(){
    var _this = this;
    wx.request({
      // url: params.apiHost + '/product/get-type-list',
      url: host + '/test/get-type-list',
      data: {
        
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          var data = res.data;
          if (data.code == 200) {
            var result = data.data;
            if (result) {
              _this.setData({
                "activeId": null,
                "typeList": result,
              });
              // _this.buildData(result, [3, 13, 46]);
              _this.buildData(result, []);
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
   * 重组需要显示的数据
   */
  buildData: function (data, activeId, showList){
    var showList = showList || [];
    if(data){
      var _list = [];
      if(activeId.length > 0){
        var _id = activeId[0];
        for(var key in data){
          var _data = {
            "id": data[key]["id"],
            "name": data[key]["name"],
          };
          if(key == _id){
            _data.isActive = true;
          }else{
            _data.isActive = false;
          }
          _list.push(_data);
        }
        showList[_id] = _list;
        // console.log(_id);
        // console.log(data);
        if (data[_id].items){
          activeId.splice(0, 1);
          this.buildData(data[_id].items, activeId, showList);
        }else{
          this.setData({
            "showTypeList": Object.assign({}, showList),
          });
          this.getActiveData();
        }
      }else{
        for (var key in data) {
          var _data = {
            "id": data[key]["id"],
            "name": data[key]["name"],
            "isActive": false,
          };
          _list.push(_data);
        }
        showList["last"] = _list;
        this.setData({
          "showTypeList": Object.assign({}, showList),
        });
        this.getActiveData();
      }
    }
  },

  //获取选中的类型数据
  getActiveData: function(){
    var res = {
      "id": null,
      "name": null,
    };
    var data = this.data.showTypeList;
    var activeId = this.data.activeId; 
    if(data){
      if (activeId) {
        var arrId = activeId.split(',');
        var _data = data[arrId.pop()];
        if(_data){
          var activeData = _data.filter(function(v){
            return v.isActive == true;
          });
          if(activeData){
            res = Object.assign({}, res, activeData[0]);
          }
        }
      }
    }

    this.setData({
      "activeObj": res,
    });
    this.getProduct();
  },


  /**
   * 计算需要的高度或者其它
   */
  calculate: function(){
     var res =  wx.getSystemInfoSync();
     this.setData({
       "scrollHeight": res.windowHeight - 66,
       "scrollWidth": (res.windowWidth / 3).toFixed(0),
     });
    //  console.log(res);
  },

  /**
   * 改变选中的类型
   */
  changeActive: function(e){
    console.log(e);
    var activeId = this.data.activeId;
    var id = e.currentTarget.dataset.id;
    var idArr = [];
    if(id){
      if(activeId){
        idArr = activeId.split(',');
      }
      var index = idArr.indexOf(id);
      console.log(index);
      if (index > -1){
        idArr.splice(index, 1);
      }else{
        idArr.push(id);
      }
      console.log(idArr);
      console.log(idArr.length);
      this.setData({
        "activeId": idArr.join(','),
        "keywords": null,
      });
      this.buildData(this.data.typeList, idArr);
    }
  },
})