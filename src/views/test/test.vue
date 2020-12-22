<template>
  <div>
    <label class="t-label">按钮</label>
    <t-button type="primary">primary</t-button>
    <t-button type="danger">danger</t-button>
    <t-button type="success">success</t-button>
    <t-button type="plain">info</t-button>
    <text-button type="primary">primary</text-button>
    <text-button type="danger">danger</text-button>
    <text-button type="success">success</text-button>
    <text-button type="info">info</text-button>
    <div style="padding: 5px 0" />
    <label class="t-label">日期</label>
    <t-date-picker
      ref="dateFormPicker"
      :value="dateRange"
      @on-change="dateFormPickerChange"
    />
    <t-slider v-model="value" style="width: 300px;" />
    <t-select v-model="select" clearable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </t-select>
    <div style="padding: 5px 0" />
    <t-table
      :query="query"
    >
      <el-table-column
        prop="date"
        label="日期"
      />
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </t-table>
    <t-slider v-model="value" />
  </div>
</template>

<script>
import TDatePicker from '@/components/TDatePicker'
export default {
  name: 'TestVue',
  components: {
    TDatePicker
  },
  data() {
    return {
      dateRange: [],
      value: 66,
      select: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      query: null
    }
  },
  created() {
    this.setQuery()
  },
  methods: {
    setQuery() {
      this.query = (page, size) => {
        console.log(page, size)
        return Promise.resolve({
          data: this.tableData,
          total: 80
        })
      }
    },
    dateFormPickerChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.t-label {
  margin-right: 10px;
  color: #8c939d;
}
</style>
