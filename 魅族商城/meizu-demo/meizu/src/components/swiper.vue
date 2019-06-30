<template>
  <div class="swiper" :style="swiperSize">
    <!--将listWrapper添加到ul上去，因为这整个ul图片列表就是我们要移动的东西-->
    <ul :style="listWrapper" @transitionend="setDuration" class="swiper-ul">
      <li class="swiper-list" v-for="(item,index) in data" :key="index">
        <a :href="item.href">
          <!--图片上也要绑定这个swiperSize,规定好图片的大小和外层div一样-->
          <img :src="item.imgUrl" alt="" :style="swiperSize">
        </a>
      </li>
      <!--末尾的第一张-->
      <!--这里的key值这样去设置，与前面图片的key值保持不同就行-->
      <li class="swiper-list" :key="data.length + 1" v-if="data.length > 1">
        <!--这里就可以写死，第一张的链接,图片-->
        <a :href="data[0].href">
          <img :src="data[0].imgUrl" alt="" :style="swiperSize">
        </a>
      </li>
    </ul>
    <!--pagination中文意思是标记页数；页码，也就是下标的意思-->
    <ul class="swiper-pagination">
      <!--点击按钮触发一个修改activeIndex的事件，并把对应的下标值传过去-->
      <!--:class="{active: index===activeIndex}  这里面放的是一个布尔值表达式，active是一个具体的类名-->
      <li v-for="(item,index) in data" :key="index" @click="changePic(index)" :class="{'active': index===activeIndex}"></li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      // 添加一个字段来确认当前轮播图在那一张图片上面
      activeIndex: 0,
      timer: null,
      haveDuration: true
    }
  },
  components: {

  },
  // 这个方法需要我们手动去执行，也就是当组件挂载的时候执行（钩子函数）,每次挂载之后都要去执行一次它
  mounted () {
    this.setTimer()
  },
  methods: {
    //  给一个定时器方法，使其自动切换图片效果
    setTimer () {
      // 在做定时器之前先去清除
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        //  最后一张还可以再往下走一张(this.data.length - 1 )不需要去 - 1
        if (this.activeIndex === (this.data.length)) {
          // 虽然图片加了一张，但是数据是不变的，this.data.length还是和原来一样
          this.activeIndex = 0
          // 当走到末尾第一张时，清除过渡效果，让末尾第一张向第一张的转换瞬间完成
          this.haveDuration = false
        } else {
          this.activeIndex++
          this.haveDuration = true
        }
      }, this.delay)
    },
    changePic (i) {
      this.activeIndex = i
      this.haveDuration = true
    },
    setDuration () {
      if (this.activeIndex === this.data.length) {
        // 表示当图片是最后一张，即补上去的第一张的时候去执行,将activeIndex的值重置为0
        this.activeIndex = 0
        // 并且将过渡效果改成false，也就是末尾第一张向第一张的过渡要瞬间完成，让人感知不到
        this.haveDuration = false
      }
    }
  },
  props: {
    // 引用谁的数据，这里的data就是谁       :data="swiperData"
    data: {
      type: Array,
      default () {
        return []
      }
    },
    height: {
      type: Number,
      default: 500
    },
    width: {
      type: Number,
      default: 1240
    },
    delay: {
      type: Number,
      default: 5000
    }
  },
  // 需要通过一个计算属性，去动态的根据我们传进来的值去设置我们整个swiper的宽和高
  computed: {
    swiperSize () {
      // 返回一个对象，里面包含了宽、高
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    },
    listWrapper () {
      return {
        width: `${(this.data.length + 1) * this.width}px`,
        height: `${this.height}px`,
        transform: `translateX(-${this.activeIndex * this.width}px)`,
        // 切换的时候中间有一个缓冲的过程
        // 如果可以有过渡效果的过就设置成0.8s,如果没有就设置成'' , 让这整条样式不起作用   transitionDuration: ’‘ 这样就失效了
        transitionDuration: this.haveDuration ? '.8s' : ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .swiper{
    // 因为切换按钮会根据外层绝对定位，所以这里来个相对定位
    position: relative;
    // 如果图片超出区域会被隐藏，所以这里设置一个溢出隐藏
    overflow: hidden;

    .swiper-list{
      // 给它一个内联块，就可以全部平铺在一起,给所有的li设置一个行内block,这样他们就可以横向平铺在一起了
      // 内联模块之间会有几个像素的空隙，所有图片的总体长度超出了外面整一块的宽度 ，便会换行显示，会导致下一张图在下面
      display: inline-block;
    }
    .swiper-ul{
      // 这个样式，将ul里面的字体大小设置成0，即可清除空隙
      font-size: 0;
    }
    .swiper-pagination{
      position: absolute;
      left: 30%;
      bottom: 20px;

      li{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 5px;
        background-color: white;
        cursor: pointer;

        // 展示图片对应的切换按钮会有一个样式
        &.active{
          background-color: transparent;
          border: 1px solid #fff;
        }
      }
    }
  }
</style>
