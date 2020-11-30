<style lang="less" scoped>
  @import '~@/styles/colors.less';
@import '~@/styles/mixins.less';
.add {
  color: #4A80F5;
  cursor: pointer;
}
.tags-input-outer {
  flex: 1;
  max-width: 400px;
}
.inline {
  display: flex;
  .del {
    color: #CE4747;
    margin-left: 15px;
    cursor: pointer;
    min-width: 2em;
  }
}
.sub-module {
  overflow: hidden;
  border-bottom: 1px solid #E9EEF8;
  .header {
    width: 100px;
    padding-right: 12px;
    text-align: right;
    font-size: 14px;
    color: #0D2B5E;
    margin: 15px 0;
    font-weight: bold;
  }
}
.apply-area-wrapper {
  .text-overflow(3);
}
</style>
<template>
  <!-- 任务弹窗 -->
  <t-dialog :show.sync="showDialog" :title="dialogTitle" width="600px" @on-submit="onSave">
    <el-form :model="taskForm" :rules="taskFormRules" label-width="100px" ref="form" v-if="showDialog">
      <div class="sub-module">
        <el-form-item label="任务名" prop="taskName">
          <t-input v-model="taskForm.taskName" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="备注说明" prop="taskDesc">
          <t-input type="textarea" v-model="taskForm.taskDesc" :autosize="{ minRows: 5, maxRows: 5 }" resize="none"  maxlength="200" show-word-limit placeholder="限制长度为200个汉字"/>
        </el-form-item>
        <el-form-item label="邮箱推送" prop="email">
          <div class="inline">
            <t-input v-model="taskForm.notifyEmails" placeholder="推送邮箱（多个逗号隔开）" />
            <t-select style="margin-left: 20px;width: 300px;" placeholder="推送频率" v-model="taskForm.pushFrequency" clearable multiple>
              <el-option v-for="(item, key) in frequencies" :key="key" :value="item.value" :label="item.label"></el-option>
            </t-select>
          </div>
        </el-form-item>
        <!-- {{taskForm.sourceGroupIdList}} -->
        <el-form-item label="舆情来源">
          <t-select placeholder="不限" v-model="taskForm.sourceGroupIdList" multiple clearable style="width: 100%">
            <el-option v-for="(item, key) in applyAreas" :key="key" :value="item.value" :label="item.label"></el-option>
          </t-select>
