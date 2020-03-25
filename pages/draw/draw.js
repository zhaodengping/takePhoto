// pages/draw/draw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasPhoto:false,
    toolSelect:"color",
    selectColor:-1,
    colorList:["#f00",'#f2f2f2'],
    windowHeight:0,
    windowWidth:0,
    startX:0,
    startY:0,
    lineWidth:5,
    drawCanvas:"",
    isEaser:false,
    isRemove:false,
    chooseImg:'',
    btnText:"确定",
    saveTempImage:"",//最终涂鸦完的图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo()
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
  getSystemInfo(){
    let that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth:res.windowWidth,
          windowHeight:res.windowHeight
        })
      },
    })
  },
  changeTab(e){
    let flag=e.currentTarget.dataset.flag;
    let data=false;
    if(flag=='yes'){
      data=true;
    }
    this.setData({
      hasPhoto:data,
      toolSelect: "color",
      selectColor: -1,
      isEaser: false,
      isRemove: false,
      drawCanvas:"",
      chooseImg:""
    })
  },
  selectTool(e){
    let flag = e.currentTarget.dataset.flag;
    this.setData({
      isEaser:false,
      isRemove:false,
      toolSelect:flag
    })
    if (flag =='easer'){
      this.setData({
        isEaser:true
      })
    }
    if(flag=='remove'){
      this.setData({
        isRemove: true
      })
    }
  },
  chooseColor(e){
    this.setData({
      selectColor: e.currentTarget.dataset.index
    })
  },
  touchStart(e){
    if(this.data.selectColor!=-1){
      console.log(this.data.hasPhoto)
      if (this.data.hasPhoto) {
        this.data.drawCanvas = wx.createCanvasContext("showHasImage");
      } else {
        this.data.drawCanvas = wx.createCanvasContext("show");
      }
      this.data.drawCanvas.setLineWidth(this.data.lineWidth);
      this.data.drawCanvas.setStrokeStyle(this.data.colorList[this.data.selectColor])
      let { x, y } = e.changedTouches[0];
      this.data.startX = x;
      this.data.startY = y;
    }else{
      wx.showToast({
        title: '请先选择颜色',
        icon:"none"
      })
    }
    
  },
  touchMove(e){
    if (this.data.selectColor != -1) {
      let { x, y } = e.changedTouches[0];
      if (this.data.isEaser) {
        this.data.drawCanvas.clearRect(x, y, 20, 20)
      } else if (this.data.isRemove) {
        this.data.drawCanvas.clearRect(0, 0, this.data.windowWidth, this.data.windowWidth)
      } else {
        this.data.drawCanvas.moveTo(this.data.startX, this.data.startY);
        this.data.drawCanvas.lineTo(x, y);
        this.data.drawCanvas.setLineCap('round');
        this.data.drawCanvas.setLineJoin('round')
        this.data.startX = x;
        this.data.startY = y
        this.data.drawCanvas.stroke();
      }
      this.data.drawCanvas.draw(true)
    }else{
      wx.showToast({
        title: '请先选择颜色',
        icon: "none"
      })
    }
   
  },
  changeLine(e){
    let value = e.detail.value;
    this.setData({
      lineWidth: value,
    })
  },
  sure(){
    if(this.data.btnText=="确定"){
      if(this.data.hasPhoto){
        this.saveDraw("showHasImage");
      }else{
        this.saveDraw("show");
      }
      this.setData({
        btnText:'下载'
      })
    }else{
      this.downloadPhoto()
    }
  },
  saveDraw(canvasId){
    let that=this
    setTimeout(()=>{
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.data.windowWidth,
        height: that.data.windowWidth,
        destWidth: that.data.windowWidth,
        destHeight: that.data.windowWidth,
        canvasId: canvasId,
        success: function (e) {
          that.data.saveTempImage = e.tempFilePath;
          console.log(that.data.saveTempImage)
          that.together()
        }
      })
    },1000)
  },
  together(){
    let lastCanvas = wx.createCanvasContext("lastDownload");
    if(this.data.hasPhoto){
      lastCanvas.drawImage(this.data.chooseImg, 0, 0, this.data.windowWidth, this.data.windowWidth)
    }
    lastCanvas.drawImage(this.data.saveTempImage, 0, 0, this.data.windowWidth, this.data.windowWidth)
    lastCanvas.draw(this)
  },
  downloadPhoto(){
    let that = this;
    let temImage = ""
    setTimeout(()=>{
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.data.windowWidth,
        height: that.data.windowWidth,
        destWidth: that.data.windowWidth,
        destHeight: that.data.windowWidth,
        canvasId: "lastDownload",
        quality: 1,
        success: function (res) {
          temImage = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: temImage,
            success:function(res){
              console.log(res)
              that.setData({
                btnText:'确定'
              })
              wx.showToast({
                title: '保存成功'
              })
            },
            fail:function(err){
              console.log(err)
              that.setData({
                btnText: '确定'
              })
              wx.showToast({
                title: '保存失败'
              })
            }
          })
        }
      })
    },1000)
   
  },
  chooseImage(){
    let that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          chooseImg: res.tempFilePaths[0],
        })
      },
    })
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

  }
})