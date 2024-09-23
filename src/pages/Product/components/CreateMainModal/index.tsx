import { defaultCurrentProductMain } from '@/constant/defaultCurrentData';
import { costsExchangeQuery } from '@/services/api/googleMerchant';
import {
  createProductMain,
  editProductMain,
  queryProductMainDetail,
} from '@/services/api/productMain';
import { Button, Col, Input, InputNumber, Modal, Row, Switch, message } from 'antd';
import { useEffect, useState } from 'react';
import GoogleProductCategory from '../GoogleProductCategory';
import LabelHelpTip from '../LabelHelpTip';
import ProductCustomTypeModalSelect from '../ProductCustomTypeModalSelect';

const { TextArea } = Input;

import './index.less';
/*
type CostsExchange = {
  costFirstLegFreightRatio: number;
  costFbaRatio: number;
  costsAdvertisingRatio: number;
  targetProfitRatio: number;
  exchange_US: number;
  exchange_JP: number;
  exchange_KR: number;
  exchange_CN: number;
  [key: string]: any;
};
*/
// eslint-disable-next-line @typescript-eslint/no-redeclare
type GoogleProductCategory = {
  key: string;
  title: string;
  [key: string]: any;
};
type currentProductMainRender = {
  title_main: string;
  imgSrc: string;
  offer_id: string;
  google_product_category: string | GoogleProductCategory;
  google_product_category_id: string;
  product_type: string;
  product_type_id: string;
  gtin: string;
  brand: string;
  projectId: string;
  identifierExists: boolean;
  costPrice: string;
  preSalePrice: string;
  costFirstLegFreightRatio: number;
  costFbaRatio: number;
  costsAdvertisingRatio: number;
  targetProfitRatio: number;
  summaryKeywords: string;
  [key: string]: any;
};

type Props = {
  id: string | number;
  open: boolean;
  openStatusCallback: any;
  optionAction: boolean;
  callbackOk: any;
};

