import testManage from '@/router/testManage';
// import marketManage from './marketManage';

const menuRoutes = [
        testManage,
    // marketManage
];

export default menuRoutes;

// todo 权限过滤
/*export function filterMenuRoute(perm = [], routes = menuRoutes) {
    // 菜单路由
    const filterMenuRoute = routes => {
        let menuRoutes = routes.filter(
            route => route.meta && route.meta.isMenu
        );
        menuRoutes.forEach(route => {
            if (route.children && route.children.length > 0) {
                route.children = filterMenuRoute(route.children);
                if (route.children.length === 0) {
                    delete route.children;
                }
            }
        });
        return menuRoutes;
    };
    return filterMenuRoute(routes);
}*/
