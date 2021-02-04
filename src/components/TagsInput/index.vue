<style lang="less">
@import '~@/styles/colors.less';
.custom-vue-tags-input {
  /* 修改标签背景颜色 */
  /deep/ .ti-tag {
    background: #8093B1 !important;
  }
  /* 修改容器样式 */
  /deep/ .ti-input {
    background: #F6FAFD !important;
    border: 1px solid #E9EEF8;
    border-radius: 8px;
    padding: 8px;
  }
  /* 修改 placeholder 背景*/
  .ti-new-tag-input {
    background: #F6FAFD !important;
    &::-webkit-input-placeholder {
      color: #c2c6ce;
      font-size: 14px;
    }
  }
}
.border-focus {

  /deep/ .ti-input {
    border:1px solid  #4A80F5;
    border-radius: 8px;
  }


}
</style>
<template>
  <vue-tags-input  placeholder="输入后点击Enter键创建关键词" v-model="tag" :tags="tags" class="custom-vue-tags-input" :class="{'border-focus': focus}" @tags-changed="onTagsChanged" @focus="onFocus" @blur="onBlur"/>
</template>
<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
  name: '',
  components: {
    VueTagsInput
  },
  props: {
    value: {
      default () {
        return []
      },
      required: true
    }
  },
  watch: {
    value: {
      deep: true,
      handler(n) {
        this.initTags(n)
      }
    }
  },
  data() {
    return {
      tag: '',
      tags: [],
      focus: false
    }
  },
  mounted() {
    this.initTags(this.value)
  },
  methods: {
    onFocus () {
      // console.log(2)
      this.focus = true;
    },
    onBlur () {
      console.log('fdsjk')
      this.focus = false;
    },
    initTags(tags) {
      /* 这个是传递过来的 tags, 它的格式不符合 input-tags 的格式, 所以需要转换一下 */
      this.tags = tags.map(tag => {
        return {
          text: tag
        }
      })
    },
    onTagsChanged(tags) {
      /* 输入之后, tags 就是全量的输入的数组, 但是格式不是我们所需要的, 所以我们需要额外处理一下
         将值给到 parent 之后,
         parent 会将这个值给到 value
         value 会传递给自己
         value 此时就是一个 [a,b,c] 这样子的格式
         我们再把 value 转换一下, 给到 tags
         这就形成了一个闭环
      */
      this.$emit('input', tags.map(tag => { return tag.text }));
    }
  }
}
</script>
