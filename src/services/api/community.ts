// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
// import request from '@/utils/request';

/** 社区获取列表 */
export async function getUserTableList(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}) {
  return request<API.RuleList>('/api/community/getUserTableList', {
    method: 'POST',
    data: params,
  });
}

/** 社区导出ex表格 */
export async function downloadXlsx() {
  return request('/api/community/downloadXlsx', {
    method: 'POST',
    data: {},
    config: {
      isAccess: false,
    },
  });
}

/** 社区 电子签名审核 */
export async function verifySignature(options: ParamsType) {
  return request('/api/community/verifySignature', {
    method: 'POST',
    data: options,
  });
}

/** 社区 build 数据 */
export async function reportFormsBuildTable(options: ParamsType) {
  return request('/api/community/reportFormsBuildTable', {
    method: 'POST',
    data: options,
    config: {
      isAccess: false,
    },
  });
}

/** 社区 最近七天数据 */
export async function lastDayIntention(options: ParamsType) {
  return request('/api/community/lastDayIntention', {
    method: 'POST',
    data: options,
    config: {
      isAccess: false,
    },
  });
}
