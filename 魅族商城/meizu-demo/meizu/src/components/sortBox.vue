<template>
  <div class="clearfix sort-box">
    <!--左边部分可以通过点击进行排序-->
    <div class="fl sort-order">
      <a href="javascript:" @click="setSortKey('recommend')" :class="{'active': activeSortKey === 'recommend'}">推荐</a>
      <a href="javascript:" @click="setSortKey('new')" :class="{'active': activeSortKey === 'new'}">新品</a>
      <a href="javascript:" @click="changePrice" :class="{'active': activeSortKey === 'low' || activeSortKey === 'high'}">
        价格 <i class="icon-moon arrow" :class="sortArrow"></i>
      </a>
    </div>
    <!--右边部分是一个复选框来筛选出是否有货的商品-->
    <div class="fr">
      <input type="checkbox" v-model="haveStock">
      <span>仅显示有货商品</span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      activeSortKey: '',
      // 默认一开始价格是从低到高排序
      activePrice: 'low',
      haveStock: false
    }
  },
  computed: {
    sortArrow () {
      if (this.activePrice === 'low') {
        // 如果是从低到高排序，那么返回的箭头样式名就是icon-down
        return 'icon-down'
      } else {
        return 'icon-up'
      }
    }
  },
  watch: {
    haveStock (val) {
      console.log('haveStock值变化了,默认是true')
      this.$emit('getStock', val)
    }
  },
  methods: {
    // 点击按钮，修改这个字段，达到排序效果
    setSortKey (val) {
      this.activeSortKey = val
      this.$emit('getKey', this.activeSortKey)
    },
    changePrice () {
      // 当前排序是新品，关键字是new的时候，是按照新品排序，我们直接点击价格，那么我们的价格排序就是当前activePrice这个排序
      if (this.activeSortKey === this.activePrice) {
        this.activePrice = this.activePrice === 'low' ? 'high' : 'low'
      }
      this.setSortKey(this.activePrice)
    }
  },
  mounted () {
    // 这个排序组件一挂载的时候，就去执行这个方法，相当于默认点击了推荐
    this.setSortKey('recommend')
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .sort-box{
    margin: 30px auto 20px;
    color: #666;
    .sort-order{
      a{
        margin-right: 50px;
        // &.active  表示a标签上的 .active样式
        &:hover, &.active{
          color:#00c3f5;
          transition: all .2s;
        }
        /* 这里 & 就是a , 意思是当鼠标悬浮在a上的时候，这个类arrow才会有展示效果  */
        &:hover .arrow{
          display: inline;
        }
      }
      .arrow{
        display: none;
      }
    }
  }
</style>
