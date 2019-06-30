<template>
  <div>
    <m-header></m-header>
    <div class="order">
      <!--收货人信息-->
      <div class="order-item">
        <h1 class="order-title order-title_address">收货人信息</h1>
        <ul class="address-list clearfix">
          <li v-for="(item, index) in addressData" :key="index" :class="{'active': item.checked}"  class="address-item fl" @click="checkAddress(item)">
            <!--上面是左右排列的名字和电话-->
            <div class="clearfix address-title">
              <div class="fl">{{item.name}}</div>
              <div class="fr">{{item.phone}}</div>
            </div>
            <!--下面部分是具体的地址,具体内容-->
            <div class="address-info">
              {{item.province}}{{item.city}}{{item.district}}{{item.street}}
            </div>
            <!--右下角的勾,               只有选中了之后，这个三角图标才会展示-->
            <div class="address-checked" v-show="item.checked">
              <i class="icon-font icon-check address-check"></i>
            </div>
          </li>
          <!--最后这个添加地址没有功能，独立写，不参与循环-->
          <li class="address-item fl address-add">
            <div class="address-add_icon">+</div>
            <div>添加新地址</div>
          </li>
        </ul>
      </div>
      <!--确认订单信息-->
      <div class="order-item clearfix">
        <h1 class="order-title">确认订单信息</h1>
        <table class="order-goods">
          <thead>
          <tr>
            <th class="goods-name">商品</th>
            <th class="goods-price">单价</th>
            <th class="goods-number">数量</th>
            <th class="goods-count">小计</th>
            <th class="goods-express">配送方式</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in orderData" :key="index">
            <td class="goods-name">
              <img :src="item.imageUrl" alt="">
              <div class="goods-desc">
                <p>{{item.goodsName}}</p>
                <p>{{item.goodsDesc}}</p>
              </div>
            </td>
            <!--单价-->
            <td class="goods-price">{{item.goodsPrice}}</td>
            <!--数量-->
            <td class="goods-number">{{item.count}}</td>
            <!--小计-->
            <td class="goods-count">￥{{item.goodsPrice * item.count}}</td>
            <!--配送这里是一个行数合并，有多少商品就有多少行合并，所以合并这里给一个当前商品的行数-->
            <td class="goods-express" :rowspan="orderData.length">快递配送，运费 <span class="red">￥0.00</span></td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <!--备注这里是合并了前面3列-->
            <td colspan="3" class="order-footer">
              备注: <textarea placeholder="备注..."></textarea>
            </td>
            <!--后面这个合并2列-->
            <td colspan="2" class="footer-total">合计:  <span class="price">￥{{checkGoodsPrice}}</span></td>
          </tr>
          </tfoot>
        </table>
      </div>
      <!--选择支付方式-->
      <div class="order-item clearfix">
        <h1 class="order-title">选择支付方式</h1>
        <!--因为支付方式只有一种，所以下面将这几个单选框都归在一组，设置同一个 name 为 pay -->
        <div class="order-pay">
          <!--支付宝-->
          <div class="pay-item clearfix">
            <h1 class="pay-title fl">支付宝</h1>
            <ul class="pay-content fl clearfix">
              <li>
                <input type="radio" v-model="payMode" value="huabei" name="pay">
                <img src="../assets/images/banks/huabei.png" alt="">
              </li>
              <li>
                <input type="radio" v-model="payMode" value="alipay" name="pay">
                <img src="../assets/images/banks/alipay.png" alt="">
              </li>
            </ul>
          </div>
          <!--微信-->
          <div class="pay-item clearfix">
            <h1 class="pay-title fl">微信</h1>
            <ul class="pay-content fl clearfix ">
              <li>
                <input type="radio" v-model="payMode" value="wechat" name="pay">
                <img src="../assets/images/banks/wechat.png" alt="">
              </li>
            </ul>
          </div>
          <!--网上银行-->
          <div class="pay-item clearfix">
            <h1 class="pay-title fl">网上银行</h1>
            <ul class="pay-content fl clearfix pay-bank">
              <li>
                <input type="radio" v-model="payMode" value="zhongguo" name="pay">
                <img src="../assets/images/banks/zhongguo.png" alt="">
              </li>
              <li>
                <input type="radio" v-model="payMode" value="jianshe" name="pay">
                <img src="../assets/images/banks/jianshe.png" alt="">
              </li>
              <li>
                <input type="radio" v-model="payMode" value="nongye" name="pay">
                <img src="../assets/images/banks/nongye.png" alt="">
              </li>
              <li>
                <input type="radio" v-model="payMode" value="gongshang" name="pay">
                <img src="../assets/images/banks/gongshang.png" alt="">
              </li>
              <li>
                <input type="radio" v-model="payMode" value="jiaotong" name="pay">
                <img src="../assets/images/banks/jiaotong.png" alt="">
              </li>
              <li>
                <input type="radio" v-model="payMode" value="zhaoshang" name="pay">
                <img src="../assets/images/banks/zhaoshang.png" alt="">
              </li>
              <li>
                <input type="radio" v-model="payMode" value="youzheng" name="pay">
                <img src="../assets/images/banks/youzheng.png" alt="">
              </li>
              <li>
                <input type="radio" v-model="payMode" value="xingye" name="pay">
                <img src="../assets/images/banks/xingye.png" alt="">
              </li>
              <li>
                <input type="radio" v-model="payMode" value="shanghai" name="pay">
                <img src="../assets/images/banks/shanghai.png" alt="">
              </li>
            </ul>
          </div>
          <!--右下角支付详情-->
          <ul class="order-total">
            <li class="clearfix">
              <!--左边部分-->
              <div class="fl">总金额</div>
              <!--右边部分-->
              <div class="fr">￥{{checkGoodsPrice}}</div>
            </li>
            <li class="clearfix">
              <!--左边部分-->
              <div class="fl">运费</div>
              <!--右边部分-->
              <div class="fr">￥0.00</div>
            </li>
            <!--分割线-->
            <li class="order-line"></li>
            <li class="clearfix">
              <div class="fl">应付</div>
              <div class="fr order-price">￥{{checkGoodsPrice}}</div>
            </li>
            <li class="order-button">
              <a href="javascript:" class="btn success" @click="pushOrder">下单并支付</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <m-footer></m-footer>
    <!--提示弹窗-->
    <v-dialog :show.sync="dialogShow" :confirm-button-show="false" :cancel-button-show="false" :width="360" :height="80">
      <div>
        <i class="icon-font icon-check-circle add-success"></i>成功提交订单
      </div>
      <a href="javascript:" @click="goToIndex" class="go-shopcart">返回首页</a>
    </v-dialog>
  </div>
