// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function googleOauth(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/googleOauth', {
    method: 'GET',
    ...(options || {}),
  });
}
