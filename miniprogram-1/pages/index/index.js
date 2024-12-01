const util = require('../../utils/util.js')
const initDeg = {
  left: 45,
  right: -45,
}
const defaultTaskName = {
  work: '工作',
  rest: '休息'
}

Page({
  data: {
    leftDeg: initDeg.left,
    rightDeg: initDeg.right,
    remainTimeText: '',
    timerType: 'work',
    completed: false,
    isRuning: false,
  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: 'caifu',
    });
    if(this.data.isRuning){return};
    let workTime = util.formatTime(wx.getStorageSync('workTime'),'HH');
    let restTime = util.formatTime(wx.getStorageSync('restTime'),'HH');
    this.setData({
      workTime: workTime,
      restTime: restTime,
      remainTimeText: workTime + ':00'
    });
  },
  changeTaskName: function(e){
    console.log("changeTaskName: " + e.detail.value);
    this.taskName = e.detail.value
  },
  startTimer: function(e){
    let timerType = e.target.dataset.type;
    console.log("startTimer: " + timerType);
    let taskName = this.taskName || defaultTaskName[timerType];
    let showTime = this.data[timerType + 'Time'];
    console.log("showTime: " + showTime);
    let isRuning = this.data.isRuning;
    this.setData({
      taskName: taskName,
      timerType: timerType,
      completed: false,
      isRuning: !isRuning,
      remainTimeText: showTime + ':00',
    });

  }
})
