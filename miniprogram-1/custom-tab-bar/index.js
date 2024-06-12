Component({
  properties: {
    // 接受父组件的给的数据
    active: {
        type: "String",
        value: ""
    }
  },
  data: {
    show: false,
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/bodyRecord/bodyRecord",
      iconPath: "/image/icon_component.png",
      selectedIconPath: "/image/icon_component_HL.png",
      text: "身体"
    }, {
      pagePath: "/pages/exerciseRecord/exerciseRecord",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "运动",
    }, {
      pagePath: "/pages/mine/mine",
      iconPath: "/image/icon_user.png",
      selectedIconPath: "/image/icon_user_HL.png",
      text: "我的",
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log("switchTab"+url);
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    },
    run() {
      console.log("hahahaha" + this.data.active);  
      const url = this.data.list[this.data.active].pagePath;
      console.log("run url:"+url);
      wx.switchTab({url});  
      this.setData({
          // 通过this.data获取父组件里传过来的值
          show: true,
          selected:  this.data.active
      });
      console.log(this.data.selected);
    }
  }
})