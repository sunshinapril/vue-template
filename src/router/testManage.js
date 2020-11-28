import test from '@/views/test/test'
const Outlet = {
  'template': '<router-view/>'
}
export default {
  name: '测试',
  path: '/test',
  component: test,
  children: [
    {
      name: 'demo',
      path: 'demo',
      component: Outlet,
      meta: {
        title: '我是title测试',
        outLink: () => 'http://www.baidu.com',
        target: '_blank'
      }
    }
  ],
  meta: {
    title: '我是title测试',
    isMenu: true
  }
}

