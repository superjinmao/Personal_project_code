<template>
  <div :class="{'images-wrapper': type=== 'small', 'images-wrapper_big' : type === 'big'}">
      <transition name="img">
        <img class="img" :src="data[activeIndex]" alt="">
      </transition>
    <ul class="imgs">
      <li class="imgs-item" :class="{ 'active' : index === activeIndex }" v-for="(item,index) in data" @click="changeImage(index)" :key="index">
        <img :src="item" alt="">
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'images-list',
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
    },
    type: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    changeImage (index) {
      this.activeIndex = index
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  /*最外层的盒子并没有具体的宽高，主要是让里面的东西居中*/
  .images-wrapper{
    text-align: center;
    /*border: 1px solid red;     用于调试，理清结构*/
    .img{
      /*这里只给出高度，宽度不设置，让其自适应，让图片展示最好的比例*/
      height: 230px;
      margin-top: 20px;
    }
    .imgs{
      /*避免图片超出范围*/
      overflow: hidden;
      margin: 13px auto 15px;

      .imgs-item{
        width: 40px;
        height: 40px;
        /*float: left;   还可以设置内联块，排成一行*/
        display: inline-block;
        border-radius: 4px;
        /*每个小图之间相隔8px , 所以这里给每个小图左右4px*/
        margin: 0 4px;
        border: 1px solid #EFEFEF;
        cursor: pointer;

        /*当点击到某一个小图上面后，会有一个高亮色，即Border的颜色会改变 ，  需要一个动画*/

        &.active {
          border-color: #bdbdbd ;
        }
        img{
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  /*最外层的盒子并没有具体的宽高，主要是让里面的东西居中*/
  .images-wrapper_big{
    text-align: center;
    /*border: 1px solid red;     用于调试，理清结构*/
    .img{
      height:375px;
      margin: 20px auto;
    }
    .img-enter-active{
      opacity: 1;
      transition: all .3s;
    }
    .img-enter{
      opacity: 0;
    }
    .imgs{
      /*避免图片超出范围*/
      overflow: hidden;
      margin-top: 10px;

      .imgs-item{
        width: 75px;
        height: 75px;
        /*float: left;   还可以设置内联块，排成一行*/
        display: inline-block;
        border-radius: 4px;
        /*每个小图之间相隔8px , 所以这里给每个小图左右4px*/
        margin: 0 5px;
        border: 1px solid transparent;
        cursor: pointer;

        /*当点击到某一个小图上面后，会有一个高亮色，即Border的颜色会改变 ， & 这个符号指的就是 .imgs-item */

        &.active {
          border-color: #dcdcdc ;
        }
        img{
          width: 75px;
          height: 75px;
        }
      }
    }
  }
</style>
