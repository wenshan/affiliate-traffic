﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', redirect: '/user/login' },
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    name: '欢迎👏🏻',
    path: '/welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: '项目管理',
    path: '/project',
    icon: 'profile',
    layout: true,
    routes: [
      { path: '/project', redirect: '/project/index' },
      {
        name: '项目列表',
        path: '/project/index',
        component: './Project',
      },
    ],
  },
  {
    name: '素材管理',
    path: '/material',
    icon: 'profile',
    layout: true,
    routes: [
      { path: '/material', redirect: '/material/index' },
      {
        name: '素材列表',
        path: '/material/index',
        component: './Material',
      },
    ],
  },
  {
    name: '广告管理',
    path: '/banner',
    icon: 'table',
    layout: true,
    routes: [
      { path: '/banner', redirect: '/banner/index' },
      {
        name: 'Banner广告',
        path: '/banner/index',
        component: './Banner',
      },
    ],
  },
  {
    name: '商品管理',
    path: '/product',
    layout: true,
    icon: 'profile',
    routes: [
      { path: '/product', redirect: '/product/CostsExchange' },
      {
        name: '成本&汇率',
        path: '/product/CostsExchange',
        component: './Product/CostsExchange',
      },
      {
        name: '商品分类',
        path: '/product/ProductCustomType',
        component: './Product/ProductCustomType',
      },
      {
        name: '主商品列表',
        path: '/product/ProductCreate',
        component: './Product/ProductCreate',
      },
      {
        name: 'SKU商品',
        path: '/product/ProductCreateSku',
        hideInMenu: true,
        component: './Product/ProductCreateSku',
        parentKeys: ['/product'],
      },
      {
        name: 'SKU商品列表',
        path: '/product/ProductList',
        component: './Product/ProductList',
      },
      {
        name: 'Merchant Product',
        path: '/product/ProductListMerchant',
        component: './Product/ProductListMerchant',
      },
    ],
  },
  {
    name: '西子翠苑',
    path: '/community',
    icon: 'profile',
    access: 'canAdmin',
    layout: true,
    routes: [
      { path: '/community', redirect: '/community/Dashboard' },
      {
        name: '数据面板',
        path: '/community/Dashboard',
        component: './Community/Dashboard',
      },
      {
        name: '数据检索',
        path: '/community/TableList',
        component: './Community/TableList',
      },
    ],
  },
  /*
  {
    name: '管理页',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        name: '二级管理页',
        path: '/admin/sub-page',
        component: './admin',
      },
    ],
  },
  */
  {
    name: '账户',
    path: '/account',
    icon: 'crown',
    layout: true,
    routes: [
      { path: '/account', redirect: '/account/PersonInfo' },
      {
        name: '基础信息',
        path: '/account/PersonInfo',
        component: './Account/PersonInfo',
      },
    ],
  },
  /*
  {
    name: '查询表格',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  */
  {
    path: '/',
    redirect: '/Welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
