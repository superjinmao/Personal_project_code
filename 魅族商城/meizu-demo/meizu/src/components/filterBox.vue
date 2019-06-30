<template>
  <!--最外层Ul-->
  <ul class="filter-box">
    <!--每一行的内容                                                        这个点击事件，传过去的是一个key，value-->
    <li v-for="(item,index) in data" :key="index" class="box-item clearfix">
      <!--筛选条件名称-->
      <div class="fl filter-title">
        {{item.name}}：
      </div>
      <!--筛选条件-->
      <ul class="fl">
        <li  class="filter-item fl"  :class="{'active':activeFilter[item.key] === info.value}" v-for="(info,ii) in item.queryList" :key="ii"  @click="changeFilter(item.key,info.value)">
          {{info.name}}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script type="text/javascript">
export default {
  // 添加这个字段，用来存放我们筛选条件的结果
  data () {
    return {
      activeFilter: {}
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
  methods: {
    changeFilter (key, val) {
      this.$set(this.activeFilter, key, val)
      this.$emit('filter', this.activeFilter)
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
  .filter-box{
    background-color:white;
    padding: 15px 10px;
    border: 1px solid #efefef;
    .box-item{
      line-height: 46px;
      margin: 0 auto;
    }
    .filter-title{
      width: 85px;
      padding-left: 10px;
      white-space: nowrap;
      color: #333;
      /*这里是定长，也就是说字体如果超出长度的话会隐藏掉*/
      overflow: hidden;
    }
    .filter-item{
      cursor: pointer;
      margin-right: 62px;

      &.active{
        color: #00c3f5;
      }
    }
  }
</style>
