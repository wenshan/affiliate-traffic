/* eslint-disable no-undef */
/* @ts-ignore */
import { currentUser } from '@/services/api/login';
import QueryString from 'query-string';

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
