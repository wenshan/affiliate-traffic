/* eslint-disable no-undef */
/* @ts-ignore */
import QueryString from 'query-string';
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
    },
    oauth2Github: {
      key: 'd966e3647ef6461d35de',
      secret: 'b5e9563b98c6a7831f99178b4e5f67130e08e05d',
      redirect_uri: 'http://127.0.0.1:8000/oauth',
      authorizationURL: 'http://github.com/login/oauth/authorize',
      tokenURL: 'https://github.com/login/oauth/access_token',
      userProfileURL: 'https://api.github.com/user',
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        const query = QueryString.parse(search);
        console.log('query:', query);
        console.log('pathname:', pathname);
        dispatch({
          type: 'update',
          payload: {
            state: 'query.state',
            code: 'query.code'
          }
        });
      });
    }
  },

  effects: {

  },

  reducers: {
    update(state, { payload: data }) {
      return { ...state, ...data };
    }
  }
};
