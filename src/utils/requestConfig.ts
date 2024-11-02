// @ts-ignore
/* eslint-disable */
import { message } from 'antd';
import type { RequestConfig } from 'umi';

const limeet = 'https://api.limeetpet.com';
const dreamstep = 'https://www.dreamstep.top';
const devUrl = 'http://127.0.0.1:7001';

const isDev = process.env.NODE_ENV === 'development';
const API_DEV = `${devUrl}/`;
const API_PRO = `${limeet}/`;

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  status: number;
  msg: string;
}

const request: RequestConfig = {
  baseURL: isDev ? API_DEV : API_PRO,
  timeout: 1000 * 60,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': `${isDev ? API_DEV : limeet}`,
    'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Headers':
      'Content-Type, Content-Range, Content-Disposition, Content-Description',
    'Access-Control-Max-Age': 1728000,
  },
  withCredentials: true,
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { success, data, status, msg } = res;
      if (!success) {
        const error: any = new Error(msg);
        error.name = 'BizError';
        error.info = { status, msg, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { status, msg } = errorInfo;
          message.error(msg);
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },
  requestInterceptors: [
    (url, options) => {
      if (options) {
        if (options.config.isConsole) {
          console.log(
            `${new Date().toLocaleString()}【 M=${url} 】P=`,
            options.params || options.data,
          );
        }
        if (options.config.headers) {
          options.headers = Object.assign({}, options.headers, options.config.headers);
        }
      }
      return { url, options };
    },
  ],
  responseInterceptors: [
    (response) => {
      // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
      const { data = {} as any, config } = response;
      if (data.status >= 200 && data.status < 300) {
        if (config.isConsole) {
          console.log(
            `${new Date().toLocaleString()}【 M=${config.url} 】【接口响应：】`,
            response.data,
          );
        }
        if (config.config.isToast && data.msg) {
          message.warning(String(data.msg), 3);
        }
      }
      return response;
    },
  ],
};

export default request;
