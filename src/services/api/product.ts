// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
// import request from '@/utils/request';

/** 创建语言商品 */
export const createProduct = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/createProduct', {
    method: 'POST',
    data: params,
  });
};
/** 编辑语言商品 */
export const editProduct = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/editProduct', {
    method: 'POST',
    data: params,
  });
};
/** 删除语言商品 */
export const delProduct = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/delProduct', {
    method: 'POST',
    data: params,
  });
};
/** 查询语言商品 */
export const queryProductAll = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/queryProductAll', {
    method: 'POST',
    data: params,
  });
};
export const queryProductAllCompos = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/queryProductAllCompos', {
    method: 'POST',
    data: params,
  });
};
/** 查询语言商品详情 */
export const queryProductDetail = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/queryProductDetail', {
    method: 'POST',
    data: params,
  });
};
