// 必须至少包含数字、小写字母、大写字母、其它字符中的三种
function ValidPassword(pwd) {
  const hasNumber = /[\d]/.test(pwd);
  const hasLowerCaseLetter = /[a-z]/.test(pwd);
  const hasUpperCaseLetter = /[A-Z]/.test(pwd);
  const hasOther = /[^\da-zA-Z]/.test(pwd);
  if (Number(hasNumber) + Number(hasLowerCaseLetter) + Number(hasUpperCaseLetter) + Number(hasOther) < 3) {
    return false
  }
  return true;
}
// 长度6-20位
function ValidLengthInterval(val) {
  return /^.{6,20}$/.test(val)
}

// 只能输入中文/英文/数字/空格/下划线
function ValidUserName(name) {
  return /[^0-9a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D\s_]/g.test(name)
}

// 数字
function ValidNumber(val) {
  return /[^0-9]/g.test(val)
}

// 最大长度
function ValidMaxLength(val, maxLen) {
  return val.length <= maxLen
}

// 最小长度
function ValidMinLength(val, minLen) {
  return val.length >= minLen
}

export default {
  ValidPassword,
  ValidUserName,
  ValidNumber,
  ValidLengthInterval,
  ValidMaxLength,
  ValidMinLength
}


