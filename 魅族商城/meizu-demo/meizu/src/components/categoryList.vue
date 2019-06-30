<template>
  <div>
    <!--里面用了浮动布局，外面就要来一个清除浮动-->
    <ul v-if="data.length > 0" class="clearfix">
      <li @click="clickItem(item)"  v-for="(item,index) in data" :key="index" class="goods-list" :class="{'last-child':(index+1) %4 === 0}">
        <a :href="item.href">
          <images-list :data="item.colorImageUrls"></images-list>
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
    <!--当没有数据时显示的东西-->
    <div v-else class="clearfix empty">
      <!--左边部分 LOGO -->
      <div class="fl empty-panda"></div>
      <!--右边部分-->
      <div class="fr empty-desc">
        <div class="title">抱歉没有找到相关商品</div>
        <p>
          建议您：<br>
          1.适当减少筛选条件 <br>
          2.尝试其他条件 <br>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import imagesList from '@/components/imagesList'
export default {
  data () {
    return {

    }
  },
  props: {
    data: {
      // 强调是数组类数据
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    clickItem (item) {
      // 触发一个自定事件，将每一步手机对应的信息带出去到父组件category中
      this.$emit('clickItem', item)
      console.log(this.data)
    }
  },
  components: {
    imagesList
  }
}
</script>

<style lang="less" scoped>
  .goods-list{
    /*排成一行显示*/
    /*border: 1px solid red;    理清结构*/
    float: left;
    width: 303px;
    height: 416px;
    background-color: #fff;
    /*鼠标悬浮上去有个手心的形状*/
    cursor: pointer;
    /*并且鼠标悬浮上去会出现一个阴影的动画*/
    transition: all .3s ease;
    position: relative;
    margin-top: 10px;
    margin-right: 9px;
    /*避免里面内容太大超出范围，这里设置一个溢出隐藏*/
    overflow: hidden;
    /*让里面的元素都居中对齐*/
    text-align: center;

    &:hover{
      box-shadow: 0 15px 30px rgba(0,0,0,.3);
    }
    &.last-child{
      margin-right: 0;
    }
  }
  .goods-img{
    /*这里只设置图片的高度，宽度不设置让其自动缩放，若宽高都设置死，会畸形*/
    height: 230px;
    margin-top: 30px;
  }
  .goods-name{
    color: #333;
    font-size: 14px;
    margin-bottom: 2px;
  }
  .goods-desc{
    color: #999;
    font-size: 12px;
  }
  .goods-price{
    font-size: 18px;
    color: #c00;
    padding-left: 14px;
    position: relative;
    display: inline-block;
    /*这一块的设置都是为了解决价格变动会引起该区域的排版混乱*/
    i{
      font-size: 14px;
      /*清除掉i标签自带的倾斜效果*/
      font-style: normal;
      position: absolute;
      left: 0;
      top: 5px;
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

  .empty{
    width: 335px;
    /*高度通过内容去撑开他*/
    /*这条语句的意思是       上外边距120px, 下外边距380px,  左右居中*/
    margin: 120px auto 380px;
    .empty-panda{
      background: url("../assets/images/xiongmao.png") no-repeat;
      width: 105px;
      height: 135px;
      margin-right: 30px;
    }
    .empty-desc{
      width: 200px;
      .title{
        font-size: 18px;
        color: #00c3f5;
        margin: 15px auto;
      }
    }
  }
</style>
