/* eslint-disable */
/* @ts-ignore */
import {
  costsExchangeInit,
  costsExchangeTypeCurrency,
  defaultCurrentProductMain,
  defaultProductDetail,
  defaultSizeUnitCountry,
  defaultWeightUnitCountry,
} from '@/constant/defaultCurrentData';
import { createProduct, editProduct, queryProductDetail } from '@/services/api/product';
import { queryProductMainDetail } from '@/services/api/productMain';
import { Modal, message } from 'antd';
import QueryString from 'query-string';
import { useEffect, useState } from 'react';
import { history } from 'umi';

type QueryParamsType = {
  product_sku_option_status: number;
  product_main_id: number;
  product_id?: number;
  language?: string;
  [key: string]: any;
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

type QueryParamsInitType = {
  product_main_id: string;
  product_id?: string;
  language?: string;
  product_sku_option_status: string;
};
const queryParamsInit = {
  product_main_id: '',
  product_id: '',
  language: 'zh-CN',
  product_sku_option_status: '0',
};

function productCreateSkuModel() {
  const [queryParams, setQueryParams] = useState<QueryParamsInitType>(queryParamsInit);
  const [productDetail, setProductDetail] = useState(defaultProductDetail);
  const [costsExchange, setCostsExchange] = useState<CostsExchangeType>(costsExchangeInit);
  const [productMainDetail, setProductMainDetail] = useState(defaultCurrentProductMain);
  const [currentPreSalePrice, setCurrentPreSalePrice] = useState();
  const [costsExchangeTypeCurrencyLabel, setCostsExchangeTypeCurrencyLabel] =
    useState<string>('en-US');
  const [costsExchangeTypeCurrencyValue, setCostsExchangeTypeCurrencyValue] = useState<number>();

  const initQueryParams = async () => {
    const { search } = window.document.location;
    const query = Object.assign({}, queryParamsInit, QueryString.parse(search));
    if (query && query.product_main_id) {
      setQueryParams(query);
      debugger;
      if (query.product_sku_option_status === '1') {
        // 编辑
        if (query.product_main_id && query.product_id) {
          await queryProductDetailFetch(query);
        }
      } else {
        // 创建
        if (query.product_main_id) {
          await queryProductMainDetailFetch(query);
        }
      }
    }
  };

  // 获取主商品信息
  const queryProductMainDetailFetch = async (data: QueryParamsInitType) => {
    const { product_main_id } = data;
    if (product_main_id && productDetail && productDetail.language) {
      const result = await queryProductMainDetail({ id: product_main_id });
      if (result && result.status && result.status === 200 && result.data) {
        // 初始化计算 当前 语种下的 价格
        const { preSalePrice } = result.data;
        const targetCountry = productDetail.language.split('-')[1];
        // 当前的货币单位 当前汇率 货币汇率计算
        // 国家=》货币单位
        const targetCountryUnit =
          (targetCountry && costsExchangeTypeCurrency[targetCountry]) || 'USD';
        // @ts-ignore
        const targetCountryValue = targetCountryUnit && costsExchange[targetCountryUnit];
        const price = (preSalePrice * targetCountryValue).toFixed(2);
        const sale_price = price;
        const monetary_unit = targetCountryUnit;
        const sizeUnit = defaultSizeUnitCountry[targetCountry].value;
        const weightUnit = defaultWeightUnitCountry[targetCountry].value;
        const initProductDetail = Object.assign({}, productDetail, {
          price,
          sale_price,
          monetary_unit,
          sizeUnit,
          weightUnit,
          product_main_id: result.data.id,
          title_main: result.data.title_main,
          product_type: result.data.product_type,
          product_type_id: result.data.product_type_id,
          google_product_category: result.data.google_product_category,
          google_product_category_id: result.data.google_product_category_id,
          offer_id: result.data.offer_id,
          brand: result.data.brand,
          gtin: result.data.gtin,
          identifierExists: result.data.identifierExists || false,
          preSalePrice: result.data.preSalePrice,
          costPrice: result.data.costPrice,
          costFirstLegFreightRatio: result.data.costFirstLegFreightRatio,
          costsAdvertisingRatio: result.data.costsAdvertisingRatio,
          targetProfitRatio: result.data.targetProfitRatio,
          summaryKeywords: result.data.summaryKeywords,
        });
        console.log('initProductDetail:', initProductDetail);
        console.log('mainDetail:', result.data);
        setCurrentPreSalePrice(preSalePrice);
        setProductMainDetail(result.data);
        setProductDetail(initProductDetail);
        setCostsExchangeTypeCurrencyLabel(targetCountryUnit);
        setCostsExchangeTypeCurrencyValue(targetCountryValue);
      }
    }
  };
  // 获取当前商品信息
  const queryProductDetailFetch = async (data: QueryParamsInitType) => {
    const { product_id, language } = data;
    if (product_id && language) {
      const result = await queryProductDetail({ id: product_id, language });
      if (result && result.status && result.status === 200 && result.data) {
        const { targetCountry, preSalePrice } = result.data;
        const targetCountryUnit =
          (targetCountry && costsExchangeTypeCurrency[targetCountry]) || 'USD';
        // @ts-ignore
        const targetCountryValue = targetCountryUnit && costsExchange[targetCountryUnit];
        setCostsExchangeTypeCurrencyLabel(targetCountryUnit);
        setCostsExchangeTypeCurrencyValue(targetCountryValue);
        setCurrentPreSalePrice(preSalePrice);
        setProductDetail(result.data);
      }
    }
  };
  // 商品编辑
  const editProductFetch = async () => {
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
      sale_price,
      product_highlight,
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
      offer_id &&
      sale_price &&
      price &&
      product_highlight &&
      product_main_id
    ) {
      const result = await editProduct(productDetail);
      if (result && result.status === 200) {
        Modal.confirm({
          title: '编辑成功',
          content: '编辑商品SKU成功,返回到列表页面',
          onOk() {
            history.push('/product/productList');
          },
          onCancel() {
            message.success({ content: result.msg });
          },
        });
      } else {
        message.warning({ content: result.msg });
      }
    } else {
      message.warning({ content: '=请检查必填字段！' });
    }
  };
  // 商品创建
  const createProductFetch = async () => {
    const { id } = productMainDetail;
    const {
      product_main_id,
      title_main,
      offer_id,
      google_product_category,
      google_product_category_id,
      product_type,
      product_type_id,
      gtin,
      brand,
      costPrice,
      costFirstLegFreightRatio,
      costFbaRatio,
      preSalePrice,
      targetProfitRatio,
      title,
      language,
      monetary_unit,
      link,
      image_link,
      lifestyle_image_link,
      additional_image_link,
      price,
      sale_price,
      product_highlight,
      description,
    } = productDetail;
    if (
      product_main_id &&
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
      offer_id &&
      sale_price &&
      price &&
      product_highlight &&
      costPrice &&
      preSalePrice &&
      targetProfitRatio
    ) {
      const result = await createProduct(productDetail);
      if (result && result.status === 200) {
        Modal.confirm({
          title: '创建成功',
          content: '创建商品SKU,返回到列表页面',
          onOk() {
            history.push('/product/productList');
          },
          onCancel() {
            message.success({ content: result.msg });
          },
        });
      } else {
        message.warning({ content: result.msg });
      }
    } else {
      message.warning({ content: '请检查必填字段！' });
    }
  };

  useEffect(() => {
    initQueryParams();
  }, []);

  return {
    createProductFetch,
    editProductFetch,
    productDetail,
    setProductDetail,
    queryParams,
    productMainDetail,
    setProductMainDetail,
    costsExchange,
    costsExchangeTypeCurrencyLabel,
    costsExchangeTypeCurrencyValue,
    currentPreSalePrice,
    queryProductMainDetailFetch,
  };
}
export default productCreateSkuModel;
