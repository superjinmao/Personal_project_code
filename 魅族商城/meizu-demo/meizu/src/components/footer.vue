<template>
  <div class="footer">
    <!--上-->
    <div class="footer-wrapper">
      <!--上-->
      <!--同样，上这一块内部使用了浮动布局，那么外层就要清除浮动-->
      <div class="clearfix">
        <!--左边的ul列表-->
        <ul class="fl footer-service">
          <li v-for="(item,index) in serviceLinkData" :key="index">
            <a :href="item.href">
              <img :src="item.icon" alt="">
              <span>{{item.name}}</span>
            </a>
          </li>
        </ul>
        <!--右边的热线电话-->
        <div class="fr online-service">
          <span>周一至周日 7:30~24:00</span>
          <p>400-788-3333</p>
          <a href="">在线客服</a>
        </div>
      </div>
      <!--中，主要目的是做下划线-->
      <hr class="footer-hr">
      <!--下，负责底部的链接和版权-->
      <!--同样，清除浮动-->
      <div class="clearfix">
        <!--左-->
        <div class="fl">
          <!--上边的ul列表        externalLink  外部链接-->
          <ul class="external-link">
            <li v-for="(item,index) in externalLinkData" :key="index">
              <a :href="item.href">
                {{item.name}}
              </a>
            </li>
          </ul>
          <!--下面的版权信息-->
          <div class="footer-rights">
            ©2019 Meizu Telecom Equipment Co., Ltd. All rights reserved.     粤ICP备13003602号 合字B2-20170010 营业执照 法律声明
          </div>
        </div>
        <!--右-->
                <!--   subscribe   是赞助的意思-->
        <div class="fr subscribe">
          <!--右边部分是几个icon图标-->
          <!--之前创建字体图标的时候就已经有了，所以这里直接使用就行-->
          <a href="">
            <i class="icon-font icon-weibo"></i>
          </a>
          <a href="">
            <i class="icon-font icon-weixin"></i>
          </a>
          <a href="">
            <i class="icon-font icon-qqzone"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// 这里要获取数据，就得在这里去引入axios
import axios from 'axios'

export default {
  name: 'vFooter',
  data () {
    return {
      serviceLinkData: [],
      externalLinkData: []
    }
  },
  mounted () {
    this.getServiceLinkData()
    this.getExternalLinkData()
  },
  methods: {
    async getServiceLinkData () {
      const { data } = await axios.get('/api/serviceLink')
      this.serviceLinkData = data
    },
    async getExternalLinkData () {
      const { data } = await axios.get('/api/externalLink')
      this.externalLinkData = data
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .footer{
    background-color: #fff;
    padding: 48px 0 20px;
    border: 1px solid #efefef;

    .footer-wrapper{
      width: 1240px;
      margin: 0 auto;
    }
    .footer-service{
      /*一行有4个，一个宽度是240，4个就是960，而且有空余，所以这里我们设置成1000*/
      width: 1000px;
      li{
        /*排列的话，可以通过浮动，也可以将其改成内联模块去排列成一行*/
        display: inline-block;
        width: 240px;
        height: 57px;
        font-size: 12px;
        color: #999;
        text-align: center;
        line-height: 57px;
      }
      img, span{
        /*使图片和文字垂直对齐，在同一水平线上*/
        vertical-align: middle;
      }
    }
    .online-service{
      /*让文字右对齐*/
      text-align: right;
      span{
        font-size: 12px;
        color: #999;
      }
      p{
        color: #00c3f5;
        font-size: 30px;
        font-weight: 400;
      }
    }
    .footer-hr{
      margin: 20px 0 28px;
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid #eee;
    }
    .external-link{
      li{
        /*先改成内联模块，便可以排成一行*/
        display: inline-block;
        padding-right: 15px;
        margin-right: 15px;
        border-right: 1px solid #d6d6d6;
        font-size: 12px;
        color: #999;

        /*表示选中当前所有li的最后一个*/
        &:last-child{
          border-right: none;
        }
      }
    }
    .footer-rights{
      padding-top: 8px;
      font-size: 12px;
      color: #999;
    }
    .subscribe{
      margin-top: 18px;

      a{
        color: #999;
        padding-right: 10px;
        margin-right: 10px;
        border-right: 1px solid #eee;
        text-align: center;

        &:last-child{
          border-right: none;
        }

        &:hover{
          color: #31a5e7;
        }
      }
    }
  }
</style>
