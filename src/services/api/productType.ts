// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
// import request from '@/utils/request';

/** 创建 */
export const cerateType = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/cerateType', {
    method: 'POST',
    data: params,
  });
};
/** 编辑 */
export const editType = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/editType', {
    method: 'POST',
    data: params,
  });
};
/** 删除 */
export const delType = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/delType', {
    method: 'POST',
    data: params,
  });
};
/** 查询 */
export const queryType = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/queryType', {
    method: 'POST',
    data: params,
  });
};

export const queryTypeAll = async () => {
  return request<ResponseDataType>('/api/product/queryTypeAll', {
    method: 'POST',
    data: {},
  });
};
