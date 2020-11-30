<style lang="less" scoped>
@import '~@/styles/colors.less';
.task-block {
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 16px;
  max-width: 208px;
  min-width: 208px;
  overflow: hidden;
  cursor: pointer;
  .header {
    display: flex;
    align-items: center;
    .flex {
      flex: 1;
    }
    .icon--task {
      height: 25px;
      width: 25px;
      min-width: 25px;
    }
    .name {
      font-size: 14px;
      color: @active;
      margin-left: 4px;
      .text-overflow(1);
    }
  }
  .body {
    margin-top: 12px;
    .num {
      font-size: 28px;
      line-height: 28px;
      color: @active;
      .text-overflow(1);
    }
    .name {
      font-size: 14px;
      color: @active;
      margin-top: 3px;
    }
  }
  .footer {
    margin-top: 12px;
    color: #95A4BD;
    font-size: 14px;
  }
}
</style>
<template>
  <div class="task-block t-panel" @click="onClickTask">
    <div class="header">
      <img :src="icon.task" alt="" class="icon--task">
      <span class="name">{{ data.taskName }}</span>
      <span class="flex" />

      <div v-if="showCheck" @click.stop="()=>{}">
        <el-checkbox v-model="checked" />
      </div>

    </div>
    <div class="body">
      <div class="num bold">{{ data.todayWarnCount }}</div>
      <div class="name">今日预警量</div>
    </div>
    <div class="footer">
      累计: {{ data.totalWarnCount }}
    </div>
  </div>
</template>
<script>
import task from '@/assets/task_icon@2x.png'

export default {
  name: '',
  components: {},
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
      required: true
    },
    showCheck: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      icon: {
        task
      },
      task: ''
    }
  },
  computed: {
    checked: {
      get() {
        return this.task.checked || false
      },
      set(val) {
        this.task = {
          ...this.task,
          checked: val
        }
        this.$emit('check', this.task)
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(newV) {
        this.task = newV
      }
    }
  },
  mounted() {
  },
  methods: {
    remove() {
      this.checked = false
    },
    onClickTask() {
      this.$emit('click-task', this.data)
    }
  }
}
</script>
