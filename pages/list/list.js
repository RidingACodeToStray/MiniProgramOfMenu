//list.js
var app = getApp()
var number = 1
var isLoading = false
Page({
    data: {
        arr_res: [],
        titleName:'',
        windowHeight: "500px",
        loadingHidden: true,
        lodingInfo: "加载更多",
        url:"../../pages/content/content"
    },
    onLoad: function(options) {
        //使number重置为1
        number = 0;
        var that = this;
      that.data.titleName = options.listName;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    windowHeight: res.windowHeight + "px"
                })
            },
            fail: function(e) {
                console.log("获取设备信息失败" + e);
            }
        });

        // 动态设置标题栏
        wx.setNavigationBarTitle({
          title: options.listName
        })
        wx.request({
            url: app.globalData.globalUrl,
            data: {
                menu: options.listName,
                pn: 0,
                rn:20
            },
            success: function(res) {
                that.setData({
                    arr_res: res.data.result.data
                });
            },
            fail: function(error) {
                that.setData({
                    request_fail: true,
                });
            }
        })
    },
    //滑到底部监听事件
    lower: function(e) {
        var that = this;
        if (number < 10 && !isLoading) {
            isLoading = true;
            that.setData({
                loadingHidden: false
            })
            wx.request({
                url: app.globalData.globalUrl,
                data: {
                  menu: this.data.titleName,
                  pn: ++number * 20,
                  rn: 20
                },
                success: function(res) {
                  const data = res.data.result.data;
                  if(data.length === 0){
                    that.setData({
                      lodingInfo:"已全部加载完",
                      loadingHidden:false
                    })
                  }
                  else{
                    that.setData({
                      arr_res: that.data.arr_res.concat(data),
                      lodingInfo: "加载更多",
                      loadingHidden:false
                    });
                  }
                },
                fail: function(error) {
                    number--;
                    that.setData({
                        lodingInfo: "加载失败",
                    })
                },
                complete: function() {
                    isLoading = false;
                    that.setData({
                        loadingHidden: true,
                    })
                }
            })
        }
    },

    //点击事件监听
    // tapItem: function(event) {
    //     app.globalData.contentId = event.target.id;
    //     console.log(app.globalData.contentId);
    //     for (var i = 0; i < this.data.arr_res.length; i++) {
    //         if (this.data.arr_res[i].id == event.target.id) {
    //             app.globalData.contentName = this.data.arr_res[i].name;
    //             break;
    //         }
    //     }
    //     console.log(app.globalData.contentName);
    //     // wx.navigateTo({
    //     //     url: "../../pages/content/content"
    //     // });
    // }
})
