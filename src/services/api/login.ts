// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
// import request from '@/utils/request';
/** google 授权 */

export const getOAuthUrl = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/googleOauth/getOAuthUrl', {
    method: 'POST',
    data: {},
  });
};

export const googleGetToken = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/googleOauth/getToken', {
    method: 'POST',
    data: params,
  });
};

export const googlePostJwtToken = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/googleOauth/pushJwtToken', {
    method: 'POST',
    data: params,
  });
};

export const googleGetUserinfo = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/googleOauth/getUserinfo', {
    method: 'POST',
    data: params,
  });
};

/** 获取当前的用户 POST /api/currentUser */
export async function currentUser(options?: ParamsType) {
  return request<{
    data: API.CurrentUser;
    status: number;
    msg: string | null;
  }>('/api/user/currentUser', {
    method: 'POST',
    data: options,
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: ParamsType) {
  return request<Record<string, any>>('/api/user/outLogin', {
    method: 'POST',
    data: options,
  });
}

/** 登录接口 POST /api/user/login */
export async function login(params: API.LoginParams) {
  console.log('request:', request);
  return request<API.LoginResult>('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

// register
export async function register(params: API.LoginParams) {
  return request<API.RegisterParams>('/api/user/register', {
    method: 'POST',
    data: params,
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    data: options,
  });
}

/** 新建规则 POST /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: options,
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: ParamsType) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: options,
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: ParamsType) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: options,
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ruleParams,
  options?: OptionsType,
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
