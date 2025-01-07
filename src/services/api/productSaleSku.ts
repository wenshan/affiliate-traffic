// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建SKU商品 */
export const saleSkuCerateTemp = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/saleSku/cerateTemp', {
    method: 'POST',
    data: params,
  });
};
/** 编辑SKU商品 */
export const saleSkuEdit = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/saleSku/edit', {
    method: 'POST',
    data: params,
  });
};
/** 删除SKU商品 */
export const saleSkuDel = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/saleSku/del', {
    method: 'POST',
    data: params,
  });
};

/** 查询SKU商品 */
export const saleSkuQueryTemp = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/product/saleSku/queryTemp', {
    method: 'POST',
    data: params,
  });
};
