// @ts-ignore
/* eslint-disable */
// import { request } from '@umijs/max';
import request from '@/utils/request';
/** google 授权 */

export const queryList = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/userGroup/query', {
    method: 'POST',
    data: params,
  });
};

export const createGroup = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/userGroup/create', {
    method: 'POST',
    data: params,
  });
};

export const editGroup = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/userGroup/edit', {
    method: 'POST',
    data: params,
  });
};

export const delGroup = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/userGroup/del', {
    method: 'POST',
    data: params,
  });
};

export const bindGroupUser = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/userGroup/bind', {
    method: 'POST',
    data: params,
  });
};
