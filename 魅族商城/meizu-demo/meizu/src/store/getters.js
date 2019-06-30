const getter = {
  // 这几个都是挂载在index.js上，也就是store下面，所以参数可以直接拿到

  // 实时根据当前各项的选中状态来计算全选的状态为 true or false
  isAllChecked (state) {
    // 先默认是全选的，然后再去遍历购物车数据shopcartData,看看是否全部checed字段都为true,然后再决定是否修改这个值checked
    let checked = true
    state.shopcartData.forEach(item => {
      // 如果遍历出来其中有一条数据不被选中，那么我们便将状态值改变为false
      if (!item.checked) { // 所遍历出来的每一条数据，为false，条件里取反然后执行
        checked = false
      }
    })
    return checked
  },
  // 购物车商品总数
  shopcartTotal (state) {
    // 先定义一个总数，初始值为0
    let total = 0
    state.shopcartData.forEach(item => {
      // 注意forEach循环，数组有多少个元素，内部就走多少次
      total += item.count
    })
    // 记得return出来，外部才能拿到
    return total
  },
  // 购物车中选中的商品总数
  checkedGoodsTotal (state) {
    // 先定义一个总数，初始值为0
    let total = 0
    state.shopcartData.forEach(item => {
      // 注意forEach循环，数组有多少个元素，内部就走多少次
      if (item.checked) { // 当我们的商品已经被选中时，才加入计算
        total += item.count
      }
    })
    // 记得return出来，外部才能拿到
    return total
  },
  // 已选中商品的总价
  checkGoodsPrice (state) {
    let total = 0
    state.shopcartData.forEach(item => {
      // 注意forEach循环，数组有多少个元素，内部就走多少次
      if (item.checked) { // 当我们的商品已经被选中时，才加入计算
        total += (item.count * item.goodsPrice)
      }
    })
    return total
  }
}

export default getter
