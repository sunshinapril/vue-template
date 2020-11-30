<template>
  <div>
    <div class="title">
      <span v-if="MoodTypeMap(item.titleEmotion)" class="mood"
            :class="TagTypeMap(item.titleEmotion)"
      >{{ MoodTypeMap(item.titleEmotion) }}</span>
      <span class="title-body text-overflow--1" :class="{active: item.originContent}" @click="onSkip(item)"
            v-html="$options.filters.HighLight(item.title, keyWord)"
      />
    </div>
    <div class="tag text-overflow--1">
      <TTag v-for="tag in item.conceptsModel" :key="tag.id" effect="dark" type="success">{{ tag.name }}</TTag>
      <TTag v-for="tag in entityRisk" :key="tag.id" class="item" effect="dark" :type="tag.type">
        {{ tag.name }}
      </TTag>
      <TTag v-for="tag in otherRisk" :key="tag.name" effect="dark" type="danger" class="item">
        {{ tag.name }}
      </TTag>
      <TTag v-for="tag in customModel" :key="tag.id" class="item" effect="dark" type="primary">{{ tag.name }}</TTag>
    </div>
    <div class="content text-overflow--2"
         v-html="$options.filters.HighLight(item.paragraphs[0].paragraph, keyWord)"
    />
    <div class="origin">
      <span v-if="item.publishTime" class="t-time">{{ item.publishTime }}</span>
      <span v-if="item.source">来源：{{ item.source }}</span>
    </div>
  </div>
</template>

<script>
import { TagTypeMap, MoodTypeMap } from './typeMap'

export default {
  name: 'TNewItem',
  props: ['item', 'href', 'keyWord'],
  data() {
    return {
      TagTypeMap,
      MoodTypeMap,
      entityRisk: [],
      customModel: [],
      otherRisk: []
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(val) {
        this.handlerData(val)
      }
    }
  },
  methods: {
    onSkip(item) {
      if (this.href && item.originContent) {
        const { href } = this.$router.resolve({
          path: `${this.href}${item.id}`
        })
        window.open(href, '_blank')
      }
    },
    handlerData(data) {
      let entityRisk = []
      const customModel = []
      const otherRisk = []
      // 对实体标签做处理1、实体且风险--实体风险2、实体非风险--其他标签3、非实体且风险--其他风险
      data.entityRisk.forEach(item => {
        if (item.entityName && (item.level1Name || item.level2Name)) {
          entityRisk = [
            ...entityRisk,
            {
              name: item.entityName,
              id: item.entityId,
              type: 'normal'
            },
            {
              name: `${item.level1Name}${item.level2Name ? '-' + item.level2Name : ''}`,
              id: item.level2Id ? item.level2Id * item.entityId : item.level1Id * item.entityId,
              type: 'danger'
            }
          ]
        } else if (item.entityName && !(item.level1Name || item.level2Name)) {
          customModel.push({
            name: item.entityName,
            id: item.entityId
          })
        } else if (!item.entityName && (item.level1Name || item.level2Name)) {
          if (item.level1Name) {
            otherRisk.push({
              id: item.level1Id,
              name: item.level1Name
            })
          }
          if (item.level2Name) {
            otherRisk.push({
              id: item.level2Id,
              name: item.level2Name
            })
          }
        }
      })
      this.entityRisk = entityRisk
      this.customModel = [...customModel, ...data.customModel]
      this.otherRisk = otherRisk
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #0D2B5E;
  line-height: 25px;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  span {
    &.mood {
      width: 50px;
      &.danger {
        color: #CE4747;
      }
      &.success {
        color: #5FA161;
      }
      &.normal {
        color: #C29D7F;
      }
    }
    &.title-body {
      flex: 1;
      &.active:hover {
        color: #4A80F5;
      }
    }
  }
}
.tag {
  margin-bottom: 9px;
  span {
    margin-right: 8px;
  }
}
.content {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0D2B5E;
  line-height: 22px;
  margin-bottom: 8px;
}
.origin {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95A4BD;
  line-height: 17px;
  .t-time {
    margin-right: 5px;
  }
}
</style>
