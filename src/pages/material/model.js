/* eslint-disable no-undef */
/* @ts-ignore */
import QueryString from 'query-string';
import Cookies from 'js-cookie';
import { getGithubToken, queryCurrentUser } from '../../services/ant-design-pro/api';

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
  },

  subscriptions: {
    setup({ dispatch, history }) {
      const access_token = Cookies.get('access_token');
      history.listen(({ pathname, search }) => {
        const query = QueryString.parse(search);
        if (query && query.state && query.code) {
          console.log('query:', query);
          console.log('pathname:', pathname);
          dispatch({
            type: 'update',
            payload: {
              state: query.state,
              code: query.code,
            },
          });
          // 获取token
          dispatch({ type: 'getGithubToken' });
        } else {
          if (access_token) {
            dispatch({
              type: 'getCurrentUserInfo',
              payload: {
                access_token,
              },
            });
          } else {
          }
        }
      });
    },
  },

  effects: {
    *getGithubToken({ payload }, { call, put, select }) {
      const code = yield select((state) => state.common.code);
      console.log('code:', code);
      const result = yield call(getGithubToken, { code });
      console.log('result:', result.data);
      // 更新成功 获取用户信息
      if (result && result.data && result.data.access_token) {
        yield put({ type: 'update', payload: { currentUser: result.data } });
        // 设置token 有效期
        // expires 失效时间
        const expiresTime = new Date(new Date() * 1 + (7200 - 200) * 1000);
        Cookies.set('access_token', result.data.access_token, { expires: expiresTime });
      }
    },
    // subscriptions 更新当前的用户信息
    *updateUserinfo({ payload: data }, { call, put, select }) {
      const currentUserinfo = yield select((state) => state.common.currentUser);
      const updetaUserinfo = Object.assign({}, currentUserinfo, data);
      yield put({ type: 'update', payload: { currentUser: updetaUserinfo } });
    },
    // 获取用户信息
    *getCurrentUserInfo({ payload: data }, { call, put, select }) {
      const { access_token } = data;
      const result = yield call(queryCurrentUser, { access_token });
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