export default (props: Props) => {
  const [currentProductMainData, setCurrentProductMainData] =
    useState<currentProductMainRender>(defaultCurrentProductMain);
  const [isProductCategoryShow, setProductCategoryShow] = useState(false);
  const [isProductTypeShow, setProductTypeShow] = useState(false);
  const costsExchangeFetch = async () => {
    const result = await costsExchangeQuery();
    if (result && result.status === 200 && result.data) {
      return result.data;
    } else {
      return null;
    }
  };
  const currentProductMainFetch = async () => {
    const id = props.id;
    const result = await queryProductMainDetail({ id });
    if (result && result.status === 200 && result.data) {
      const resultCostsExchange = await costsExchangeFetch();
      let formData = null;
      if (resultCostsExchange) {
        formData = Object.assign({}, result.data, resultCostsExchange);
      } else {
        formData = result.data;
      }
      setCurrentProductMainData(formData);
    }
  };
  const handleCancel = async () => {
    props.openStatusCallback(false);
    setCurrentProductMainData(defaultCurrentProductMain);
  };
  const handleOk = async () => {
    const {
      google_product_category,
      google_product_category_id,
      title_main,
      offer_id,
      brand,
      gtin,
      identifierExists,
      costPrice,
      preSalePrice,
      product_type_id,
    } = currentProductMainData;
    if (identifierExists) {
      if (!gtin) {
        message.error('请检测 identifierExists 和 gtin 的依赖关系！');
        return false;
      }
    }
    if (
      google_product_category &&
      google_product_category_id &&
      title_main &&
      offer_id &&
      brand &&
      preSalePrice &&
      costPrice &&
      product_type_id
    ) {
      if (props.optionAction) {
        // 编辑
        const result = await editProductMain(currentProductMainData);
        if (result && result.status === 200 && result.data) {
          props.callbackOk(currentProductMainData);
          message.success('编辑成功！');
          props.openStatusCallback(false);
        } else {
          message.error(result.msg || '编辑失败！');
        }
      } else {
        // 新建
        const result = await createProductMain(currentProductMainData);
        if (result && result.status === 200 && result.data) {
          props.callbackOk(currentProductMainData);
          message.success('创建成功！');
          props.openStatusCallback(false);
        } else {
          message.error(result.msg || '创建失败！');
        }
      }
    } else {
      message.error('缺少必要参数，请检测对应数据');
    }
  };

  const setChangeInputValueHandler = async (key: string, event: any) => {
    const { value } = event.target;
    const temp: { [key: string]: any } = {};
    temp[key] = value;
    const newCurrentProductMainData = Object.assign({}, currentProductMainData, temp);
    if (key) {
      setCurrentProductMainData(newCurrentProductMainData);
    }
  };
  const setChangeSwitchValueHandler = async (key: string, value: any) => {
    const temp: { [key: string]: any } = {};
    temp[key] = value;
    const newCurrentProductMainData = Object.assign({}, currentProductMainData, temp);
    if (key) {
      setCurrentProductMainData(newCurrentProductMainData);
    }
  };
  const setChangeCostPriceValueHandler = async (key: string, event: any) => {
    const { value } = event.target;
    const { costFirstLegFreightRatio, targetProfitRatio, costFbaRatio, costsAdvertisingRatio } =
      currentProductMainData;
    const temp: { [key: string]: any } = {};
    temp[key] = value;
    const preSalePrice = (
      value *
      (1 +
        (costFirstLegFreightRatio + targetProfitRatio + costFbaRatio + costsAdvertisingRatio) / 100)
    ).toFixed(2);
    const newCurrentProductMainData = Object.assign({}, currentProductMainData, temp, {
      preSalePrice,
    });
    if (key) {
      setCurrentProductMainData(newCurrentProductMainData);
    }
  };
  const setChangeInputNumberValueHandler = async (key: string, value: any) => {
    const temp: { [key: string]: any } = {};
    temp[key] = value;
    const newCurrentProductMainData = Object.assign({}, currentProductMainData, temp);
    if (key) {
      setCurrentProductMainData(newCurrentProductMainData);
    }
  };

  const googleProductCategoryButtonHandle = async () => {
    setProductCategoryShow(true);
  };

  const productCategoryCallBackCancel = async () => {
    setProductCategoryShow(false);
  };
  const productCategoryCallBackOk = async (option: GoogleProductCategory) => {
    if (option) {
      const google_product_category = option;
      const google_product_category_id = option.key;
      const newCurrentProductMainData = Object.assign({}, currentProductMainData, {
        google_product_category,
        google_product_category_id,
      });
      setCurrentProductMainData(newCurrentProductMainData);
      setProductCategoryShow(false);
    } else {
      message.error('Google类目选择错误');
    }
  };

  const productTypeButtonHandle = async () => {
    setProductTypeShow(true);
  };
  const productTypeCallBackCancel = async () => {
    setProductTypeShow(false);
  };
  const productTypeCallBackOk = async ({ selectedRowKeys, selectedRows }) => {
    if (selectedRowKeys && selectedRows) {
      const newCurrentProductMainData = Object.assign({}, currentProductMainData, {
        product_type_id: selectedRowKeys[0],
        product_type: selectedRows[0],
      });
      setCurrentProductMainData(newCurrentProductMainData);
    }
    setProductTypeShow(false);
  };

  useEffect(() => {
    currentProductMainFetch();
  }, [props]);

  const {
    title_main,
    offer_id,
    gtin,
    google_product_category,
    google_product_category_id,
    brand,
    identifierExists,
    costPrice,
    preSalePrice,
    costFirstLegFreightRatio,
    costFbaRatio,
    costsAdvertisingRatio,
    targetProfitRatio,
    summaryKeywords,
    product_type,
    product_type_id,
  } = currentProductMainData;
  return (
    <Modal
      title={'创建主商品信息'}
      open={props.open}
      width={900}
      onOk={handleOk}
      onCancel={handleCancel}
      className="create-main-modal"
    >
      <div>
        <>
          <div className="header">
            <div className="sub-header">多语言通用的商品类别和标识码</div>
          </div>
          <div className="content form-box-modal">
            <div className="form-item">
              <span className="label">
                <i>*</i> 主商品名称:
              </span>
              <Input
                placeholder="主商品名称"
                style={{ width: 350 }}
                value={title_main}
                onChange={(event) => {
                  setChangeInputValueHandler('title_main', event);
                }}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="offer_id"></LabelHelpTip>
              <Input
                placeholder="商品货号"
                style={{ width: 350 }}
                value={offer_id}
                onChange={(event) => {
                  setChangeInputValueHandler('offer_id', event);
                }}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="google_product_category"></LabelHelpTip>
              <Input
                placeholder="选择Google商品类目"
                style={{ width: 350 }}
                value={google_product_category && google_product_category.title}
                disabled
              />
              <span className="operate">
                <Button type="primary" size="small" onClick={googleProductCategoryButtonHandle}>
                  选择Google商品类目
                </Button>
              </span>
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="product_type"></LabelHelpTip>
              <Input
                placeholder="自定商品分类"
                style={{ width: 350 }}
                value={product_type && product_type.title_zh}
                disabled
              />
              <span className="operate">
                <Button type="primary" size="small" onClick={productTypeButtonHandle}>
                  管理自定商品分类
                </Button>
              </span>
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="gtin"></LabelHelpTip>
              <Input
                placeholder="商品GTIN码"
                style={{ width: 350 }}
                value={gtin}
                onChange={(event) => {
                  setChangeInputValueHandler('gtin', event);
                }}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="brand"></LabelHelpTip>
              <Input
                placeholder="品牌名称"
                style={{ width: 350 }}
                value={brand}
                onChange={(event) => {
                  setChangeInputValueHandler('brand', event);
                }}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="identifierExists"></LabelHelpTip>
              <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                value={identifierExists}
                onChange={(value) => {
                  setChangeSwitchValueHandler('identifierExists', value);
                }}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="costPrice"></LabelHelpTip>
              <Input
                name="costPrice"
                style={{ width: 150 }}
                addonBefore="￥"
                value={costPrice}
                onChange={(event) => {
                  setChangeCostPriceValueHandler('costPrice', event);
                }}
              />
            </div>

            <Row gutter={[16, 0]}>
              <Col span={12}>
                <div className="form-item">
                  <LabelHelpTip keyLabel="costFirstLegFreightRatio"></LabelHelpTip>
                  <InputNumber
                    name="costFirstLegFreightRatio"
                    style={{ width: 100 }}
                    addonAfter="%"
                    value={costFirstLegFreightRatio}
                    onChange={(value) => {
                      setChangeInputNumberValueHandler('costFirstLegFreightRatio', value);
                    }}
                  />{' '}
                  <span>
                    {(Number(costPrice) * (Number(costFirstLegFreightRatio) / 100)).toFixed(2)}
                  </span>
                </div>
              </Col>
              <Col span={12}>
                <div className="form-item">
                  <LabelHelpTip keyLabel="costFbaRatio"></LabelHelpTip>
                  <InputNumber
                    name="costFbaRatio"
                    style={{ width: 100 }}
                    addonAfter="%"
                    value={costFbaRatio}
                    onChange={(value) => {
                      setChangeInputNumberValueHandler('costFbaRatio', value);
                    }}
                  />{' '}
                  <span>{(Number(costPrice) * (Number(costFbaRatio) / 100)).toFixed(2)}</span>
                </div>
              </Col>
              <Col span={12}>
                <div className="form-item">
                  <LabelHelpTip keyLabel="costsAdvertisingRatio"></LabelHelpTip>
                  <InputNumber
                    name="costsAdvertisingRatio"
                    style={{ width: 100 }}
                    addonAfter="%"
                    value={costsAdvertisingRatio}
                    onChange={(value) => {
                      setChangeInputNumberValueHandler('costsAdvertisingRatio', value);
                    }}
                  />{' '}
                  <span>
                    {(Number(costPrice) * (Number(costsAdvertisingRatio) / 100)).toFixed(2)}
                  </span>
                </div>
              </Col>
              <Col span={12}>
                <div className="form-item">
                  <LabelHelpTip keyLabel="targetProfitRatio"></LabelHelpTip>
                  <InputNumber
                    name="targetProfitRatio"
                    style={{ width: 100 }}
                    addonAfter="%"
                    value={targetProfitRatio}
                    onChange={(value) => {
                      setChangeInputNumberValueHandler('targetProfitRatio', value);
                    }}
                  />{' '}
                  <span>{(Number(costPrice) * (Number(targetProfitRatio) / 100)).toFixed(2)}</span>
                </div>
              </Col>
            </Row>
            <div className="form-item">
              <LabelHelpTip keyLabel="preSalePrice"></LabelHelpTip>
              <Input
                name="preSalePrice"
                style={{ width: 150 }}
                addonBefore="￥"
                value={preSalePrice}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="summaryKeywords"></LabelHelpTip>
              <TextArea
                style={{ width: 550 }}
                value={summaryKeywords}
                rows={2}
                onChange={(event) => {
                  setChangeInputValueHandler('summaryKeywords', event);
                }}
              ></TextArea>
            </div>
          </div>
        </>
      </div>
      <GoogleProductCategory
        open={isProductCategoryShow}
        callbackCancel={productCategoryCallBackCancel}
        callbackOk={productCategoryCallBackOk}
        selectedKeys={[Number(google_product_category_id)]}
      ></GoogleProductCategory>
      <ProductCustomTypeModalSelect
        open={isProductTypeShow}
        callbackCancel={productTypeCallBackCancel}
        callbackOk={productTypeCallBackOk}
        selectedKeys={product_type_id}
      ></ProductCustomTypeModalSelect>
    </Modal>
  );
};
