/**
 * 设置页面title
 * @param title
 */
export function setPageTitle(title) {
  setTimeout(function() {
    document.title = title
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      // 解决ios上不能设置title的问题
      const iframe = document.createElement('iframe')
      iframe.src = '/favicon.ico'
      iframe.style.visibility = 'hidden'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      iframe.onload = function() {
        setTimeout(function() {
          document.body.removeChild(iframe)
        }, 0)
      }
      document.body.appendChild(iframe)
    }
  }, 0)
}

/**
 * 生成uuid
 * @param len
 * @param radix
 * @return {string}
 */
export function uuid(len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uid = []
  let i
  if (len) {
    radix = radix || chars.length
    for (i = 0; i < len; i++) {
      uid[i] = chars[0 | Math.random() * radix]
    }
  } else {
    let r
    uid[8] = uid[13] = uid[18] = uid[23] = '-'
    uid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uid[i]) {
        r = 0 | Math.random() * 16
        uid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uid.join('')
}


export function flattenTreeToArray(tree, subTreeSelector, seed = []) {
  if (!subTreeSelector) {
    throw new Error('subTreeSelector is required')
  }
  if (!tree) {
    return seed
  }
  if (!(tree instanceof Array)) {
    tree = [tree]
  }
  return tree.reduce((res, node) => {
    res.push(node)
    const subTree = subTreeSelector(node)
    if (subTree && subTree.length) {
      res = flattenTreeToArray(subTree, subTreeSelector, res)
    }
    return res
  }, seed)
}

export function Distinct(arr, compare = (a, b) => a === b) {
  return arr.reduce((list, item) => {
    if (!list.some(c => compare(c, item))) {
      list.push(item)
    }
    return list
  }, [])
}

// eslint-disable-next-line no-extend-native
Array.prototype.distinct = function(compare) {
  return Distinct(this, compare)
}
