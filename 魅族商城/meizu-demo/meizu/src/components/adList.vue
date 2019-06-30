<template>
  <!--最外层的盒子-->
  <div class="clearfix">
    <!--左边的一整块-->
    <div class="fl ad-left">
      <a :href="data[0] && data[0].href">
        <!--这里的数据不会通过循环遍历出来，会直接拿到数据的第一二三四条，所以以后不管传递多少条数据，该组件只会显示最开始的那四条-->
        <!--当第一条数据存在的时候，才会去把第一张图片的链接给它-->
        <img  class="ad-img" :src="data[0] && data[0].imgUrl" alt="">
      </a>
    </div>
    <!--右边一整块,分为上下-->
    <div class="fr">
      <!--上面-->
      <div class="ad-right-top">
        <a :href="data[1] && data[1].href">
          <img  class="ad-img" :src="data[1] && data[1].imgUrl" alt="">
        </a>
      </div>
      <!--下面，下面会再分左右,注意里面的元素浮动了，这里外层也要来一个清除浮动-->
      <div class="clearfix">
        <!--左边-->
        <div class="fl ad-right-bottom">
          <a :href="data[2] && data[2].href">
            <img class="ad-img" :src="data[2] && data[2].imgUrl" alt="">
          </a>
        </div>
        <!--右边-->
        <div class="fr">
          <a :href="data[3] && data[3].href">
            <img class="ad-img" :src="data[3] && data[3].imgUrl" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {

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
  components: {

  }
}
</script>

<style lang="less" scoped>
  /*.test{*/
    /*border: 1px solid red;    //这个类留着用来复习浮动带来的影响*/
  /*}*/
  .ad-left{
    width: 615px;
    height: 450px;
  }
  .ad-right-top{
    width: 616px;
    height: 220px;
    margin-bottom: 10px;
  }
  .ad-right-bottom{
    width: 303px;
    height: 220px;
  }
  /*这个广告图片这里是没有设置溢出隐藏的，也没有设置图片的宽高，所以如果图片的大小和我们设置的模块大小不一致的话就会超出来*/
  /*并且这里块就是这么大，设置溢出隐藏的话，如果图片太大只显示一角会更加难看，所以这里把图片的高度设置一下*/
  .ad-img{
    /*这里直接设置100%，就会根据它的父级填充满*/
    width: 100%;
    height: 100%;
  }
</style>
