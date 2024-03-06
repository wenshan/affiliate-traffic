/* eslint-disable no-undef */
/* @ts-ignore */
import QueryString from 'query-string';

export default {
  namespace: 'productCreate',
  state: {
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
      { value: '2', label: 'Lucy' },
      { value: '3', label: 'yiminghe' },
      { value: '4', label: 'Disabled' },
    ],
    googleProductCategoryOption: {},
    currentProductMain: {
      title: '商品衣蛾',
      productType: { value: '1', label: 'Jack' },
      offerId: '111111',
      googleProductCategory: { key: '1', title: 'Jack' },
      gtin: '123123123123',
    },
    productMainList: [
      {
        title: '商品衣蛾',
        productType: { value: '1', label: 'Jack' },
        offerId: '111111',
        googleProductCategory: { key: '1', title: 'Jack' },
        gtin: '123123123123',
      },
      {
        title: '商品衣蛾2',
        productType: { value: '1', label: 'Jack' },
        offerId: '111111',
        googleProductCategory: { key: '1', title: 'Jack' },
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
      offerId: '123123123123',
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

  effects: {},

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