</template>

<script type="text/javascript">
import mHeader from '@/components/header'
import mFooter from '@/components/footer'
import vDialog from '@/components/dialog'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      addressData: [],
      // 定义一个字段表示支付方式
      payMode: '',
      dialogShow: false
    }
  },
  computed: {
    orderData () {
      // 购物车中已经被选中的商品，点击结算后才能进入到订单页面
      const data = this.$store.state.shopcartData.filter(item => item.checked)
      // 这是箭头函数的简写，return item.checked 留下选中的，即item.checked为true,过滤完的结果再返回出去
      return data
    },
    ...mapGetters(['checkGoodsPrice'])
  },
  methods: {
    async getAddressData () {
      const { data } = await axios('/api/addressData')
      this.addressData = data
    },
    checkAddress (val) {
      // 遍历所有地址的数据
      this.addressData.forEach(item => {
        // 上来先将其设置为false,然后通过下面的判断再考虑是否应有样式
        // 上来先设置为false,是为了多次选择不会导致两个都显示，点击的时候先清空所有，然后在显示点击的那个
        item.checked = false
        if (item.id === val.id) { // 说明选中当前这一项
          item.checked = true // 在将我们选中这一项的改成true
        }
      })
    },
    // 模拟一个将地址信息，订单信息，支付信息这些数据组成一个json对象或者后端所需要的数据格式，再提交到后台，模拟一下数据结构
    pushOrder () {
      const date = new Date()
      // 过滤的条件是返回item.checked为true,即地址选中的这样一条数据,最终返回一个数组类，所以还得[0]拿到第一条数据
      const adress = this.addressData.filter(item => item.checked)[0]
      const data = {
        orderId: date.getTime(),
        adress: adress,
        orderData: this.orderData,
        orderPrice: this.checkGoodsPrice,
        time: date,
        payMode: this.payMode
      }
      // 然后一般都是通过axios之类的将我们的数据提交到后台，我们这里不提交，直接打印出来看即可
      console.log(data)
      this.dialogShow = true
      // 订单提交后，去清空一下数据
      this.REMOVE_GOODS()
    },
    goToIndex () {
      this.$router.push({
        name: 'Index'
      })
    },
    ...mapMutations(['REMOVE_GOODS'])
  },
  components: {
    mHeader,
    mFooter,
    vDialog
  },
  mounted () {
    this.getAddressData()
  }
}
</script>

