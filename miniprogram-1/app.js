// app.js
const defaultTime = {
  defaultWorkTime: 30,
  defaultRestTime: 5
}

App({
  onLaunch() {
    let workTime = wx.getStorageSync('workTime');
    let restTime = wx.getStorageSync('restTime');
    wx.setStorage({
      key: 'workTime',
      data: workTime? workTime: defaultTime.defaultWorkTime
    });
    wx.setStorage({
      key: 'restTime',
      data: restTime? restTime: defaultTime.defaultRestTime
    })
  },
  globalData: {
    userInfo: null
  }
})
