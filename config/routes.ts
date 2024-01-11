export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './welcome',
  },
  {
    path: '/oauth',
    layout: false,
    access: 'oauth',
    name: 'oauth',
    icon: 'smile',
    component: './oauth',
  },
  {
    path: '/failure',
    layout: false,
    access: 'oauth',
    name: 'failure',
    icon: 'smile',
    component: './failure',
  },
  {
    path: '/success',
    layout: false,
    access: 'oauth',
    name: 'success',
    icon: 'smile',
    component: './success',
  },
  {
    path: '/material',
    name: '素材管理',
    icon: 'profile',
    component: './material',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './tableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
