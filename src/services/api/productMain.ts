// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
// import request from '@/utils/request';

/** 创建主商品 */
export const createProductMain = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/createProductMain', {
    method: 'POST',
    data: params,
  });
};
/** 编辑主商品 */
export const editProductMain = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/editProductMain', {
    method: 'POST',
    data: params,
  });
};
/** 删除主商品 */
export const delProductMain = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/delProductMain', {
    method: 'POST',
    data: params,
  });
};
/** 查询主商品 */
export const queryProductMainAll = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/queryProductMainAll', {
    method: 'POST',
    data: params,
  });
};
/** 主商品详情 */
export const queryProductMainDetail = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/queryProductMainDetail', {
    method: 'POST',
    data: params,
  });
};
/** 主商品offer id */
export const queryProductMainOfferId = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/queryProductMainOfferId', {
    method: 'POST',
    data: params,
  });
};

/** 创建语言商品 */
export const createProduct = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/createProduct', {
    method: 'POST',
    data: params,
  });
};
/** 编辑语言商品 */
export const editProduct = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/editProduct', {
    method: 'POST',
    data: params,
  });
};
/** 删除语言商品 */
export const delProduct = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/delProduct', {
    method: 'POST',
    data: params,
  });
};
/** 查询语言商品 */
export const queryProductAll = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/queryProductAll', {
    method: 'POST',
    data: params,
  });
};
/** 查询语言商品详情 */
export const queryProductDetail = async (params?: { [key: string]: any }) => {
  return request<{ data: DataType }>('/api/product/queryProductDetail', {
    method: 'POST',
    data: params,
  });
};

/* 复合查询 */
export const queryProductMainAllCompos = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/queryProductMainAllCompos', {
    method: 'POST',
    data: params,
  });
};
