// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: 'front',
    isFlash:"off",
    showCamera:true,
    modules: [{
      img: '../../static/mould1.png', //可以选择的模版
      showImg: '../../static/mould1.png', //在拍照的时候的图片
      isSelected: false
    }, {
      img: '../../static/mould2.png',
      showImg: '../../static/mould2.png',
      isSelected: false
    }, {
        img: '../../static/mould1.png',
        showImg: '../../static/mould1.png',
        isSelected: false
    }, {
        img: '../../static/mould1.png',
      showImg: '../../static/mould2.png',
      isSelected: false
    }, {
        img: '../../static/mould1.png',
      showImg: '../../static/mould1.png',
      isSelected: false
    }, {
        img: '../../static/mould1.png',
      showImg: '../../static/mould2.png',
      isSelected: false
    }, {
        img: '../../static/mould1.png',
        showImg: '../../static/mould1.png',
        isSelected: false
    }],
    filters:[{
        bgColor:"rgb(222,185,255)",
        opacity:0.2,
        isSelected:false
      }, {
        bgColor: "rgb(222,185,255)",
        opacity: 0.2,
        isSelected: false
      }, {
        bgColor: "rgb(222,185,255)",
        opacity: 0.2,
        isSelected: false
      }, {
        bgColor: "rgb(187,229,255)",
        opacity: 0.2,
        isSelected: false
      }, {
        bgColor: "rgb(187,229,255)",
        opacity: 0.2,
        isSelected: false
      }, {
        bgColor: "rgb(187,229,255)",
        opacity: 0.2,
        isSelected: false
      }, {
        bgColor: "rgb(187,229,255)",
        opacity: 0.2,
        isSelected: false
      }],
    isSelectFilter:false,//是否点击滤镜按钮
    hasSelectFilter:false,//是否已经选择的滤镜
    showCanvas:'',
    windowWidth:0,
    windowHeight:0,
    step:"1",
    chooseImg:"",//选择的模版
    selectFilter:"",//选择的滤镜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystem()
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
    this.data.showCanvas = wx.createCanvasContext("show");
  },
  changeDevice(){
    let data=""
    if(this.data.device=="front"){
      data="back"
    }else{
      data="front"
    }
    this.setData({
      device:data
    })
  },
  getSystem(){
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
  //选择模版
  selectModule(e) {
    this.data.modules.forEach(item => {
      item.isSelected = false;
    })
    let {
      index,
      item
    } = e.currentTarget.dataset
    this.data.chooseImg = item.showImg
    let isSelected = `modules[${index}].isSelected`;
    this.setData({
      [isSelected]: true,
      modules: this.data.modules,
      chooseImg: this.data.chooseImg
    })
    this.data.showCanvas.drawImage(this.data.chooseImg, 0, 0, this.data.windowWidth, this.data.windowWidth)
    this.data.showCanvas.draw()
  },
  showFilter(){
    this.setData({
      isSelectFilter: true,//是否点击滤镜按钮
    })
  },
  //选择滤镜
  chooseFilter(e){
    // this.data.showCanvas.setGlobalAlpha(1);
    this.data.filters.forEach(item => {
      item.isSelected = false;
    })
    let {index} = e.currentTarget.dataset;
    this.data.selectFilter=this.data.filters[index];
    let isSelected = `filters[${index}].isSelected`;
    this.setData({
      [isSelected]: true,
      filters: this.data.filters,
      selectFilter: this.data.selectFilter
    })
    if (this.data.chooseImg != '') {
      this.data.showCanvas.drawImage(this.data.chooseImg, 0, 0, this.data.windowWidth, this.data.windowWidth)
    }
    this.data.showCanvas.setGlobalAlpha(this.data.selectFilter.opacity);
    this.data.showCanvas.setFillStyle(this.data.selectFilter.bgColor);
    this.data.showCanvas.fillRect(0,0,this.data.windowWidth,this.data.windowHeight)
    this.data.showCanvas.draw()
  },
  // 关闭滤镜
  closeFilter(){
    this.data.filters.forEach(item => {
      item.isSelected = false;
    })
    this.setData({
      isSelectFilter:false,
      hasSelectFilter:false,
      selectFilter:"",
      filters: this.data.filters,
    })
    this.data.showCanvas = wx.createCanvasContext("show");
    this.data.showCanvas.setGlobalAlpha(1)
    if (this.data.chooseImg != "") {
      this.data.showCanvas.drawImage(this.data.chooseImg, 0, 0, this.data.windowWidth, this.data.windowWidth);
    }
    this.data.showCanvas.draw()
  },
  // 确定滤镜
  sureFilter(){
    this.setData({
      isSelectFilter:false,
      hasSelectFilter:true
    })
  },
  gotoChooseImg(){},
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