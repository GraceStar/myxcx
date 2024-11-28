const initDeg = {
  left: 45,
  right: -45,
}

Page({
  data: {
    leftDeg: initDeg.left,
    rightDeg: initDeg.right,
  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: 'caifu',
    })
  },
  changeTaskName: function(e){
    console.log("changeTaskName: "+e);
  }
})
