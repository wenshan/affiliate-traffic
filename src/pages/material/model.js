/* eslint-disable no-undef */
/* @ts-ignore */
import { createFolder, delFolder, editFolder, queryFolder } from '@/services/api/material';

export default {
  namespace: 'material',
  state: {
    platform: 'pc', // wap:浏览器访问 wxwap: 微信访问
    mobile: '',
    type: 1, // 登录参数 1.微信 2.QQ 3.穿新衣 4.微信公众号 5.芝麻信用 6.京东 7.宝宝树 8.返利 9.QQ内部应用登录 10.微信积分购小程序 11. 支付宝无线换小程序 12.微信无线换小程序 13.微信穿新衣小程序
    query: '',
    code: '', // 微信code
    state: '',
    isAuthorized: false, // 是否已经授权
    currentUser: {
      access_token: '',
      expires_in: '',
      nickname: 'nickname',
      refresh_token: '',
      openid: '',
      unionid: '',
      email: '',
      userid: '',
    },
    currentFolderDirectory: {
      label: '默认分组',
      key: '0',
      is_default: true,
      active: true,
    },
    folderDirectory: [
      {
        label: '默认分组',
        key: '0',
        is_default: true,
        active: true,
      },
      {
        label: '分组一',
        key: '1',
        is_default: false,
        active: false,
      },
      {
        label: '分组二',
        key: '2',
        is_default: false,
        active: false,
      },
      {
        label: '分组三',
        key: '3',
        is_default: false,
        active: false,
      },
    ],
  },

  subscriptions: {},

  effects: {
    *queryFolder({ payload }, { call, put, select }) {
      const result = yield call(queryFolder);
      if (result.status === 200 && result.data && result.data.rows) {
        yield put({ type: 'update', payload: { folderDirectory: result.data.rows } });
      }
    },
    // subscriptions 更新当前的用户信息
    *editFolder({ payload: data }, { call, put, select }) {
      const result = yield call(editFolder, data);
      if (result.status === 200 && result.data) {
        yield put({ type: 'queryFolder' });
      }
    },
    // 获取用户信息
    *delFolder({ payload: data }, { call, put, select }) {
      const result = yield call(delFolder, data);
      if (result.status === 200 && result.data) {
        yield put({ type: 'queryFolder' });
      }
    },
    *createFolder({ payload: data }, { call, put, select }) {
      const result = yield call(createFolder, data);
      if (result.status === 200 && result.data) {
        yield put({ type: 'queryFolder' });
      }
    },
  },

  reducers: {
    update(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
