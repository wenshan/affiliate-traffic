// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
// import request from '@/utils/request';
/** google 授权 */

export const queryList = async (params?: ParamsType) => {
  return request<{ data: DataType }>('/api/userGroup/query', {
    method: 'POST',
    data: params,
  });
};

export const createGroup = async (params?: ParamsType) => {
  return request<{ data: DataType }>('/api/userGroup/create', {
    method: 'POST',
    data: params,
  });
};

export const editGroup = async (params?: ParamsType) => {
  return request<{ data: DataType }>('/api/userGroup/edit', {
    method: 'POST',
    data: params,
  });
};

export const delGroup = async (params?: ParamsType) => {
  return request<{ data: DataType }>('/api/userGroup/del', {
    method: 'POST',
    data: params,
  });
};

export const bindGroupUser = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/userGroup/bind', {
    method: 'POST',
    data: params,
  });
};
