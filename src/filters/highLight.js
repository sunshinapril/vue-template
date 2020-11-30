const escapeRe = /[-/\\^$*+?.()|[\]{}]/g

function EscapeRegexCharacter(s) {
  return s.replace(escapeRe, '\\$&')
}

const highLight = (value, words, color = '#E94848') => {
  const matchStr = words.map(c => EscapeRegexCharacter(c)).join('|')
  const re = new RegExp(matchStr, 'gi')
  value = value.replace(re, `<em style="color:${color};font-style: inherit;">$&</em>`)
  return value
}

export default highLight
