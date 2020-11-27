<template>
  <div class="page-container">
    <img :src="imgUrl" alt="">
    <p class="title">404</p>
    <p class="sorry">抱歉，您访问的页面不存在</p>
    <a :href="url">返回首页</a>
  </div>
</template>
<script>
import imgUrl from '~/404.png'
export default {
  data() {
    return {
      url: '#/home',
      imgUrl: imgUrl
    }
  },
  methods: {
    homeUrl() {
      // this.url = `${getOldSystemRoute()}#/home/index`;
    }
  },
  mounted() {
    this.homeUrl();
  }
}
</script>

<style lang="less" scoped>
.page-container {
  text-align: center;
  position: fixed;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  .title{
    font-size: 58px;
    color:#303133;
    font-weight: bold;
    margin-top: 20px;
  }
  .sorry{
    font-family:"PingFangSC-Regular";
    font-size: 20px;
    margin-top: 10px;
    color: #909399;
  }
  a{
    display: inline-block;
    width:132px;
    height:40px;
    background:rgba(24,144,255,1);
    border-radius:4px;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    margin-top: 25px;
  }
}
</style>
