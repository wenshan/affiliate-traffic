/* eslint-disable */
/* @ts-ignore */

import {
  createFolder,
  delFolder,
  delMaterial,
  delRemoteMaterial,
  editFolder,
  queryFolder,
  queryFolderMaterial,
} from '@/services/api/material';

export default {
  namespace: 'material',
  state: {
    platform: 'pc', // wap:浏览器访问 wxwap: 微信访问
    mobile: '',
    type: 1, // 登录参数 1.微信 2.QQ 3.穿新衣 4.微信公众号 5.芝麻信用 6.京东 7.宝宝树 8.返利 9.QQ内部应用登录 10.微信积分购小程序 11. 支付宝无线换小程序 12.微信无线换小程序 13.微信穿新衣小程序
    query: '',
    code: '', // 微信code
    state: '',
    isAuthorized: false, // 是否已经授权
    currentUser: {
      access_token: '',
      expires_in: '',
      nickname: 'nickname',
      refresh_token: '',
      openid: '',
      unionid: '',
      email: '',
      userid: '',
    },
    imageList: [],
    currentFolderDirectory: {
      label: '默认分组',
      key: '00000000',
      is_default: true,
      active: true,
    },
    folderDirectory: [
      {
        label: '默认分组',
        key: '00000000',
        is_default: true,
        active: true,
        data: {
          count: 1,
          rows: [],
        },
      },
    ],
  },

  subscriptions: {},

  effects: {
    *queryFolder({ payload }, { call, put, select }) {
      const result = yield call(queryFolder);
      if (result.status === 200 && result.data && result.data.rows) {
        // 已删除文件放在最后排序
        const rows = result.data.rows;
        const newRows: { key: string }[] = [];
        rows &&
          rows.length &&
          rows.map((item: { key: string }) => {
            if (item.key !== '11111111') {
              newRows.push(item);
            }
          });
        newRows.push(rows[1]);
        console.log('newRows:', newRows);
        yield put({ type: 'update', payload: { folderDirectory: newRows } });
        yield put({ type: 'update', payload: { currentFolderDirectory: result.data.rows[0] } });
        // 初始化默认文件夹素材
        yield put({ type: 'queryFolderMaterial', payload: { ...result.data.rows[0] } });
      }
    },
    // subscriptions 更新当前的用户信息
    *editFolder({ payload: data }, { call, put, select }) {
      const result = yield call(editFolder, data);
      if (result.status === 200 && result.data) {
        yield put({ type: 'queryFolder' });
      }
    },
    // 获取用户信息
    *delFolder({ payload: data }, { call, put, select }) {
      const result = yield call(delFolder, data);
      if (result.status === 200 && result.data) {
        yield put({ type: 'queryFolder' });
      }
    },
    *createFolder({ payload: data }, { call, put, select }) {
      const result = yield call(createFolder, data);
      if (result.status === 200 && result.data) {
        yield put({ type: 'queryFolder' });
      }
    },
    *queryFolderMaterial({ payload: data }, { call, put, select }) {
      const { folderDirectory, currentFolderDirectory } = yield select((state) => state.material);
      const result = yield call(queryFolderMaterial, data);
      if (result.status === 200 && result.data && data && data.key) {
        console.log('folderDirectory:', folderDirectory);
        // eslint-disable-next-line array-callback-return
        folderDirectory.map((item: { key: any }, idx: string | number) => {
          console.log('item:', item);
          if (folderDirectory[idx] && item && Number(item.key) === Number(data.key)) {
            folderDirectory[idx] = Object.assign({}, item, { data: result.data });
          }
        });
        console.log('folderDirectory:', folderDirectory);
        yield put({
          type: 'update',
          payload: {
            folderDirectory,
            imageList: result.data.rows,
          },
        });
      }
    },
    *delMaterial({ payload: data }, { call, put, select }) {
      const { currentFolderDirectory } = yield select((state: { material: any }) => state.material);
      const result = yield call(delMaterial, data);
      if (result.status === 200 && result.data) {
        yield put({ type: 'queryFolderMaterial', payload: currentFolderDirectory });
      }
    },
    *delRemoteMaterial({ payload: data }, { call, put, select }) {
      const { currentFolderDirectory } = yield select((state: { material: any }) => state.material);
      const result = yield call(delRemoteMaterial, data);
      if (result.status === 200 && result.data) {
        yield put({ type: 'queryFolderMaterial', payload: currentFolderDirectory });
      }
    },
  },

  reducers: {
    update(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
