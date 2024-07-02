// @ts-ignore
/* eslint-disable */
// import { request } from '@umijs/max';
import request from '@/utils/request';

/** 创建主商品 */
export const createProductMain = async (params?: { [key: string]: any }) => {
  debugger;
  return request<{ data: any }>('/api/product/createProductMain', {
    method: 'POST',
    data: params,
  });
};
/** 编辑主商品 */
export const editProductMain = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/editProductMain', {
    method: 'POST',
    data: params,
  });
};
/** 删除主商品 */
export const delProductMain = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/delProductMain', {
    method: 'POST',
    data: params,
  });
};
/** 查询主商品 */
export const queryProductMainAll = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/queryProductMainAll', {
    method: 'POST',
    data: params,
  });
};
/** 主商品详情 */
export const queryProductMainDetail = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/queryProductMainDetail', {
    method: 'POST',
    data: params,
  });
};

/** 创建语言商品 */
export const createProduct = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/createProduct', {
    method: 'POST',
    data: params,
  });
};
/** 编辑语言商品 */
export const editProduct = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/editProduct', {
    method: 'POST',
    data: params,
  });
};
/** 删除语言商品 */
export const delProduct = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/delProduct', {
    method: 'POST',
    data: params,
  });
};
/** 查询语言商品 */
export const queryProductAll = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/queryProductAll', {
    method: 'POST',
    data: params,
  });
};
/** 查询语言商品详情 */
export const queryProductDetail = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/queryProductDetail', {
    method: 'POST',
    data: params,
  });
};

/* 复合查询 */
export const queryProductMainAllCompos = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/product/queryProductMainAllCompos', {
    method: 'POST',
    data: params,
  });
};
