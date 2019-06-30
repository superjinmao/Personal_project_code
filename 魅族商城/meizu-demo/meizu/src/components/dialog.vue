<template>
  <!--这个动画会在v-show的值改变的时候去触发它-->
  <transition name="dialog">
    <!--最外层灰色蒙版背景，弹窗出现的时候一起出现-->
    <div class="dialog-mask" v-show="show">
      <!--这个div是中间为了让弹窗居中的div包裹-->
      <div class="dialog-box">
        <!--真正弹窗，理解好为什么多出这连个div-->
        <div class="dialog-wrapper" :style="dialogBox">
          <!--弹窗分上中下-->
          <!--title有值的时候才显示这条下划线-->
          <div class="dialog-header" :class="{'dialog-title': title}">
            {{title}}
            <i class="icon-font icon-close dialog-close" @click="close" ></i>
          </div>
          <div class="dialog-content" :style="dialogContent">
            <slot></slot>
          </div>
          <div class="dialog-footer" v-if="confirmButtonShow || cancelButtonShow">
            <button v-show="confirmButtonShow" class="btn danger wd100 mr20" @click="confirm">{{confirmButtonText}}</button>
            <button v-show="cancelButtonShow" class="btn cancel wd100" @click="cancel">{{cancelButtonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
export default {
  name: 'vDialog',
  data () {
    return {

    }
  },
  props: {
    show: {
      // 类型是布尔值
      type: Boolean,
      // 默认false,也就是不显示，只有当条件触发，传值改变才去显示它
      default: false
    },
    // 以下配置均是为了让组件更加灵活
    height: {
      type: Number,
      default: 140
    },
    width: {
      type: Number,
      default: 760
    },
    title: {
      type: String,
      default: ''
    },
    confirmButtonShow: {
      type: Boolean,
      // 默认是显示这两个按钮的
      default: true
    },
    cancelButtonShow: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    }
  },
  // 为了让组件更灵活，高度和宽度都是通过props传递过来设置的，所以这里通过计算属性来设置
  computed: {
    dialogBox () {
      return {
        width: `${this.width}px`
      }
    },
    dialogContent () {
      return {
        height: `${this.height}px`
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:show', false)
      // 下面这种不行，原因是在使用组件时，传入的prop，被组件内部又做了一次修改，然后抛的异常
      // 因为传入的prop中的值是不允许改变的
      // 在vue2中，直接修改prop是被视作反模式的。由于在新的渲染机制中，每当父组件重新渲染时，子组件都会被覆盖，所以应该把props看做是不可变对象。
      // this.show = false
    },
    // 触发自定义事件，间接在父组件shopcart中进行操作,去修改传过来的show值
    confirm () {
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .dialog-mask{
    width: 100%;
    height: 100%;
    /*这里要固定定位*/
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(153,153,153,.6);
    display: table;
    /*  这里使用table布局，然后中间要居中的部分table-cell  */
    .dialog-box{
      display: table-cell;
      vertical-align: middle;
    }
    .dialog-wrapper{
      margin: 0 auto;
      background-color: #fff;
      text-align: center;
    }

    .dialog-header{
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 4px 4px 0 0 ;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      position: relative;
    }

    .dialog-title{
      border-bottom: 1px solid #efefef;
    }

    .dialog-close{
      position: absolute;
      right: 26px;
      top: 16px;
      color: #bdbdbd;
    }

    .dialog-footer{
      padding-bottom: 30px;
    }

    .mr20{
      margin-right: 20px;
    }

    .wd100{
      width: 100px;
    }
  }
  .dialog-enter-active{
    transition: opacity .4s;
  }
  .dialog-enter{
    opacity: 0;
  }
</style>
