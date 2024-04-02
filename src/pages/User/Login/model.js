/* eslint-disable no-undef */
/* @ts-ignore */
import { googleGetJwtToken, googleGetToken, googlePostJwtToken } from '@/services/api/login';
import QueryString from 'query-string';

export default {
  namespace: 'login',
  state: {
    state: '',
    code: '',
    scope: '',
    authuser: 0,
    prompt: 'consent',
    oauth2Google: {
      merchantId: 5321978010,
      client_id: '894075544945-9akdiivfddi14fksil4s2pdrva0rgls9.apps.googleusercontent.com',
      redirect_uri: 'http://127.0.0.1:8000/user/login',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'openid',
        'https://www.googleapis.com/auth/content',
      ],
      state: '',
      login_hint: '',
      access_type: 'offline',
      include_granted_scopes: true,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const search = window.document.location.search;
      const query = QueryString.parse(search);
      console.log('query:', query);
      if (query && query.code) {
        dispatch({
          type: 'update',
          payload: query,
        });
        /*
        dispatch({
          type: 'googleGetToken',
          payload: { code: query.code }
        });
        */
      }
    },
  },

  effects: {
    // eslint-disable-next-line require-yield
    *googleAuth2InitCodeClient({ payload }, { call, put, select }) {
      const { oauth2Google } = yield select((state) => state.login);
      const { client_id, scope } = oauth2Google;
      const scopeStr = scope.join(' ');
      if (google && google.accounts.oauth2 && oauth2Google && client_id) {
        const initCodeClient = google.accounts.oauth2.initCodeClient({
          client_id,
          scope: scopeStr,
          ux_mode: 'popup',
          callback: async (response) => {
            console.log('response:', response);
            if (response && response.code) {
              const result = await googleGetToken({ code: response.code });
              console.log('result:', result);
            }
          },
        });
        initCodeClient.requestCode();
      }
    },
    // eslint-disable-next-line require-yield
    *googleAuth2InitCodeClient2({ payload }, { call, put, select }) {
      const { oauth2Google } = yield select((state) => state.login);
      const { client_id, scope, redirect_uri } = oauth2Google;
      const scopeStr = scope.join(' ');
      const time = new Date().getTime().toString();
      if (google && google.accounts.oauth2 && oauth2Google && client_id) {
        const initCodeClient = google.accounts.oauth2.initCodeClient({
          client_id,
          scope: scopeStr,
          redirect_uri,
          ux_mode: 'redirect',
          state: time,
        });
        initCodeClient.requestCode();
      }
    },
    *googleGetToken({ payload }, { call, put, select }) {
      const { code } = yield select((state) => state.login);
      const currentCode = (payload && payload.code) || code;
      if (true) {
        console.log('code:', code);
        const result = yield call(googleGetToken);
        console.log('result:', result.data);
        if (result && result.data && result.data.url) {
          const resultToken = yield call(googleGetJwtToken, { url: result.data.url });
          console.log('resultToken:', resultToken);
          if (resultToken && resultToken.access_token) {
            const postToken = yield call(googlePostJwtToken, resultToken);
            console.log('postToken');
          }
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
