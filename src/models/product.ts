/* eslint-disable */
/* @ts-ignore */

import {
  createProductMain,
  delProductMain,
  editProductMain,
  queryProductMainAll,
} from '@/services/api/product';
import { cerateType, delType, editType, queryType } from '@/services/api/productType';
import QueryString from 'query-string';

export default {
  namespace: 'product',
  state: {
    productMainTotal: 0,
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
    productTypeOption: [],
    googleProductCategoryOption: {},
    currentProductMain: {
      title: '',
      product_type_id: { key: '', title: '' },
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
          product_type_id: JSON.stringify(product_type_id),
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
              product_type_id: JSON.parse(item.product_type_id),
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
          product_type_id: JSON.stringify(product_type_id),
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
    // 商品分类
    *cerateType({ payload: data }, { call, put, select }) {
      const { title } = data;
      if (title) {
        const result = yield call(cerateType, { title });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryType' });
          console.log('添加商品分类成功');
        }
      }
    },
    *editType({ payload: data }, { call, put, select }) {
      const { key, title } = data;
      if (key && title) {
        const result = yield call(editType, { ...data });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryType' });
          console.log('编辑商品分类成功');
        }
      }
    },
    *delType({ payload: data }, { call, put, select }) {
      const { key } = data;
      if (key) {
        const result = yield call(delType, { key });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryType' });
          console.log('删除商品分类成功');
        }
      }
    },
    *queryType({ payload: data }, { call, put, select }) {
      const { currentProductMain } = yield select((state) => state.product);
      const result = yield call(queryType);
      if (result && result.status && result.status === 200 && result.data.rows) {
        const newCurrentProductMain = Object.assign({}, currentProductMain, {
          product_type_id: result.data.rows[0],
        });
        yield put({
          type: 'update',
          payload: {
            productTypeOption: result.data.rows,
            currentProductMain: newCurrentProductMain,
          },
        });
      }
    },
    // 商品属性
    *cerateAttr({ payload: data }, { call, put, select }) {},
    *editAttr({ payload: data }, { call, put, select }) {},
    *delAttr({ payload: data }, { call, put, select }) {},
    *queryAttr({ payload: data }, { call, put, select }) {},
    // 商品SKU
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
