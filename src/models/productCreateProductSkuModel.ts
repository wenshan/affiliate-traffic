/* eslint-disable */
/* @ts-ignore */
import {
  costsExchangeInit,
  costsExchangeTypeCurrency,
  defaultCurrentProductMain,
  defaultProductDetail,
  defaultSaleSkuData,
  optionsProductSaleType,
} from '@/constant/defaultCurrentData';
import { costsExchangeQuery } from '@/services/api/googleMerchant';
import { createProduct, editProduct, queryProductDetail } from '@/services/api/product';
import { queryProductMainDetail } from '@/services/api/productMain';
import {
  saleSkuCerateTemp,
  saleSkuDel,
  saleSkuEdit,
  saleSkuQueryTemp,
} from '@/services/api/productSaleSku';
import { Modal, message } from 'antd';
import QueryString from 'query-string';
import { SetStateAction, useState } from 'react';
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
  exchange_cm2in: number | string;
  exchange_kg2lb: number | string;
  exchange_g2lb: number | string;
};

type QueryParamsInitType = {
  product_main_id: string;
  product_id?: string;
  language?: string;
  product_sku_option_status: string;
};
type SaleSkuDataType = {
  saleType: string;
  saleValue: string;
  color: string;
  material: string;
  size: string;
  price: string;
  sale_price: string;
  discount: string;
  monetary_unit: string;
  availability: string;
  pattern: string;
  pattern_name: string;
  [key: string]: any;
};

const queryParamsInit = {
  product_main_id: '',
  product_id: '',
  language: 'zh-CN',
  product_sku_option_status: '0',
};

const saleSkuDataMap = new Map();

