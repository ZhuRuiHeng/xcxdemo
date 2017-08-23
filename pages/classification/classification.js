

var id, url1, url2, list = [], that, data, listadd;
Page({
  data: {},
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    // this.setData({
    // id:options.id //options.id是上个页面传来的参数 赋值给此js对应的html
    // })
    that = this;//在请求数据时setData使用
   // id = options.id;//options.id为上个页面传来的参数
    // console.log(id)
    url1 = "https://hepulan-skin-care-center.omnistatic.com/site/get-knowledge-list?sign=582e10b312aa01c2057973e1345c7567";
    queryRequest(url1);
  },
  lower: function (e) {
    url2 = url2 = url1 + "&nt=" + data.nt;
    getmoreRequest(url2);
  }
})





//请求数据
function queryRequest(url) {
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // success
      // console.log(res.data);
      // data = res.data.data;
      // list = res.data.data.list;
      console.log(res.data.status);
      console.log(res.data.data);
      list = res.data.data;
      console.log('list:' + list)
      // console.log(list);
      for (var i = 0; i < list.length; i++) {
        //var a = timeString(list[i].publish_time);
        console.log('id:'+list[i].id);
        list[i].publish_time = list[i].publish_time;
       // list[i].publish_time = a;
        list[i].id = list[i].id;
        list[i].publish = list[i].publish;
        list[i].headpic = list[i].avatar;
        // console.log(list[i])
        // console.log(list[i].time)
      }
      that.setData({
        list: list
      })
    }
  })
}

//下拉加载的请求
function getmoreRequest(url) {
  wx.request({
    url: url,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // success
      // console.log(res.data);
      listadd = res.data.data;
      data = res.data.data;
      // list.post(listadd)
      for (var i = 0; i < listadd.length; i++) {
       // var a = timeString(list[i].publish_time);
        console.log(list[i].id);
        list[i].publish_time = list[i].publish_time;
        //list[i].publish_time = a;
        list[i].id = list[i].id;
        list[i].publish = list[i].publish;
        list[i].headpic = list[i].avatar;
      }
      list = list.concat(listadd)
      // console.log(list)
      console.log(list.length)
      that.setData({
        list: list
      })
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}

//时间戳转换为时间
// function timeString(time) {
//   var newDate = new Date();
//   newDate.setTime(time);
//   // console.log(newDate.toLocaleDateString());
//   var result = newDate.toLocaleDateString();
//   return result;
// }