var app = getApp()
Page({
    data: {
        input_value: null,
        loadingHidden: true,
        nullHidden: true,
        lodingInfo: "正在搜索",
    },
    bindSearchInput: function(e) {
        this.setData({
            input_value: e.detail.value
        })
    },
    tapSearch: function(event) {
        if (this.data.input_value == null || this.data.input_value.length == 0) {
            return;
        }
        var that = this;
        this.setData({
            loadingHidden: false,
            nullHidden: true,
            lodingInfo: "正在搜索"
        })
        wx.request({
            url: app.globalData.globalUrl,
            data: {
                menu: that.data.input_value,
            },
            success: function(res) {
              if (res.data.result == null) {
                    that.setData({
                        nullHidden: false,
                    })
                } else {
                app.globalData.result = res.data.result.data
                    wx.navigateTo({
                        url: "../../pages/result/result"
                    });
                }
            },
            fail: function(error) {
                that.setData({
                    lodingInfo: "搜索失败，请检查您的网络",
                    request_fail: true,
                });
            },
            complete: function() {
                that.setData({
                    loadingHidden: true
                })
            }
        })
    },
    onHide: function() {
        this.setData({
            loadingHidden: true
        })
    }
})
