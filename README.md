### 微信小程序拍照加背景图片的功能

整体思路是悬浮在camera摄像拍照里面的图片用canvas去画一个背景

- 将图片画到一个画布上
```
ctx = wx.createCanvasContext('image-canvas')
ctx.drawImage('../../static/img.jpg',0,0,100,100)
ctx.draw()
```

- 进行拍照

```
const ctx = wx.createCameraContext();
ctx.takePhoto({
      quality: 'high',
      success: (res) => {},
      fail:err=>{}
})
```

- 将拍照出来的图，和之前的背景图进行合并(其实也是将两张图分别画在画布上)

```
ctxShow.drawImage(res.tempImagePath, 0, 0);//拍的照片，做底
ctxShow.drawImage('../../static/img.jpg', 0, 0,100,100);//需要加的背景
ctxShow.draw()
```

- 呈像

```
wx.canvasToTempFilePath({
    x: 0,
    y: 0,
    canvasId: 'show',
    success:res=>{},
    fail:err=>{}
})
```

- 保存至本地

```
wx.saveImageToPhotosAlbum({
    filePath: shareImg,
    success:res=>{},
    fail() {}
})
```