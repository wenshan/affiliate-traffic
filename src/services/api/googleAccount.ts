// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
/** google  shopping */
export const shoppingProductInsert = async (params?: ParamsType) => {
  return request('/api/shopping/product/insert', {
    method: 'POST',
    data: params,
    config: {
      isToast: true,
    },
  });
};

export const shoppingProductDetailGoogle = async (params: any) => {
  return request('/api/shopping/product/getDetailGoogle', {
    method: 'POST',
    data: params,
  });
};

// shopping-content 账号信息
export const googleMerchantAccountAuthinfo = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/shopping/authinfo', {
    method: 'POST',
    data: {},
  });
};
// shopping-content 插入子账号
export const googleMerchantAccountInsert = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/shopping/accountInsert', {
    method: 'POST',
    data: params,
  });
};

export const googleMerchantAccountGet = async (params?: ParamsType) => {
  return request<ResponseDataType>('/api/shopping/accountGet', {
    method: 'POST',
    data: params,
  });
};

export const queryProjectList = async () => {
  return request('/api/shopping/queryProjectList', {
    method: 'POST',
    data: {},
  });
};

export const updateProject = async (params: any) => {
  return request('/api/shopping/updateProject', {
    method: 'POST',
    data: params,
  });
};

export const setDefaultState = async (params: any) => {
  return request('/api/shopping/setDefaultState', {
    method: 'POST',
    data: params,
  });
};
// /api/shopping/setDefault
export const setDefault = async (params: any) => {
  return request('/api/shopping/setDefault', {
    method: 'POST',
    data: params,
  });
};
export const getDefaultProject = async () => {
  return request('/api/shopping/getDefaultProject', {
    method: 'POST',
    data: {},
  });
};
