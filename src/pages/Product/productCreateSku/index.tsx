import DefaultProject from '@/components/DefaultProject';
import {
  ageGroupOption,
  genderOption,
  languageOption,
  monetaryUnitOption,
  productSizeUnitOption,
  productWeightUnitOption,
  sizeSystemOption,
  sizeTypeOption,
} from '@/constant/defaultCurrentData';
import Tool from '@/utils/tool.js';
import { PageContainer } from '@ant-design/pro-components';
import type { RadioChangeEvent } from 'antd';
import { Button, Col, Image, Input, InputNumber, Radio, Row, Select, Table } from 'antd';
import { JSX, useState } from 'react';
import { useModel } from 'umi';
import ImageSelectModal from '../components/ImageSelectModal';
import LabelHelpTip from '../components/LabelHelpTip';
import ProductAttribute from '../components/ProductAttribute';
import RichTextEditor from '../components/RichTextEditor';

import './index.less';
const { TextArea } = Input;

type Event = { target: { value: any } };

function ProductCreateSku() {
  const { queryFolderFetch } = useModel('material');
  const {
    createProductFetch,
    editProductFetch,
    costsExchange,
    costsExchangeTypeCurrencyLabel,
    costsExchangeTypeCurrencyValue,
    productDetail,
    setProductDetail,
    queryParams,
    currentPreSalePrice,
  } = useModel('productCreateSkuModel');
  const { setProductAttributeModalStatus } = useModel('productAttributeModel');
  const { setProductSkuImageModalStatus } = useModel('material');
  const [currentImageProductType, setCurrentImageProductType] = useState('image_link');
  const [imageLimitNum, setImageLimitNum] = useState(20);

  // 语言
  const languageRadioHandle = (event: RadioChangeEvent) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { language: value });
    setProductDetail(newProductDetail);
  };
  // 货币单位
  const monetaryUnitSelectHandle = (value: string) => {
    const price = (costsExchange[value] * currentPreSalePrice).toFixed(2);
    const newProductDetail = Object.assign({}, productDetail, { price, monetary_unit: value });
    setProductDetail(newProductDetail);
  };
  // 名称
  const titleInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { title: value });
    setProductDetail(newProductDetail);
  };
  // 商品着陆页
  const linkInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { link: value });
    setProductDetail(newProductDetail);
  };
  // 手机端着陆页
  const mobileLinkInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { mobile_link: value });
    setProductDetail(newProductDetail);
  };
  // 商品促销价格
  const salePriceInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { sale_price: value });
    setProductDetail(newProductDetail);
  };
  // 商品折扣
  const discountInputHandle = (value: number) => {
    const { price, sale_price } = productDetail;
    let newProductDetail;
    if (value > 0) {
      const rate = ((100 - value) / 100).toFixed(2);
      const initSalePrice = (price * Number(rate)).toFixed(2);
      newProductDetail = Object.assign({}, productDetail, {
        discount: value,
        sale_price: initSalePrice,
      });
    } else {
      newProductDetail = Object.assign({}, productDetail, { discount: value, sale_price });
    }
    setProductDetail(newProductDetail);
  };
  // 商品重量
  const productWeightInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { productWeight: value });
    setProductDetail(newProductDetail);
  };
  // 尺寸 长宽高
  const productLengthInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { productLength: value });
    setProductDetail(newProductDetail);
  };

  const productWidthInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { productWidth: value });
    setProductDetail(newProductDetail);
  };

  const productHeightInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { productHeight: value });
    setProductDetail(newProductDetail);
  };

  const productAttributeButtonHandle = () => {
    setProductAttributeModalStatus(true);
  };
  const productAttributeCallbackOk = (selectedRowsProductAttr: any) => {
    const newProductDetail = Object.assign({}, productDetail, {
      product_detail: selectedRowsProductAttr,
    });
    setProductDetail(newProductDetail);
    setProductAttributeModalStatus(false);
  };
  const productImageCallbackOk = (selectedMaterial: { url: any }[]) => {
    const imageSrc: string[] = [];
    let newProductDetail;
    if (selectedMaterial && selectedMaterial.length) {
      selectedMaterial.map((item: { url: string }) => {
        imageSrc.push(item.url);
      });
    }
    if (currentImageProductType === 'image_link') {
      newProductDetail = Object.assign({}, productDetail, { image_link: imageSrc[0] });
    }
    if (currentImageProductType === 'additional_image_link') {
      newProductDetail = Object.assign({}, productDetail, { additional_image_link: imageSrc });
    }
    if (currentImageProductType === 'lifestyle_image_link') {
      newProductDetail = Object.assign({}, productDetail, { lifestyle_image_link: imageSrc });
    }
    console.log('newProductDetail:', newProductDetail);
    setProductSkuImageModalStatus(false);
    setProductDetail(newProductDetail);
  };
  const imageSelectModel = async (type: string, imageLimitNum: number) => {
    setProductSkuImageModalStatus(true);
    setCurrentImageProductType(type);
    setImageLimitNum(imageLimitNum);
    await queryFolderFetch();
  };
  const imageRenderView = (data: string[] | string) => {
    const html: JSX.Element[] = [];
    if (data && Tool.isArray(data) && data.length) {
      // @ts-ignore
      data.forEach((item: string) => {
        html.push(
          <div className="add-img-item" key={item}>
            <Image width={100} src={item} />
          </div>,
        );
      });
    } else {
      html.push(
        <div className="add-img-item">
          <Image width={100} src={data} />
        </div>,
      );
    }
    return html;
  };
  const handelRadioAvailability = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { availability: value });
    setProductDetail(newProductDetail);
  };
  // 商品组 ID [item_group_id]
  const itemGroupIdInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { item_group_id: value });
    setProductDetail(newProductDetail);
  };
  // 颜色 [color]
  const colorInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { color: value });
    setProductDetail(newProductDetail);
  };
  // 年龄段 [age_group]
  const ageGroupSelectHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { age_group: value });
    setProductDetail(newProductDetail);
  };
  // 适用性别 [gender]
  const genderSelectHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { age_group: value });
    setProductDetail(newProductDetail);
  };
  // 材质 [material]
  const materialInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { material: value });
    setProductDetail(newProductDetail);
  };
  // 图案 [pattern]
  const patternInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { pattern: value });
    setProductDetail(newProductDetail);
  };
  // 尺寸 [size]
  const sizeInputHandle = (event: Event) => {
    const { value } = event.target;
    const newProductDetail = Object.assign({}, productDetail, { size: value });
    setProductDetail(newProductDetail);
  };
  // 尺码类型 [size_type]
  const sizeTypeSelectHandle = (value: string | number) => {
    const newProductDetail = Object.assign({}, productDetail, { size_type: value });
    setProductDetail(newProductDetail);
  };
  // 尺码体系 [size_system]
  const sizeSystemSelectHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { size_system: value });
    setProductDetail(newProductDetail);
  };
  // 重量单位选择
  const weightUnitSelectHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { weightUnit: value });
    setProductDetail(newProductDetail);
  };
  // 尺寸单位选择
  const sizeUnitSelectHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { sizeUnit: value });
    setProductDetail(newProductDetail);
  };

  // 富文本编辑器回调
  const callbackTextEditorDescription = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { description: value });
    setProductDetail(newProductDetail);
  };
  // 富文本编辑器回调
  const callbackTextEditorProductHighlight = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { product_highlight: value });
    setProductDetail(newProductDetail);
  };
  // 自定义产品分类处理
  const productTypeNameStr = () => {
    const { product_type, contentLanguage } = productDetail;
    const nameStr: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    product_type &&
      product_type.length &&
      product_type.forEach((item: { [x: string]: any }) => {
        if (item) {
          nameStr.push(item[`title_${contentLanguage}`]);
        }
      });
    return nameStr.join(',');
    // contentLanguage && product_type && product_type[`title_${contentLanguage}`]
  };
  // 提交创建SKU
  const handelSubmitCreateSku = async (product_sku_option_status: number) => {
    if (product_sku_option_status > 0) {
      await editProductFetch();
    } else {
      await createProductFetch();
    }
  };
  const columnsProductAttribute = () => {
    return [
      {
        title: '属性名称',
        dataIndex: 'attribute_name',
      },
      {
        title: '属性值',
        dataIndex: 'attribute_value',
      },
    ];
  };
  const {
    language,
    monetary_unit,
    image_link,
    additional_image_link,
    lifestyle_image_link,
    link,
    product_type,
    mobile_link,
    description,
    title,
    price,
    sale_price,
    discount,
    color,
    material,
    product_highlight,
    availability,
    productWeight,
    product_detail,
    item_group_id,
    age_group,
    gender,
    pattern,
    size,
    size_type,
    size_system,
    weightUnit,
    sizeUnit,
    productHeight,
    productLength,
    productWidth,
    title_main,
    offer_id,
    gtin,
    brand,
    google_product_category,
    contentLanguage,
    costPrice,
    preSalePrice,
    summaryKeywords,
  } = productDetail;
  const productTypeName = productTypeNameStr();
  return (
    <PageContainer>
      <div className="page">
        <div className="product-sku">
          <DefaultProject></DefaultProject>
          <div className="header">
            <div className="sub-header">主数据</div>
          </div>

          <div className="content form-box">
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <div className="form-item">
                  <LabelHelpTip keyLabel="title_main"></LabelHelpTip>
                  <Input
                    placeholder="主商品标题"
                    style={{ width: 350 }}
                    value={title_main}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="offer_id"></LabelHelpTip>
                  <Input placeholder="商品货号" style={{ width: 350 }} value={offer_id} disabled />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="google_product_category"></LabelHelpTip>
                  <Input
                    placeholder="选择Google商品类目"
                    style={{ width: 350 }}
                    value={(google_product_category && google_product_category.title) || ''}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="product_type"></LabelHelpTip>
                  <Input
                    placeholder="自定商品分类"
                    style={{ width: 350 }}
                    value={contentLanguage && product_type && productTypeName}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="gtin"></LabelHelpTip>
                  <Input placeholder="商品GTIN码" style={{ width: 350 }} value={gtin} disabled />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="brand"></LabelHelpTip>
                  <Input placeholder="商品品牌" style={{ width: 350 }} value={brand} disabled />
                </div>
              </Col>
              <Col span={12}>
                <div className="form-item">
                  <LabelHelpTip keyLabel="costPrice"></LabelHelpTip>
                  <Input
                    placeholder="商品成本价"
                    addonBefore="￥"
                    style={{ width: 350 }}
                    value={costPrice}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="preSalePrice"></LabelHelpTip>
                  <Input
                    placeholder="商品预估售价"
                    addonBefore="￥"
                    style={{ width: 350 }}
                    value={preSalePrice}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel={costsExchangeTypeCurrencyLabel}></LabelHelpTip>
                  <Input
                    placeholder="汇率"
                    addonBefore={costsExchangeTypeCurrencyLabel}
                    style={{ width: 350 }}
                    value={costsExchangeTypeCurrencyValue}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="summaryKeywords"></LabelHelpTip>
                  <TextArea
                    placeholder="关键词"
                    rows={2}
                    style={{ width: 350 }}
                    value={summaryKeywords}
                    disabled
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="header">
            <div className="sub-header">基本商品数据</div>
          </div>
          <div className="content form-box">
            <div className="form-item">
              <span className="label">
                <i>*</i> 选择语言:
              </span>
              <Radio.Group
                value={language}
                onChange={languageRadioHandle}
                options={languageOption}
                disabled={queryParams.product_sku_option_status > 0}
              ></Radio.Group>
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="title"></LabelHelpTip>
              <Input
                placeholder="商品名称"
                style={{ width: 550 }}
                value={title}
                onChange={titleInputHandle}
              />
            </div>
            <div className="form-item">
              <Row>
                <Col flex="155px">
                  <div className="line-box-header">
                    <LabelHelpTip keyLabel="description"></LabelHelpTip>
                  </div>
                </Col>
                <Col flex="auto">
                  <div className="line-box-container">
                    <div className="description">
                      <RichTextEditor
                        callbackValue={callbackTextEditorDescription}
                        initValuerTextEditor={description}
                      ></RichTextEditor>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="form-item">
              <Row>
                <Col flex="155px">
                  <div className="line-box-header">
                    <LabelHelpTip keyLabel="product_highlight"></LabelHelpTip>
                  </div>
                </Col>
                <Col flex="auto">
                  <div className="line-box-container">
                    <div className="product_highlight">
                      <RichTextEditor
                        callbackValue={callbackTextEditorProductHighlight}
                        initValuerTextEditor={product_highlight}
                      ></RichTextEditor>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="form-item">
              <div className="line-box">
                <LabelHelpTip keyLabel="image_link"></LabelHelpTip>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    imageSelectModel('image_link', 1);
                  }}
                >
                  添加主图
                </Button>
              </div>
              <div className="line-box">
                <div className="add-img-list">{imageRenderView(image_link)}</div>
              </div>
            </div>
            <div className="form-item">
              <div className="line-box">
                <LabelHelpTip keyLabel="additional_image_link"></LabelHelpTip>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    imageSelectModel('additional_image_link', 5);
                  }}
                >
                  添加附属图片
                </Button>
              </div>
              <div className="line-box">
                <div className="add-img-list">{imageRenderView(additional_image_link)}</div>
              </div>
            </div>
            <div className="content form-box">
              <div className="form-item">
                <div className="line-box">
                  <LabelHelpTip keyLabel="lifestyle_image_link"></LabelHelpTip>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      imageSelectModel('lifestyle_image_link', 10);
                    }}
                  >
                    添加生活图片
                  </Button>
                </div>
                <div className="line-box">
                  <div className="add-img-list">{imageRenderView(lifestyle_image_link)}</div>
                </div>
              </div>
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="link"></LabelHelpTip>
              <Input
                placeholder="商品着陆页"
                style={{ width: 550 }}
                value={link}
                onChange={linkInputHandle}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="mobile_link"></LabelHelpTip>
              <Input
                placeholder="商品着陆页"
                style={{ width: 550 }}
                value={mobile_link}
                onChange={mobileLinkInputHandle}
              />
            </div>
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
              <Input
                placeholder="价格"
                style={{ width: 130 }}
                value={price}
                suffix={monetary_unit}
                disabled
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="discount"></LabelHelpTip>
              <InputNumber
                placeholder="折扣"
                style={{ width: 130 }}
                max={60}
                min={0}
                value={discount}
                onChange={() => discountInputHandle()}
                suffix="%"
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="sale_price"></LabelHelpTip>
              <Input
                placeholder="售卖价格"
                style={{ width: 130 }}
                value={sale_price}
                onChange={salePriceInputHandle}
                suffix={monetary_unit}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="availability"></LabelHelpTip>
              <Radio.Group value={availability} onChange={() => handelRadioAvailability(event)}>
                <Radio value="in_stock"> 有货 </Radio>
                <Radio value="out_of_stock"> 缺货 </Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="header">
            <div className="sub-header">详细商品描述&创建商品组合</div>
          </div>
          <div className="content form-box">
            {/** 商品组 ID [item_group_id] */}
            <div className="form-item">
              <LabelHelpTip keyLabel="item_group_id"></LabelHelpTip>
              <Input
                placeholder="商品组 ID"
                style={{ width: 120 }}
                value={item_group_id}
                onChange={itemGroupIdInputHandle}
              />
            </div>
            {/* 颜色 [color] */}
            <div className="form-item">
              <LabelHelpTip keyLabel="color"></LabelHelpTip>
              <Input
                placeholder="商品颜色"
                style={{ width: 350 }}
                value={color}
                onChange={colorInputHandle}
              />
            </div>
            {/* 年龄段 [age_group] */}
            <div className="form-item">
              <LabelHelpTip keyLabel="age_group"></LabelHelpTip>
              <Select
                value={age_group}
                style={{ width: 120 }}
                onChange={ageGroupSelectHandle}
                options={ageGroupOption}
              />
            </div>
            {/* 适用性别 [gender] */}
            <div className="form-item">
              <LabelHelpTip keyLabel="gender"></LabelHelpTip>
              <Select
                value={gender}
                style={{ width: 120 }}
                onChange={genderSelectHandle}
                options={genderOption}
              />
            </div>
            {/* 材质 [material] */}
            <div className="form-item">
              <LabelHelpTip keyLabel="material"></LabelHelpTip>
              <Input
                placeholder="商品材料"
                style={{ width: 350 }}
                value={material}
                onChange={materialInputHandle}
              />
            </div>
            {/* 图案 [pattern] */}
            <div className="form-item">
              <LabelHelpTip keyLabel="pattern"></LabelHelpTip>
              <Input
                placeholder="商品图案"
                style={{ width: 350 }}
                value={pattern}
                onChange={patternInputHandle}
              />
            </div>
            {/* 尺寸 [size] */}
            <div className="form-item">
              <LabelHelpTip keyLabel="size"></LabelHelpTip>
              <Input
                placeholder="商品尺寸"
                style={{ width: 150 }}
                value={size}
                onChange={sizeInputHandle}
              />
              <LabelHelpTip keyLabel="size_type"></LabelHelpTip>
              <Select
                value={size_type}
                style={{ width: 80 }}
                onChange={sizeTypeSelectHandle}
                options={sizeTypeOption}
              />
              <LabelHelpTip keyLabel="size_system"></LabelHelpTip>
              <Select
                value={size_system}
                style={{ width: 80 }}
                onChange={sizeSystemSelectHandle}
                options={sizeSystemOption}
              />
            </div>
            {/**== 尺码类型 [size_type] */}
            {/**== 尺码体系 [size_system] */}
            <div className="form-item">
              <LabelHelpTip keyLabel="productSize"></LabelHelpTip>
              <Input
                placeholder="长"
                style={{ width: 100 }}
                value={productLength}
                onChange={productLengthInputHandle}
              />
              <Input
                placeholder="宽"
                style={{ width: 100 }}
                value={productWidth}
                onChange={productWidthInputHandle}
              />
              <Input
                placeholder="高"
                style={{ width: 100 }}
                value={productHeight}
                onChange={productHeightInputHandle}
              />
              <LabelHelpTip keyLabel="sizeUnit"></LabelHelpTip>
              <Select
                value={sizeUnit}
                style={{ width: 80 }}
                onChange={sizeUnitSelectHandle}
                options={productSizeUnitOption}
              />
            </div>
            {/**== 重量尺寸体系 [productWeight] */}
            <div className="form-item">
              <LabelHelpTip keyLabel="productWeight"></LabelHelpTip>
              <Input
                placeholder="商品重量"
                style={{ width: 300 }}
                value={productWeight}
                onChange={productWeightInputHandle}
              />
              <LabelHelpTip keyLabel="weightUnit"></LabelHelpTip>
              <Select
                value={weightUnit}
                style={{ width: 60 }}
                onChange={weightUnitSelectHandle}
                options={productWeightUnitOption}
              />
            </div>
            <div className="form-item">
              <div className="line-box">
                <LabelHelpTip keyLabel="product_detail"></LabelHelpTip>
                <Button type="primary" size="small" onClick={productAttributeButtonHandle}>
                  属性管理
                </Button>
              </div>
              <div className="line-box">
                <div className="table-box">
                  <Table
                    dataSource={product_detail}
                    columns={columnsProductAttribute()}
                    pagination={false}
                    style={{ width: 350 }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="content form-box"></div>
          <div className="content form-box">
            <div className="form-item">
              <span className="label"></span>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  handelSubmitCreateSku(queryParams.product_sku_option_status);
                }}
              >
                {queryParams.product_sku_option_status > 0 ? '确认编辑SKU商品' : '确认创建SKU商品'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ProductAttribute callbackOk={productAttributeCallbackOk}></ProductAttribute>
      <ImageSelectModal
        callbackOk={productImageCallbackOk}
        selectedType={currentImageProductType}
        imageLimitNum={imageLimitNum}
      ></ImageSelectModal>
    </PageContainer>
  );
}
export default ProductCreateSku;
