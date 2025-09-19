/* eslint-disable */
/* @ts-ignore */

import { googleGetToken, googleGetUserinfo } from '@/services/api/login';
export default {
  namespace: 'common',
  state: {
    platform: 'pc', // wap:浏览器访问 wxwap: 微信访问
    mobile: '',
    type: 1, // 登录参数 1.微信 2.QQ 3.穿新衣 4.微信公众号 5.芝麻信用 6.京东 7.宝宝树 8.返利 9.QQ内部应用登录 10.微信积分购小程序 11. 支付宝无线换小程序 12.微信无线换小程序 13.微信穿新衣小程序
    query: '',
    code: '', // 微信code
    state: '',
    isAuthorized: false, // 是否已经授权
    userinfo: {
      access_token: '',
      expires_in: '',
      nickname: 'nickname',
      refresh_token: '',
      openid: '',
      unionid: '',
      email: '',
      scope: '',
      token_type: 'Bearer',
      user_project_group_id: 1,
    },
    defaultProject: {},
    isLoading: false,
  },

  effects: {
    *googleGetUserinfo({ payload }, { call, put, select }) {
      const userinfo = yield select((state) => state.common);
      const { expires_in, access_token } = payload;
      if (expires_in && access_token) {
        const result = yield call(googleGetUserinfo, { access_token, expires_in });
        console.log('result:', result);
      }
    },
    *googleGetToken({ payload }, { call, put, select }) {
      const { code } = payload;
      if (code) {
        const result = yield call(googleGetToken, { code });
        console.log('result:', result);
      }
    },
  },

  reducers: {
    update(state, { payload: data }) {
      return { ...state, ...data };
    },
    updateUserinfo(state, { payload: data }) {
      const { userinfo } = state;
      return Object.assign({}, userinfo, data);
    },
  },
};
