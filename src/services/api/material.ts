// @ts-ignore
/* eslint-disable */
// import { request } from '@umijs/max';
import request from '@/utils/request';
/** folder */
export const createFolder = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/folder/createFolder', {
    method: 'POST',
    data: params,
  });
};

export const editFolder = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/folder/editFolder', {
    method: 'POST',
    data: params,
  });
};

export const delFolder = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/folder/delFolder', {
    method: 'POST',
    data: params,
  });
};

export const queryFolder = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/folder/queryFolder', {
    method: 'POST',
    data: params,
  });
};

export const queryFolderMaterial = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/material/queryFolderMaterial', {
    method: 'POST',
    data: params,
  });
};
//
export const delMaterial = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/material/delMaterial', {
    method: 'POST',
    data: params,
  });
};

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    data: params,
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: options,
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: options,
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: options,
  });
}
