import DatePickerUtilsObj from '@/utils/DatePickerUtils.js'

const DatePickerUtils = DatePickerUtilsObj()

export default {
  disabledDate(time) {
    const curDate = (new Date()).getTime()
    const three = 90 * 24 * 3600 * 1000
    const threeMonths = curDate - three
    return time.getTime() > Date.now() || time.getTime() < threeMonths
  },
  shortcuts: [
    {
      text: '昨天',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '今天',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 0)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '明天',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() + 3600 * 1000 * 24 * 1)
        end.setTime(end.getTime() + 3600 * 1000 * 24 * 1)
        picker.$emit('pick', [start, end])
      }
    },
    /* {
      text: '最近七天',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
        picker.$emit('pick', [start, end])
      }
    },*/
    {
      text: '上周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        const getDay = new Date().getDay()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * (6 + getDay))
        end.setTime(end.getTime() - 3600 * 1000 * 24 * getDay)
        picker.$emit('pick', [start, end])
      }
    },
    /* {
      text: '未来七天',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() + 3600 * 1000 * 24 * 1)
        end.setTime(start.getTime() + 3600 * 1000 * 24 * 6)
        picker.$emit('pick', [start, end])
      }
    },*/
    {
      text: '上个月',
      onClick(picker) {
        const d = DatePickerUtils.ghGetPreMonthStartDate()
        const m = DatePickerUtils.ghGetPreMonthEndDate()
        const start = new Date(d)
        const end = new Date(m)
        start.setTime(start)
        end.setTime(end)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '本月',
      onClick(picker) {
        const d = DatePickerUtils.ghGetMonthStartDate()
        // let m = DatePickerUtils.ghGetMonthEndDate();
        const start = new Date(d)
        const end = new Date()
        start.setTime(start)
        end.setTime(end)
        picker.$emit('pick', [start, end])
      }
    }
    // {
    //      text: '下个月',
    //      onClick(picker) {
    //          let d = DatePickerUtils.ghGetNextMonthStartDate();
    //          let m = DatePickerUtils.ghGetNextMonthEndDate();
    //          const start = new Date(d);
    //          const end = new Date(m);
    //          start.setTime(start);
    //          end.setTime(end);
    //          picker.$emit('pick', [start, end]);
    //      }
    //  }, {
    //      text: '下个季度',
    //      onClick(picker) {
    //          let d = DatePickerUtils.ghGetNextQuarterStartDate();
    //          let m = DatePickerUtils.ghGetNextQuarterEndDate();
    //          const start = new Date(d);
    //          const end = new Date(m);
    //          start.setTime(start);
    //          end.setTime(end);
    //          picker.$emit('pick', [start, end]);
    //      }
    //  }
  ]
}
