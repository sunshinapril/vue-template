<template>
  <div id="app">
    <nprogress-container />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
export default {
  name: 'App',
  components: {
    NprogressContainer
  }
}
</script>

<style lang="less">
body {
  margin: 0px;
  padding: 0px;
  -webkit-font-smoothing: antialiased;
  #app {
    height: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

</style>
