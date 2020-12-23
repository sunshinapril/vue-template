<template>
  <div class="hours">
    <div class="hours-selection">
      <el-radio-group v-model="tabModel" @change="handleSelectionChange()">
        <el-radio-button
          v-for="(selectItem) in selectionList"
          :key="selectItem.value"
          class="radioButton"
          :label="selectItem.value"
        >
          {{ selectItem.name }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="hours-header">
      <div class="left-header">星期\时间</div>
      <div class="right-header">
        <div class="header-top">
          <div>00:00-12:00</div>
          <div>12:00-24:00</div>
        </div>
        <div class="header-content">
          <div
            v-for="(headerItem, colIndex) in headerData"
            :key="colIndex"
            @click="handleHeaderChange(headerItem, colIndex)"
          >
            {{ colIndex }}
          </div>
        </div>
      </div>
    </div>
    <div class="hours-content">
      <div class="left-content">
        <div v-for="(value, rowKey) in dateList" :key="rowKey" class="hours-left">
          <el-checkbox v-model="checkedList[rowKey]" @change="handleWeekChange(rowKey, value)">
            {{ dateList[rowKey] }}
          </el-checkbox>
        </div>
      </div>
      <div ref="dragDom" class="right-content">
        <ul v-for="(value, rowKey) in baseData" :key="rowKey">
          <li
            v-for="(item, colKey) in value"
            :key="colKey"
            class="drag-class"
            :class="item === '1' ? 'active' : ''"
            :colIndex="colKey"
            :rowIndex="rowKey"
            @click="handleChange(item, colKey, rowKey)"
          />
        </ul>
      </div>
    </div>
    <div class="hours-footer">
      <div class="top-footer">
        <p class="top-label">已选择时间段（可拖动鼠标选择时间段）</p>
        <p class="reset" @click="resetHours">清空</p>
      </div>
      <div class="selected-box">
        <template v-for="(value, rowKey) in baseData">
          <div v-if="value.includes('1')" :key="rowKey">
            {{ dateList[rowKey] }}: {{ filterHours(value) }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>/**
 *@params参数设置
 *@options设置有默认值，
 *传值是十进制要转化成二进制
 *提交数据需要二进制转成十进制
 *若无默认值，可通过父组件向子组件传递参数
 *eg: :options="options"
 *通过listenHoursEvent向父组件传值
 * */
import DragSelect from '@/utils/dragSelect'

export default {
  name: 'SysManageHours',
  props: {
    options: {
      type: Array,
      required: false,
      default: opt => {
        return [16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]
      }
    }
  },
  data() {
    return {
      selectionList: [
        {
          name: '全部时间',
          value: 1
        },
        {
          name: '工作日',
          value: 2
        },
        {
          name: '周末',
          value: 3
        }
      ],
      dateList: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      checkedList: [false, false, false, false, false, false, false],
      headerData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      tabModel: ''
    }
  },
  computed: {
    baseData() {
      // 十进制转化为二进制
      const resData =
        this.options && this.options.length
          ? this.options
          : [16777215, 16777215, 16777215, 16777215, 16777215, 16777215, 16777215]
      return resData.map(function(n) {
        return ('000000000000000000000000' + n.toString(2))
          .split('')
          .slice(-24)
          .reverse()
      })
    }
  },
  watch: {
    options: {
      immediate: true,
      handler(val) {
        this.init()
      }
    }
  },
  mounted() {
    const _this = this
    /* eslint-disable no-new */
    this.$nextTick(() => {
      new DragSelect(this.$refs.dragDom, {
        dragClass: 'drag-class', // 需要拖动选中的元素的class
        onSelect: function(nodes) { // 拖动结束后回调选中的元素节点
          // 选中一个，则全选；若状态一致，则取反
          const res1 = nodes.every(item => item.className.indexOf('active') > -1)
          const res2 = nodes.every(item => item.className.indexOf('active') <= -1)
          nodes.forEach(item => {
            const selectedStatus = res1 !== res2 && res2 !== true ? '1' : 0
            const rowIndex = item.getAttribute('rowIndex')
            const colIndex = item.getAttribute('colIndex')
            if (selectedStatus === '1') {
              _this.baseData[rowIndex].splice(colIndex, 1, 0)
            } else {
              _this.baseData[rowIndex].splice(colIndex, 1, '1')
            }
          })
          _this.init()
          _this.submit()
        }
      })
    })
  },
  methods: {
    filterHours(data) {
      const res = []
      let a = []
      // let a = new Array(2) // [起始时间，结束时间]
      data.forEach((item, index) => {
        if (item === '1') {
          if (a.length === 0) {
            a[0] = index
          }
          if (index === data.length - 1) {
            a[1] = index
            res.push(a)
            a = []
          }
        } else {
          if (a.length >= 1) {
            a[1] = index - 1
            res.push(a)
            a = []
          }
        }
      })
      const result = []
      res.forEach((item) => {
        let a = ''
        let b = ''
        if (item[0] > 9) {
          a = `${item[0]}:00~`
        } else {
          a = `0${item[0]}:00~`
        }
        if (Number(item[1]) + 1 > 9) {
          b = `${Number(item[1]) + 1}:00`
        } else {
          b = `0${Number(item[1]) + 1}:00`
        }
        result.push(a + b)
      })
      return result.join('、')
    },
    submit() {
      // 多维数组Array.prototype.slice.call(this),和Array.form()都不能深度克隆
      const resArray = []
      this.baseData.forEach(el => {
        const arr = []
        el.forEach(v => {
          arr.push(v)
        })
        resArray.push(arr)
      })
      const data = (resArray && resArray.length ? resArray : []).map(function(n) {
        return parseInt(n.reverse().join(''), 2) || 0
      })
      this.$emit('change', data)
    },
    init() {
      this.handleCheckedRow()
      this.handleCheckedCol()
    },
    handleCheckedCol() {
      this.headerData.forEach((ele, colIndex) => {
        let count = 0
        this.baseData.forEach(function(el) {
          if (el[colIndex] === '1') {
            count++
          }
        })
        if (count === this.checkedList.length) {
          this.headerData.splice(colIndex, 1, '1')
        } else {
          this.headerData.splice(colIndex, 1, 0)
        }
      })
    },
    handleCheckedRow() {
      this.baseData.forEach((el, rowIndex) => {
        let count = 0
        el.forEach(v => {
          if (v === '1') {
            count++
          }
        })
        if (count === el.length) {
          this.checkedList.splice(rowIndex, 1, true)
        } else {
          this.checkedList.splice(rowIndex, 1, false)
        }
      })
    },
    handleWeekChange(rowKey, value) {
      if (this.checkedList[rowKey] === true) {
        for (let i = 0; i < this.baseData[rowKey].length; i++) {
          this.$set(this.baseData[rowKey], i, '1')
        }
      } else {
        for (let i = 0; i < this.baseData[rowKey].length; i++) {
          this.$set(this.baseData[rowKey], i, 0)
        }
      }
      this.handleCheckedCol()
      this.submit()
    },
    handleChange(selectedStatus, colIndex, rowIndex) {
      // 当前行rowIndex 当前列colIndex selectedStatus选中状态
      if (selectedStatus === '1') {
        this.baseData[rowIndex].splice(colIndex, 1, 0)
      } else {
        this.baseData[rowIndex].splice(colIndex, 1, '1')
      }
      this.init()
      this.submit()
    },
    handleHeaderChange(item, colIndex) {
      if (item === '1') {
        this.headerData.splice(colIndex, 1, 0)
        this.baseData.forEach(el => {
          el.splice(colIndex, 1, 0)
        })
      } else {
        this.headerData.splice(colIndex, 1, '1')
        this.baseData.forEach(el => {
          el.splice(colIndex, 1, '1')
        })
      }
      this.handleCheckedRow()
      this.submit()
    },
    handleSelectionChange() {
      const index = this.tabModel - 1
      let nums = 0
      let vs = 0
      switch (index) {
        case 0:
          nums = 7
          break
        case 1:
          nums = 5
          break
        case 2:
          nums = 7
          vs = 5
          break
      }
      if (index !== 0) {
        for (let m = 0; m < this.baseData.length; m++) {
          for (let i = 0; i < this.baseData[m].length; i++) {
            this.baseData[m].splice(i, 1, 0)
          }
        }
      }
      for (let k = vs; k < nums; k++) {
        for (let i = 0; i < this.baseData[k].length; i++) {
          this.baseData[k].splice(i, 1, '1')
        }
      }
      this.init()
      this.submit()
    },
    resetHours() {
      for (let m = 0; m < this.baseData.length; m++) {
        for (let i = 0; i < this.baseData[m].length; i++) {
          this.baseData[m].splice(i, 1, 0)
        }
      }
      this.init()
      this.submit()
    }
  }
}
</script>
<style lang="less" scoped>
.hours{
  width: 710px;
}
ul {
  margin: 0;
  padding: 0;
}
.hours-selection{
  margin-bottom: 10px;
}
.hours-header{
  display: flex;
  .left-header{
    width: 84px;
    height: 80px;
    line-height: 80px;
    border: 1px solid #CACED4;
    border-bottom: none;
    text-align: center;
    color: #303133;
    background: #fafafa;
    font-size: 14px;
  }
  .right-header{
    width: 624px;
    background: #fafafa;
    .header-top{
      height: 40px;
      line-height: 40px;
      display: flex;
      div {
        width: 371px;
        text-align: center;
        color: #303133;
        font-size: 14px;
        border-right: 1px solid #CACED4;
        border-top: 1px solid #CACED4;
      }
    }
    .header-content{
      display: flex;
      div{
        width: 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        color: #303133;
        font-size: 14px;
        border-right: 1px solid #CACED4;
        border-top: 1px solid #CACED4;
      }
    }
  }

}
.hours-footer{
  border: 1px solid #CACED4;
  border-top: none;
  text-align: center;
  color: #303133;
  background: #fafafa;
  .top-footer{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #303133;
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    .reset{
      color: #1890FF;
      cursor: pointer;
    }
  }
  .selected-box{
    padding: 15px;
    text-align: left;
    font-size: 14px;
    div {
      line-height: 26px;
    }
  }
}
.radioButton {
  /deep/ .el-radio-button__inner {
    height: 40px;
    width: 96px;
  }
  &.is-active {
    /deep/ .el-radio-button__inner {
      background: #F3F9FE;
      box-shadow: none;
      border: 1px solid #1890FF;
      color: #1890FF;
    }
  }
  /deep/ .el-radio-button__orig-radio:disabled:checked + .el-radio-button__inner {
    background: #F2F6FC;
    border: 1px solid #F2F6FC;
    color: #c0c4cc;
  }
}
.hours-content {
  display: flex;
  .left-content {
    width: 84px;
    border: 1px solid #CACED4;
    border-bottom: none;
    background: rgba(250, 250, 250, 1);
    .hours-left {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid #CACED4;
      vertical-align: middle;
      /deep/ .is-checked .el-checkbox__inner {
        background-color: #3DA9FF;
      }
      /deep/ .is-checked .el-checkbox__label {
        color: #303133 !important;
      }
    }
  }
  .right-content{
    flex: 1;
    ul{
      &:nth-child(7) {
        li{
          border-bottom: 1px solid #CACED4;
        }
      }
      li {
        list-style: none;
        display: inline-block;
        width: 26px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        color: #e6e6e6;
        font-size: 12px;
        border-right: 1px solid #CACED4;
        border-top: 1px solid #CACED4;
        background: #ffffff;
        vertical-align: middle;
        &.active {
          color: #fff;
          background: #1890FF;
        }
        &:last-child {
          border-right: 1px solid #CACED4;
          border-bottom: 1px solid #CACED4;
        }
      }
    }
  }
}
</style>
