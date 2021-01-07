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
      @sort-change="sortChange"
    >
      <el-table-column
        prop="date"
        label="日期"
        sortable
      />
      <el-table-column
        prop="name"
        sortable
        label="姓名"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <text-button @click="onEdit(scope.row)">编辑</text-button>
          <text-button type="danger" @click="onDel(scope.row)">删除</text-button>
        </template>
      </el-table-column>
    </t-table>
    <t-dialog :show.sync="showDialog" :form="form" :rules="rules" :title="title">
      <template slot="form">
        <el-form-item prop="name" label="姓名">
          <t-input v-model="form.name" />
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <t-input v-model="form.address" />
        </el-form-item>
      </template>
    </t-dialog>
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
          name: '小明',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '小红',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '小蓝',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      query: null,
      sort: 'id ascending',
      form: {
        name: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '姓名必填', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址必填', trigger: 'blur' }
        ]
      },
      showDialog: false,
      title: ''
    }
  },
  created() {
    this.setQuery()
  },
  methods: {
    setQuery() {
      this.query = (page, size) => {
        console.log(page, size, this.sort)
        return Promise.resolve({
          data: this.tableData,
          total: 80
        })
      }
    },
    dateFormPickerChange(val) {
      console.log(val)
    },
    sortChange({ prop, order }) {
      this.sort = order ? `${prop} ${order}` : ''
      this.setQuery()
    },
    onDel(row) {
      if (row.id) {
        this.$alertBox('该条数据被外链关联，请先解除关联关系', '提示', {
          confirmButtonText: '我知道了'
        }).then(res => {
          console.log('删除')
        }).catch(() => {
          console.log('取消')
        })
      } else {
        this.$messageBox(`<p style="color: palevioletred">确定删除${row.name}吗？</p>`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          console.log('确定')
        }).catch(() => {
          console.log('取消')
        })
      }
    },
    onEdit(row) {
      this.showDialog = true
      this.title = '编辑'
      this.form = {
        name: row.name,
        address: row.address
      }
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
