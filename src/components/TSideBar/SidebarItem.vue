<template>
  <div v-if="!item.hidden" class="t-item">
    <el-menu-item
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow"
      :index="onlyOneChild.path"
      class="menu-bottom"
    >
      <i v-if="onlyOneChild.meta && onlyOneChild.meta.icon" class="ic-menu">
        <img :src="defaultActive === onlyOneChild.path ? onlyOneChild.meta.activeIcon :onlyOneChild.meta.icon">
      </i>
      {{ onlyOneChild.meta.title }}
    </el-menu-item>

    <el-submenu v-if="item.children && item.children.length > 1" :index="item.path" popper-append-to-body>
      <template slot="title">
        <i v-if="item.meta.icon" class="ic-menu">
          <img :src="defaultActive === item.path ? item.meta.activeIcon : item.meta.icon">
        </i>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-for="child in item.children">
        <el-menu-item v-if="!child.hidden" :key="child.path" :index="item.path + '/' + child.path">
          <i v-if="child.meta.icon" class="ic-menu">
            <img :src="defaultActive === (item.path + '/' + child.path) ? child.meta.activeIcon : child.meta.icon">
          </i>
          {{ child.meta.title }}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    defaultActive: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
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
.t-item {
  width: 180px;
  margin: 0 auto;
  .el-menu-item {
    min-width: 100px;
  }
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
    margin-top: 1px;
  }
}
/deep/ .el-submenu__title, /deep/ .el-menu-item {
  position: relative;
  font-size: 14px;
  background: #EDF3FC !important;
  color: #95A4BD !important;
  border-radius: 12px;
  &:hover{
    color: #4A80F5 !important;
    background: #E3EBFC !important;
  }
  .el-submenu__icon-arrow {
    display: none;
  }
}
/deep/ .el-submenu, .menu-bottom {
  background: #EDF3FC !important;
  .el-menu-item {
    height: 46px;
    line-height: 46px;
  }
}
/deep/ .el-menu-item.is-active {
  background: rgb(74,128,245) !important;
  color: #ffffff !important;
}
/deep/ .el-menu {
  background: #EDF3FC !important;
}
</style>
