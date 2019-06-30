<template>
  <!--一定要有一个根节点-->
  <div class="header">
    <!--外层包裹-->
    <div class="header-wraper clearfix">
      <!--左边logo-->
      <div class="header-logo fl"></div>
      <!--下面是右边的部分-->
      <div class="header-cart fr">
        <span class="icon-moon icon-cart"></span>
      </div>
      <div class="header-user fr">
        <span class="icon-moon icon-user"></span>
      </div>
      <div class="header-search fr">
        <input type="text" class="search-input" placeholder="购物车">
        <span class="search-icon  icon-moon icon-search "></span>
      </div>
      <ul class="header-nav fr">
        <li v-for="(item,index) in navData" :key="index" @mouseenter="showChildren(item)">
          <a class="nav-item" href="javascript:" @click="goToCategory">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <transition name="nav">
      <div class="nav-children" v-show="childrenShow" @mouseleave="hideChildren">
        <div class="children-wraper">
          <transition-group tag="ul" @enter="enter">
            <li class="children-item" v-for="(item,index) in childrenData" :key="item.pic" :data-index="index">
              <!--下面的img动态绑定了src，它的父级li的数据Item也是渲染出来的，所以对应的Li就有对应的图片，这就是Vue的强大之处-->
              <img :src="item.pic" alt="">
              <p>{{item.name}}</p>
              <p>{{item.price}}</p>
            </li>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import Velocity from 'velocity-animate'
export default {
  data () {
    return {
      // 从mockserver获取的数据放在这里
      navData: [],
      // 当鼠标悬浮在导航上的时候，所展示的内容数据放在这里
      childrenData: [],
      childrenShow: false
    }
  },
  // getNavData这个方法是不会去自动执行的，要在组件一挂载的时候就去执行
  mounted () {
    this.getNavData()
  },
  methods: {
    // 获取数据的方法
    async getNavData () {
      // 用node异步读取文件信息的async去想就好，这个函数被调用一次就执行一个await，然后它里面帮我们做好了一些工作，直接获取到相应的数据
      // 然后放在data中
      const { data } = await axios.get('/api/nav')
      // 将拿到的数据丢尽data中定义的navData数组中去
      this.navData = data
      // 这样就成功从跨域从mockserver拿到我们要的数据
      console.log(data)
    },
    showChildren (item) {
      this.childrenData = item.children
      this.childrenShow = true
    },
    hideChildren () {
      // 鼠标移开当前伸展图时，将值设置为false,隐藏掉
      this.childrenShow = false
      // 每次鼠标移出之后，清空一次值，下次再移入的时候就会再去赋一次值，检测到值为空就会再走一次enter,因为子项变化了
      this.childrenData = []
    },
    // el参数表示我们循环列表中的每一个子项，即ul下面的每一个li
    enter (el) {
      // 这里面可以看成是一个循环，第一个li下标Index为0，所以直接发生动画
      const timeOut = el.dataset.index * 150
      setTimeout(function () {
        Velocity(el, {
          // 表示透明度从0 - 1
          'opacity': 1,
          // 表示从初始的位置到-50Px,即向左走50px
          'translateX': '-50px'
        })
      }, timeOut)
    },
    goToCategory () {
      this.$router.push({
        name: 'Category'
      })
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .header{
    width: 100%;
    background-color: white;
    position: relative;
    .header-wraper{
      width: 1240px;
      margin: 0 auto;
      .header-logo{
        width: 140px;
        height: 26px;
        margin: 28px 0;
        background: url("../assets/images/logo.png")  no-repeat center;
      }
      .header-cart,.header-user{
        padding: 29px 10px 0 20px;
        font-size: 24px;
        // cursor: pointer;这个设置的效果是，鼠标移动上去后会有变成手指
        cursor: pointer;
        //之前的line-height设置为为1.5，所以这里要在父级将line-height设置为1
        line-height: 1;
      }
      .header-search{
        width: 172px;
        height: 32px;
        border: 1px solid #ddd;
        border-radius: 2px;
        position: relative;
        margin: 25px  0;
        font-size: 12px;
        .search-input{
          width: 127px;
          height: 20px;
          border: 0;
          outline: none;
          position: absolute;
          left: 5px;
          top: 6px;
        }
        .search-icon{
          font-size: 16px;
          position: absolute;
          right: 10px;
          top: 8px;
        }
      }
      .header-nav{
        li{
          display: inline-block;
        }
        a.nav-item{
          display: inline-block;
          padding: 33px  20px;
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          transition: color .1s ease;
          &:hover{
            color: #31a5e7;
          }
        }
      }
    }
    .nav-children{
      width: 100%;
      height: 156px;
      background-color: white;
      position: absolute;
      left: 0;
      top: 82px;
      border-bottom: 1px solid #e9e9e9;
      z-index: 1;
      .children-wraper{
        width: 1240px;
        padding-left: 150px;
        margin: 0 auto;
      }
      .children-item{
        opacity: 0;
        width: 136px;
        height: 145px;
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
      img{
        width: 100px;
        height: 100px;
      }
    }
    .nav-enter-active{
      // 这里写进入后的状态和动画效果
      height: 156px;
      transition: height .5s ease-in-out;
    }
    .nav-enter{
      // 动画刚进入的时候，height是0
      height: 0;
    }
  }
</style>
