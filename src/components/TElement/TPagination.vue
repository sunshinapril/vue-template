<template>
  <div class="pagination-wrapper">
    <el-pagination
      class="t-pagination"
      :current-page.sync="options.pageNo"
      :page-sizes="options.pageSizes"
      :page-size="options.pageSize"
      :total="options.total"
      layout="total, prev, pager, next, sizes, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

</template>
<script>
/* *
 *@params参数设置
 *@options设置有默认值，
 *若无默认值，可通过父组件向子组件传递参数
 *eg: :options="options"
 * */
export default {
  name: 'TPagination',
  props: {
    options: {
      type: Object,
      required: false,
      default: function() {
        return {
          pageSizes: [10, 20, 50, 100],
          pageSize: 10,
          pageNo: 1,
          total: 0
        }
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$set(this.options, 'pageSize', val)
      this.$set(this.options, 'pageNo', 1)
      this.toParent()
    },
    handleCurrentChange(val) {
      this.toParent()
    },
    toParent() {
      this.$emit('pagination-change', this.options)
    }
  }
}
</script>
<style lang="less" scoped>
.pagination-wrapper {
  // margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
.t-pagination {
  display: flex;
  align-items: center;
  /deep/ .el-select .el-input {
    .el-input__inner:hover, .el-input__inner:focus {
      border-color: #4A80F5;
    }
  }
  /deep/ .el-input__inner {
    height: 24px !important;
    border-radius: 2px !important;
    line-height: 24px !important;
  }
  /deep/ .el-pagination__total {
    vertical-align: unset;
  }
  /deep/ .el-pagination__jump {
    height: 25px;
    line-height: 25px;
    margin-left: 5px;
  }
  /deep/ .el-input--mini .el-input__inner, /deep/ .el-pagination__sizes, /deep/ .el-pagination__editor.el-input .el-input__inner {
    height: 25px;
    line-height: 25px;
    &:focus {
      border-color: #4A80F5;
    }
  }
  /deep/ .btn-prev, /deep/ .btn-next {
    //width: 23px;
    height: 23px;
    line-height: 23px;
    min-width: 23px;
    padding: 0;
    border-radius: 2px;
    border: 1px solid #E9EEF8;
    color: #C4C4C4;
    &:hover {
      color: #4A80F5;
    }
    &:disabled {
      color: #C4C4C4;
    }
  }
  /deep/ .btn-next {
    margin-right: 20px;
  }
  /deep/ .el-pager {
    li {
      min-width: 23px;
      padding: 0;
      margin: 0 3px 0;
      &.number {
        //width: 23px;
        height: 23px;
        line-height: 23px;
        border-radius: 2px;
        border: 1px solid #E9EEF8;
      }
      &.active {
        color: #ffffff;
        background: #4A80F5;
        border-color: #4A80F5;
      }
      &:hover {
        color: #4A80F5;
      }
      &.active:hover {
        color: #ffffff;
      }
    }
  }
}
</style>
