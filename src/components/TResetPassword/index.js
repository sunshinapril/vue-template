import Vue from 'vue'
import resetPasswordVue from './index.vue'

const defaults = {
  title: '重设密码',
  // 异步处理模式，所有操作都需要手动关闭弹框
  async: false
}

const ResetPasswordConstructor = Vue.extend(resetPasswordVue)

let currentMsg, instance
const defaultCallback = action => {
  if (currentMsg) {
    const callback = currentMsg.callback
    if (typeof callback === 'function') {
      callback(action)
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        currentMsg.resolve()
      } else if (action === 'cancel' && currentMsg.reject) {
        currentMsg.reject()
      }
    }
  }
}
const initInstance = () => {
  instance = new ResetPasswordConstructor({
    el: document.createElement('div')
  })
  instance.callback = defaultCallback
}

const showMsg = () => {
  if (!instance) {
    initInstance()
  }

  if (!instance.visible) {
    const options = currentMsg.options
    for (const prop in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop]
      }
    }
    if (options.callback === undefined) {
      instance.callback = defaultCallback
    }
    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      instance.visible = true
    })
  }
}
const ResetPasswordBox = function(options, callback) {
  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      currentMsg = {
        options: Object.assign({}, defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      }
      showMsg()
    })
  } else {
    currentMsg = {
      options: Object.assign({}, defaults, options),
      callback: callback
    }
    showMsg()
  }
}

ResetPasswordBox.setDefaults = defaults => {
  ResetPasswordBox.defaults = defaults
}

ResetPasswordBox.alert = (message, title, options) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  } else if (title === undefined) {
    title = ''
  }

  return ResetPasswordBox(Object.assign({
    title: title,
    message: message,
    type: 'alert'
  }, options))
}

ResetPasswordBox.close = () => {
  instance.close()
  instance.visible = false
  currentMsg = null
}

export default ResetPasswordBox
