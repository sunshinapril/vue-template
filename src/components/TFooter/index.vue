<template>
  <div class="login-footer">
    <div class="f-company">
      <img :src="logo" alt="">
      <div class="f-area">上海·北京·深圳·杭州·南京·香港</div>
    </div>
    <div class="f-contact">
      <div>电话：021-63888086</div>
      <div>商务合作：contact@tigerobo.com</div>
      <div>媒体联络：tigerobopr@tigerobo.com</div>
      <div>上海市长宁区愚园路嘉春753园区</div>
    </div>
    <div class="f-copyright">
      <div>版权所有 ® 虎博科技 虎博网络技术(上海)有限公司</div>
      <div>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">沪ICP备17048459号-1</a>
      </div>
      <div>
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010502003421" target="_blank">沪公网安备
          31010502003421号</a>
      </div>
      <div>反诈宣传电话 962110</div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo@2x.png'

export default {
  name: 'TFooter',
  data() {
    return {
      logo
    }
  }
}
</script>

<style lang="less" scoped>
.login-footer {
  min-height: 110px;
  padding: 20px 0;
  width: calc(100% - 220px);
  position: fixed;
  bottom: 0;
  left: 219px;
  background: rgb(41, 46, 51);
  .f-company {
    display: flex;
    flex-direction: row;
    justify-content: center;
    img {
      width: 109.86px;
      height: 20.5px;
      margin-right: 18px;
    }
    .f-area {
      margin-left: 18px;
      position: relative;
      font-size: 14px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 14px;
      &::before {
        content: '';
        width: 1px;
        height: 20px;
        background: #FFFFFF;
        opacity: 0.3;
        position: absolute;
        top: 50%;
        left: -18px;
        transform: translateY(-50%);
      }
    }
  }
  .f-contact {
    padding: 17px 0 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    div {
      margin-right: 25px;
      font-size: 14px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 20px;
    }
  }
  .f-copyright {
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 14px;
    text-align: center;
    display: flex;
    justify-content: center;
    div {
      margin-right: 10px;
      a {
        text-decoration: underline
      }
    }
  }
}
</style>
