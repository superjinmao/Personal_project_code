<template>
  <!--同样， 作为依靠vue-router切换的页面组件，外部的根节点一定要有-->
  <div class="bg-white">
    <v-header></v-header>
    <!--除去头尾，中间所有的内容也是放在一个div里面，做全屏背景，包裹我们中间商品详情的盒子，也要给宽度1240-->
    <div class="detail-wrapper">
      <!--这是面包屑导航-->
      <div class="bread">
        <span @click="showData">首页</span>
        <!--arrow是箭头的意思-->
        <span class="arrow"> > </span>
        <span>全部</span>
        <span class="arrow"> > </span>
        <span class="last-bread">手机</span>
      </div>
      <!--中间部分商品展示-->
      <div class="clearfix">

        <!--左边图片展示-->
        <div class="fl detail-images">
          <images-list :data="infoData.colorImageUrls" type="big"></images-list>
        </div>

        <!--右边商品属性-->
        <div class="fl detail-props">
          <!--标题-->
          <h1 class="prop-title">{{infoData.goodsName}}</h1>
          <!--简介-->
          <P class="prop-desc">{{infoData.goodsDesc}}</P>
          <!--价格里有两个span-->
          <div class="prop-sale">
            <span class="prop-name">价<span class="prop-space"></span>格:</span>
            <span class="prop-price">￥{{infoData.goodsPrice}}</span>
          </div>
          <div>
            <span class="prop-name">支<span class="prop-space"></span>持:</span>
            <ul class="service-list">
              <li class="list-item"><i class="icon-font icon-check-circle"></i>百城速达</li>
              <li class="list-item"><i class="icon-font icon-check-circle"></i>顺丰包邮</li>
              <li class="list-item"><i class="icon-font icon-check-circle"></i>七天无理由退货</li>
            </ul>
          </div>
          <!--服务-->
          <div>
            <span class="prop-name">服<span class="prop-space"></span>务:</span>
            <span>本商品由 魅族 负责发货并提供售后服务</span>
          </div>
          <!--数量输入-->
          <div>
            <span class="prop-name">数<span class="prop-space"></span>量:</span>
            <!--输入框部分分左右两部分，左边输入框，右边按钮-->
            <div class="clearfix prop-number">
              <input type="number" class="fl prop-input" v-model="purchaseQuantity">
              <div class="fl change-box">
                <div class="change-value" @click="increase">+</div>
                <div class="change-value" @click="decrease">-</div>
              </div>
            </div>
          </div>
          <!--两个交互逻辑的按钮-->
          <div class="prop-buy">
            <a href="javascript:" class="btn danger mr20" @click="purchase">立即购买</a>
            <a href="javascript:" class="btn success" @click="addShopcart">加入购物车</a>
          </div>
        </div>
      </div>

      <!--下面的详情-->
      <div class="detail-info_warpper">
        <div class="detail-info">
          <a href="javascript:" class="info-title">商品详情</a>
        </div>
        <!--下面是图片展示循环-->
        <img class="detail-images"  :src="item" alt="" v-for="(item,index) in infoData.information" :key="index">
      </div>
    </div>
    <v-footer></v-footer>
    <v-dialog :show.sync="dialogShow" :confirm-button-show="false" :cancel-button-show="false" :width="360" :height="80">
      <div>
        <i class="icon-font icon-check-circle add-success"></i>成功加入购物车
      </div>
      <a href="javascript:" @click="goToShopcart" class="go-shopcart">进入购物车</a>
    </v-dialog>
  </div>
</template>

