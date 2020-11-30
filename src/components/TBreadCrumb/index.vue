<template>
  <div class="el-breadcrumb-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in navList" :key="item.path">
        <router-link v-if="index === navList.length-1" to="" class="no-redirect">{{ item.name }}</router-link>
        <router-link v-else :to="item.path">{{ item.name }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      navList: null
    }
  },
  watch: {
    $route() {
      this.getBreadCrumb()
    }
  },
  created() {
    this.getBreadCrumb()
  },
  methods: {
    getBreadCrumb() {
      const matched = this.$route.matched.map(item => {
        let title = item.name
        if (item.meta && item.meta.title) {
          if (typeof item.meta.title === 'function') {
            title = item.meta.title.apply({ ...item, params: this.$route.params })
          } else {
            title = item.meta.title
          }
        }
        if (title) {
          return { name: title, path: item.path }
        } else {
          return null
        }
      }).filter(item => !!item)
      this.navList = matched
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb-box {
  .el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 33px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
  /deep/ .el-breadcrumb__inner,/deep/ .el-breadcrumb__separator {
    font-size: 24px;
    color: #222222;
  }
}
</style>
