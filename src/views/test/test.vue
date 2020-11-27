<template>
<div>
  <p class="text-overflow--1">666</p>
  <el-button type="primary">查询</el-button>
  <t-date-picker
    @on-change="dateFormPickerChange"
    ref="dateFormPicker"
    :value="dateRange"
  ></t-date-picker>
</div>
</template>

<script>
import TDatePicker from '@/components/date-picker'
export default {
  name: "test.vue",
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
      console.log(val);
    }
  }
}
</script>

<style scoped>

</style>
