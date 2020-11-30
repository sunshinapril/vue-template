<style lang="less" scoped>
@import '~@/styles/colors.less';

.task-list-container {
  .task-wrapper {
    position: relative;

    .add-task-block {
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 16px;
      max-width: 208px;
      min-width: 208px;
      overflow: hidden;
      cursor: pointer;
      height: 162px;

      .inner {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          height: 18px;
          width: 18px;
        }

        .text {
          font-size: 14px;
          color: #0D2B5E;
          margin-left: 6px;
        }
      }
    }

    .mask {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 38px;
      background: linear-gradient(180deg, rgba(247, 250, 253, 0) 0%, #F7FAFD 100%);
    }
  }

  .is-zhedie {
    max-height: 235px;
    overflow: hidden;
  }
}

/* 展开按钮 */
.zhankai-btn {
  display: inline-block;
  padding: 8px 12px;
  margin-top: 12px;
  border: 1px solid #E9EEF8;
  border-radius: 8px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  .content {
    color: #4A80F5;
    font-size: 14px;
    background: #F6FAFD;
    display: flex;
    align-items: center;

    .icon--zhankai {
      display: block;
      width: 9px;
      height: 5px;
      margin-left: 6px;
    }
    .icon--shouqi {
      transform: rotate(180deg);
    }
  }
}
</style>
<template>
  <div class="task-list-container">
    <div class="task-wrapper" :class="{'is-zhedie': isZheDie}">
      <task-block v-for="(item, key) in data" ref="taskBlock" :key="key" :data="item" :show-check="showCheck"
                  @check="onCheck" @click-task="onClickTask"
      />
      <div class="t-panel add-task-block" @click="onCreateTask">
        <div class="inner">
          <img :src="icon.add" alt="">
          <span class="text">创建任务</span>
        </div>
      </div>
      <div v-if="isZheDie" class="mask" />
    </div>
    <div v-if="data.length > 4" class="zhankai-btn" @click="onToggle">
      <div class="content">
        {{ isZheDie ? '展开全部' : '收起' }}
        <img :src="icon.zhankai" alt="" class="icon--zhankai" :class="{'icon--shouqi': !isZheDie}">
      </div>
    </div>
  </div>
</template>
<script>
import TaskBlock from './TaskBlock'
import zhankai from '@/assets/butten_more_icon@2x.png'
import add from '@/assets/task_add_icon@2x.png'

export default {
  name: '',
  components: {
    TaskBlock
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    showCheck: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isZheDie: true,
      icon: {
        zhankai,
        add
      },
      checkedList: []
    }
  },
  mounted() {
  },
  methods: {
    onToggle() {
      // this.isZheDie = false;
      this.isZheDie = !this.isZheDie
    },
    onCheck(data) {
      /* 如果当前元素的 checked 是 false, 那么就去列表里面干掉这个元素 */
      if (data.checked) {
        if (this.limit && this.checkedList.length >= this.limit) {
          // 重置当前checkbox的状态
          const index = this.data.findIndex(item => item.taskId === data.taskId)
          this.$nextTick(() => {
            this.$refs.taskBlock[index].remove()
          })
          this.$notify({
            title: `监控任务最多选择${this.limit}个`, type: 'warning'
          })
          return false
        }
        this.checkedList.push(data)
      } else {
        this.checkedList = this.checkedList.filter(item => {
          return item.taskId !== data.taskId
        })
      }
      this.$emit('check', this.checkedList)
    },
    removeCheck(data) {
      let index = -1
      this.data.forEach((item, _index) => {
        if (item.taskId === data.taskId) {
          index = _index
        }
      })
      this.$refs.taskBlock[index].remove()
    },
    removeAllCheck(data) {
      this.data.forEach((item, index) => {
        if (data.find(el => item.taskId === el.taskId)) {
          this.$refs.taskBlock[index].remove()
        }
      })
    },
    onClickTask(data) {
      this.$emit('click-task', data)
    },
    onCreateTask() {
      this.$emit('click-task', {})
    }
  }
}
</script>
