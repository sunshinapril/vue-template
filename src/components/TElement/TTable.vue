<style lang="less" scoped>
.table-container {
  width: 100%;
  .pagination-box {
    text-align: right;
    padding: 15px 0;
  }
}
</style>
<template>
  <div class="table-container">
    <el-table
      ref="table"
      v-loading="loading"
      fit
      highlight-current-row
      :header-cell-style="headerCellStyle"
      :data="list"
      :default-expand-all="false"
      row-key="id"
      class="base-table"
      v-bind="{...$attrs}"
      v-on="{...$listeners}"
      @select-all="handleSelectAll"
      @select="handleSelect"
    >
      <slot />
    </el-table>
    <t-pagination
      v-if="showPagination"
      class="pagination-box"
      :options="pageOpt"
      :layout="layout"
      @pagination-change="paginationChange"
    />
  </div>
</template>

<script>
import { flattenTreeToArray } from '@/utils'
export default {
  name: 'TTable',
  props: {
    query: {
      type: Function,
      default: null
    },
    data: {
      type: Array,
      default: () => null
    },
    total: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'total, prev, pager, next, sizes, jumper'
    }
  },
  data() {
    return {
      list: [],
      sequence: 0,
      loading: false,
      pageOpt: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        pageNo: 1,
        total: 0
      }
    }
  },
  computed: {
    showPagination() {
      return this.total || this.query
    }
  },
  watch: {
    query(val, oldVal) {
      this.sequence++
      this.pageOpt.pageNo = 1
      this.list = []
      this.getData()
    },
    data: {
      immediate: true,
      handler(newV, oldV) {
        if (newV) {
          this.list = newV
          this.pageOpt.total = this.total || 0
        }
      }
    }
  },
  mounted() {
    if (!this.data) {
      this.getData()
    }
  },
  methods: {
    // 手动选中某一行，自动选择所有子元素, 由于该事件会在selection-change之前触发，所以修改内容会被覆盖，需要添加settimeout矫正时序
    handleSelect(rows, currentRow) {
      setTimeout(() => {
        const arr = flattenTreeToArray(currentRow, c => c.children).distinct()
        if (arr.length > 1) {
          const isChecked = rows.indexOf(currentRow) >= 0
          const table = this.$refs.table
          arr.forEach(row => {
            table.toggleRowSelection(row, isChecked)
          })
        }
      }, 0)
    },
    // 全选/取消全选，修复el-table配置tree-props时全选按钮无法控制子元素的问题
    handleSelectAll(rows) {
      const data = this.list
      if (data && data.length) {
        const arr = flattenTreeToArray(data, c => c.children).distinct()
        if (arr.length > data.length) {
          const isChecked = rows.indexOf(data[0]) >= 0
          const table = this.$refs.table
          arr.forEach(row => {
            table.toggleRowSelection(row, isChecked)
          })
        }
      }
    },
    headerCellStyle() {
      return {
        background: '#F8F8FA',
        color: '#0D2B5E',
        fontSize: '12px'
      }
    },
    paginationChange(data) {
      this.pageOpt = data
      if (this.data) {
        this.$emit('pagination-change', data)
      } else {
        this.getData()
      }
    },
    getData() {
      if (!this.query) {
        return
      }
      const currentSeq = this.sequence
      this.loading = true
      this.query(this.pageOpt.pageNo, this.pageOpt.pageSize).then(newData => {
        if (currentSeq !== this.sequence) {
          return
        }
        this.list = newData.data
        this.pageOpt.total = newData.total
      }).catch(err => {
        this.$notify({ title: err.message || err, type: 'error' })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
