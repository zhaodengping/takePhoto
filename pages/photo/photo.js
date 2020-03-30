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
      isSelected: true
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
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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