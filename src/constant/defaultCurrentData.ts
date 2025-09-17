/* eslint-disable */
/* @ts-ignore */
const defaultProductDetail = {
  id: '',
  product_id: '',
  age_group: 'adult',
  gender: 'unisex',
  pattern: '',
  size: '',
  size_type: 'regular',
  size_system: 'US',
  gtin: '',
  brand: '',
  offer_id: '',
  product_main_id: 0,
  language: 'zh-CN',
  monetary_unit: 'USD',
  title: '',
  title_main: '',
  description: '',
  link: '',
  mobile_link: '',
  image_link: '',
  additional_image_link: [],
  lifestyle_image_link: [],
  google_product_category: {
    title: '',
  },
  google_product_category_id: '',
  product_type: [],
  product_type_id: '',
  color: '',
  material: '',
  price: '',
  sale_price: '',
  discount: 5,
  product_detail: [], // 商品属性
  product_detail_keys: '',
  product_highlight: '',
  productHeight: '',
  productLength: '',
  productWidth: '',
  productWeight: '',
  availability: 'in_stock',
  sizeUnit: 'cm',
  weightUnit: 'g',
  channel: 'online',
  feedLabel: null,
  adult: false,
  kind: 'content#product',
  identifierExists: false,
  contentLanguage: 'zh',
  targetCountry: 'CN',
  projectId: '',
  costPrice: 0,
  costFirstLegFreightRatio: 0,
  costFbaRatio: 0,
  preSalePrice: 0,
  targetProfitRatio: 0,
  summaryKeywords: '',
  youTubeId: '',
  baseProductHeight: '',
  baseProductLength: '',
  baseProductWidth: '',
  baseProductWeight: '',
  baseSizeUnit: 'cm',
  baseWeightUnit: 'g',
  saleSkus: [],
};
const defaultCurrentProductMain = {
  id: '',
  title_main: '',
  offer_id: '',
  google_product_category: {
    key: '4',
    title: '动物/宠物用品>宠物用品>猫用品',
  },
  google_product_category_id: '4',
  gtin: '',
  brand: 'Limeet',
  identifierExists: false, // 如果商品没有适合其类别的唯一商品标识符（如 GTIN、MPN 和品牌），则为 false。
  costPrice: 0,
  costFirstLegFreightRatio: 10,
  costFbaRatio: 50,
  costsAdvertisingRatio: 5,
  targetProfitRatio: 30,
  preSalePrice: 0,
  summaryKeywords: '',
  baseProductHeight: '',
  baseProductLength: '',
  baseProductWidth: '',
  baseProductWeight: '',
  baseSizeUnit: 'cm',
  baseWeightUnit: 'g',
};

const defaultCostsExchange = {
  costFirstLegFreightRatio: 10,
  costFbaRatio: 50,
  costsAdvertisingRatio: 5,
  targetProfitRatio: 30,
  USD: 0.14,
  JPY: 20.5,
  KRW: 188,
  CNY: 1,
};

const costsExchangeTypeCurrency = {
  US: 'USD',
  JP: 'JPY',
  KR: 'KRW',
  CN: 'CNY',
};

const defaultProductCustomType = {
  zh_CN: '',
  en_US: '',
  ja_JP: '',
  ko_KR: '',
};

const monetaryUnitOption = [
  { value: 'CNY', label: '人民币' },
  { value: 'USD', label: '美元' },
  { value: 'JPY', label: '日元' },
  { value: 'KRW', label: '韩元' },
];

const languageOption = [
  { value: 'zh-CN', label: '中文' },
  { value: 'en-US', label: '英语' },
  { value: 'ja-JP', label: '日语' },
  { value: 'ko_KR', label: '韩语' },
];
const languageOptionDropdown = [
  { key: 'zh-CN', label: '中文' },
  { key: 'en-US', label: '英语' },
  { key: 'ja-JP', label: '日语' },
  { key: 'ko_KR', label: '韩语' },
];
const sizeTypeOption = [
  { value: 'regular', label: '标准' },
  { value: 'petite', label: '小号' },
  { value: 'maternity', label: '孕妇 ' },
  { value: 'big', label: '大' },
  { value: 'tall', label: '高' },
  { value: 'plus', label: '加大' },
];

