// @ts-ignore
/* eslint-disable */
// import { request } from '@umijs/max';
import request from '@/utils/request';

/** 创建 */
export const cerateType = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/cerateType', {
    method: 'POST',
    data: params,
  });
};
/** 编辑 */
export const editType = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/editType', {
    method: 'POST',
    data: params,
  });
};
/** 删除 */
export const delType = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/delType', {
    method: 'POST',
    data: params,
  });
};
/** 查询 */
export const queryType = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/queryType', {
    method: 'POST',
    data: params,
  });
};
