/* eslint-disable */
/* @ts-ignore */

export default {
  namespace: 'banner',
  state: {
    currentDetail: {
      id: '',
      language: '',
      name: '',
      src: '',
      url: '',
      type: '',
      is_show: false,
      remark: '',
      channel: '',
    },
    bannerList: {},
  },

  subscriptions: {},

  effects: {
    *createBanner({ payload }, { call, put, select }) {
      // const result = yield call(createBanner, {});
    },
    // subscriptions 更新当前的用户信息
    *editBanner({ payload: data }, { call, put, select }) {
      // const result = yield call(editBanner, data);
    },
    // 删除文件夹
    *delBanner({ payload: data }, { call, put, select }) {
      // const result = yield call(delBanner, data);
    },
    *queryBanner({ payload: data }, { call, put, select }) {},
  },

  reducers: {
    update(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
