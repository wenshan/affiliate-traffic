/* eslint-disable */
/* @ts-ignore */
import { shoppingProductInsert } from '@/services/api/googleAccount';
import { delProduct, queryProductAll } from '@/services/api/product';
import { queryProductMainOfferId } from '@/services/api/productMain';
import { message } from 'antd';
import QueryString from 'query-string';
import { useState } from 'react';

const initPagination = {
  current: 1,
  pageSize: 50,
  total: 0,
};
const initSearchParams = {
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
};
const initProductAttributeOption = [
  {
    attribute_name: '',
    attribute_value: '',
  },
];
function ProductList() {
  const [onLoading, setOnLoading] = useState(false);
  const [pagination, setPagination] = useState(initPagination);
  const [searchParams, setSearchParams] = useState(initSearchParams);
  const [product_sku_option_status, set_product_sku_option_status] = useState(0);
  const [productTypeOption, setProductTypeOption] = useState([]);
  const [googleProductCategoryOption, setGoogleProductCategoryOption] = useState({});
  const [productAttributeOption, setProductAttributeOption] = useState(initProductAttributeOption);
  const [productList, setProductList] = useState([]);
  const [productMainList, setProductMainList] = useState([]);
  const [productMainOfferIds, setProductMainOfferIds] = useState([]);
  const [productDetail, setProductDetail] = useState({});

  const initQueryParams = () => {
    const { search } = window.document.location;
    const pagination = {
      current: 1,
      pageSize: 20,
      total: 0,
    };
    const query = QueryString.parse(search);
    if (query && query.product_main_id) {
      const newSearchParams = Object.assign({}, searchParams, {
        product_main_id: query.product_main_id,
      });
      setSearchParams(newSearchParams);
    }
    if (query && query.product_main_id && query.language) {
      const newSearchParams = Object.assign({}, searchParams, {
        id: query.product_id,
        language: query.language,
      });
      setSearchParams(newSearchParams);
    }
    if (query && query.product_sku_option_status) {
      const newSearchParams = Object.assign({}, searchParams, {
        product_sku_option_status: query.product_sku_option_status,
      });
      setSearchParams(newSearchParams);
    }
    setPagination(initPagination);
  };
  const queryProductAllFetch = async () => {
    const { language, product_type_id, offer_id } = searchParams;
    const { current, pageSize } = pagination;
    if (current && pageSize && language) {
      const result = await queryProductAll({
        current,
        pageSize,
        language,
        product_type_id,
        offer_id,
      });
      if (result && result.status && result.status === 200 && result.data && result.data.rows) {
        const updatePagination = Object.assign({}, pagination, { total: result.data.count });
        setProductList(result.data.rows);
        setPagination(updatePagination);
        setOnLoading(false);
      } else {
        message.warning({ content: result.msg });
        setOnLoading(false);
      }
    } else {
      message.warning({ content: '缺少查询字段！' });
      setOnLoading(false);
    }
  };
  const delProductFetch = async (data: any) => {
    const { id, language } = data;
    if (id) {
      const result = await delProduct({ id, language });
      if (result && result.status && result.status === 200) {
        await queryProductAllFetch();
        console.log('删除商品SKU分类成功');
      }
    }
  };
  const queryProductMainOfferIdFetch = async () => {
    const result = await queryProductMainOfferId();
    if (result && result.status && result.status === 200 && result.data) {
      const temp = [
        {
          value: 'all',
          label: 'All',
        },
      ];
      result.data &&
        result.data.length &&
        result.data.map((item: any) => {
          temp.push(item);
        });
      setProductMainOfferIds(temp);
    }
  };
  /** 同步google 购物数据 */
  const shoppingProductInsertFetch = async (data: any) => {
    if (data && data.id) {
      const result = await shoppingProductInsert(data);
      if (result && result.status && result.status === 200 && result.data) {
        message.success({ content: '同步成功' });
      } else {
        message.error({ content: '同步失败' });
      }
    } else {
      message.error({ content: '缺少参数' });
    }
  };

  return {
    onLoading,
    productList,
    initQueryParams,
    pagination,
    setPagination,
    searchParams,
    setSearchParams,
    productDetail,
    setProductDetail,
    shoppingProductInsertFetch,
    delProductFetch,
    queryProductAllFetch,
    queryProductMainOfferIdFetch,
  };
}
export default ProductList;
