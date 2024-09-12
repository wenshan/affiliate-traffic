/* eslint-disable no-undef */
/* @ts-ignore */
import { googleGetToken } from '@/services/api/login';
import QueryString from 'query-string';

export default {
  namespace: 'login',
  state: {
    state: '',
    code: '',
    authuser: 0,
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'openid',
      'https://www.googleapis.com/auth/content',
      'https://www.googleapis.com/auth/structuredcontent',
    ],
    response_type: 'token', // grant_type: 'authorization_code'
    approval_prompt: 'auto',
    access_type: 'offline',
    include_granted_scopes: true,
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_id: '984334853074-l81eun1mcikiqg8k5l10oqcd9ov29mcj.apps.googleusercontent.com',
    client_secret: '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',
    redirect_uris: ['https://admin.limeetpet.com/user/login'],
    redirect_uri: 'https://admin.limeetpet.com/user/login',
    javascript_origins: ['https://admin.limeetpet.com'],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const search = window.document.location.search;
      const query = QueryString.parse(search);
      console.log('query:', query);
      if (query && query.code && query.state && false) {
        console.log('123123');
        dispatch({
          type: 'update',
          payload: query,
        });
        dispatch({
          type: 'googleGetToken',
          payload: { code: query.code, state: query.state },
        });
      }
    },
  },

  effects: {
    *googleGetToken({ payload }, { call, put, select }) {
      const { code, state } = yield select((state) => state.login);
      const currentCode = (payload && payload.code) || code;
      const currentState = (payload && payload.state) || state;
      if (currentCode && currentState) {
        console.log('code:', code);
        const result = yield call(googleGetToken, { code: currentCode, state: currentState });
        console.log('result:', result.data);
        if (result && result.data && result.data.url) {
          console.log('resultToken:', resultToken);
        }
      }
    },
    *initState({ payload }, { call, put, select }) {
      yield put({ type: 'update', payload });
    },
  },

  reducers: {
    update(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
