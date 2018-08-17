//list.js
var app = getApp()
Page({
    data: {
        arr_res: []
    },
    onLoad: function(options) {
        this.setData({
            arr_res: app.globalData.result,
        })
    }
})