<!--           <el-cascader :options="applyAreas" :props="applyProps" v-model="taskForm.sourceGroupIdList" clearable filterable :show-all-levels="false">
            <template slot-scope="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader> -->
        </el-form-item>
        <el-form-item label="情感标签" prop="sentimentTag">
          <t-select placeholder="不限" v-model="taskForm.sentimentTag" clearable>
            <el-option v-for="(item, key) in sentimentTags" :key="key" :value="item.value" :label="item.label"></el-option>
          </t-select>
        </el-form-item>
      </div>
      <div class="sub-module">
        <header class="header">标签规则</header>
        <el-form-item label="包含标签">
          <t-select style="width: 100%" placeholder="请选择" v-model="taskForm._includeTags" clearable multiple filterable remote :remote-method="fetchTags" @remove-tag="onRemoveTag">
            <el-option-group v-for="(group, key) in tagList" :key="key" :label="group.label">
              <el-option @click.native="onClickTag(tag)" v-for="(tag, index) in group.children" :key="tag.value" :label="tag.label" :value="tag.value">
              </el-option>
              <!-- 这个纯粹是为了在 编辑的时候, 可以展示出来之前选择的值 -->
              <el-option v-show="false" v-for="(tag, index) in selectedTagsOriginalValue" :key="index" :label="tag.label" :value="tag.value">
              </el-option>
            </el-option-group>
          </t-select>
        </el-form-item>
        <el-form-item label="且包含">
          <div class="also-wrapper">
            <header>
              <span @click="onAddAlsoTags" class="add">添加</span>
            </header>
          </div>
          <div class="inline" style="margin-bottom: 10px" v-for="(item, key) in taskForm._alsoIncludeTags" :key="key">
            <t-select style="width: 100%" placeholder="请选择" v-model="taskForm._alsoIncludeTags[key]" clearable multiple filterable remote :remote-method="fetchTags" @remove-tag="onRemoveTag">
              <el-option-group v-for="(group, key) in tagList" :key="key" :label="group.label">
                <el-option @click.native="onClickTag(tag)" v-for="(tag, index) in group.children" :key="tag.value" :label="tag.label" :value="tag.value">
                </el-option>
                <!-- 这个纯粹是为了在 编辑的时候, 可以展示出来之前选择的值 -->
                <el-option v-show="false" v-for="(tag, index) in selectedTagsOriginalValue" :key="index" :label="tag.label" :value="tag.value">
                </el-option>
              </el-option-group>
            </t-select>
            <span @click="onDelAlsoTags(key)" class="del" v-if="key>0">删除</span>
          </div>
        </el-form-item>
        <el-form-item label="不包含标签" v-if="false">
          <div class="also-wrapper">
            <header v-if="false">
              <span @click="onAddNotIncludeTags" class="add">添加</span>
            </header>
            <div class="inline" style="margin-bottom: 10px" v-for="(item, key) in taskForm._notIncludeTags" :key="key">
              <!-- <tags-input class="tags-input-outer" v-model="taskForm._notIncludeTags[key]" /> -->
              <t-select style="width: 100%" placeholder="请选择" v-model="taskForm._notIncludeTags[key]" clearable multiple filterable remote :remote-method="fetchTags" @remove-tag="onRemoveTag">
                <el-option-group v-for="(group, key) in tagList" :key="key" :label="group.label">
                  <el-option v-for="(tag, index) in group.children" :key="tag.value" :label="tag.label" :value="tag.value">
                  </el-option>
                </el-option-group>
              </t-select>
              <span @click="onDelNotIncludeTags" class="del" v-if="key>0">删除</span>
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="sub-module">
        <header class="header">关键词规则</header>
        <el-form-item label="包含关键词">
          <tags-input class="tags-input-outer" v-model="taskForm._includeKeywords" />
        </el-form-item>
        <el-form-item label="且包含">
          <div class="also-wrapper">
            <header>
              <span @click="onAddAlsoKeywords" class="add">添加</span>
            </header>
            <div class="inline" style="margin-bottom: 10px" v-for="(item, key) in taskForm._alsoIncludeKeywords" :key="key">
              <tags-input class="tags-input-outer" v-model="taskForm._alsoIncludeKeywords[key]" />
              <span @click="onDelAlsoKeywords(key)" class="del" v-if="key>0">删除</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="不包含关键词" v-if="false">
          <div class="also-wrapper">
            <header v-if="false">
              <span @click="onAddNotIncludeKeywords" class="add">添加</span>
            </header>
            <div class="inline" style="margin-bottom: 10px" v-for="(item, key) in taskForm._notIncludeKeywords" :key="key">
              <tags-input class="tags-input-outer" v-model="taskForm._notIncludeKeywords[key]" />
              <span @click="onDelNotIncludeKeywords" class="del" v-if="key>0">删除</span>
            </div>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </t-dialog>