const sizeSystemOption = [
  { value: 'US', label: 'US' },
  { value: 'UK', labe: 'UK' },
  { value: 'EU', label: 'EU' },
  { value: 'DE', label: 'DE' },
  { value: 'FR', label: 'FR' },
  { value: 'JP', label: 'JP' },
  { value: 'CN', label: 'CN' },
  { value: 'IT', label: 'IT' },
  { value: 'BR', label: 'BR' },
  { value: 'MEX', label: 'MEX' },
  { value: 'AU', label: 'AU' },
];
const ageGroupOption = [
  { value: 'newborn', label: '新生儿' },
  { value: 'infant', label: '婴儿' },
  { value: 'toddler', label: '幼儿' },
  { value: 'kids', label: '儿童' },
  { value: 'adult', label: '成人' },
];
const genderOption = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'unisex', label: '男女通用' },
];

const productSizeUnitOption = [
  {
    value: 'mm',
    label: 'mm',
  },
  {
    value: 'cm',
    label: 'cm',
  },
  {
    value: 'in',
    label: 'in',
  },
];
const productSizeUnitOptionMain = [
  {
    value: 'cm',
    label: 'cm',
  },
];

const defaultSizeUnitCountry = {
  US: {
    value: 'in',
    label: 'in',
  },
  JP: {
    value: 'cm',
    label: 'cm',
  },
  KR: {
    value: 'cm',
    label: 'cm',
  },
  CN: {
    value: 'cm',
    label: 'cm',
  },
};

const productWeightUnitOption = [
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
];
const productWeightUnitOptionMain = [
  {
    value: 'g',
    label: 'g',
  },
  {
    value: 'kg',
    label: 'kg',
  },
];
const defaultWeightUnitCountry = {
  US: {
    value: 'g',
    label: 'g',
  },
  JP: {
    value: 'g',
    label: 'g',
  },
  KR: {
    value: 'g',
    label: 'g',
  },
  CN: {
    value: 'g',
    label: 'g',
  },
};

const costsExchangeInit = {
  costFirstLegFreightRatio: 10,
  costFbaRatio: 50,
  costsAdvertisingRatio: 5,
  targetProfitRatio: 30,
  USD: 0.14,
  JPY: 20.5,
  KRW: 188,
  CNY: 1,
  exchange_cm2in: 0.3937008,
  exchange_kg2lb: 2.2046226,
  exchange_g2lb: 0.0022046,
};

const optionsProductSaleType = [
  { label: '一口价', value: 'default', disabled: false },
  { label: '图案', value: 'pattern', disabled: false },
  { label: '颜色', value: 'color', disabled: false },
  { label: '尺寸', value: 'size', disabled: false },
  { label: '材质', value: 'material', disabled: false },
];

const optionsProductSaleTypeObj = {
  default: '一口价',
  pattern: '图案',
  color: '颜色',
  size: '尺寸',
  material: '材质',
};

const defaultSaleSkuData = {
  product_id: '',
  product_main_id: '',
  item_group_id: '',
  language: '',
  saleType: 'default',
  saleValue: '一口价售卖',
  color: '',
  material: '',
  pattern: '',
  pattern_name: '',
  size: '',
  price: '0',
  sale_price: '0',
  discount: 5,
  monetary_unit: 'USD',
  availability: 'in_stock',
  projectId: '',
};

export {
  ageGroupOption,
  costsExchangeInit,
  costsExchangeTypeCurrency,
  defaultCostsExchange,
  defaultCurrentProductMain,
  defaultProductCustomType,
  defaultProductDetail,
  defaultSaleSkuData,
  defaultSizeUnitCountry,
  defaultWeightUnitCountry,
  genderOption,
  languageOption,
  languageOptionDropdown,
  monetaryUnitOption,
  optionsProductSaleType,
  optionsProductSaleTypeObj,
  productSizeUnitOption,
  productSizeUnitOptionMain,
  productWeightUnitOption,
  productWeightUnitOptionMain,
  sizeSystemOption,
  sizeTypeOption,
};
