import Tag from '@/views/tag-manage/Tag'
import TagIc from '~/icon/ic-tag.png'
import Category from '@/views/tag-manage/Category'
import Risk from '@/views/tag-manage/Risk'
const Outlet = {
  render() {
    return <router-view />
  }
}
export default {
  name: '标签管理',
  path: '/tag',
  redirect: '/tag/tag',
  component: Outlet,
  meta: {
    title: '标签管理',
    isMenu: true,
    icon: TagIc
  },
  children: [
    {
      name: '标签',
      path: 'tag',
      component: Tag,
      meta: {
        title: '标签',
        isMenu: true
      }
    },
    {
      name: '标签分类',
      path: 'category',
      component: Category,
      meta: {
        title: '标签分类',
        isMenu: true
      }
    },
    {
      name: '风险标签',
      path: 'risk',
      component: Risk,
      meta: {
        title: '风险标签',
        isMenu: true
      }
    }
  ]
}

