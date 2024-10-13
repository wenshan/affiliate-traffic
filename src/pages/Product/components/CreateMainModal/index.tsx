import { defaultCurrentProductMain } from '@/constant/defaultCurrentData';
import { useModel } from '@umijs/max';
import { Button, Col, Input, InputNumber, Modal, Row, Switch, message } from 'antd';
import React from 'react';
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
type Event = { target: { value: any } };
// eslint-disable-next-line @typescript-eslint/no-redeclare
type GoogleProductCategory = {
  key: string;
  title: string;
  [key: string]: any;
};

type Props = {
  optionAction: boolean;
  callbackOk: any;
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

export default (props: Props) => {
  const {
    productMainDetail,
    setProductMainDetail,
    createMainModalStatus,
    setCreateMainModalStatus,
    costsExchange,
    productTypeName,
    setProductTypeName,
    createProductMainFetch,
    editProductMainFetch,
    setProductCategoryShow,
    setProductTypeShow,
  } = useModel('productMainModel');
  const handleCancel = async () => {
    setProductMainDetail(defaultCurrentProductMain);
    setCreateMainModalStatus(false);
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
    } = productMainDetail;
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
        await editProductMainFetch();
      } else {
        // 新建
        await createProductMainFetch();
      }
      setProductTypeName('');
    } else {
      message.error('缺少必要参数，请检测对应数据');
    }
  };

  const setChangeInputValueHandler = async (key: string, event: Event) => {
    const { value } = event.target;
    const temp: { [key: string]: string | number } = {};
    temp[key] = value;
    const newCurrentProductMainData = Object.assign({}, productMainDetail, temp);
    console.log('newCurrentProductMainData:', newCurrentProductMainData);
    if (key) {
      setProductMainDetail(newCurrentProductMainData);
    }
  };
  const setChangeSwitchValueHandler = async (key: string, value: any) => {
    const temp: { [key: string]: string | number } = {};
    temp[key] = value;
    const newCurrentProductMainData = Object.assign({}, productMainDetail, temp);
    if (key) {
      setProductMainDetail(newCurrentProductMainData);
    }
  };
  // 成本计算
  const setChangeCostPriceValueHandler = async (key: string, event: Event) => {
    const { value } = event.target;
    const { costFirstLegFreightRatio, targetProfitRatio, costFbaRatio, costsAdvertisingRatio } =
      costsExchange;
    const temp: { [key: string]: string | number } = {};
    temp[key] = value;
    // const costFirstLegFreightRatioValue = (Number(value) * (Number(costFirstLegFreightRatio) / 100)).toFixed(2);
    // const costFbaRatioValue = (Number(costPrice) * (Number(costFirstLegFreightRatio) / 100)).toFixed(2);
    // const costsAdvertisingRatioValue = (Number(value) * (Number(costFirstLegFreightRatio) / 100)).toFixed(2);
    // const targetProfitRatioValue = (Number(value) * (Number(costFirstLegFreightRatio) / 100)).toFixed(2);
    const preSalePrice = (
      value *
      (1 +
        (costFirstLegFreightRatio + targetProfitRatio + costFbaRatio + costsAdvertisingRatio) / 100)
    ).toFixed(2);
    const newCurrentProductMainData = Object.assign({}, productMainDetail, temp, { preSalePrice });
    if (key) {
      setProductMainDetail(newCurrentProductMainData);
    }
  };
  const setChangeInputNumberValueHandler = async (key: string, value: any) => {
    const temp: { [key: string]: string | number } = {};
    temp[key] = value;
    const newCurrentProductMainData = Object.assign({}, productMainDetail, temp);
    if (key) {
      setProductMainDetail(newCurrentProductMainData);
    }
  };

  const googleProductCategoryButtonHandle = async () => {
    setProductCategoryShow(true);
  };

  const productCategoryCallBackOk = async (option: GoogleProductCategory) => {
    if (option) {
      const google_product_category = option;
      const google_product_category_id = option.key;
      const newCurrentProductMainData = Object.assign({}, productMainDetail, {
        google_product_category,
        google_product_category_id,
      });
      setProductMainDetail(newCurrentProductMainData);
      setProductCategoryShow(false);
      setProductTypeName('');
    } else {
      message.error('Google类目选择错误');
    }
  };

  const productTypeButtonHandle = async () => {
    setProductTypeShow(true);
  };
  const productTypeCallBackOk = async (
    selectedRowKeys: React.Key[],
    selectedRows: ProductType[],
  ) => {
    if (selectedRowKeys && selectedRows) {
      const newCurrentProductMainData = Object.assign({}, productMainDetail, {
        product_type_id: selectedRowKeys.join(','),
        product_type: selectedRows,
      });
      const productTypeNameArr: string[] = [];
      selectedRows.forEach((item: ProductType) => {
        productTypeNameArr.push(item.title_zh);
      });
      const productTypeNameStr: string = (productTypeNameArr && productTypeNameArr.join(',')) || '';
      setProductTypeName(productTypeNameStr);
      setProductMainDetail(newCurrentProductMainData);
    }
    setProductTypeShow(false);
  };
  // 同步成本计算
  const restCostPriceCostsExchange = () => {
    const newCurrentProductMainData = Object.assign({}, productMainDetail, costsExchange);
    setProductMainDetail(newCurrentProductMainData);
  };

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
    product_type_id,
  } = productMainDetail;
  return (
    <Modal
      title={`${props.optionAction ? '编辑主商品信息' : '创建主商品信息'}`}
      open={createMainModalStatus}
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
                value={(google_product_category && google_product_category.title) || ''}
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
                value={productTypeName && productTypeName}
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
            <Row gutter={[16, 0]}>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
                <Button onClick={restCostPriceCostsExchange}>同步成本计算</Button>
              </Col>
            </Row>

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
                  />
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
                  />
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
                  />
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
                  />
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
        callbackOk={productCategoryCallBackOk}
        selectedKeys={(google_product_category_id && [Number(google_product_category_id)]) || []}
      ></GoogleProductCategory>
      <ProductCustomTypeModalSelect
        callbackOk={productTypeCallBackOk}
        selectedKeys={product_type_id}
      ></ProductCustomTypeModalSelect>
    </Modal>
  );
};
