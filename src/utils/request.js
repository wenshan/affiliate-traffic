// @ts-ignore
/* eslint-disable */
import axios from 'axios';
import { message } from 'antd';
import Cookies from 'js-cookie';

const isDev = process.env.NODE_ENV === 'development';
const API_DEV = 'http://127.0.0.1:7001/';
const API_PRO = 'https://dreamstep.top/';

axios.defaults.baseURL = isDev ? API_DEV : API_PRO;
axios.defaults.timeout = 12000;

let clientVersion = '1.0.0';

let reqConfig = {
  params: {},
  headers: {
    'Content-Type': 'application/json',
    'client-version': clientVersion, // 接口版本控制
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
    'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
    'Access-Control-Max-Age': 1728000
  },
  withCredentials: true,
  isCheckErroCode: true, // 是否检测 erroCodeState 状态
  isToast: false, // 是否走通用 Toast
  isAccess: true, // 是否带上token 值，false 不需要权限，true需要权限
  loading: false, // 是否显示请求加载动画
  isConsole: false
};

// 请求拦截器
axios.interceptors.request.use(
  (request) => {
    if (reqConfig.isConsole) {
      console.log(`${new Date().toLocaleString()}【 M=${request.url} 】P=`, request.params || request.data);
    }

    request.headers = Object.assign({}, request.headers, reqConfig.headers);

    return request;
  },
  (error) => {
    Toast.offline(String(error));
    return Promise.reject(error);
  }
);

// 接口返回status错误处理
const errorCodeState = (res) => {
  if (res.data && res.data.status !== 'ok' && res.data.error) {
    // token超时状态 和 单点登录状态 access_token 超时 从新触发登录
    // TODO: 拦截器无法获取 res.config.config 参数
    reqConfig = Object.assign({}, reqConfig, res.config.config);
    if (reqConfig.isToast) {
      Toast.info(`${res.data.error.message} !!!~` || res.data.error.code, 1.5);
    }
  }
};

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    if (res.status >= 200 && res.status < 300) {
      if (reqConfig.isConsole) {
        // eslint-disable-next-line no-console
        console.log(`${new Date().toLocaleString()}【 M=${res.config.url} 】【接口响应：】`, res.data);
      }
      errorCodeState(res);
      return res.data;
    }
    message.warning(res.statusText);
    throw new Error(res.statusText);
  },
  (error) => {
    message.warning(String(error));
    return Promise.reject(error);
  }
);

export default (options = { method: 'GET' }) => {
  const access_token = Cookies.get('access_token');
  let reqConfigParams = Object.assign({}, reqConfig.params, options.params || {});
  let newReqConfig = Object.assign({}, reqConfig, { params: reqConfigParams }, options.config || {});

  if (access_token && newReqConfig.isAccess) {
    options.data = Object.assign({}, reqConfig.params, options.data, { access_token });
  } else {
    options.data = Object.assign({}, reqConfig.params, options.data);
  }

  let isdata = true;

  if (
    options.method.toUpperCase() !== 'POST' &&
    options.method.toUpperCase() !== 'PUT' &&
    options.method.toUpperCase() !== 'PATCH'
    // && options.method.toUpperCase() !== 'DELETE'
  ) {
    isdata = false;
  }

  return axios({
    method: options.method,
    url: options.url,
    data: isdata ? options.data : null,
    params: !isdata ? options.data : null,
    config: options.config
  });
};