function productCreateProductSkuModel() {
  const [saleTypeSelectButtonOk, setSaleTypeSelectButtonOk] = useState(false);
  const [optionsProductSaleTypeData, setOptionsProductSaleTypeDate] =
    useState(optionsProductSaleType);
  const [buttonSubmitCreateSkuLoading, setButtonSubmitCreateSkuLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryParamsInitType>(queryParamsInit);
  const [currentLanguage, setCurrentLanguage] = useState('zh-CN');
  const [productDetail, setProductDetail] = useState(defaultProductDetail);
  const [costsExchange, setCostsExchange] = useState<CostsExchangeType>(costsExchangeInit);
  const [productMainDetail, setProductMainDetail] = useState(defaultCurrentProductMain);
  const [currentPreSalePrice, setCurrentPreSalePrice] = useState();
  const [costsExchangeTypeCurrencyLabel, setCostsExchangeTypeCurrencyLabel] =
    useState<string>('en-US');
  const [costsExchangeTypeCurrencyValue, setCostsExchangeTypeCurrencyValue] = useState<number>();
  // sale sku
  const [saleSkuData, setSaleSkuData] = useState<SaleSkuDataType>(defaultSaleSkuData);
  const [saleSkuItems, setSaleSkuItems] = useState<SaleSkuDataType[]>([]);
  const [saleSkuOperateType, setSaleSkuOperateType] = useState<boolean>(false);

  const initQueryParams = async () => {
    const { search } = window.document.location;
    const query = Object.assign({}, queryParamsInit, QueryString.parse(search));
    if (query && query.product_main_id) {
      setQueryParams(query);
      if (query.language) {
        setCurrentLanguage(query.language);
      }
      await costsExchangeQueryFetch();
      if (query.product_sku_option_status === '1') {
        // 编辑
        if (query.product_main_id && query.product_id && query.language) {
          setProductDetail(defaultProductDetail);
          setProductMainDetail(defaultCurrentProductMain);
          await queryProductDetailFetch(query);
        }
      } else {
        // 创建
        if (query.product_main_id && query.language) {
          setProductDetail(defaultProductDetail);
          setProductMainDetail(defaultCurrentProductMain);
          await queryProductMainDetailFetch(query, 'init');
        }
      }
    }
  };
  // 更新项目汇率等配置
  const costsExchangeQueryFetch = async () => {
    const result = await costsExchangeQuery();
    if (result && result.status === 200 && result.data) {
      setCostsExchange(result.data);
    }
  };

  // 获取主商品信息
  const queryProductMainDetailFetch = async (data: QueryParamsInitType, type: string) => {
    const { product_main_id, language } = data;
    if (product_main_id && costsExchange && productDetail && language) {
      const result = await queryProductMainDetail({ id: product_main_id });
      if (result && result.status && result.status === 200 && result.data) {
        // 初始化计算 当前 语种下的 价格
        const {
          preSalePrice,
          baseProductHeight,
          baseProductLength,
          baseProductWidth,
          baseProductWeight,
          baseSizeUnit,
          baseWeightUnit,
        } = result.data;
        const { exchange_cm2in, exchange_kg2lb, exchange_g2lb } = costsExchange;
        const targetCountry = language.split('-')[1];
        // 当前的货币单位 当前汇率 货币汇率计算
        // 国家=》货币单位
        // @ts-ignore
        const targetCountryUnit =
          (targetCountry && costsExchangeTypeCurrency[targetCountry]) || 'USD';
        // @ts-ignore
        const targetCountryValue = targetCountryUnit && costsExchange[targetCountryUnit];
        const price = (preSalePrice * targetCountryValue).toFixed(2);
        const sale_price = price;
        const monetary_unit = targetCountryUnit;
        let sizeUnit = baseSizeUnit;
        let weightUnit = baseWeightUnit;
        let productLength = baseProductLength;
        let productWidth = baseProductWidth;
        let productHeight = baseProductHeight;
        let productWeight = baseProductWeight;

        // 适配 商品尺寸 和 重量
        // 适配 商品尺寸

        if (baseProductHeight && baseProductLength && baseProductWidth && baseSizeUnit) {
          if (targetCountry === 'US') {
            productLength = (Number(baseProductLength) * Number(exchange_cm2in)).toFixed(2);
            productHeight = (Number(baseProductHeight) * Number(exchange_cm2in)).toFixed(2);
            productWidth = (Number(baseProductWidth) * Number(exchange_cm2in)).toFixed(2);
            sizeUnit = 'in';
          }
        }
        if (baseWeightUnit && baseWeightUnit) {
          if (targetCountry === 'US') {
            if (baseWeightUnit === 'g') {
              productWeight = (Number(baseProductWeight) * Number(exchange_g2lb)).toFixed(2);
            }
            if (baseWeightUnit === 'kg') {
              productWeight = (Number(baseProductWeight) * Number(exchange_kg2lb)).toFixed(2);
            }
            weightUnit = 'lb';
          }
        }

        // 适配 商品重量
        const initProductDetail = Object.assign({}, productDetail, {
          price,
          sale_price,
          monetary_unit,
          sizeUnit,
          weightUnit,
          productLength,
          productWidth,
          productHeight,
          productWeight,
          baseProductHeight,
          baseProductLength,
          baseProductWidth,
          baseProductWeight,
          baseSizeUnit,
          baseWeightUnit,
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
    const realLanguage = language || currentLanguage;
    if (product_id && language) {
      const result = await queryProductDetail({ id: product_id, language: realLanguage });
      if (result && result.status && result.status === 200 && result.data) {
        const { targetCountry, preSalePrice, saleSkus } = result.data;
        // @ts-check
        const targetCountryUnit =
          (targetCountry && costsExchangeTypeCurrency[targetCountry]) || 'USD';
        // @ts-ignore
        const targetCountryValue = targetCountryUnit && costsExchange[targetCountryUnit];
        setCostsExchangeTypeCurrencyLabel(targetCountryUnit);
        setCostsExchangeTypeCurrencyValue(targetCountryValue);
        setCurrentPreSalePrice(preSalePrice);
        setProductDetail(result.data);
        setSaleSkuItems(saleSkus);
        const newOptionsProductSaleTypeData: SetStateAction<
          { label: string; value: string; disabled: boolean }[]
        > = [];
        if (saleSkus && saleSkus.length) {
          saleSkus.forEach((item: { saleType: string }) => {
            console.log(item);
            saleSkuDataMap.set(item.saleType, item);
          });
          if (saleSkuDataMap.get('default')) {
            optionsProductSaleTypeData.forEach((item) => {
              newOptionsProductSaleTypeData.push(Object.assign({}, item, { disabled: true }));
            });
            setOptionsProductSaleTypeDate(newOptionsProductSaleTypeData);
            setSaleTypeSelectButtonOk(true);
          } else {
            setSaleTypeSelectButtonOk(false);
            optionsProductSaleTypeData.forEach((item) => {
              newOptionsProductSaleTypeData.push(Object.assign({}, item, { disabled: false }));
            });
            setOptionsProductSaleTypeDate(newOptionsProductSaleTypeData);
          }
        }
      }
    }
  };
  // 商品编辑
  const editProductFetch = async () => {
    const {
      id,
      title,
      language,
      monetary_unit,
      link,
      image_link,
      description,
      product_main_id,
      product_type,
      google_product_category,
      title_main,
      offer_id,
      product_highlight,
      saleSkus,
    } = productDetail;
    if (
      id &&
      title &&
      title_main &&
      language &&
      monetary_unit &&
      link &&
      image_link &&
      description &&
      product_type &&
      google_product_category &&
      offer_id &&
      product_highlight &&
      product_main_id &&
      saleSkus
    ) {
      const result = await editProduct(productDetail);
      if (result && result.status && result.status === 200) {
        Modal.confirm({
          title: '编辑成功',
          content: '编辑商品SKU成功,返回到列表页面',
          onOk() {
            history.push('/product/productList');
            setProductDetail(defaultProductDetail);
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
      product_highlight,
      description,
      saleSkus,
    } = productDetail;
    if (
      product_main_id &&
      title &&
      title_main &&
      language &&
      monetary_unit &&
      link &&
      image_link &&
      description &&
      id &&
      product_type &&
      google_product_category &&
      offer_id &&
      product_highlight &&
      costPrice &&
      preSalePrice &&
      targetProfitRatio &&
      saleSkus
    ) {
      const result = await createProduct(productDetail);
      if (result && result.status === 200) {
        Modal.confirm({
          title: '创建成功',
          content: '创建商品SKU,返回到列表页面',
          onOk() {
            history.push('/product/productList');
            setProductDetail(defaultProductDetail);
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

  // SKU 编辑
  const saleSkuEditFetch = async (data: any) => {
    const { language, product_main_id } = data;
    const { saleType, price, sale_price, discount, monetary_unit, availability } = saleSkuData;
    if (
      monetary_unit &&
      price &&
      sale_price &&
      discount &&
      saleType &&
      language &&
      product_main_id &&
      availability
    ) {
      setButtonSubmitCreateSkuLoading(true);
      const result = await saleSkuEdit(saleSkuData);
      if (result && result.status && result.status === 200) {
        await saleSkuQueryTempFetch({ language, product_main_id });
        message.success({ content: '编辑商品售卖规则成功' });
      } else {
        message.warning({ content: result.msg });
      }
    } else {
      message.warning({ content: '请检查必填字段！' });
    }
  };
  // SKU创建
  const saleSkuCerateTempFetch = async (data: any) => {
    const { language, product_main_id } = data;
    debugger;
    const { saleType, price, sale_price, discount, monetary_unit, availability } = saleSkuData;
    if (
      saleType &&
      price &&
      sale_price &&
      discount &&
      monetary_unit &&
      language &&
      product_main_id &&
      availability
    ) {
      setButtonSubmitCreateSkuLoading(true);
      const postData = Object.assign({}, saleSkuData, data);
      const result = await saleSkuCerateTemp(postData);
      if (result && result.status === 200) {
        message.success({ content: '创建商品售卖规则成功' });
        await saleSkuQueryTempFetch({ language, product_main_id });
      } else {
        message.warning({ content: result.msg });
      }
    } else {
      message.warning({ content: '请检查必填字段！' });
    }
  };
  // SKU 删除
  const saleSkuDelFetch = async (data: any) => {
    const { id, product_main_id, language } = data;
    if (id && product_main_id && language) {
      setButtonSubmitCreateSkuLoading(true);
      const result = await saleSkuDel({ id, product_main_id, language });
      if (result && result.status === 200) {
        message.success({ content: '删除成功' });
        await saleSkuQueryTempFetch({ language, product_main_id });
      } else {
        message.warning({ content: result.msg });
      }
    } else {
      message.warning({ content: '请检查必填字段！' });
    }
  };
  // SKU 查询
  const saleSkuQueryTempFetch = async (data: any) => {
    const { language, product_main_id } = data;
    if (language && product_main_id) {
      const result = await saleSkuQueryTemp({ language, product_main_id });
      if (result && result.status === 200 && result.data && result.data.rows) {
        setSaleSkuItems(result.data.rows);
        setButtonSubmitCreateSkuLoading(false);
        const newOptionsProductSaleTypeData: SetStateAction<
          { label: string; value: string; disabled: boolean }[]
        > = [];
        if (result.data.rows && result.data.rows.length) {
          result.data.rows.forEach((item: { saleType: string }) => {
            console.log(item);
            saleSkuDataMap.set(item.saleType, item);
          });
          if (saleSkuDataMap.get('default')) {
            optionsProductSaleTypeData.forEach((item) => {
              newOptionsProductSaleTypeData.push(Object.assign({}, item, { disabled: true }));
            });
            setOptionsProductSaleTypeDate(newOptionsProductSaleTypeData);
            setSaleTypeSelectButtonOk(true);
          } else {
            setSaleTypeSelectButtonOk(false);
            optionsProductSaleTypeData.forEach((item) => {
              newOptionsProductSaleTypeData.push(Object.assign({}, item, { disabled: false }));
            });
            setOptionsProductSaleTypeDate(newOptionsProductSaleTypeData);
          }
        }
      } else {
        message.warning({ content: result.msg });
      }
    } else {
      message.warning({ content: '请检查必填字段！' });
    }
  };

  return {
    createProductFetch,
    editProductFetch,
    productDetail,
    setProductDetail,
    queryParams,
    setQueryParams,
    initQueryParams,
    productMainDetail,
    setProductMainDetail,
    costsExchange,
    costsExchangeTypeCurrencyLabel,
    costsExchangeTypeCurrencyValue,
    currentPreSalePrice,
    queryProductMainDetailFetch,
    setCostsExchange,
    currentLanguage,
    setCurrentLanguage,
    saleSkuData,
    setSaleSkuData,
    saleSkuItems,
    setSaleSkuItems,
    saleSkuOperateType,
    setSaleSkuOperateType,
    buttonSubmitCreateSkuLoading,
    setButtonSubmitCreateSkuLoading,
    saleSkuCerateTempFetch,
    saleSkuEditFetch,
    saleSkuDelFetch,
    saleSkuQueryTempFetch,
    saleTypeSelectButtonOk,
    setSaleTypeSelectButtonOk,
    optionsProductSaleTypeData,
    setOptionsProductSaleTypeDate,
  };
}
export default productCreateProductSkuModel;
