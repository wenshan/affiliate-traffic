// @ts-ignore
/* eslint-disable */
import { Request } from '../../utils/index.js';

/** 获取当前的用户 GET /api/currentUser */
export const queryCurrentUser = async (params?: { [key: string]: any }) => {
  return Request({
    url: '/api/currentUser',
    method: 'POST',
    data: params,
    config: {
      isAccess: false,
    },
  });
};

/** 退出登录接口 POST /api/login/outLogin */
export const outLogin = async (params?: { [key: string]: any }) => {
  return Request({
    url: '/api/login/outLogin',
    method: 'POST',
    data: params,
    config: {
      isAccess: false,
    },
  });
};

/** 登录接口 POST /api/login/account */
export const login = async (body: API.LoginParams, params?: { [key: string]: any }) => {
  return Request({
    url: '/api/login/account',
    method: 'POST',
    data: params,
    config: {
      isAccess: false,
    },
  });
};

/** 此处后端没有提供注释 GET /api/notices */
export const getNotices = async (params?: { [key: string]: any }) => {
  return Request({
    url: '/api/notices',
    method: 'GET',
    data: params,
    config: {
      isAccess: false,
    },
  });
};

/** 获取规则列表 GET /api/rule */
export const rule = async (params: { current?: number; pageSize?: number }) => {
  return Request({
    url: '/api/rule',
    method: 'GET',
    data: params,
    config: {
      isAccess: false,
    },
  });
};

/** 新建规则 PUT /api/rule */
export const updateRule = async (params?: { [key: string]: any }) => {
  return Request({
    url: '/api/rule',
    method: 'PUT',
    data: params,
    config: {
      isAccess: false,
    },
  });
};

/** 新建规则 POST /api/rule */
export const addRule = async (params?: { [key: string]: any }) => {
  return Request({
    url: '/api/rule',
    method: 'POST',
    data: params,
    config: {
      isAccess: false,
    },
  });
};

/** 删除规则 DELETE /api/rule */
export const removeRule = async (params?: { [key: string]: any }) => {
  return Request({
    url: '/api/rule',
    method: 'DELETE',
    data: params,
    config: {
      isAccess: false,
    },
  });
};

/** github 鉴权 */
export const getOauth2Github = async () => {
  return Request({
    url: '/api/github',
    method: 'GET',
    data: {},
    config: {
      isAccess: false,
    },
  });
};

/** github 获取tokent */
export const getGithubToken = async (params?: { [key: string]: any }) => {
  return Request({
    url: '/api/github/getWebToken',
    method: 'GET',
    data: params,
    config: {
      isAccess: false,
    },
  });
};
