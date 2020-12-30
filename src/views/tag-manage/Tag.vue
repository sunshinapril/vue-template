<template>
  <div v-loading="loading" class="infinite-list-wrapper">
    <ul
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
      :infinite-scroll-distance="100"
      class="infinite-list"
    >
      <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
    </ul>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  data() {
    return {
      count: 10,
      loading: false
    }
  },
  computed: {
    noMore() {
      return this.count >= 20
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  }

}
</script>

<style lang="less" scoped>
.infinite-list-wrapper {
  height: 300px;
  text-align: center;
  ul.infinite-list {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    li {
      margin-bottom: 10px;
      line-height: 40px;
      background: #fff6f6;
      color: #ff5658;
    }
  }
}
</style>