<style lang="less" scoped>
  .order{
    width: 1240px;
    margin: 0 auto 60px;

    .order-item{
      margin-top: 10px;
      padding: 0 40px 10px;
      background-color: #fff;
    }

    .order-title{
      padding: 20px 0;
      font-size: 18px;
      color: black;
      font-weight: bold;
      text-indent: 10px;
    }

    .order-title_address{
      border-bottom: 1px solid #efefef;
    }

    .address-list{
      margin-top: 30px;
      padding-left: 12px;

      .address-item{
        width: 275px;
        height: 144px;
        margin:  0 12px 30px 0;
        border: 1px solid #efefef;
        padding: 15px;
        transition: border-color .8s;
        cursor: pointer;
        position: relative;

        &:hover,&.active{
          border-color: #00c3f5;
        }
      }

      .address-title{
        font-size: 12px;
        color: black;
        font-weight: bold;
        border-bottom: 1px solid #efefef;
        line-height: 25px;
      }

      .address-info{
        font-size: 12px;
        padding-top: 10px;
        word-break: break-all;
        word-wrap: break-word;
      }

      .address-checked{
        position: absolute;
        width: 0;
        height: 0;
        right: 0;
        bottom: 0;
        border-right: 30px solid #00c3f5;
        border-top: 30px solid transparent;
      }

      .address-check{
        position: absolute;
        right: -30px;
        color: #fff;
        bottom: 4px;
        font-size: 12px;
      }

      .address-add{
        text-align: center;
        transition: color 0.8s;

        &:hover{
          color: #00c3f5;
        }

        .address-add_icon{
          font-size: 30px;
          margin-top: 30px;
          margin-bottom: 10px;
          line-height: 1;
        }
      }
    }

    .order-goods{
      border: 1px solid #efefef;

      thead {
        tr{
          height: 63px;
          border-bottom: 1px solid #efefef;
        }

        .goods-number, .goods-count, .goods-express{
          font-size: 18px;
          color: black;
        }

        .goods-name{
          font-size: 12px;
          font-weight: 400;
          color: #666;
        }

      }

      tbody tr{
        border-bottom: 1px solid #efefef;
      }

      tfoot tr{
        background-color: #f5f5f5;
      }

      .goods-name{
        width: 438px;
        padding-left: 10px;
        text-align: left;
        cursor: pointer;

        img{
          width: 120px;
          height: 120px;
          vertical-align: middle;
        }

        .goods-desc{
          display: inline-block;
          vertical-align: middle;
          font-size: 14px;
        }
      }

      .goods-price{
        width: 225px;
        font-weight: bold;
        text-align: center;
        font-size: 18px;
        color: black;
      }

      .goods-number{
        width: 139px;
        font-weight: bold;
        text-align: center;
      }

      .goods-count{
        width: 173px;
        text-align: right;
        font-weight: bold;
        padding-right: 20px;
        color: #e02b41;
        font-size: 18px;
      }

      .goods-express{
        width: 184px;
        text-align: center;
        color: #999;
        border-left: 1px solid #efefef;

        .red{
          color: #e02b41;
          font-weight: bold;
        }
      }
      .order-footer{
        padding: 15px 20px;
        font-size: 12px;

        textarea{
          width: 552px;
          height: 48px;
          border: 1px solid #efefef;
          padding: 5px;
          outline: 0;
          resize: none;
          background-color: #fff;
          margin-left: 5px;
          vertical-align: middle;
        }
      }

      .footer-total{
        text-align: right;
        color: #e02b41;
        padding: 15px 20px;
        font-weight: bold;

        .price{
          font-size: 22px;
        }
      }
    }

    .order-pay{
      padding: 40px 26px 14px;
      border: 1px solid #efefef;

      .pay-item{
        margin-bottom: 26px;
      }

      .pay-title{
        width: 60px;
        line-height: 40px;
        color: #333;
        font-size: 14px;
        margin: 0 20px 0 0;
      }

      .pay-content{

        li{
          float: left;
          margin-right: 40px;
          margin-bottom: 26px;
        }

        input{
          vertical-align: middle;
          margin-right: 20px;
        }

        img{
          vertical-align: middle;
        }
      }

      .pay-bank{
        width: 1020px;
      }

    }

    .order-total{
      width: 318px;
      float: right;
      margin-top: 30px;

      li{
        margin-bottom: 20px;
      }

      .order-line{
        height: 1px;
        background-color: #efefef;
      }

      .order-button{
        text-align: right;
      }

      .order-price{
        color: #e02b41;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  .add-success{
    color: #00c3f5;
    margin-right: 5px;
  }
  .go-shopcart{
    color: #00c3f5;
    text-decoration: underline;
  }
</style>
