/* eslint-disable */
/* @ts-ignore */
import { costsExchangeInit, defaultCurrentProductMain } from '@/constant/defaultCurrentData';

import { costsExchangeQuery } from '@/services/api/googleMerchant';
import {
  createProductMain,
  delProductMain,
  editProductMain,
  queryProductMainAll,
  queryProductMainDetail,
} from '@/services/api/productMain';
import { message } from 'antd';
import { useState } from 'react';

const productAttributeOptionInit = [
  {
    attribute_name: '',
    attribute_value: '',
  },
];
type QueryParamsInitType = {
  product_main_id: string;
  product_id?: string;
  language?: string;
  product_sku_option_status: string;
};

type CostsExchangeType = {
  costFirstLegFreightRatio: number;
  costFbaRatio: number;
  costsAdvertisingRatio: number;
  targetProfitRatio: number;
  USD: number;
  JPY: number;
  KRW: number;
  CNY: number;
};
type GoogleProductCategory = {
  key: string;
  title: string;
  [key: string]: any;
};
type ProductType = {
  id: number;
  key: React.Key;
  title_zh: string;
  title_en: string;
  title_ja: string;
  title_ko: string;
  projectId: string;
  [key: string]: any;
};
type PaginationParamsType = {
  current: number;
  pageSize: number;
  total?: number;
};
type ProductMainDetailType = {
  title_main: string;
  imgSrc?: string;
  offer_id: string;
  google_product_category: string | GoogleProductCategory;
  google_product_category_id: string;
  product_type?: Array<ProductType>;
  product_type_id?: string;
  gtin: string;
  brand: string;
  projectId?: string;
  identifierExists: boolean;
  costPrice: string | number;
  preSalePrice: string | number;
  costFirstLegFreightRatio: number;
  costFbaRatio: number;
  costsAdvertisingRatio: number;
  targetProfitRatio: number;
  summaryKeywords: string;
  [key: string]: any;
};
// imgSrc, product_type, product_type_id, projectId

type ProductTypeType = {
  title_zh: string;
  [k: string]: number | string;
};
type tableSelectedKeys = {
  selectedRowKeys: React.Key[];
  selectedRows: ProductType[];
};

const paginationParamsInit = {
  current: 1,
  pageSize: 20,
  total: 0,
};

function ProductMainModel() {
  const [productTypeName, setProductTypeName] = useState('');
  const [createMainModalStatus, setCreateMainModalStatus] = useState(false);
  const [productCategoryShow, setProductCategoryShow] = useState(false);
  const [productTypeShow, setProductTypeShow] = useState(false);
  const [costsExchange, setCostsExchange] = useState<CostsExchangeType>(costsExchangeInit);
  const [productMainDetail, setProductMainDetail] =
    useState<ProductMainDetailType>(defaultCurrentProductMain);
  const [productMainList, setProductMainList] = useState([]);
  const [paginationParams, setPaginationParams] =
    useState<PaginationParamsType>(paginationParamsInit);
  const [selectedRowsProductType, setSelectedRowsProductType] = useState<tableSelectedKeys>();
  const [selectedRowsProductCategory, setSelectedRowsProductCategory] =
    useState<tableSelectedKeys>();

  // 获取成本和汇率
  const shoppingCostsExchangeQuery = async () => {
    const result = await costsExchangeQuery();
    if (result && result.status === 200 && result.data) {
      setCostsExchange(result.data);
    } else {
      message.error({ content: result.msg });
    }
  };
  // 获取详情
  const queryProductMainDetailFetch = async (data: QueryParamsInitType) => {
    const result = await queryProductMainDetail();
    if (result && result.status === 200 && result.data) {
      const productTypeNameArr: Array<string> = [];
      if (result.data.product_type && result.data.product_type.length > 0) {
        result.data.product_type.forEach((item: ProductTypeType) => {
          if (item.title_zh) {
            productTypeNameArr.push(item.title_zh);
          }
        });
        const productTypeNameStr: string =
          (productTypeNameArr[0] && productTypeNameArr.join(',')) || '';
        setProductTypeName(productTypeNameStr);
      }
      setProductMainDetail(result.data);
    } else {
      message.error({ content: result.msg });
    }
  };
  // 获取列表
  const queryProductMainListFetch = async (pagination: PaginationParamsType) => {
    const result = await queryProductMainAll({ ...pagination });
    if (result && result.status === 200 && result.data && result.data.rows) {
      const updatePagination = Object.assign({}, paginationParams, pagination, {
        total: result.data.count,
      });
      setPaginationParams(updatePagination);
      setProductMainList(result.data.rows);
    } else {
      message.error({ content: result.msg });
    }
  };
  // 删除
  const delProductMainFetch = async (data: ProductMainDetailType) => {
    if (data && data.id) {
      const result = await delProductMain({ id: data.id });
      if (result && result.status === 200 && result.data) {
        await queryProductMainListFetch(paginationParams);
      } else {
        message.error({ content: result.msg });
      }
    } else {
      message.warning({ content: '缺少参数' });
    }
  };
  // 编辑
  const editProductMainFetch = async () => {
    const result = await editProductMain(productMainDetail);
    if (result && result.status === 200 && result.data) {
      await queryProductMainListFetch(paginationParams);
      setCreateMainModalStatus(false);
      setProductMainDetail(defaultCurrentProductMain);
    } else {
      message.error({ content: result.msg });
    }
  };
  // 创建
  const createProductMainFetch = async () => {
    const {
      title_main,
      google_product_category,
      google_product_category_id,
      offer_id,
      costPrice,
      preSalePrice,
    } = productMainDetail;
    if (
      title_main &&
      google_product_category &&
      google_product_category_id &&
      offer_id &&
      costPrice &&
      preSalePrice
    ) {
      const result = await createProductMain(productMainDetail);
      if (result && result.status === 200 && result.data) {
        await queryProductMainListFetch(paginationParams);
        setCreateMainModalStatus(false);
        setProductMainDetail(defaultCurrentProductMain);
      } else {
        message.error({ content: result.msg });
      }
    } else {
      message.warning({ content: '缺少参数' });
    }
  };

  return {
    productMainList,
    costsExchange,
    setCostsExchange,
    productMainDetail,
    setProductMainDetail,
    createMainModalStatus,
    setCreateMainModalStatus,
    queryProductMainListFetch,
    delProductMainFetch,
    paginationParams,
    setPaginationParams,
    productTypeName,
    setProductTypeName,
    createProductMainFetch,
    editProductMainFetch,
    productCategoryShow,
    setProductCategoryShow,
    productTypeShow,
    setProductTypeShow,
    selectedRowsProductType,
    setSelectedRowsProductType,
    selectedRowsProductCategory,
    setSelectedRowsProductCategory,
    shoppingCostsExchangeQuery,
  };
}

export default ProductMainModel;
