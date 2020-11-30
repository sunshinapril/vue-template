<template>
  <div>
    <template v-for="(item, index) in routes">
      <el-menu-item
        v-if="(!item.children || item.length === 0) && item.meta.isMenu"
        :key="index"
        :index="item.path"
        class="menu-bottom"
      >
        <i v-if="item.meta.icon" class="ic-menu">
          <img :src="item.meta.icon">
        </i>
        {{ item.meta.title }}
      </el-menu-item>

      <el-submenu v-if="item.children && item.children.length && item.meta.isMenu" :key="index" :index="item.path" popper-append-to-body>
        <template slot="title">
          <i v-if="item.meta.icon" class="ic-menu">
            <img :src="item.meta.icon">
          </i>
          <span>{{ item.meta.title }}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item v-if="child.meta.isMenu" :key="child.path" :index="item.path + '/' + child.path">
            {{ child.meta.title }}
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
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
  opacity: .8;
  &::before{
    width: 3px;
    height: 30px;
    background: #292E33;
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  &:hover{
    background:rgba(74,128,245, .2) !important;
    opacity: 1;
    &::before {
      background: rgb(74,128,245)
    }
  }
}
.menu-bottom {
  width: 100%;
  height: 1px;
  background: rgba(242, 242, 242, .1);
  position: absolute;
  bottom: 0;
  left: 20px;
}
/deep/ .el-submenu, .menu-bottom {
  position: relative;
  &::after {
    content: '';
    width: 180px;
    height: 1px;
    background: rgba(242, 242, 242, .1);
    position: absolute;
    bottom: 0;
    left: 20px;
  }
  .el-menu-item {
    height: 46px;
    line-height: 46px;
  }
}
.menu-bottom {
  height: 56px;
  left: 0;
}
/deep/ .el-menu-item.is-active {
  background:rgba(74,128,245, .2) !important;
  color: #ffffff;
  opacity: 1;
  &::before {
    background: rgb(74,128,245)
  }
}
</style>
