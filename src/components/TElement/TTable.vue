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
      v-loading="loading"
      border
      fit
      highlight-current-row
      :header-cell-style="headerCellStyle"
      :data="list"
      :default-expand-all="false"
      :tree-props="{children: children}"
      row-key="id"
      class="base-table"
      :style="styles ? styles : 'width: 100%'"
      @selection-change="selectionChange"
    >
      <el-table-column v-if="selection" type="selection" align="center" width="55" />
      <slot />
    </el-table>
    <t-pagination v-if="showPagination" class="pagination-box" :options="pageOpt"
                  @pagination-change="paginationChange"
    />
  </div>
</template>

<script>
export default {
  name: 'TTable',
  props: {
    query: {
      type: Function,
      default: null
    },
    children: {
      type: String,
      default: ''
    },
    styles: {
      type: String,
      default: ''
    },
    selection: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => null
    },
    total: {
      type: Number,
      default: 0
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
    headerCellStyle() {
      return {
        background: '#F8F8FA',
        color: '#0D2B5E',
        fontSize: '12px'
      }
    },
    selectionChange(selection) {
      this.$emit('selection-change', selection)
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
