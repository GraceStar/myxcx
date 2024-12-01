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
  onShow: function () {
    wx.setNavigationBarTitle({
      title: 'caifu',
    });
    if (this.data.isRuning) {
      return
    };
    let workTime = util.formatTime(wx.getStorageSync('workTime'), 'HH');
    let restTime = util.formatTime(wx.getStorageSync('restTime'), 'HH');
    this.setData({
      workTime: workTime,
      restTime: restTime,
      remainTimeText: workTime + ':00'
    });
  },
  changeTaskName: function (e) {
    console.log("changeTaskName: " + e.detail.value);
    this.taskName = e.detail.value
  },
  startTimer: function (e) {
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
    if (!isRuning) {
      this.timer = setInterval((function () {
        this.updateTimer();
      }).bind(this), 1000)
    } else {
      this.stopTimer();
    }
  },

  stopTimer: function () {
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    });
    this.timer && clearInterval(this.timer)
  },

  updateTimer: function () {
    let now = Date.now()
    let remainingTime = Math.round((log.endTime - now) / 1000)
    let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
    let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
    let S = util.formatTime(Math.floor(remainingTime) % 60, 'SS')
    let halfTime
    // update text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime == 0) {
      this.setData({
        completed: true
      })
      this.stopTimer()
      return
    }

    // update circle progress
    halfTime = log.keepTime / 2
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
      })
    } else {
      this.setData({
        leftDeg: -135
      })
      this.setData({
        rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
      })
    }
  },
})