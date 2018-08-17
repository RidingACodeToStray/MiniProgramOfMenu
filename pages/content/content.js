var app = getApp()
Page({
    data: {
        title:null,
        arr_res: {},
        message: null,
        request_fail: false
    },
    onLoad: function(options) {
        this.setData({
          title: options.title
        })
        var that = this;
        // 动态设置标题栏
      // 动态设置标题栏
      wx.setNavigationBarTitle({
        title: options.title
      })

        //get请求
        wx.request({
            url: app.globalData.globalUrl,
            data: {
              menu: options.title,
            },
            success: function(res) {
                that.setData({
                    arr_res: res.data.result.data[0]
                });
            },
            fail: function(error) {
                that.setData({
                    request_fail: true
                })
            }
        })
    }
})
