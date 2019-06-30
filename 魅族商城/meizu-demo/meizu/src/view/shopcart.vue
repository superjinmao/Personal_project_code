<template>
  <div>
    <m-header></m-header>
    <!--这里开始是购物车的部分-->
    <!--存在数据的时候我才给你显示-->
    <div class="shopcart-wrapper" v-if="shopcartData.length > 0">
      <!--购物车的头部-->
      <table class="shopcart-header">
        <tr>
          <td class="cart-select">
            <input type="checkbox" class="cart-checkbox" :checked="isAllChecked" @click="checkAllGoods(isAllChecked)">
            <span>全选</span>
          </td>
          <td class="cart-name">
            商品
          </td>
          <td class="cart-price">
            单价(元)
          </td>
          <td class="cart-num">
            数量
          </td>
          <td class="cart-total">
            小计(元)
          </td>
          <td class="cart-operate">
            操作
          </td>
        </tr>
      </table>
      <!--购物车的中间部分, 同样也是采用表格，不过用了v-for，通过商品数量的多少来渲染对应的行数-->
      <div class="shopcart-list">
        <table>
          <!--这里item就是购物车里面的每一条数据，每一个商品的数据-->
          <tr v-for="(item,index) in shopcartData" :key="index" class="cart-product">
            <!--图片-->
            <td class="cart-select">
              <input type="checkbox" :checked="item.checked" class="cart-checkbox" @click="checkGoods(item.id)">
              <img class="cart-img"  :src="item.imageUrl" alt="">
            </td>
            <!--名字和简介-->
            <td class="cart-name">
              <span class="cart-title">{{ item.goodsName }}</span>
              <span class="cart-desc">{{ item.goodsDesc }}</span>
            </td>
            <!--单价-->
            <td class="cart-price">￥{{ item.goodsPrice }}</td>
            <!--数量-->
            <td class="cart-num">
              <div class="cart-input clearfix">
                <button class="fl" @click="decrease(item.id)">-</button>
                <!--里面的count就是我们之前在mutations.js中添加的字段,第一次添加都会加上去的属性-->
                <input class="fl" type="number" v-model="item.count">
                <button class="fl" @click="increase(item.id)">+</button>
              </div>
            </td>
            <!--小计，数量和单价的合计金额-->
            <td class="cart-total">￥{{ item.count * item.goodsPrice }}</td>
            <!--操作-->
            <td class="cart-operate">
              <i class="icon-font icon-close" @click="deleteShopcart(item.id)"></i>
            </td>
          </tr>
        </table>
        <!--购物车的底部区域，主要分为左右两个部分-->
        <div class="clearfix shopcart-footer">
          <!--左边-->
          <div class="fl">
            <input type="checkbox" class="cart-checkbox" :checked="isAllChecked" @click="checkAllGoods(isAllChecked)">
            <span>全选</span>
            <span class="footer-remove">删除选中的商品</span>
            <span>共<span class="footer-num gray">{{shopcartTotal}}</span>件商品,已选<span class="footer-num blue">{{checkedGoodsTotal}}</span>件商品</span>
          </div>
          <!--右边-->
          <div class="fr">
            <span>已优惠<span class="footer-num red">0.00</span>元, 合计(不含运费):<span class="footer-num red footer-total">￥{{checkGoodsPrice}}</span></span>
            <a href="javascript:" class="btn success" :class="{'cancel':checkedGoodsTotal <= 0 }" @click="goToOrder">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <!--购物车中没有商品的时候显示的页面-->
    <div v-else class="shopcart-empty">
      <div class="empty-content">
        <!--左边的购物篮-->
        <div class="empty-left"></div>
        <!--右边部分提示信息-->
        <div class="empty-right">
          <p class="empty-desc">购物车内还没有商品，赶紧去选购吧~</p>
          <a href="javascript:" class="btn success" @click="goToIndex">返回商城首页</a>
        </div>
      </div>
    </div>
    <m-footer></m-footer>
    <!-- 将这个在购物车中定义的show字段传递到弹窗组件中去-->
    <!--组件传值，不加冒号可以传定值，如字符串-->
    <v-dialog :show.sync="dialogShow" title="提示" :width="500" @confirm="confirmDelete" @cancel="cancelDelete">
      <div style="height: 120px;line-height: 120px">你确定删除该商品吗?</div>
    </v-dialog>
    <!-- :show.sync="dialogShow"  会被扩展成 :show='dialogShow'    @update:show = 'val=> bar = val '-->
    <!--   bar 是原数据，被从自组件内部的自定义事件修改了-->
  </div>
</template>

