import Test from '@/views/test/test'
import TestIc from '~/icon/ic-test.png'
const Outlet = {
  render() {
    return <router-view />
  }
}
export default {
  name: '测试',
  path: '/test',
  component: Outlet,
  children: [
    {
      name: 'demo',
      path: 'demo',
      component: Outlet,
      meta: {
        isMenu: true,
        title: '外链',
        outLink: () => 'http://www.baidu.com',
        target: '_blank'
      }
    },
    {
      name: 'test',
      path: 'test',
      component: Test,
      meta: {
        title: 'title',
        isMenu: true
      }
    }
  ],
  meta: {
    title: '我是title测试',
    isMenu: true,
    icon: TestIc
  }
}

