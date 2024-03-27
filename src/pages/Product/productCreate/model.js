/* eslint-disable no-undef */
/* @ts-ignore */
import { queryFolder, queryFolderMaterial } from '@/services/api/material';
import {
  createProductMain,
  delProductMain,
  editProductMain,
  queryProductMainAll,
} from '@/services/api/product';
import QueryString from 'query-string';

export default {
  namespace: 'productCreate',
  state: {
    productMainTotal: 0,
    folderDirectory: [],
    currentFolderDirectory: {},
    languageOption: [
      { value: 'en-US', label: '英语' },
      { value: 'jp', label: '日语' },
      { value: 'kor', label: '韩语' },
    ],
    monetaryUnitOption: [
      { value: 'USD', label: '美元' },
      { value: 'JPY', label: '日元' },
      { value: 'EUR', label: '欧元' },
      { value: 'GPB', label: '英镑' },
      { value: 'KRW', label: '韩元' },
      { value: 'CAD', label: '加拿大' },
      { value: 'AUD', label: '澳大利亚' },
    ],
    productTypeOption: [
      { value: '1', label: 'Jack' },
      { value: '4536', label: 'Lucy' },
      { value: '3', label: 'yiminghe' },
      { value: '4', label: 'Disabled' },
    ],
    googleProductCategoryOption: {},
    currentProductMain: {
      title: '',
      product_type_id: '',
      offer_id: '',
      google_product_category: {
        key: 632,
        title: '五金/硬件',
      },
      gtin: '',
    },
    productMainList: [
      {
        title: '商品衣蛾',
        product_type_id: 1,
        offer_id: '111111',
        google_product_category: { key: '1', title: 'Jack' },
        gtin: '123123123123',
      },
      {
        title: '商品衣蛾2',
        product_type_id: 1,
        offer_id: '111111',
        google_product_category: { key: '1', title: 'Jack' },
        gtin: '1231231231232',
      },
    ],
    productAttributeOption: [
      {
        attribute_name: '1323',
        attribute_value: '1323',
      },
    ],
    productDetail: {
      language: 'en-US',
      product_type: { value: '2', label: 'Jack' },
      monetary_unit: { value: 'USD', label: '美元' },
      external_seller_id: '',
      offer_id: '123123123123',
      title: '',
      description: '',
      link: '',
      mobile_link: '',
      imageLink: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      additionalImageLinks: [],
      lifestyleImageLinks: [],
      google_product_category: '',
      brand: '',
      color: '',
      material: '',
      gtin: '',
      price: '',
      salePrice: '',
      product_detail: [], // 商品属性
      product_highlight: [],
      product_height: '',
      product_length: '',
      product_width: '',
      product_weight: '',
      availability: 'in_stock',
      shipping_width: '',
      shipping_height: '',
      shipping_length: '',
      ships_from_country: '',
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        const query = QueryString.parse(search);
      });
    },
  },

  effects: {
    *delProductMain({ payload }, { call, put, select }) {
      const { product_main_id } = payload;
      if (product_main_id) {
        const result = yield call(delProductMain, { product_main_id });
        console.log('result:', result);
        if (result && result.status && result.status === 200) {
          const pageSize = 20;
          const current = 1;
          yield put({ type: 'queryProductMainAll', payload: { current, pageSize } });
        }
      }
    },
    *editProductMain({ payload }, { call, put, select }) {
      const {
        id,
        title,
        product_type_id,
        offer_id,
        google_product_category,
        gtin,
        product_main_id,
        imgSrc,
      } = payload;
      if (title && google_product_category) {
        const result = yield call(editProductMain, {
          title,
          product_type_id,
          offer_id,
          google_product_category: JSON.stringify(google_product_category),
          gtin,
          product_main_id,
        });
        console.log('result:', result);
        if (result && result.status && result.status === 200) {
          const pageSize = 20;
          const current = 1;
          yield put({ type: 'queryProductMainAll', payload: { current, pageSize } });
        }
      }
    },
    *queryProductMainAll({ payload }, { call, put, select }) {
      const { pageSize, current } = payload;
      if (payload && current) {
        const result = yield call(queryProductMainAll, { current, pageSize });
        console.log('result:', result);
        if (result && result.status && result.status === 200 && result.data && result.data.rows) {
          const productMainList = result.data.rows.map((item) =>
            Object.assign({}, item, {
              google_product_category: JSON.parse(item.google_product_category),
            }),
          );
          yield put({
            type: 'update',
            payload: { productMainList, productMainTotal: result.data.count },
          });
        }
      }
    },
    *createProductMain({ payload }, { call, put, select }) {
      const { title, product_type_id, offer_id, google_product_category, gtin } = payload;
      if (title && google_product_category) {
        const result = yield call(createProductMain, {
          title,
          product_type_id,
          offer_id,
          google_product_category: JSON.stringify(google_product_category),
          gtin,
        });
        console.log('result:', result);
        if (result && result.status && result.status === 200) {
          const pageSize = 20;
          const current = 1;
          yield put({ type: 'queryProductMainAll', payload: { current, pageSize } });
        }
      }
    },

    // 获取图片文件夹
    *queryFolder({ payload }, { call, put, select }) {
      const result = yield call(queryFolder);
      if (result.status === 200 && result.data && result.data.rows) {
        yield put({ type: 'update', payload: { folderDirectory: result.data.rows } });
        yield put({ type: 'update', payload: { currentFolderDirectory: result.data.rows[0] } });
        // 初始化默认文件夹素材
        yield put({ type: 'queryFolderMaterial', payload: { ...result.data.rows[0] } });
      }
    },
    // 获取图片素材
    *queryFolderMaterial({ payload: data }, { call, put, select }) {
      const { folderDirectory, currentFolderDirectory } = yield select(
        (state) => state.productCreate,
      );
      const result = yield call(queryFolderMaterial, data);
      if (result.status === 200 && result.data) {
        console.log('queryFolderMaterial:', result);
        // eslint-disable-next-line array-callback-return
        folderDirectory.map((item, idx) => {
          if (item.key === data.key) {
            folderDirectory[idx] = Object.assign({}, item, { data: result.data });
          }
        });
        console.log('folderDirectory:', folderDirectory);
        yield put({
          type: 'update',
          payload: {
            folderDirectory,
            currentFolderDirectory: Object.assign({}, currentFolderDirectory, {
              data: result.data,
            }),
          },
        });
      }
    },
    *createProduct({ payload: data }, { call, put, select }) {},
    *queryProductAll({ payload: data }, { call, put, select }) {},
    *editProduct({ payload: data }, { call, put, select }) {},
    *delProduct({ payload: data }, { call, put, select }) {},
    *queryProductDetail({ payload: data }, { call, put, select }) {},
  },

  reducers: {
    updateProduct(state, { payload: data }) {
      const { productDetail } = state;
      const newProductDetail = Object.assign({}, productDetail, data);
      return Object.assign({}, state, { productDetail: newProductDetail });
    },
    update(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
