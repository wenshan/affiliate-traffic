// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
// import request from '@/utils/request';

/** 创建 */
export const cerateAttr = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/cerateAttr', {
    method: 'POST',
    data: params,
  });
};
/** 编辑 */
export const editAttr = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/editAttr', {
    method: 'POST',
    data: params,
  });
};
/** 删除 */
export const delAttr = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/delAttr', {
    method: 'POST',
    data: params,
  });
};
/** 查询 */
export const queryAttr = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/queryAttr', {
    method: 'POST',
    data: params,
  });
};
