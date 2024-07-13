// @ts-ignore
/* eslint-disable */
// import { request } from '@umijs/max';
import request from '@/utils/request';
/** folder */
export const createBanner = async (params) => {
  return request('/api/banner/create', {
    method: 'POST',
    data: params,
    config: {
      isToast: true,
    },
  });
};

export const editBanner = async (params) => {
  return request('/api/banner/edit', {
    method: 'POST',
    data: params,
  });
};

export const delBanner = async (params) => {
  return request('/api/banner/del', {
    method: 'POST',
    data: params,
  });
};

export const queryBanner = async (params) => {
  return request('/api/banner/query', {
    method: 'POST',
    data: params,
  });
};
