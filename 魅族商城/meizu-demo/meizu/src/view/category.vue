<template>
  <!--这个根节点是一定要有的-->
  <div>
    <v-header></v-header>
    <!--分类页的所有东西都会放在这个div里面-->
    <div class="category-wrapper">
    <!--导航,注意这里是面包屑导航-->
        <div class="bread">
          <span>首页</span>
          <!--arrow是箭头的意思-->
          <span class="arrow"> > </span>
          <span>全部</span>
          <span class="arrow"> > </span>
          <span class="last-bread">手机</span>
        </div>
        <filter-box :data="filterListData" @filter="getQuery"></filter-box>
        <sort-box @getKey="getSortKey" @getStock="getSortStock"></sort-box>
        <category-list :data="categoryListData" @clickItem="goToDetail"></category-list>
        <recommend-list :data="recommendListData"></recommend-list>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/javascript">
import vHeader from '@/components/header'
import vFooter from '@/components/footer'
import categoryList from '@/components/categoryList'
import filterBox from '@/components/filterBox'
import sortBox from '@/components/sortBox'
import recommendList from '@/components/recommendList'
import axios from 'axios'
export default {
  name: 'category',
  data () {
    return {
      // 先在这里创建一个字段
      categoryListData: [],
      filterListData: [],
      categoryListCopy: [],
      recommendListData: [],
      currentQuery: null,
      currentStock: null,
      currentKey: null
    }
  },
  // 一般都是在这个钩子去发起数据请求
  mounted () {
    this.getCategoryListData()
    this.getFilterListData()
    this.getRecommnedListData()
    // 如果执行了，说明这个组件重新加载了
    console.log('执行了')
  },
  methods: {
    async getCategoryListData () {
      const { data } = await axios('/api/categoryList')
      this.categoryListData = data
      this.categoryListCopy = [].concat(data)
    },
    async getFilterListData () {
      const { data } = await axios('/api/queryList')
      this.filterListData = data
    },
    async getRecommnedListData () {
      const { data } = await axios('/api/smartSale')
      this.recommendListData = data
    },
    // 每次筛选后都会存一个结果
    getQuery (val) {
      this.currentQuery = val
      this.sortGoods()
    },
    // 每次排序后，也会存一下结果
    getSortKey (key) {
      this.currentKey = key
      this.sortGoods()
    },
    // 点击显示有无货后也会存一下结果
    getSortStock (val) {
      this.currentStock = val
      this.sortGoods()
    },
    // 将条件在这里汇总
    sortGoods () {
      // console.log(val)
      // 注意：这里不能写成this.categoryListData = this.categoryListCopy，这样会产生引用关系
      this.categoryListData = [].concat(this.categoryListCopy)
      // 这一步是为了解决筛选和显示有无货的过滤操作修改数据后无法复原的问题

      // 筛选操作
      if (this.currentQuery) { //  当this.currentQuery存在的时候才去进行过滤
        // Object.keys(val)的执行结果是 [brand,size,memory]
        Object.keys(this.currentQuery).forEach((key) => {
          if (this.currentQuery[key]) { // 这里的item就是16部手机中的每一部手机的信息
            this.categoryListData = this.categoryListData.filter((item) => {
              return item.features.indexOf(this.currentQuery[key]) >= 0
            })
          }
        })
      }
      // 仅显示有无货
      if (this.currentStock) {
        this.categoryListData = this.categoryListData.filter((item) => {
          return item.available
          // 留下每一项中，available为true,刚好是布尔值，这里可以省略
        })
      }
      // 排序操作
      if (this.currentKey) {
        if (this.currentKey === 'recommend') {
          this.categoryListData.sort((a, b) => {
            console.log(a, b)
            // 参数a,b是categoryListData里面的每一项，这里推荐排序是根据shelveTime来的
            return b.shelveTime - a.shelveTime
          })
        } else if (this.currentKey === 'new') {
          this.categoryListData.sort((a, b) => {
            // 参数a,b是categoryListData里面的每一项，这里推新品序是根据publishedTime来的
            return b.publishedTime - a.publishedTime
          })
        } else if (this.currentKey === 'low') {
          this.categoryListData.sort((a, b) => {
            // 参数a,b是categoryListData里面的每一项，这里价格排序是根据goodsPrice来的
            return a.goodsPrice - b.goodsPrice
            // a-b  是从小到大，从低到高排序
          })
        } else if (this.currentKey === 'high') {
          this.categoryListData.sort((a, b) => {
            // 参数a,b是categoryListData里面的每一项，这里价格排序是根据goodsPrice来的
            return b.goodsPrice - a.goodsPrice
            // b-a 是从大到小，从高到低排序
          })
        }
      }
    },
    goToDetail (item) {
      // 拿到点击分类页中商品的数据后，根据商品的信息来跳转到详情页
      this.$router.push({
        name: 'Detail',
        // 这里是id是路由那边设置的动态参数id

        // 这里表示跳转到这个路由组件后，后面带的动态参数
        params: {
          // 这里是给详情页设置对应的动态路由，方便详情页那边获取这个参数进行数据筛选操作
          id: item.id
          // 这个左边的id 要和路由配置那边的保持一致   path: '/detail/:id'
        }
      })
    }
  },
  components: {
    vHeader,
    vFooter,
    categoryList,
    filterBox,
    sortBox,
    recommendList
  }
}
</script>

<style lang="less" scoped>
  .category-wrapper{
    width: 1240px;
    margin: 0 auto;
    padding-bottom: 60px;
  }
  .bread{
    height: 40px;
    line-height: 40px;
    .arrow, .last-bread{
      color: #999;
    }
  }
</style>
