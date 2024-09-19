// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';
/** google  shopping */

export async function getProductListAll(params: any) {
  return request('/api/shopping/product/getProductListAll', {
    method: 'POST',
    data: params,
    config: {
      isToast: true,
    },
  });
}

export const deleteGoogleMerchant = async (params: any) => {
  return request('/api/shopping/product/deleteGoogleMerchant', {
    method: 'POST',
    data: params,
  });
};

// shopping-content 账号信息
export const googleMerchantAccountAuthinfo = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/shopping/authinfo', {
    method: 'POST',
    data: {},
  });
};
// shopping-content 插入子账号
export const googleMerchantAccountInsert = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/shopping/accountInsert', {
    method: 'POST',
    data: params,
  });
};

export const googleMerchantAccountGet = async (params?: { [key: string]: any }) => {
  return request<{ data: any }>('/api/shopping/accountGet', {
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
