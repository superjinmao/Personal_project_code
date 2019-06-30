import Vue from 'vue'
// 能修改state的只有mutation，通过在组件中去提交一个mutations触发这边名称对应的事件，将数据push到state（state.js）中
const mutations = {
  // 这里就是全家桶中的 mutations: {}
  ADD_SHOPCART (state, obj) { // 第一个参数直接就可以拿到state
    // 前面说过，我们每一个商品的一条数据就是一个对象，这里第二个参数就是传过来的对应商品的数据

    // 多个商品多条数据对象，传到state那边组成一个数据  shopcartData: []，这里直接用数组的方法添加数据过去

    let haveData = false
    state.shopcartData.forEach(item => {
      // 有这条数据
      if (item.id === obj.data.id) {
        haveData = true
        // 注意：这里obj.num是用户当前购买的手机数量
        item.count += obj.num
      }
    })
    // 如果购物车没有这个商品，没有这条数据
    if (!haveData) {
      // 第一次将商品添加到购物车时，添加一些字段
      Vue.set(obj.data, 'count', obj.num)
      Vue.set(obj.data, 'checked', true)
      // 设置完之后直接整条数据发过去，而且也将前面 {
      //         data: this.infoData,
      //         num: parseInt(this.purchaseQuantity)
      //       }
      // 这个对象，两个值给组合到了一起，一条数据发过去，取值也方便
      // 注意：obj.num是用户每次操作发过来的数量，比如第一次点购买值为1，第二次+到3，再点购买，此时值为3，而count购物车中商品的总数
      state.shopcartData.push(obj.data)
    }
    console.log(state.shopcartData)
  },
  // 在mutations中的方法，第一个参数都是可以拿到state状态
  INCREASE_SHOPCART (state, id) {
    state.shopcartData.forEach(item => {
      if (item.id === id) {
        item.count++
      }
    })
  },
  DECREASE_SHOPCART (state, id) {
    state.shopcartData.forEach(item => {
      // 最少留1件，数量值大于1的时候才可以减
      if (item.id === id && item.count > 1) {
        item.count--
      }
    })
  },
  CHECK_GOODS (state, id) { // 这边第一个参数可以拿到state,第二个参数就是组件提交Mutations传过来的值
    // 找到这一条数据
    state.shopcartData.forEach(item => {
      // 同样的，存在这个商品再操作
      if (item.id === id) {
        // 取反即可,如果是选中状态那么，点击一次就变成非选中状态
        item.checked = !item.checked
      }
    })
    console.log(id)
  },
  // 这里传入的话就不是id了，而是当前这个全选的状态，true or  false?
  CHECK_ALL_GOODS (state, checked) {
    state.shopcartData.forEach(item => {
      item.checked = !checked
    })
  },
  // 删除商品操作
  DELETE_SHOPCART (state, id) {
    // 在这里执行过滤操作，过滤掉点击删除的商品，根据id值
    state.shopcartData.forEach((item, index) => {
      // 将商品的索引值也一并遍历出来，索引值是辅助我们删除操作的
      if (item.id === id) {
        // 将当前循环中，符合删除条件的这个商品从购物车数据中移除，splice是一个变异方法
        state.shopcartData.splice(index, 1)
      }
    })
  },
  // 提交订单后清空原有的数据
  REMOVE_GOODS (state) {
    // 返回没有被选中的那些数据，也就是没有被提交到订单的那些数据，选中购买的商品item.checked为true
    state.shopcartData = state.shopcartData.filter(item => !item.checked)
  }
}
export default mutations
