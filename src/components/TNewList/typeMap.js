export const TagTypeMap = function(score) {
  switch (true) {
    case score < 0.35:
      return 'danger'
    case score > 0.65:
      return 'success'
    /* case score >= 0.35 && score <= 0.65:
      return 'normal'*/
    default:
      return ''
  }
}
export const MoodTypeMap = function(score) {
  switch (true) {
    case score < 0.35:
      return '[负面]'
    case score > 0.65:
      return '[正面]'
    /* case score >= 0.35 && score <= 0.65:
      return '[中性]'*/
    default:
      return ''
  }
}

// 情感分析map
export const EMOTION_NMAP = {
  1: {
    name: '正面',
    value: 1
  },
  2: {
    name: '负面',
    value: 2
  },
  3: {
    name: '中性',
    value: 3
  }
}

