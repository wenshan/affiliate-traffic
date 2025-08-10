import InputText from '@/components/InputText';
import { monetaryUnitOption } from '@/constant/defaultCurrentData';
import ResizeImg from '@/constant/resizeImg';
import ImageSelectModal from '@/pages/Product/components/ImageSelectModal';
import LabelHelpTip from '@/pages/Product/components/LabelHelpTip';
import { CloseOutlined, PictureOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Button, Drawer, InputNumber, Radio, Select, Space, message } from 'antd';
import { useModel } from 'umi';

import './index.less';

export default (props: any) => {
  const { costsExchange, productDetail } = useModel('productCreateProductSkuModel');
  console.log('productDetail:', productDetail);
  const {
    saleSkuData,
    setSaleSkuData,
    saleSkuItems,
    saleSkuOperateType,
    saleSkuCerateTempFetch,
    saleSkuEditFetch,
    optionsProductSaleTypeData,
  } = useModel('productCreateProductSkuModel');

  const {
    queryFolderFetch,
    setProductSkuImageModalStatus,
    currentImageProductType,
    setCurrentImageProductType,
    setImageLimitNum,
  } = useModel('material');
  const imgListRemove = () => {
    const newSaleSkuData = Object.assign({}, saleSkuData, { pattern: '' });
    setSaleSkuData(newSaleSkuData);
  };
  const saleTypeRadioOnChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    let saleValueInit = '';
    if (value) {
      if (value === 'default') {
        saleValueInit = '一口价售卖';
      } else {
        saleValueInit = '';
      }
      const newSaleSkuData = Object.assign({}, saleSkuData, {
        saleType: value,
        saleValue: saleValueInit,
        color: '',
        material: '',
        pattern: '',
        pattern_name: '',
        size: '',
      });
      setSaleSkuData(newSaleSkuData);
    }
  };
  const saleValueInputHandle = (type: string, value: string) => {
    const objTemp = {};
    // @ts-check
    objTemp[type] = value;
    const newSaleSkuData = Object.assign({}, saleSkuData, { saleValue: value }, objTemp);
    console.log('newSaleSkuData:', newSaleSkuData);
    setSaleSkuData(newSaleSkuData);
  };
  const patternNameInputHandle = (value: string) => {
    const newSaleSkuData = Object.assign({}, saleSkuData, {
      saleValue: value,
      pattern_name: value,
    });
    setSaleSkuData(newSaleSkuData);
  };
  const productImageCallbackOkDrawer = (selectedMaterial: { url: any }[]) => {
    let newSaleSkuData;
    if (selectedMaterial && selectedMaterial[0] && selectedMaterial[0]?.url) {
      if (currentImageProductType === 'pattern') {
        const src_mage_link = selectedMaterial[0]?.url;
        newSaleSkuData = Object.assign({}, saleSkuData, { pattern: src_mage_link });
        setProductSkuImageModalStatus(false);
        setSaleSkuData(newSaleSkuData);
      }
    }
  };
  const imageSelectModel = async (type: string, imageLimitNum: number) => {
    setProductSkuImageModalStatus(true);
    setCurrentImageProductType(type);
    setImageLimitNum(imageLimitNum);
    await queryFolderFetch();
  };
  const switchHtml = () => {
    const { saleType, saleValue, pattern, pattern_name } = saleSkuData;
    let html;
    const imgText = (
      <div className="pattern-box">
        <div className="add-img-item">
          {pattern ? (
            <img src={`${pattern}${ResizeImg['w_100']}`} />
          ) : (
            <PictureOutlined
              style={{ fontSize: '36px', color: '#08c' }}
              onClick={() => imageSelectModel('pattern', 1)}
            />
          )}
          {pattern ? (
            <span className="img-remove" onClick={() => imgListRemove()}>
              <CloseOutlined style={{ fontSize: '24px' }} />
            </span>
          ) : null}
        </div>
        <div className="name">
          <div className="label-input">标题:</div>
          <InputText
            placeholder="图案属性名称"
            style={{ width: 350 }}
            value={pattern_name}
            onChange={(value) => {
              patternNameInputHandle(value);
            }}
          />
        </div>
      </div>
    );

    if (saleType) {
      const inputText = (
        <>
          <LabelHelpTip keyLabel={saleType}></LabelHelpTip>
          <InputText
            placeholder="售卖规格名称"
            style={{ width: 250 }}
            value={saleValue}
            onChange={(value) => {
              saleValueInputHandle(saleType, value);
            }}
          />
        </>
      );
      if (saleType === 'pattern') {
        html = imgText;
      } else if (
        saleType === 'pattern' ||
        saleType === 'color' ||
        saleType === 'size' ||
        saleType === 'material'
      ) {
        html = inputText;
      } else {
        html = <div className="tx">一口价售卖</div>;
      }
    }
    return html;
  };
  // 货币单位
  const monetaryUnitSelectHandle = (value: string) => {
    // @ts-ignore
    const { preSalePrice } = productDetail;
    const { discount } = saleSkuData;
    // @ts-check
    const price = (Number(costsExchange[value]) * preSalePrice).toFixed(2);
    let sale_price = price;
    // @ts-check
    if (Number(discount) > 0) {
      const rate = ((100 - Number(discount)) / 100).toFixed(2);
      sale_price = (Number(price) * Number(rate)).toFixed(2);
    }
    const newSaleSkuData = Object.assign({}, saleSkuData, {
      price,
      monetary_unit: value,
      sale_price,
    });
    setSaleSkuData(newSaleSkuData);
  };
  // 价格
  const priceInputHandle = (value: null | string) => {
    const { discount } = saleSkuData;
    let newSaleSkuData;
    if (discount) {
      const initSalePrice = (Number(value) * Number(discount)).toFixed(2);
      newSaleSkuData = Object.assign({}, saleSkuData, {
        price: value,
        sale_price: initSalePrice,
      });
    } else {
      newSaleSkuData = Object.assign({}, saleSkuData, { price: value, sale_price: value });
    }
    setSaleSkuData(newSaleSkuData);
  };
  // 商品折扣
  const discountInputHandle = (value: null | string) => {
    const { price, sale_price } = saleSkuData;
    let newSaleSkuData;
    if (value && Number(value) > 0) {
      const rate = ((100 - Number(value)) / 100).toFixed(2);
      const initSalePrice = (Number(price) * Number(rate)).toFixed(2);
      newSaleSkuData = Object.assign({}, saleSkuData, {
        discount: value,
        sale_price: initSalePrice,
      });
    } else {
      newSaleSkuData = Object.assign({}, saleSkuData, { discount: value, sale_price });
    }
    setSaleSkuData(newSaleSkuData);
  };
  // 商品促销价格
  const salePriceInputHandle = (value: string) => {
    const newSaleSkuData = Object.assign({}, saleSkuData, { sale_price: value });
    setSaleSkuData(newSaleSkuData);
  };
  const handelRadioAvailability = (event: any) => {
    const { value } = event.target;
    const newSaleSkuData = Object.assign({}, saleSkuData, { availability: value });
    setSaleSkuData(newSaleSkuData);
  };
  const handleOk = async () => {
    const { product_main_id, language } = productDetail;
    if (!saleSkuData.saleType) {
      message.warning({ content: '请填必要的字段' });
      return false;
    }
    if (saleSkuData.saleType === 'pattern' && !saleSkuData.pattern_name) {
      message.warning({ content: '请填必要的字段' });
      return false;
    }
    if (saleSkuData.saleType && saleSkuData.saleType !== 'default' && !saleSkuData.saleValue) {
      message.warning({ content: '请填必要的字段' });
      return false;
    }

    if (
      props.skuDrawerCallback &&
      saleSkuItems &&
      saleSkuData &&
      saleSkuData.saleType &&
      saleSkuData.price &&
      saleSkuData.sale_price &&
      saleSkuData.availability &&
      product_main_id &&
      language
    ) {
      // 编辑
      if (saleSkuOperateType) {
        await saleSkuEditFetch({ product_main_id, language });
      } else {
        await saleSkuCerateTempFetch({ product_main_id, language });
      }
      props.skuDrawerCallback(false);
    }
  };
  const handleCancel = () => {
    if (props.skuDrawerCallback) {
      props.skuDrawerCallback(false);
    }
  };
  const { costPrice, preSalePrice } = productDetail;
  const { saleType, monetary_unit, price, discount, sale_price, availability } = saleSkuData;

  if (!price || Number(price) === 0) {
    const newSaleSkuData = Object.assign({}, saleSkuData, {
      price: preSalePrice,
      sale_price: preSalePrice,
      discount: 0,
    });
    setSaleSkuData(newSaleSkuData);
  }
  return (
    <Drawer
      width={650}
      className="product-sku-drawer"
      open={props.isOpen}
      title={`${saleSkuOperateType ? '编辑销售规格' : '新建销售规格'}`}
      closable
      destroyOnClose
      placement="right"
      onClose={handleCancel}
      zIndex={999}
      footer={
        <Space>
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleOk} type="primary">
            确认
          </Button>
        </Space>
      }
    >
      <div className="content form-box">
        <div className="form-item">
          <LabelHelpTip keyLabel="saleType"></LabelHelpTip>
          <Radio.Group
            onChange={saleTypeRadioOnChange}
            defaultValue="default"
            value={saleType}
            options={optionsProductSaleTypeData}
            disabled={false}
          ></Radio.Group>
        </div>
        <div className="form-item">
          <div className="form-switch">{switchHtml()}</div>
        </div>
        <div className="header">
          <div className="sub-header">价格和库存状况</div>
        </div>
        <div className="content form-box">
          <div className="form-item">
            <span className="label">
              <i>*</i> 选择货币单位:
            </span>
            <Select
              value={monetary_unit}
              style={{ width: 130 }}
              onChange={monetaryUnitSelectHandle}
              options={monetaryUnitOption}
            />
          </div>
          <div className="form-item">
            <LabelHelpTip keyLabel="price"></LabelHelpTip>
            <InputText
              placeholder="价格"
              style={{ width: 130 }}
              onChange={priceInputHandle}
              value={price}
              suffix={monetary_unit}
            />
            <span className="tx">
              成本价:{(Number(costsExchange[monetary_unit]) * costPrice).toFixed(2)} {monetary_unit}{' '}
              预售价:{(Number(costsExchange[monetary_unit]) * preSalePrice).toFixed(2)}{' '}
              {monetary_unit}{' '}
            </span>
          </div>
          <div className="form-item">
            <LabelHelpTip keyLabel="discount"></LabelHelpTip>
            <InputNumber
              placeholder="折扣"
              style={{ width: 130 }}
              max={'60'}
              min={'0'}
              value={discount}
              onChange={discountInputHandle}
              suffix="%"
            />
          </div>
          <div className="form-item">
            <LabelHelpTip keyLabel="sale_price"></LabelHelpTip>
            <InputText
              placeholder="售卖价格"
              style={{ width: 130 }}
              value={sale_price}
              onChange={salePriceInputHandle}
              suffix={monetary_unit}
            />
          </div>
          <div className="form-item">
            <LabelHelpTip keyLabel="availability"></LabelHelpTip>
            <Radio.Group value={availability} onChange={handelRadioAvailability}>
              <Radio value="in_stock"> 有货 </Radio>
              <Radio value="out_of_stock"> 缺货 </Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      <ImageSelectModal callbackOk={productImageCallbackOkDrawer}></ImageSelectModal>
    </Drawer>
  );
};
