import TagIc from '~/icon/tab_06_icon@2x.png'
import TagIcActive from '~/icon/tab_06.1_icon@2x.png'
export default {
  name: '标签管理',
  path: '/tag',
  redirect: '/tag/tag',
  component: 'Layout',
  meta: {
    title: '标签管理',
    icon: TagIc,
    activeIcon: TagIcActive
  },
  children: [
    {
      name: '标签',
      path: 'tag',
      component: 'tag-manage/Tag',
      meta: {
        title: '标签'
      }
    },
    {
      name: '标签分类',
      path: 'category',
      component: 'tag-manage/Category',
      meta: {
        title: '标签分类'
      }
    }
  ]
}

