<template>
  <div>
    <p class="text-overflow--1">666</p>
    <el-button type="primary">查询</el-button>
    <t-date-picker
      ref="dateFormPicker"
      :value="dateRange"
      @on-change="dateFormPickerChange"
    />
  </div>
</template>

<script>
import TDatePicker from '@/components/date-picker'
export default {
  name: 'TestVue',
  components: {
    TDatePicker
  },
  data() {
    return {
      dateRange: []
    }
  },
  methods: {
    dateFormPickerChange(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>

</style>
