// pages/single/single.js
var common = require('../../common.js');
var WxParse = require('../../utils/wxParse.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    //列表页传来的id
    var id = options.id;
    wx.request({
      url: "https://hepulan-skin-care-center.omnistatic.com/site/get-knowledge-detail?sign=582e10b312aa01c2057973e1345c7567",
      data: {
        id: id,
      },
      success: function(res) {
        console.log(res);
        var author = res.data.data.publish;
        var time = res.data.data.publish_time;
        var content = res.data.data.content;
        var title = res.data.data.title;
        var is_thumb = res.data.data.is_thumb;
        var visit_num = res.data.data.visit_num;
        var thumb_num = res.data.data.thumb_num;
        //console.log(content);
        var single = {
          "author": author,
          "publishtime": time,
          "content": content,
          "title": title,
          is_thumb: is_thumb,
          visit_num: visit_num,
          thumb_num: thumb_num,
          id: id
        };
        that.setData({
          single: single
        });
        //用wxpares转化一下标签
        WxParse.wxParse("content", "html", that.data.single.content, that, 0);
      
      }
    })
  },

  likeBtn: function () {
    var that = this;
    console.log(that.data);
    wx.request({
      url: "https://hepulan-skin-care-center.omnistatic.com/site/get-knowledge-detail?sign=582e10b312aa01c2057973e1345c7567",
      data: {
        id: that.data.single.dx
      },
      success: function (res) {
        console.log(res);
        var single = that.data.single;
        single.is_thumb = 1;
        single.thumb_num = parseInt(single.thumb_num) + 1;
        that.setData({
          single: single
        })
      }
    })
  },

  hasLike: function () {
    wx.showToast({
      title: '你已经点过赞了',
      icon: 'success',
      duration: 1000
    })
  },

  // 返回首页
    backHome:function(){
       common.backHome();
    },

  // 分享海报
    toShare:function(){
      common.toShare();
    },

})
