// 用于获取日期本周、本月、本季度的js
/**
 * 获取本周、本季度、本月、上月的开始日期、结束日期
 */
class DatePickerUtils {
  constructor(now = new Date()) {
    this.nowDayOfWeek = now.getDay() // 今天本周的第几天
    this.nowDay = now.getDate() // 当前日
    this.nowMonth = now.getMonth() // 当前月
    this.nowYear = now.getYear() // 当前年
    this.nowYear += (this.nowYear < 2000) ? 1900 : 0
    return this
  }
  // 格式化日期：yyyy-MM-dd
  formatDate(date) {
    const myyear = date.getFullYear()
    let mymonth = date.getMonth() + 1
    let myweekday = date.getDate()
    if (mymonth < 10) {
      mymonth = '0' + mymonth
    }
    if (myweekday < 10) {
      myweekday = '0' + myweekday
    }
    return (myyear + '-' + mymonth + '-' + myweekday)
  }
  // 获得某月的天数
  getMonthDays(theYear, theMonth) {
    const monthStartDate = new Date(theYear, theMonth, 1)
    const monthEndDate = new Date(theYear, theMonth + 1, 1)
    const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
    return days
  }
  // 获得本季度的开始月份
  getQuarterStartMonth(theMonth) {
    if (!theMonth) {
      theMonth = this.nowMonth
    }
    let quarterStartMonth = 0
    if (theMonth < 3) {
      quarterStartMonth = 0
    }
    if (theMonth > 2 && theMonth < 6) {
      quarterStartMonth = 3
    }
    if (theMonth > 5 && theMonth < 9) {
      quarterStartMonth = 6
    }
    if (theMonth > 8) {
      quarterStartMonth = 9
    }
    return quarterStartMonth
  }
  // 获得本周的开始日期
  ghGetWeekStartDate() {
    const weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek)
    return this.formatDate(weekStartDate)
  }
  // 获得本周的结束日期
  ghGetWeekEndDate() {
    const weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (6 - this.nowDayOfWeek))
    return this.formatDate(weekEndDate)
  }

  // 获得下周的开始日期
  ghGetNextWeekStartDate() {
    const weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek + 7 + 1)
    return this.formatDate(weekStartDate)
  }
  // 获得上月的开始日期
  ghGetPreMonthStartDate() {
    let theYear = this.nowYear
    let theMonth = this.nowMonth - 1
    if (theMonth === 0) {
      theYear -= 1
      theMonth = 12
    }
    const preMonthStartDate = new Date(theYear, theMonth, 1)
    return this.formatDate(preMonthStartDate)
  }

  // 获得上月的结束日期
  ghGetPreMonthEndDate() {
    let theYear = this.nowYear
    let theMonth = this.nowMonth - 1
    if (theMonth === 0) {
      theYear -= 1
      theMonth = 12
    }
    const preMonthEndDate = new Date(theYear, theMonth, this.getMonthDays(theYear, theMonth))
    return this.formatDate(preMonthEndDate)
  }
  // 获得本月的开始日期
  ghGetMonthStartDate() {
    const monthStartDate = new Date(this.nowYear, this.nowMonth, 1)
    return this.formatDate(monthStartDate)
  }

  // 获得本月的结束日期
  ghGetMonthEndDate() {
    const monthEndDate = new Date(this.nowYear, this.nowMonth, this.getMonthDays(this.nowYear, this.nowMonth))
    return this.formatDate(monthEndDate)
  }

  // 获得下月开始时间
  ghGetNextMonthStartDate() {
    let theYear = this.nowYear
    let theMonth = this.nowMonth + 1
    if (theMonth === 12) {
      theYear += 1
      theMonth = 0
    }
    const nextMonthStartDate = new Date(theYear, theMonth, 1)
    return this.formatDate(nextMonthStartDate)
  }
  // 获得下月结束时间
  ghGetNextMonthEndDate() {
    let theYear = this.nowYear
    let theMonth = this.nowMonth + 1
    if (theMonth === 12) {
      theYear += 1
      theMonth = 0
    }
    const nextMonthEndDate = new Date(theYear, theMonth, this.getMonthDays(theYear, theMonth))
    return this.formatDate(nextMonthEndDate)
  }
  // 获得本季度的开始日期
  ghGetQuarterStartDate() {
    const quarterStartDate = new Date(this.nowYear, this.getQuarterStartMonth(), 1)
    return this.formatDate(quarterStartDate)
  }

  // 获取本季度的结束日期
  ghGetQuarterEndDate() {
    const quarterEndMonth = this.getQuarterStartMonth() + 2
    const quarterStartDate = new Date(this.nowYear, quarterEndMonth,
      this.getMonthDays(this.nowYear, quarterEndMonth))
    return this.formatDate(quarterStartDate)
  }
  // 获取下季度开始时间
  ghGetNextQuarterStartDate() {
    let theYear = this.nowYear
    let theQuarterMonth = this.nowMonth + 3
    if (theQuarterMonth > 11) {
      theYear += 1
      theQuarterMonth -= 12
    }
    const quarterStartDate = new Date(theYear, this.getQuarterStartMonth(theQuarterMonth), 1)
    return this.formatDate(quarterStartDate)
  }
  // 获取下季度结束时间
  ghGetNextQuarterEndDate() {
    let theYear = this.nowYear
    let theQuarterMonth = this.nowMonth + 3
    if (theQuarterMonth > 11) {
      theYear += 1
      theQuarterMonth -= 12
    }
    const nextQuarterEndMonth = this.getQuarterStartMonth(theQuarterMonth) + 2
    const nextQuarterStartDate = new Date(theYear, nextQuarterEndMonth,
      this.getMonthDays(theYear, nextQuarterEndMonth))
    return this.formatDate(nextQuarterStartDate)
  }
}
export default date => {
  return new DatePickerUtils(date)
}
