<template>
  <!--全屏背景，很多时候外层都给盒子包裹，即使不用其来做背景-->
  <div>
    <!--上-->
    <div class="clearfix recommend-header">
      <h3 class="fl title">推荐商品</h3>
      <div class="fr">
        <i class="icon-font icon-left pagination-item" @click="prev" :class="{'disabled': activeIndex === 0}"></i>
        <i class="icon-font icon-right pagination-item" @click="next" :class="{'disabled': activeIndex === pageSize}"></i>
      </div>
    </div>
    <!--下  ,  下边列表样式和之前一样，直接拷贝之前的dom结构-->
    <div class="recommend-content">
      <!--里面用了浮动布局，外面就要来一个清除浮动-->
      <ul class="clearfix" :style="listWrapper">
        <li v-for="(item,index) in data" :key="index" class="goods-list" :class="{'last-child':(index+1) %4 === 0}">
          <a :href="item.href">
            <img :src="item.goodsUrl" alt="">
            <!--div用来装商品的介绍和价格-->
            <div class="goods-name">{{item.goodsName}}</div>
            <div class="goods-desc">{{item.goodsDesc}}</div>
            <div class="goods-price">
              <i>￥</i>
              {{item.goodsPrice}}
              <!--如果是true就显示这个   起     -->
              <span class="lower" v-if="item.lower">起</span>
              <!--如果有价格，就显示这个价格-->
              <span  class="goods-oldprice" v-if="item.oldPrice">{{item.oldPrice}}</span>
            </div>
          </a>
          <!--v-if="item.newProduct"-->
          <div class="goods-new" v-if="item.newProduct">新品</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      activeIndex: 0
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    // 宽度是通过计算得来的
    listWrapper () {
      return {
        width: `${(this.data.length) * 250}px`,
        transform: `translateX(-${this.activeIndex * 1240}px)`,
        transitionDuration: '.5s'
      }
    },
    //  然后计算当前页数大小
    pageSize () {
      return Math.floor(this.data.length / 5)
    }
  },
  methods: {
    prev () {
      // 点击上一页，activeIndex--  ，前提是activeIndex > 0
      if (this.activeIndex === 0) return
      this.activeIndex -= 1
    },
    next () {
      // 等于最大页数值得时候，直接return掉
      if (this.activeIndex === this.pageSize) return
      this.activeIndex += 1
    }
  }
}
</script>

<style lang="less" scoped>
  .recommend-header{
    margin: 30px auto 10px;

    .title{
      font-size: 30px;
      font-weight: 400;
    }

    .pagination-item{
      display: inline-block;
      width: 24px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      cursor: pointer;
      color: #00c3f5;
      font-size: 12px;
      border: 1px solid #00c3f5;

      &.disabled{
        color: #efefef;
        border-color: #dcdcdc;
      }

    }
  }
  /* 最外层用来做全屏背景*/
  .recommend-content{
    width: 1240px;
    background-color: white;
    /*  超出部分隐藏掉 ，因为切换是从左到右切换，有点像轮播图，图全部排成一行，内联*/
    overflow: hidden;

    .goods-list{
      /*排成一行显示*/
      /*border: 1px solid red;    理清结构*/
      float: left;
      width: 220px;
      margin: 0 15px;
      padding: 34px 0 15px;

      /* 设置图片的大小*/
      img{
        height: 180px;
        /*这里不设置宽度，是让图片根据高度自适应调整到最好的比例效果，若宽高写死，效果不佳*/

        /*鼠标悬浮上去的时候，图片会有一点放大的效果*/
        &:hover{
          transform: scale(1.2);
          transition: all .3s;
        }
      }
      background-color: #fff;
      /*鼠标悬浮上去有个手心的形状*/
      cursor: pointer;
      /*并且鼠标悬浮上去会出现一个阴影的动画*/
      transition: all .3s ease;
      position: relative;
      /*避免里面内容太大超出范围，这里设置一个溢出隐藏*/
      overflow: hidden;
      /*让里面的元素都居中对齐*/
      text-align: center;

      &.last-child{
        margin-right: 0;
      }
    }
    .goods-name{
      margin-top: 20px;
      color: #555757;
      font-size: 14px;
      margin-bottom: 2px;
    }
    .goods-desc{
      color: #999;
      font-size: 12px;
    }
    .goods-price{
      font-size: 16px;
      color: #c00;
      padding-left: 14px;
      position: relative;
      display: inline-block;
      margin-top: 8px;
      /*这一块的设置都是为了解决价格变动会引起该区域的排版混乱*/
      i{
        font-size: 12px;
        /*清除掉i标签自带的倾斜效果*/
        font-style: normal;
        position: absolute;
        left: 0;
        top: 2px;
      }
      .lower{
        font-size: 12px;
      }
      .goods-oldprice{
        /*旧价格添加删除线*/
        text-decoration: line-through;    // 这个设置就是中间有一条线
        color:#666;
        font-size: 14px;
        /*与新价格有个左边距*/
        margin-left: 8px;
      }
    }
    .goods-new{
      position: absolute;
      left: 30px;
      top: 30px;
      width: 60px;
      height: 60px;
      /*让文字居中*/
      line-height: 60px;
      text-align: center;
      border-radius: 60%;
      /*添加一个   渐进色    的背景色*/
      background: linear-gradient(120deg,#2e74f6,#56bdf9);
      color: #fff;
    }
  }
</style>
