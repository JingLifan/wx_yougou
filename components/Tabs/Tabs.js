// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 这是子组件接收父组件传递过来参数的方法
    tabs:{
      type:Array,
      value:[]
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   * 子组件向父组件传参的方法：
   * 1.先在子组件上定义方法并获得要传递的参数，通过this.triggerEvent("自定义事件名",{参数});传给父组件
   * 2.父组件监听绑定此方法bindhandleItemChange="handleItemChange";
   * 3.然后在父组件中定义handleItemChange方法写逻辑
   */
  methods: {
    getItemIndex(e){
      const index = e.currentTarget.dataset.index;
      this.triggerEvent("handleItemChange",{index});
    }
  }
})
