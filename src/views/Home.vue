<template>
  <div class="home-box">
    <t-header>
      <t-input v-model="queryParams.name" class="mgR10" style="width: 220px;" placeholder="请输入查询名称" />
      <t-button class="mgR10" @click="setQuery">查询</t-button>
    </t-header>
    <t-body class="container">
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
      </t-table>

    </t-body>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      queryParams: {
        name: ''
      },
      query: null,
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
      ]
    }
  },
  created() {
    this.setQuery()
  },
  methods: {
    setQuery() {
      this.query = (page, size) => {
        console.log(page, size)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              data: this.tableData,
              total: 4
            })
          }, 1000)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-box {
  width: 100%;
  .container {
    margin-top: 20px;
    padding: 20px;
  }
}
</style>