<script type="text/javascript">
import vHeader from '@/components/header'
import vFooter from '@/components/footer'
import imagesList from '@/components/imagesList'
import vDialog from '@/components/dialog'
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
  name: 'detail',
  data () {
    return {
      infoData: {},
      // 添加一个采购数量的字段变量，后面根据+-操作修改表单值
      purchaseQuantity: 1,
      dialogShow: false
    }
  },
  methods: {
    async getDetail (id) {
      const { data } = await axios.get(`/api/categoryList/${id}`)
      this.infoData = data
    },
    showData () {
      console.log(this.infoData)
    },
    increase () {
      this.purchaseQuantity = parseInt(this.purchaseQuantity) + 1
    },
    decrease () {
      if (this.purchaseQuantity > 1) {
        this.purchaseQuantity = parseInt(this.purchaseQuantity) - 1
      }
    },
    addShopcart () {
      // 通过在这里点击加入购物车，去提交一个mutations往state添加一条数据
      this.$store.commit('ADD_SHOPCART', {
        data: this.infoData,
        num: parseInt(this.purchaseQuantity)
      })
      // 点击加入购物车之后会有一个弹框提示
      this.dialogShow = true
    },
    purchase () {
      this.ADD_SHOPCART({
        data: this.infoData,
        num: parseInt(this.purchaseQuantity)
      })
      // 不同之处在于点击立即购买会跳转到购物车页面
      this.goToShopcart()
    },
    goToShopcart () {
      this.$router.push({
        name: 'Shopcart'
      })
    },
    ...mapMutations([
      'ADD_SHOPCART'
    ])
  },
  // 这里props不能简单写成   props:['id']
  components: {
    vHeader,
    vFooter,
    imagesList,
    vDialog
  },
  mounted () {
    // 在category页面点击商品时页面跳转到detail,这个detail组件就挂载了
    // 在组件一挂载的时候就去请求数据，直接通过this.$route.params.id就可以拿到当前地址栏的路由参数，进而去拿到对应商品的数据
    this.getDetail(this.$route.params.id)
  }
}
</script>

<style lang="less" scoped>
  .bg-white{
    background-color: white;
  }
  .bread{
    height: 40px;
    line-height: 40px;
    .arrow, .last-bread{
      color: #999;
    }
  }
  .detail-wrapper{
    /*同样，这里只给宽，高度让内容去填充即可*/
    width: 1240px;
    margin: 0 auto;

    .detail-images{
      width: 495px;
    }

    .detail-props{
      width: 675px;
      font-size: 12px;

      .prop-title{
        font-size: 24px;
        font-weight: 400;
        color: #000;
        margin-bottom: 10px;
      }

      .prop-desc{
        font-size: 16px;
        color: #e22841;
        margin-bottom: 15px;
      }

      .prop-name{
        padding: 0 10px;
        line-height: 34px;
      }
      .prop-space{
        padding: 0 12px;
      }

      .prop-sale{
        background-color: #f5f5f5;
        height: 55px;
        margin-bottom: 26px;

        .prop-price{
          color: #e02b41;
          font-size: 24px;
          line-height: 55px;
        }
      }

      .service-list{
        // 这几个图标行内显示
        display: inline-block;

        .list-item{
          display: inline-block;
          margin-right: 20px;

          i{
            margin-right: 5px;
            color: #00c3f5;
          }
        }
      }
      .prop-number{
        display: inline-block;
        /* 同一水平线对齐*/
        vertical-align: middle;

        .prop-input{
          width: 53px;
          height: 38px;
          line-height: 38px;
          border: 1px solid #dcdcdc;
          color: #333;
          text-align: center;
        }

        .change-box{
          margin-left: 6px;
        }

        .change-value{
          width: 20px;
          height: 16px;
          font-size: 14px;
          color: #666;
          border: 1px solid #dcdcdc;
          text-align: center;
          line-height: 14px;
          cursor: pointer;

          &:last-child{
            margin-top: 6px;
          }
        }
      }

      .prop-buy{
        margin-top: 17px;
      }

      .mr20{
        margin-right: 20px;
      }
    }

    .detail-info_warpper{
      /*在父级设置字体为0，清除多个标签之间的文本空隙*/
      font-size: 0;
      margin-top: 60px;
      margin-bottom: 80px;

      .detail-info{
        height: 62px;
        border-bottom: 1px solid #dcdcdc;
      }

      .info-title{
        font-size: 16px;
        height: 62px;
        line-height: 62px;
        color: #00c3f5;
        border-bottom: 1px solid #00c3f5;
        padding: 0 20px;
        margin-bottom: -1px;
        box-sizing: border-box;
        display: inline-block;
      }

      .detail-images{
        width: 1240px;
        /*这里给宽度即可，高度自行自适应*/
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
