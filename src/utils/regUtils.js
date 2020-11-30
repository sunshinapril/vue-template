// 判断全是空格或者是空字符
export const Ft = /\s\S+|S+\s|\S/

// 匹配特殊字符，进行转义
export const escapeRe = /[-/\\^$*+?.()|[\]{}]/g
