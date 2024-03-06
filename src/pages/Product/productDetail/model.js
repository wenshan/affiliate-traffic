/* eslint-disable no-undef */
/* @ts-ignore */
import Cookies from 'js-cookie';
import QueryString from 'query-string';
import { getGithubToken, queryCurrentUser } from '../../../services/ant-design-pro/api';

export default {
  namespace: 'productDetail',
  state: {
    productDetail: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        const query = QueryString.parse(window.location.search);
        console.log('query:', query);
        console.log('pathname:', pathname);
        console.log('search:', search);
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
