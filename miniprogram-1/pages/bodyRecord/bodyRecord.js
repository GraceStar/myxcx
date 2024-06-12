Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function') {
        this.getTabBar((tabBar) => {
          tabBar.setData({
            show: true,
            selected: 0
          })
        })
      }
    }
  }
})