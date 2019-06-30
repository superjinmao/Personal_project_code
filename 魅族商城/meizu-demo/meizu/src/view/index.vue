<template>
  <div>
    <!--头部-->
    <v-header></v-header>
    <!--轮播图区域-->
    <div class="swiper-wrapper">
      <swiper :data="swiperData"></swiper>
      <ul class="menus">
        <!--但凡涉及循环，都要有key-->
        <li v-for="(item,index) in menuData" :key="index">
          <a :href="item.href">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <!--广告图区域-->
    <ul class="post-wrapper clearfix" >
      <li v-for="(item,index) in postData" :key="index">
        <a :href="item.href">
          <img :src="item.imgUrl" alt="">
        </a>
      </li>
    </ul>
    <!--展示区的三个部分-->
    <div class="index-container">
      <div class="sale">
        <h3 class="title">热卖商品</h3>
        <goods-list :data="hotSaleData"></goods-list>
      </div>
      <div class="sale">
        <h3 class="title">手机</h3>
        <!--广告商品组件-->
        <ad-list :data="phoneAdData"></ad-list>
        <!--商品列表组件 -------------------像上面那样直接将组件引用，改变传过去的据就行了-->
        <goods-list :data="phoneSaleData"></goods-list>
      </div>
      <div class="sale">
        <h3 class="title">智能配件</h3>
        <ad-list :data="smartAdData"></ad-list>
        <!--像上面那样直接将组件引用，改变传过去的据就行了-->
        <goods-list :data="smartSaleData"></goods-list>
      </div>
    </div>
    <!--底部-->
    <v-footer></v-footer>
  </div>
</template>

<script type="text/javascript">
import vHeader from '@/components/header'
import swiper from '@/components/swiper'
import goodsList from '@/components/goodsList'
import adList from '@/components/adList'
import vFooter from '@/components/footer'
import axios from 'axios'
export default {
  data () {
    return {
      // 请求回来的数据会赋值给它
      swiperData: [],
      menuData: [],
      postData: [],
      hotSaleData: [],
      phoneSaleData: [],
      smartSaleData: [],
      phoneAdData: [],
      smartAdData: []
    }
  },
  // 单单这样还是无法获取到数据，我们还必须去执行这个获取数据的方法，组件一挂载上就去执行
  mounted () {
    this.getSwiperData()
    this.getMenuData()
    this.getPostData()
    this.getHotSaleData()
    this.getphoneSaleData()
    this.getsmartSaleData()
    this.getPhoneAdData()
    this.getSmartAdData()
  },
  methods: {
    // 添加获取轮播图的数据
    async getSwiperData () {
      const { data } = await axios.get('/api/advertise')
      // 紧接着将我们请求到的数据赋值给swiperData,然后传递给子组件，通过父向子传值的方式
      this.swiperData = data
      //  console.log(data)  在这里就取到数据了，子组件那边也顺利拿到了数据
    },
    // 获取导航菜单的数据
    async getMenuData () {
      const { data } = await axios.get('/api/menu')
      this.menuData = data
    },
    // 获取广告图轮播的数据
    async getPostData () {
      const { data } = await axios.get('/api/post')
      this.postData = data
    },
    // 获取热卖商品的数据
    async getHotSaleData () {
      const { data } = await axios.get('/api/hotSale')
      this.hotSaleData = data
    },
    // 获取手机的数据
    async getphoneSaleData () {
      const { data } = await axios.get('/api/phoneSale')
      this.phoneSaleData = data
    },
    // 获取智能配件的数据
    async getsmartSaleData () {
      const { data } = await axios.get('/api/smartSale')
      this.smartSaleData = data
    },
    // 获取手机广告商品的数据
    async getPhoneAdData () {
      const { data } = await axios.get('/api/phoneRecommend')
      this.phoneAdData = data
    },
    // 获取智能配件广告商品的数据
    async getSmartAdData () {
      const { data } = await axios.get('/api/smartRecommend')
      this.smartAdData = data
    }
  },
  components: {
    vHeader,
    swiper,
    goodsList,
    adList,
    vFooter
  }
}
</script>

<style lang="less" scoped>
  .swiper-wrapper{
    width: 1240px;
    height: 500px;
    position: relative;
    margin: 0 auto;
    .menus{
      position: absolute;
      left: 0;
      top: 0;
      width: 303px;
      background-color: rgba(0,0,0,.5);
      padding-top: 17px;
      li{
        height: 57px;
        line-height: 57px;
        // 这样去理解，没有transition,单纯设置hover来实现鼠标一上去字体变色，变化是一瞬间完成的，而在前面加上transition则可以有缓慢的动画效果
        transition: background-color .4s;
        &:hover{
          background-color: #31a5e7;
        }
      }
      a{
        color: #fff;
        font-size: 16px;
        padding-left: 40px;
      }
    }
  }
  .post-wrapper {
    width: 1240px;
    /*   注意了这里，上面10px,左右居中，下面50px  */
    margin: 10px auto 50px;
    li {
      /* 这里采用浮动布局，那么在li的父级也就是ul那里要加上一个清除浮动  */
      float: left;
      width: 303px;
      height: 180px;
      margin-right: 9px;
      a {
        transition: opacity .3s ease-in-out;  // ease-in-out 第三个位置是变化的曲线
        /* 注意了这条语句 &:hover   在a下面  ，所以这个& 指向a,  因此这条语句相当于  a:hover  */
        &:hover{
          /* 透明度这里用  .85，   以后涉及小数或者百分比的，用 . */
          opacity: .65;
        }
      }
      /* 同理，这一条语句，在li下面，所以这个 & 指向li , 因此是 li:last-child  表示选中所有li中的最后一个，右边距为0 */
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .index-container{
    width: 1240px;
    margin: 0 auto;
    .title{
      font-size: 30px;
      font-weight: 400;
      margin-bottom: 10px;
    }
    .sale{
      margin-bottom: 50px;
    }
  }
</style>
