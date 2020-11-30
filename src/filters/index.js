import highLight from './highLight'

export default {
  install: function(Vue, options) {
    Vue.filter('HighLight', highLight)
  }

}
