<template>
  <el-menu
    ref="menu"
    mode="vertical"
    text-color="#ffffff"
    background-color="#292E33"
    :default-active="defaultActive"
    :router="true"
    :collapse="collapse"
    :collapse-transition="false"
    :default-openeds="defaultOpeneds"
  >
    <i :class="!collapse ? 'logo' : 'min-logo'" />
    <template v-for="item in routes">
      <el-menu-item
        v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow && !onlyOneChild.hidden"
        :key="item.path"
        :index="onlyOneChild.path"
        class="menu-bottom"
      >
        <i v-if="onlyOneChild.meta && onlyOneChild.meta.icon" class="ic-menu">
          <img :src="(defaultActive === onlyOneChild.path) ? onlyOneChild.meta.activeIcon :onlyOneChild.meta.icon">
        </i>
        <span v-if="onlyOneChild.meta" slot="title">{{ onlyOneChild.meta.title }}</span>
      </el-menu-item>
      <el-submenu v-if="item.children && item.children.length > 1 && !item.hidden" :key="item.path" :index="item.path" popper-append-to-body>
        <template slot="title">
          <i v-if="item.meta && item.meta.icon" class="ic-menu">
            <img :src="defaultActive.includes(item.path) && collapse ? item.meta.activeIcon : item.meta.icon">
          </i>
          <span v-if="item.meta" slot="title">{{ item.meta.title }}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item v-if="!child.hidden" :key="child.path" :index="item.path + '/' + child.path">
            <i v-if="child.meta && child.meta.icon" class="ic-menu">
              <img :src="(defaultActive === (item.path + '/' + child.path)) ? child.meta.activeIcon : child.meta.icon">
            </i>
            <span v-if="child.meta" slot="title">{{ child.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'Index',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    this.onlyOneChild = null
    return {
      defaultOpeneds: []
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routers
    },
    defaultActive() {
      const route = this.$route
      if (route.meta && route.meta.active) {
        let active = route.meta.active
        if (typeof active === 'function') {
          active = active.apply(route)
        }
        return this.$router.resolve({ name: active }).route.path
      } else {
        return route.path
      }
    }
  },
  watch: {
    collapse: {
      immediate: true,
      handler(n, o) {
        if (!n) {
          this.setDefaultOpeneds()
        }
      }
    }
  },
  methods: {
    // 默认展开所有导航
    setDefaultOpeneds(n = this.routes) {
      if (n && n.length) {
        const defaultOpeneds = []
        n.forEach(i => {
          if (i && i.children) {
            defaultOpeneds.push(i.path)
          }
        })
        this.defaultOpeneds = defaultOpeneds
      }
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = {
            ...item,
            path: item.path === 'home' ? `${parent.path}${item.path}` : `${parent.path}/${item.path}`
          }
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  //height: 100%;
  background: #F7FAFD !important;
  border-right: none;
  /deep/ .el-menu {
    background: #F7FAFD !important;
  }
  .ic-menu {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    img {
      display: inline-block;
      width: 15px;
      height: 15px;
      vertical-align: text-top;
      margin-top: 2px;
    }
  }
  /deep/ .el-submenu__title, /deep/ .el-menu-item {
    min-width: auto;
    position: relative;
    font-size: 14px;
    background: #F7FAFD !important;
    color: #95A4BD !important;
    border-radius: 12px;
    &:hover{
      color: #4A80F5 !important;
      background: #E3EBFC !important;
      .el-submenu__icon-arrow {
        color: #4A80F5 !important;
      }
    }
  }
  /deep/ .el-submenu, .menu-bottom {
    text-align: left;
    background: #F7FAFD !important;
    &.el-menu-item, .el-submenu__title {
      height: 50px;
      line-height: 50px;
    }
    .el-menu--inline {
      .el-menu-item {
        padding: 0 30px !important;
      }
    }
  }
  /deep/ .el-menu-item.is-active {
    background: rgb(74,128,245) !important;
    color: #ffffff !important;
  }
  &.el-menu--collapse {
    width: 73px;
    /deep/ .el-menu-item, /deep/ .el-submenu{
      min-width: auto;
      text-align: center;
      position: relative;
      font-size: 14px;
      border-radius: 0;
      padding: 0 20px !important;
      transition: inherit;
      &:hover{
        background: #E6EEFC !important;
        &::before {
          content: '';
          width: 2px;
          height: 30px;
          position: absolute;
          top:50%;
          left: 0;
          transform: translateY(-50%);
          background: rgb(74,128,245);
        }
        .el-submenu__title {
          background: #E6EEFC !important;
        }
      }
      &.is-active {
        //width: 53px;
        //height: 50px;
        //margin: 0 auto;
        //border-radius: 12px;
        background: rgb(74,128,245) !important;
        color: #ffffff !important;
        .el-submenu__title {
          background: rgb(74,128,245) !important;
        }
      }
      .el-submenu__title {
        padding: 0 !important;
        transition: inherit;
        display: flex;
        align-items: middle;
        justify-content: center;
      }
    }
  }
}
.logo {
  margin: 20px auto;
  width: 134px;
  height: 60px;
  background: url("~@/assets/images/logo_icon@2x.png") no-repeat center/cover;
  background-size: contain;
  display: block;
}
.min-logo {
  margin: 50px auto 100px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: url("~@/assets/images/min-logo@2x.png") no-repeat center/cover;
  background-size: contain;
  display: block;
}
</style>
<style lang="less">
.el-menu--vertical {
  .el-menu {
    background: #F7FAFD !important;
    .el-menu-item {
      color: #95A4BD !important;
      background: #F7FAFD !important;
      &:hover{
        color: #4A80F5 !important;
        background: #E3EBFC !important;
        .el-submenu__icon-arrow {
          color: #4A80F5 !important;
        }
      }
      &.is-active {
        background: rgb(74,128,245) !important;
        color: #ffffff !important;
      }
    }
  }
}
</style>