</template>
<script>
let tplForm = {
  taskId: '',
  taskName: '',
  taskDesc: '',
  notifyEmails: '',
  pushFrequency: [],
  sourceGroupIdList: [],
  sentimentTag: '',
  /* 标签规则 */
  _includeTags: [],
  _alsoIncludeTags: [
    []
  ],
  /* 关键词规则 */
  _includeKeywords: [],
  _alsoIncludeKeywords: [
    []
  ],
}
let deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj))
}
import TagsInput from '@/components/TagsInput'
import qs from 'querystring'
export default {
  name: '',
  props: {
    form: {
      default () {
        return {}
      }
    }
  },
  components: {
    TagsInput,
  },
  data() {
    return {
      dialogTitle: '',
      showDialog: false,
      taskForm: deepCopy(tplForm),
      /* 检验规则 */
      taskFormRules: {
        taskName: [{
          required: true,
          message: '请输入任务名称',
          trigger: 'blur'
        }],
        sourceGroupIdList: [{
          type: 'array',
          required: true,
          message: '请选择应用范围',
          trigger: 'change'
        }]
      },
      /* 应用范围的值 */
      applyAreas: [],
      /* 应用范围的配置 */
      /* 推送频率 */
      frequencies: [],
      /* 情感标签 */
      sentimentTags: [],
      /* 标签列表 */
      tagList: [],
      /* 这个字段只是用来参与: 编辑的时候, 展示原本选择的标签 */
      selectedTagsOriginalValue: [],
    }
  },
  mounted() {
    /* 获取情感标签列表 */
    this.fetchEmotionTags();
    this.fetchTags();
    /* 获取应用范围 */
    this.fetchApplyAreas();
    /* 设置推送频率 */
    this.setPushFrequency();
  },
  methods: {
    /* 创建推送频率 */
    setPushFrequency() {
      let start = 0;
      let end = 23;
      for (let i = start; i <= end; i++) {
        for (let j = 0; j < 2; j++) {
          this.frequencies.push({
            label: `${i < 10 ? '0' + i : i}:${j==0? '00' : '30'}`,
            value: `${i < 10 ? '0' + i : i}:${j==0? '00' : '30'}`
          })
        }
      }
    },
    fetchEmotionTags() {
      this.sentimentTags = [{ label: '正面', value: 1 }, {
        label: '负面',
        value: 2
      }, { label: '中性', value: 3 }]
    },
    fetchApplyAreas() {
      axios.get(`/sentiment/querySourceGroup?queryDetail=false`)
        .then(res => {
          if (res.data.code == 200) {
            /* 将返回的数据, 转换一下格式 */
            res.data.data.data.forEach(group => {
              group.label = group.groupName;
              group.value = group.groupId;
            })
            this.applyAreas = res.data.data.data;
          }
        })
    },
    init(taskId) {
      /* 逻辑说明
        init 提供给外界调用
        用来初始化整个表单
        如果外界没有传递值进来, 我们认为是 新建
        如果外界传递值进来, 我们认为是     编辑, 就这么简单
        然后为了方便一点, 因为在多个地方都会有编辑任务, 所以我们把 根据 taskId 拿到任务详情数据的接口, 也放到这里来.
        所以这里判断就很简单:
        如果有 taskId 则是编辑, 
        没有 taskId   就是创建
       */
      this.taskForm = deepCopy(tplForm);
      if (!taskId) {
        /* 新建 */
        this.dialogTitle = '新建任务';
        this.showDialog = true;
      } else {
        /* 为了清空上次标签的搜索的结果 */
        this.fetchTags();
        this.initTaskForm(taskId);
      }
    },
    initTaskForm(taskId) {
      axios.get(`/sentiment/queryTask?${qs.stringify({
        taskId
      })}`).then(res => {
        if (res.data.code == 200) {
          /* 设置标题 */
          this.dialogTitle = '编辑任务'
          /* 打开弹窗  */
          this.showDialog = true;
          /* 获取任务详情 */
          let t = res.data.data.data;
          /* 先给表单项赋值 */
          for (let key in this.taskForm) {
            /* 如果有值, 就赋值 */
            if (t[key]) {
              this.taskForm[key] = t[key]
            }
          }
          /* 针对单个字段进行转换 
            1, 先将 feExtend 字段拆出来, 用来渲染 应用范围和 标签规则 两块内容
          */
          let feExtend = {}
          try {
            feExtend = JSON.parse(t.feExtend)
          } catch (err) {}
          /* 应用范围设置 */
          /* 标签设置 
            1 先将选中的原始值初始化
            2 再将选中的 tags 初始化
          */
          this.selectedTagsOriginalValue = feExtend.tags;
          /* 如果长度超过1, 则 also 需要先清空一下 */
          if (t.includeTagList.length > 1) {
            this.taskForm._alsoIncludeTags = []
          }
          t.includeTagList.forEach((item, index) => {
            if (index == 0) {
              this.taskForm._includeTags = item.map(i => {
                return `${i.tagId}&${i.tagType}`
              });
            } else {
              this.taskForm._alsoIncludeTags.push(item.map(i => {
                return `${i.tagId}&${i.tagType}`
              }))
            }
          })
          /* 推送频率: 需要使用 pushFrequencyList */
          this.taskForm.pushFrequency = t.pushFrequencyList || []
          /* 情感标签, 由字符串类型, 转换成数字类型 */
          if (t.sentimentTag) {
            this.taskForm.sentimentTag = parseInt(t.sentimentTag);
          }
          /* 包含关键词, 且包含关键词, 不包含关键词 初始化 */
          /* 包含 */
          if (t.includeKeywordList.length >= 1) {
            this.taskForm._alsoIncludeKeywords = []
          }
          t.includeKeywordList.forEach((item, index) => {
            if (index == 0) {
              this.taskForm._includeKeywords = item;
            } else {
              this.taskForm._alsoIncludeKeywords.push(item)
            }
          })
        }
      }).catch(err => {})
    },
    /* 保存任务 */
    onSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          /* 通过验证了*/
          let api = '/sentiment/createTask'
          let params = deepCopy(this.taskForm)
          /* 将表单格式化成后端所需要的格式 */
          /* email 在前端是一个逗号隔开的字符串, 但是传递给后端需要split 成数组 */
          if (params.notifyEmails) {
            /* 先不管什么, 用户输入的时候极有可能输入的是中文或者英文的 逗号, 转换一下再说 */
            params.notifyEmails = params.notifyEmails.replace(/，/g, ',')
            params.notifyEmails = params.notifyEmails.split(',')
            /* trim 一下 */
            params.notifyEmails.forEach(email => {
              email = email.trim();
            })
            /* 校验一下输入的邮箱是否符合规则 */
            let emailReg = new RegExp(/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/)
            let allPass = true;
            for (let i = 0; i < params.notifyEmails.length; i++) {
              /* 如果没有检验, 就报错*/
              if (!emailReg.test(params.notifyEmails[i])) {
                allPass = false;
              }
            }
            if (allPass == false) {
              this.$message({
                type: 'warning',
                message: '邮箱错误'
              })
              return;
            }
          } else {
            params.notifyEmails = []
          }
          /* 先存起来 sourceGroupIdList 再说*/
          params.feExtend = JSON.stringify({
            tags: this.selectedTagsOriginalValue
          })
          /* 同时应用范围在前端选择之后是一个二维数组, 需要取二维数组子项中的后一位的值 */
          /* 关键词规则 */
          /* 如果用户没有添加关键词规则, 则不做初始化, 而且是整个关键词规则都不初始化  */
          if (params._includeKeywords.length) {
            params.keywordModelList = [
              /* 包含关键词 */
              {
                include: true,
                keywords: params._includeKeywords
              }
            ]
            if (params._alsoIncludeKeywords.length) {
              /* 且包含关键词 */
              params._alsoIncludeKeywords.forEach(keywords => {
                params.keywordModelList.push({
                  include: true,
                  keywords
                })
              })
            }
          }
          delete params._includeKeywords
          delete params._alsoIncludeKeywords
          if (params._includeTags.length) {
            let includeTagList = params._includeTags.map(tag => {
              let t = tag.split('&')
              return {
                tagType: t[1],
                tagId: t[0]
              }
            })
            params.tagModelList = [includeTagList];
            /* 包含标签 */
            if (params._alsoIncludeTags.length) {
              /* 且包含标签 */
              let alsoIncludeTags = [];
              params._alsoIncludeTags.forEach(tags => {
                let list = [];
                tags.forEach(tag => {
                  let t = tag.split('&')
                  list.push({
                    tagType: t[1],
                    tagId: t[0]
                  })
                })
                params.tagModelList.push(list)
              })
            }
          }
          delete params._includeTags
          delete params._alsoIncludeTags
          axios.post(api, params)
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: 'success',
                  message: this.taskForm.taskId ? '编辑成功' : '创建成功'
                })
                this.showDialog = false;
                /* 清空表单的数据 */
                this.$emit('done');
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.message
                })
              }
            }).catch(err => {})
        }
      })
    },
    /* -------------------------------------标签的规则-------------------------------------*/
    /* 从远端获取标签列表 */
    fetchTags(inputValue) {
      if (inputValue == '') {
        return ''
      }
      axios.post(`/tag/category/manager/queryTaskTagRule`, {
        name: inputValue
      }).then(res => {
        if (res.data.code == 200) {
          this.tagList = res.data.data.data;
          this.tagList.forEach(group => {
            group.label = group.name
            group.value = group.id;
            group.children.forEach(item => {
              item.label = item.name;
              /* 将标签值加上其分组的id, 因为在创建的时候后端是需要 group.id */
              item.value = item.id + '&' + group.id
            })
          })
        }
      }).catch(err => {})
    },
    /* 添加 标签规则 且包含 */
    onAddAlsoTags() {
      this.taskForm._alsoIncludeTags.push([])
    },
    /* 删除 标签规则 且包含 */
    onDelAlsoTags(index) {
      this.taskForm._alsoIncludeTags.splice(index, 1)
    },
    /* 这个是完全为了存一下当前选中的标签, 为了下次编辑而做的 */
    onClickTag(tag) {
      let t = this.selectedTagsOriginalValue.filter(item => {
        return tag.id == item.id;
      })
      /* 当只有当前list没有这个值的时候, 才往里面存 */
      if (t.length == 0) {
        this.selectedTagsOriginalValue.push(tag);
      }
    },
    /* 点击标签的关闭按钮 */
    onRemoveTag (v) {
      /* 在 selectedTags 里面移除一下 */
      this.selectedTagsOriginalValue = this.selectedTagsOriginalValue.filter(tag => {
        return tag.value !== v
      })
    },
    /* -------------------------------------关键词的规则-------------------------------------*/
    /* 添加 关键词规则 且包含 */
    onAddAlsoKeywords() {
      this.taskForm._alsoIncludeKeywords.push([])
    },
    /* 删除 关键词规则 且包含 */
    onDelAlsoKeywords(index) {
      this.taskForm._alsoIncludeKeywords.splice(index, 1)
    },
  }
}
</script>