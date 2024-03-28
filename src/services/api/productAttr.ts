// @ts-ignore
/* eslint-disable */
// import { request } from '@umijs/max';
import request from '@/utils/request';

/** 创建 */
export const cerateAttr = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/cerateAttr', {
    method: 'POST',
    data: params,
  });
};
/** 编辑 */
export const editAttr = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/editAttr', {
    method: 'POST',
    data: params,
  });
};
/** 删除 */
export const delAttr = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/delAttr', {
    method: 'POST',
    data: params,
  });
};
/** 查询 */
export const queryAttr = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/queryAttr', {
    method: 'POST',
    data: params,
  });
};
