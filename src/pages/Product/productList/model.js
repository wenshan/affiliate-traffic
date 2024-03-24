/* eslint-disable no-undef */
/* @ts-ignore */
import { currentUser } from '@/services/api/login';
import QueryString from 'query-string';

export default {
  namespace: 'productList',
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
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        const query = QueryString.parse(search);
        console.log('query:', query);
        console.log('pathname:', pathname);
      });
    },
  },

  effects: {
    // subscriptions 更新当前的用户信息
    *updateUserinfo({ payload: data }, { call, put, select }) {
      const currentUserinfo = yield select((state) => state.common.currentUser);
      const updetaUserinfo = Object.assign({}, currentUserinfo, data);
      yield put({ type: 'update', payload: { currentUser: updetaUserinfo } });
    },
    // 获取用户信息
    *getCurrentUserInfo({ payload: data }, { call, put, select }) {
      const { access_token } = data;
      const result = yield call(currentUser, { access_token });
      console.log('getCurrentUserInfo-result:', result.data);
      if (result && result.data) {
        yield put({ type: 'update', payload: { currentUser: result.data } });
      }
    },
  },

  reducers: {
    update(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
