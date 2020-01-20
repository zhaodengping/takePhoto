//index.js
//获取应用实例
let ctx = ''
let ctxShow = ''

Page({
  data: {
    src: "",
  },
  onLoad() {
    
  },
  onReady() {
    ctx = wx.createCanvasContext('image-canvas')
    ctx.drawImage('../../static/img.jpg',0,0,100,100)
    ctx.draw()
    ctxShow = wx.createCanvasContext('show')
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        ctxShow.drawImage(res.tempImagePath, 0, 0);
        ctxShow.drawImage('../../static/img.jpg', 0, 0,100,100)
        ctxShow.draw()
        let that=this;
        setTimeout(() => {
           wx.canvasToTempFilePath({
             x: 0,
             y: 0,
             canvasId: 'show',
             success: function (res) {
               let shareImg = res.tempFilePath;
               console.log(shareImg)
               that.setData({
                 src:shareImg
               })
               wx.saveImageToPhotosAlbum({
                filePath: shareImg,
                success:res=>{
                  wx.showToast({
                    title: '保存成功'
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
               })
             },
             fail: function (res) {
             }
           })
         }, 500)
      }
    })
  },
})