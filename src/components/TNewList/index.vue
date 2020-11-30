<template>
  <div class="container">
    <template v-if="list && list.length">
      <div v-for="item in list" :key="item.id" class="item">
        <t-new-item :key="item.id" :item="item" :href="href" :key-word="keyWord" />
      </div>
    </template>
    <div v-else class="empty">
      <i class="no-search">暂无数据</i>
    </div>
    <t-pagination class="pagination-box" :options="pageOpt" @pagination-change="paginationChange" />
  </div>
</template>

<script>
import TNewItem from './TNewItem'

export default {
  name: 'TNewsList',
  components: {
    TNewItem
  },
  props: ['query', 'href', 'keyWord'],
  data() {
    return {
      pageOpt: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        pageNo: 1,
        total: 0
      },
      list: [],
      sequence: 0,
      loading: 0
    }
  },
  watch: {
    query(val, oldVal) {
      this.sequence++
      this.pageOpt.pageNo = 1
      this.list = []
      this.getData()
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    paginationChange(data) {
      this.pageOpt = data
      this.getData()
    },
    getData() {
      if (!this.query) {
        return
      }
      const currentSeq = this.sequence
      this.loading++
      this.query(this.pageOpt.pageNo, this.pageOpt.pageSize).then(newData => {
        if (currentSeq !== this.sequence) {
          return
        }
        this.list = newData.data
        this.pageOpt.total = newData.total
      }).catch(err => {
        this.$notify({ title: err.message || err || '请求失败', type: 'error' })
      }).finally(() => {
        this.loading--
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  .empty {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .no-search {
      width: 218px;
      height: 115px;
      background: url(~@/assets/nothing@2x.png) center center no-repeat;
      background-size: cover;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      align-self: center;
      margin: auto;
      font-size: 14px;
      color: #95A4BD;
      line-height: 20px;
    }
  }
  .item {
    padding: 20px 0;
    border-bottom: 1px solid #E9EEF8;
  }
  .pagination-box {
    text-align: right;
    padding: 15px 0 0;
  }
}
</style>