<script type="text/javascript">
import mHeader from '@/components/header'
import mFooter from '@/components/footer'
import vDialog from '@/components/dialog'
import {mapMutations, mapGetters} from 'vuex'
export default {
  data () {
    return {
      // 添加一个字段控制购物车这里弹窗的显示，默认是false
      dialogShow: false,
      currentId: null
    }
  },
  computed: {
    shopcartData () {
      return this.$store.state.shopcartData
    },
    // 这样在页面中就可以直接去拿到store那边getters的这个计算属性，直接使用即可，绑定在当前这个全选的复选框中
    // getters就是方便我们取到状态管理中的计算属性的，getters里面的计算属性会根据数据实时变化去重新计算
    ...mapGetters([
      'isAllChecked',
      'shopcartTotal',
      'checkedGoodsTotal',
      'checkGoodsPrice'
    ])
  },
  methods: {
    goToIndex () {
      this.$router.push({
        name: 'Index'
      })
    },
    increase (id) {
      this.INCREASE_SHOPCART(id)
    },
    decrease (id) {
      this.DECREASE_SHOPCART(id)
    },
    checkGoods (id) {
      this.CHECK_GOODS(id)
    },
    checkAllGoods () {
      this.CHECK_ALL_GOODS(this.isAllChecked)
    },
    deleteShopcart (id) {
      // 提交一个mutations,并把删除的标识符传递过去
      this.dialogShow = true
      this.currentId = id
      // this.DELETE_SHOPCART(id)
    },
    // 在这个方法里面真正执行删除的操作
    confirmDelete () {
      // 这里没有收到这个id,只能定义一个字段，在上一个方法去设置，然后在这里获取
      this.DELETE_SHOPCART(this.currentId)
      // 确认删除后，将弹窗隐藏
      this.dialogShow = false
    },
    cancelDelete () {
      this.dialogShow = false
    },
    // 结算
    goToOrder () {
      this.$router.push({
        name: 'Order'
      })
    },
    ...mapMutations([
      'INCREASE_SHOPCART',
      'DECREASE_SHOPCART',
      'CHECK_GOODS',
      'CHECK_ALL_GOODS',
      'DELETE_SHOPCART'
    ])
  },
  components: {
    mHeader,
    mFooter,
    vDialog
  }
}
</script>

<style lang="less" scoped>
  .shopcart-wrapper{
    width: 1240px;
    margin: 10px auto;
    .shopcart-header{
      height: 50px;
      background-color: white;
      border-bottom: 1px solid #efefef;
      color: #333;
    }

    .cart-select{
      padding-left: 45px;
      text-align: left;
      width: 220px;

      .cart-img{
        width: 100px;
        height: 100px;
        margin-left: 35px;
        /*水平居中对齐*/
        vertical-align: middle;
      }
    }

    .cart-checkbox{
      width: 18px;
      height: 18px;
      border: 1px solid #bdbdbd;
      display: inline-block;
      background-color: #fff;
      border-radius: 2px;
      font-size: 10px;
      /*水平居中对齐，横向对其，在同一水平线 ,  与text-align:center;对应*/
      vertical-align: middle;
    }

    .cart-name{
      width: 270px;
      text-align: left;

      .cart-title{
        display: inline-block;
        width: 100%;
        /*溢出部分隐藏，因为不同商品名称的长度可能不同*/
        overflow: hidden;
        /*如果长度过长要换行的时候就不让其换行，超出之后不再显示，避免标题过长把一整行给盖住*/
        /*white-space:nowrap会导致文本不换行，经常和overflow,text-overflow一起使用,禁止文字自动换行*/
        white-space: nowrap;
        /* 超出隐藏的部分，换成几个...的形状*/
        text-overflow: ellipsis;
      }

      .cart-desc{
        color: #999;
      }
    }

    .cart-price{
      width: 220px;
      text-align: center;
    }

    .cart-num{
      width: 200px;
      text-align: center;
    }

    .cart-total{
      width: 160px;
      text-align: center;
    }

    .cart-operate{
      width: 170px;
      padding-right: 40px;
      text-align: right;
    }

    .shopcart-list{
      background-color: #fff;
      margin-bottom: 10px;
    }

    .cart-product{
      height: 150px;
      border-top: 1px solid #efefef;

      &:last-child{
        border-bottom: 1px solid #efefef;
      }
    }
    .cart-input{
      width: 140px;
      height: 38px;
      border: 1px solid #efefef;
      border-radius: 4px;
      margin: 0 auto;

      button{
        width: 38px;
        height: 38px;
        text-align: center;
        background: transparent;
        border: none;
        /*字体20px, 这样减号和加号才足够大*/
        font-size: 20px;
        cursor: pointer;
      }

      input{
        width: 58px;
        height: 36px;
        border: none;
        border-left: 1px solid #efefef;
        border-right: 1px solid #efefef;
        text-align: center;
      }
    }
    .shopcart-footer{
      height: 70px;
      background-color: #fff;
      padding: 0 45px;
      line-height: 70px;
      color: #666;

      .footer-remove{
        color: #999;
        margin:0 30px 0 20px;
      }

      .footer-num{
        font-weight: bold;
        margin: 0 5px;
      }

      .gray{
        color: #333;
      }

      .blue{
        color: #00c3f5;
      }

      .red{
        color: #e02b41;
      }
      .footer-total{
        font-size: 20px;
        margin-right: 35px;
      }
    }
  }

  .shopcart-empty{
    width: 1240px;
    margin: 10px auto;
    background-color: #fff;
    /*我们这里选择table去布局，所以这里选择table*/
    display: table;
    height: 360px;

    .empty-content{
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }
    .empty-left{
      width: 100px;
      height: 114px;
      /*empty-left和empty-right 都设置了inline-block，这样它们就能都排在一行*/
      display: inline-block;
      background: url("../assets/images/shopcart.png") no-repeat;
      margin-right: 30px;
      vertical-align: middle;
    }

    .empty-right{
      display: inline-block;
      /*两个部分都在行内，要让它们水平对齐，就都要去设置 vertical-align: middle; */
      vertical-align: middle;
      text-align: left;
    }
    .empty-desc{
      color: #666;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;

    }
  }
</style>
