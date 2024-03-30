/* eslint-disable */
/* @ts-ignore */

import {
  createProduct,
  delProduct,
  editProduct,
  queryProductAll,
  queryProductDetail,
} from '@/services/api/product';
import { cerateAttr, delAttr, editAttr, queryAttr } from '@/services/api/productAttr';
import {
  createProductMain,
  delProductMain,
  editProductMain,
  queryProductMainAll,
} from '@/services/api/productMain';
import { cerateType, delType, editType, queryType } from '@/services/api/productType';
import { Modal, message } from 'antd';
import QueryString from 'query-string';
import { history } from 'umi';

export default {
  namespace: 'product',
  state: {
    language: 'en-US',
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0,
    },
    productMainTotal: 0,
    productListTotal: 0,
    product_sku_option_status: 0,
    languageOption: [
      { value: 'en-US', label: '英语' },
      { value: 'ja-JP', label: '日语' },
      { value: 'ko_KR', label: '韩语' },
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
      brand: '',
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
    productList: [],
    productDetail: {
      product_main_id: 0,
      language: 'en-US',
      product_type: { value: '', label: '' },
      monetary_unit: { value: 'USD', label: '美元' },
      offer_id: '',
      title: '',
      description: '',
      link: '',
      mobile_link: '',
      imageLink: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      additional_image_link: [],
      lifestyle_image_link: [],
      google_product_category: '',
      color: '',
      material: '',
      gtin: '',
      price: '',
      salePrice: '',
      product_detail: [], // 商品属性
      product_highlight: '',
      product_height: '',
      product_length: '',
      product_width: '',
      product_weight: '',
      availability: 'in_stock',
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        const query = QueryString.parse(search);
        if (query.product_main_id) {
          console.log('query:', query);
          /*
          dispatch({
            type: 'updateProduct',
            payload: {
              product_main_id: query.product_main_id,
            }
          });
          */
        }
      });
    },
  },

  effects: {
    *initQueryParams({ payload }, { call, put, select }) {
      const { search } = window.document.location;
      const pagination = {
        current: 1,
        pageSize: 20,
        total: 0,
      };
      const query = QueryString.parse(search);
      if (query && query.product_main_id) {
        yield put({ type: 'updateProduct', payload: { product_main_id: query.product_main_id } });
      }
      if (query && query.product_sku_option_status) {
        yield put({
          type: 'update',
          payload: { product_sku_option_status: query.product_sku_option_status },
        });
      }
      yield put({ type: 'update', payload: { pagination } });
    },
    *delProductMain({ payload }, { call, put, select }) {
      const { product_main_id } = payload;
      if (product_main_id) {
        const result = yield call(delProductMain, { product_main_id });
        if (result && result.status && result.status === 200) {
          const pageSize = 20;
          const current = 1;
          yield put({ type: 'queryProductMainAll', payload: { current, pageSize } });
        }
      }
    },
    *editProductMain({ payload }, { call, put, select }) {
      const { id, title, offer_id, google_product_category, gtin, product_main_id, brand } =
        payload;
      if (title && google_product_category) {
        const result = yield call(editProductMain, {
          title,
          offer_id,
          google_product_category,
          gtin,
          product_main_id,
          brand,
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
      const { pagination } = yield select((state) => state.product);
      const { current, pageSize } = pagination;
      if (current && pageSize) {
        const result = yield call(queryProductMainAll, { current, pageSize });
        if (result && result.status && result.status === 200 && result.data && result.data.rows) {
          const updatePagination = Object.assign({}, pagination, { total: result.data.count });
          yield put({
            type: 'update',
            payload: {
              productMainList: result.data.rows,
              pagination: updatePagination,
            },
          });
        }
      }
    },
    *createProductMain({ payload }, { call, put, select }) {
      const { title, product_type_id, offer_id, google_product_category, gtin, brand } = payload;
      console.log(product_type_id, google_product_category);
      if (title && google_product_category && product_type_id) {
        const result = yield call(createProductMain, {
          title,
          product_type_id,
          offer_id,
          google_product_category,
          gtin,
          brand,
        });
        if (result && result.status && result.status === 200) {
          const pageSize = 20;
          const current = 1;
          yield put({ type: 'queryProductMainAll', payload: { current, pageSize } });
          message.success({ content: '创建主商品成功' });
        } else {
          message.error({ content: result.msg });
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
          message.success({ content: '添加商品分类成功' });
          console.log('添加商品分类成功');
        } else {
          message.error({ content: result.msg });
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
    *cerateAttr({ payload: data }, { call, put, select }) {
      const { productDetail, currentProductMain } = yield select((state) => state.product);
      const { language, product_main_id } = productDetail;
      const { attribute_name, attribute_value } = data;
      if (!language) {
        message.error({ content: '请先设置语言种类！' });
        return false;
      }
      if (attribute_value && attribute_name && language && product_main_id) {
        const result = yield call(cerateAttr, {
          attribute_name,
          attribute_value,
          language,
          product_main_id,
        });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryAttr' });
          message.success({ content: '添加商品分类成功' });
          console.log('添加商品分类成功');
        } else {
          message.error({ content: result.msg });
        }
      } else {
        console.log('productDetail:', productDetail);
        message.error({ content: '缺少参数' });
      }
    },
    *editAttr({ payload: data }, { call, put, select }) {
      const { key, attribute_name, attribute_value } = data;
      if (key && attribute_name && attribute_value) {
        const result = yield call(editAttr, { ...data });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryAttr' });
          console.log('编辑商品分类成功');
        }
      } else {
        message.error({ content: '缺少参数' });
      }
    },
    *delAttr({ payload: data }, { call, put, select }) {
      const { key } = data;
      if (key) {
        const result = yield call(delAttr, { key });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryAttr' });
          console.log('删除商品分类成功');
        }
      } else {
        message.error({ content: '缺少参数' });
      }
    },
    *queryAttr({ payload: data }, { call, put, select }) {
      const { productDetail } = yield select((state) => state.product);
      const { language, product_main_id } = productDetail;
      if (language && product_main_id) {
        const result = yield call(queryAttr, { product_main_id, language });
        if (result && result.status && result.status === 200 && result.data.rows) {
          yield put({
            type: 'update',
            payload: {
              productAttributeOption: result.data.rows,
            },
          });
        } else {
          message.error({ content: result.msg });
        }
      } else {
        console.log('productDetail:', productDetail);
        message.error({ content: '缺少参数' });
      }
    },
    // 商品SKU
    *createProduct({ payload: data }, { call, put, select }) {
      const { productDetail, currentProductMain } = yield select((state) => state.product);
      console.log('productDetail:', productDetail);
      console.log('currentProductMain:', currentProductMain);
      const {
        title,
        language,
        monetary_unit,
        link,
        imageLink,
        price,
        description,
        product_main_id,
        product_type,
      } = productDetail;
      if (
        title &&
        language &&
        monetary_unit &&
        link &&
        imageLink &&
        price &&
        description &&
        product_main_id &&
        product_type
      ) {
        const result = yield call(createProduct, {
          ...productDetail,
        });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryProductAll' });
          // message.warning({ content: '添加商品SKU分类成功'});
          Modal.confirm({
            title: '创建成功',
            content: '创建商品SKU,返回到列表页面',
            onOk() {
              history.push('/product/productList');
            },
            onCancel() {
              console.log('Cancel');
            },
          });

          console.log('添加商品SKU分类成功');
        } else {
          message.warning({ content: result.msg });
        }
      } else {
        message.warning({ content: '请检查必填字段！' });
      }
    },
    *queryProductAll({ payload: data }, { call, put, select }) {
      const { pagination, language } = yield select((state) => state.product);
      const { current, pageSize } = pagination;
      if (current && pageSize && language) {
        const result = yield call(queryProductAll, { current, pageSize, language });
        if (result && result.status && result.status === 200 && result.data.rows) {
          const updatePagination = Object.assign({}, pagination, { total: result.data.count });
          yield put({
            type: 'update',
            payload: {
              productList: result.data.rows,
              pagination: updatePagination,
            },
          });
        } else {
          message.warning({ content: result.msg });
        }
      } else {
        message.warning({ content: '确实查询字段！' });
      }
    },
    *editProduct({ payload: data }, { call, put, select }) {
      const { productDetail, currentProductMain } = yield select((state) => state.product);
      console.log('productDetail:', productDetail);
      console.log('currentProductMain:', currentProductMain);
      const {
        title,
        language,
        monetary_unit,
        link,
        imageLink,
        price,
        description,
        product_main_id,
        product_type,
      } = productDetail;
      if (
        title &&
        language &&
        monetary_unit &&
        link &&
        imageLink &&
        price &&
        description &&
        product_main_id &&
        product_type
      ) {
        const result = yield call(editProduct, { ...productDetail });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryProductAll' });
          Modal.confirm({
            title: '编辑成功',
            content: '编辑商品SKU,返回到列表页面',
            onOk() {
              history.push('/product/productList');
            },
            onCancel() {
              console.log('Cancel');
            },
          });
          console.log('编辑商品SKU分类成功');
        } else {
          message.warning({ content: result.msg });
        }
      } else {
        message.warning({ content: '请检查必填字段！' });
      }
    },
    *delProduct({ payload: data }, { call, put, select }) {
      const { product_id } = data;
      if (product_id) {
        const result = yield call(delProduct, { product_id });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryProductAll' });
          console.log('删除商品SKU分类成功');
        }
      }
    },
    *queryProductDetail({ payload: data }, { call, put, select }) {
      const { product_id } = data;
      if (product_id) {
        const result = yield call(queryProductDetail, { product_id });
        if (result && result.status && result.status === 200) {
          yield put({
            type: 'update',
            payload: {
              productDetail: result.data,
            },
          });
          console.log('删除商品SKU分类成功');
        }
      }
    },
  },

  reducers: {
    updateProduct(state, { payload: data }) {
      console.log(data);
      const { productDetail } = state;
      const newProductDetail = Object.assign({}, productDetail, data);
      return Object.assign({}, state, { productDetail: newProductDetail });
    },
    update(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
