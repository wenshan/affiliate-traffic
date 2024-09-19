/* eslint-disable */
/* @ts-ignore */

import { shoppingProductInsert } from '@/services/api/googleAccount';
import {
  createProduct,
  delProduct,
  editProduct,
  queryProductAll,
  queryProductAllCompos,
  queryProductDetail,
} from '@/services/api/product';
import { cerateAttr, delAttr, editAttr, queryAttr } from '@/services/api/productAttr';
import {
  createProductMain,
  delProductMain,
  editProductMain,
  queryProductMainAll,
  queryProductMainAllCompos,
  queryProductMainDetail,
  queryProductMainOfferId,
} from '@/services/api/productMain';
import { cerateType, delType, editType, queryType } from '@/services/api/productType';
import { Modal, message } from 'antd';
import QueryString from 'query-string';
import { history } from 'umi';
import { defaultCurrentProductMain, defaultProductDetail } from './../constant/defaultCurrentData';

export default {
  namespace: 'product',
  state: {
    pagination: {
      current: 1,
      pageSize: 50,
      total: 0,
    },
    productSizeUnitUnitOption: [
      {
        value: 'mm',
        label: 'mm',
      },
      {
        value: 'cm',
        label: 'cm',
      },
      {
        value: 'm',
        label: 'm',
      },
      {
        value: 'in',
        label: 'in',
      },
    ],
    productWeightUnitOption: [
      {
        value: 'g',
        label: 'g',
      },
      {
        value: 'kg',
        label: 'kg',
      },
      {
        value: 'lb',
        label: 'lb',
      },
    ],
    searchParams: {
      keyword: '',
      offer_id: 'all',
      product_type_id: 'all',
      productTypeOption: [],
      language: 'all',
      languageOption: [
        { value: 'all', label: 'All' },
        { value: 'zh-CN', label: '中文' },
        { value: 'en-US', label: '英语' },
        { value: 'ja-JP', label: '日语' },
        { value: 'ko_KR', label: '韩语' },
      ],
    },
    productStatusAll: {
      isCreateMainModalShow: false,
    }, // 统一的用户操作状态
    product_sku_option_status: 0,
    languageOption: [
      { value: 'zh-CN', label: '中文' },
      { value: 'en-US', label: '英语' },
      { value: 'ja-JP', label: '日语' },
      { value: 'ko_KR', label: '韩语' },
    ],
    monetaryUnitOption: [
      { value: 'CNY', label: '人民币' },
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
    currentProductMain: defaultCurrentProductMain,
    productMainList: [],
    productAttributeOption: [
      {
        attribute_name: '1323',
        attribute_value: '1323',
      },
    ],
    ageGroupOption: [
      { value: 'newborn', label: '新生儿' },
      { value: 'infant', label: '婴儿' },
      { value: 'toddler', label: '幼儿' },
      { value: 'kids', label: '儿童' },
      { value: 'adult', label: '成人' },
    ],
    genderOption: [
      { value: 'male', label: '男性' },
      { value: 'female', label: '女性' },
      { value: 'unisex', label: '男女通用' },
    ],
    sizeSystemOption: [
      { value: 'US', label: 'US' },
      { value: 'UK', label: 'UK' },
      { value: 'EU', label: 'EU' },
      { value: 'DE', label: 'DE' },
      { value: 'FR', label: 'FR' },
      { value: 'JP', label: 'JP' },
      { value: 'CN', label: 'CN' },
      { value: 'IT', label: 'IT' },
      { value: 'BR', label: 'BR' },
      { value: 'MEX', label: 'MEX' },
      { value: 'AU', label: 'AU' },
    ],
    sizeTypeOption: [
      { value: 'regular', label: '标准' },
      { value: 'petite', label: '小号' },
      { value: 'maternity', label: '孕妇 ' },
      { value: 'big', label: '大' },
      { value: 'tall', label: '高' },
      { value: 'plus', label: '加大' },
    ],
    productList: [],
    productDetail: defaultProductDetail,
    productMainOfferIds: [],
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
      if (query && query.product_main_id && query.language) {
        yield put({
          type: 'updateProduct',
          payload: { id: query.product_id, language: query.language },
        });
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
      const { id } = payload;
      if (id) {
        const result = yield call(delProductMain, { id });
        if (result && result.status && result.status === 200) {
          const pageSize = 20;
          const current = 1;
          yield put({ type: 'queryProductMainAll', payload: { current, pageSize } });
        }
      }
    },
    *editProductMain({ payload: data }, { call, put, select }) {
      const {
        id,
        title,
        offer_id,
        google_product_category,
        google_product_category_id,
        gtin,
        brand,
      } = data;
      const { productStatusAll } = yield select((state) => state.product);
      const newProductStatusAll = Object.assign({}, productStatusAll, {
        isCreateMainModalShow: false,
      });
      if (title && google_product_category && google_product_category_id && id && offer_id) {
        const result = yield call(editProductMain, {
          title,
          offer_id,
          google_product_category,
          gtin,
          id,
          brand,
        });
        if (result && result.status && result.status === 200) {
          const pageSize = 20;
          const current = 1;
          yield put({ type: 'update', payload: { productStatusAll: newProductStatusAll } });
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
    *createProductMain({ payload: data }, { call, put, select }) {
      const { title, offer_id, google_product_category, google_product_category_id, gtin, brand } =
        data;
      const { productStatusAll } = yield select((state) => state.product);
      const newProductStatusAll = Object.assign({}, productStatusAll, {
        isCreateMainModalShow: false,
      });
      if (title && google_product_category && google_product_category_id && offer_id) {
        const result = yield call(createProductMain, {
          title,
          offer_id,
          google_product_category,
          google_product_category_id,
          gtin,
          brand,
        });
        if (result && result.status && result.status === 200) {
          const pageSize = 20;
          const current = 1;
          yield put({ type: 'update', payload: { productStatusAll: newProductStatusAll } });
          yield put({ type: 'queryProductMainAll', payload: { current, pageSize } });
          message.success({ content: '创建主商品成功' });
        } else {
          message.error({ content: result.msg });
        }
      }
    },
    // 获取主商品详情
    *queryProductMainDetail({ payload: data }, { call, put, select }) {
      const { productDetail } = yield select((state) => state.product);
      const { id } = data;
      if (id) {
        const result = yield call(queryProductMainDetail, { id });
        if (result && result.status && result.status === 200) {
          const newProductDetail = Object.assign({}, productDetail, {
            title_main: result.data.title,
            google_product_category: result.data.google_product_category,
            google_product_category_id: result.data.google_product_category_id,
            offer_id: result.data.offer_id,
          });
          yield put({
            type: 'update',
            payload: {
              currentProductMain: result.data,
              productDetail: newProductDetail,
            },
          });
        }
      }
    },
    // 商品分类
    *cerateType({ payload: data }, { call, put, select }) {
      const { title } = data;
      const { productDetail } = yield select((state) => state.product);
      const { language } = productDetail;
      if (title && language) {
        const result = yield call(cerateType, { title, language });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryType' });
          message.success({ content: '添加商品分类成功' });
          console.log('添加商品分类成功');
        } else {
          message.error({ content: result.msg });
        }
      } else {
        message.error({ content: '缺少参数title' });
      }
    },
    *editType({ payload: data }, { call, put, select }) {
      const { id, key, title } = data;
      const { productDetail } = yield select((state) => state.product);
      const { language } = productDetail;
      if (id && key && title && language) {
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
      const { productDetail } = yield select((state) => state.product);
      const { language } = productDetail;
      if (language) {
        const result = yield call(queryType, { language });
        if (result && result.status && result.status === 200 && result.data.rows) {
          const productTypeOption: ({ title: any; key: any } & { label: any; value: any })[] = [];
          result.data.rows.map((item: { title: any; key: any }) => {
            productTypeOption.push(Object.assign({}, item, { label: item.title, value: item.key }));
          });
          yield put({
            type: 'update',
            payload: {
              productTypeOption,
            },
          });
        }
      }
    },
    *queryTypeSearch({ payload: data }, { call, put, select }) {
      const { searchParams } = yield select((state) => state.product);
      const { language } = searchParams;
      if (language) {
        const result = yield call(queryType, { language });
        if (result && result.status && result.status === 200 && result.data.rows) {
          const productTypeOption: { label: any; value: any }[] = [];
          productTypeOption.push({
            label: 'All',
            value: 'all',
          });
          let product_type_id = 'all';
          result.data.rows.map((item: { title: any; key: any }) => {
            productTypeOption.push(Object.assign({}, item, { label: item.title, value: item.key }));
          });
          /*
          if (result.data.rows && result.data.rows[0]) {
            product_type_id = result.data.rows[0].key;
          }
          */
          const newsSearchParams = Object.assign({}, searchParams, {
            product_type_id,
            productTypeOption,
          });
          yield put({
            type: 'update',
            payload: {
              searchParams: newsSearchParams,
            },
          });
        }
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
      const {
        id,
        title: title_main,
        offer_id,
        google_product_category,
        google_product_category_id,
        gtin,
        brand,
      } = currentProductMain;
      const {
        title,
        language,
        monetary_unit,
        link,
        mobile_link,
        image_link,
        lifestyle_image_link,
        additional_image_link,
        color,
        material,
        price,
        sale_price,
        product_detail,
        product_highlight,
        productLength,
        productHeight,
        productWidth,
        productWeight,
        availability,
        description,
        product_type,
        product_type_id,
      } = productDetail;
      if (
        title &&
        title_main &&
        language &&
        monetary_unit &&
        link &&
        image_link &&
        price &&
        description &&
        id &&
        product_type &&
        google_product_category &&
        offer_id
      ) {
        const result = yield call(createProduct, {
          title,
          language,
          monetary_unit,
          link,
          mobile_link,
          image_link,
          description,
          product_type,
          product_type_id,
          lifestyle_image_link,
          additional_image_link,
          google_product_category,
          google_product_category_id,
          product_main_id: id,
          title_main,
          color,
          material,
          price,
          sale_price,
          product_detail,
          product_highlight,
          productHeight,
          productLength,
          productWidth,
          productWeight,
          availability,
          offer_id,
          gtin,
          brand,
        });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryProductAll' });
          // message.warning({ content: '添加商品SKU分类成功'});
          yield put({
            type: 'update',
            payload: {
              productDetail: defaultProductDetail,
            },
          });
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
      const { pagination, searchParams } = yield select((state) => state.product);
      const { language, product_type_id, offer_id } = searchParams;
      const { current, pageSize } = pagination;
      if (current && pageSize && language) {
        const result = yield call(queryProductAll, {
          current,
          pageSize,
          language,
          product_type_id,
          offer_id,
        });
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
        message.warning({ content: '缺少查询字段！' });
      }
    },
    /** 复合查询 */
    *queryProductMainAllCompos({ payload: data }, { call, put, select }) {
      const { pagination, searchParams } = yield select((state) => state.product);
      const { language } = searchParams;
      const { current, pageSize } = pagination;
      const resultSkuObj = {};
      if (current && pageSize && language) {
        const result = yield call(queryProductMainAllCompos, { current, pageSize, language });
        if (result && result.status && result.status === 200 && result.data.rows) {
          const updatePagination = Object.assign({}, pagination, { total: result.data.count });
          // queryProductAllCompos
          const mainRows = result.data.rows;
          mainRows &&
            mainRows.length &&
            mainRows.map(async (item: string | number) => {
              resultSkuObj[item.id] = Object.assign({}, item, { skus: [] });
            });
          mainRows &&
            mainRows.length &&
            mainRows.map(async (item: string | number) => {
              const resultSku = await queryProductAllCompos({ language, product_main_id: item.id });
              if (resultSku && resultSku.status && resultSku.status === 200 && resultSku.data) {
                resultSkuObj[item.id]['skus'] = resultSku.data;
              } else {
                resultSkuObj[item.id]['skus'] = [];
              }
            });
          const productMainList = Object.values(resultSkuObj);
          yield put({
            type: 'update',
            payload: {
              productMainList,
              pagination: updatePagination,
            },
          });
        } else {
          message.warning({ content: result.msg });
        }
      } else {
        message.warning({ content: '缺少查询字段！' });
      }
    },
    *editProduct({ payload: data }, { call, put, select }) {
      const { productDetail, currentProductMain } = yield select((state) => state.product);
      const {
        title,
        language,
        monetary_unit,
        link,
        image_link,
        price,
        description,
        product_main_id,
        product_type,
        google_product_category,
        title_main,
        offer_id,
        id,
      } = productDetail;
      if (
        id &&
        title &&
        title_main &&
        language &&
        monetary_unit &&
        link &&
        image_link &&
        price &&
        description &&
        product_main_id &&
        product_type &&
        google_product_category &&
        offer_id
      ) {
        const result = yield call(editProduct, { ...productDetail });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryProductAll' });
          yield put({
            type: 'update',
            payload: {
              productDetail: defaultProductDetail,
            },
          });
          Modal.confirm({
            title: '编辑成功',
            content: '编辑商品SKU成功,返回到列表页面',
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
      const { id, language } = data;
      if (id) {
        const result = yield call(delProduct, { id, language });
        if (result && result.status && result.status === 200) {
          yield put({ type: 'queryProductAll' });
          console.log('删除商品SKU分类成功');
        }
      }
    },
    *queryProductDetail({ payload: data }, { call, put, select }) {
      const { id, language } = data;
      if (id) {
        const result = yield call(queryProductDetail, { id, language });
        if (result && result.status && result.status === 200) {
          yield put({
            type: 'update',
            payload: {
              productDetail: result.data,
            },
          });
        }
      }
    },
    *queryProductMainOfferId({ payload }, { call, put, select }) {
      const result = yield call(queryProductMainOfferId);
      if (result && result.status && result.status === 200 && result.data) {
        const temp = [
          {
            value: 'all',
            label: 'All',
          },
        ];
        // const newProductMainOfferIds = temp.concat(result.data);
        result.data &&
          result.data.length &&
          result.data.map((item: any) => {
            temp.push(item);
          });

        // console.log('newProductMainOfferIds:', newProductMainOfferIds);
        yield put({
          type: 'update',
          payload: {
            productMainOfferIds: temp,
          },
        });
      }
    },
    /** 同步google 购物数据 */
    *shoppingProductInsert({ payload: data }, { call, put, select }) {
      if (data && data.id) {
        const result = yield call(shoppingProductInsert, data);
        if (result && result.status && result.status === 200) {
          message.success({ content: '同步成功' });
        } else {
          message.error({ content: '同步失败' });
        }
      } else {
        message.error({ content: '缺少参数' });
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
