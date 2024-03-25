import { PageContainer } from '@ant-design/pro-components';
import { Button, Image, Input, Radio, Select, Table } from 'antd';
import { Component } from 'react';
import { connect } from 'umi';
import ImageSelectModal from '../components/ImageSelectModal';
import ProductAttribute from '../components/ProductAttribute';

import './index.less';

const { TextArea } = Input;
@connect(({ productCreate }) => ({
  productCreate,
}))
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = {
      isProductAttributeModal: false,
      isProductImageModal: false,
      currentImageProductType: 'imageLink',
    };
  }
  // 语言
  languageRadioHandle = (event) => {
    console.log(event);
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        language: event.target.value,
      },
    });
  };
  // 货币单位
  monetaryUnitSelectHandle = (event, option) => {
    console.log(event, option);
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        monetary_unit: option,
      },
    });
  };
  // 名称
  titleInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        title: value,
      },
    });
  };
  // 商品着陆页
  linkInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        link: value,
      },
    });
  };
  // 手机端着陆页
  mobileLinkInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        mobile_link: value,
      },
    });
  };
  // 商品价格
  priceInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        price: value,
      },
    });
  };
  // 商品促销价格
  salePriceInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        salePrice: value,
      },
    });
  };
  // 商品亮点
  productHighlightInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        product_highlight: value,
      },
    });
  };
  // 商品描述
  descriptionTextAreaHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        description: value,
      },
    });
  };
  // 商品尺寸
  productLengthInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        product_length: value,
      },
    });
  };
  productWidthInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        product_width: value,
      },
    });
  };
  productHeightInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        product_height: value,
      },
    });
  };
  // 商品重量
  productWeightInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        product_weight: value,
      },
    });
  };
  // 商品包装尺寸
  shippingLengthInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        shipping_length: value,
      },
    });
  };
  shippingWidthInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        shipping_width: value,
      },
    });
  };
  shippingHeightInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        shipping_height: value,
      },
    });
  };
  // 商品发货国家
  shipsFromCountryInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        ships_from_country: value,
      },
    });
  };
  // 品牌
  brandInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        brand: value,
      },
    });
  };
  // 材料
  materialInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'productCreate/updateProduct',
      payload: {
        material: value,
      },
    });
  };

  productAttributeButtonHandle = () => {
    this.setState({
      isProductAttributeModal: true,
    });
  };
  productAttributeCallbackCancel = () => {
    this.setState({
      isProductAttributeModal: false,
    });
  };
  productAttributeCallbackOk = () => {
    this.setState({
      isProductAttributeModal: false,
    });
  };

  productImageCallbackCancel = () => {
    this.setState({
      isProductImageModal: false,
    });
  };
  productImageCallbackOk = () => {
    this.setState({
      isProductImageModal: false,
    });
  };

  imageSelectModel = (type: string) => {
    console.log(type);
    this.setState({
      isProductImageModal: true,
      currentImageProductType: type,
    });
  };

  render() {
    const columnsProductAttribute = [
      {
        title: '属性名称',
        dataIndex: 'attribute_name',
        key: 'attribute_name',
      },
      {
        title: '属性名称',
        dataIndex: 'attribute_value',
        key: 'attribute_value',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (_: any, record: any) => {
          console.log('record:', record);
          return (
            <div className="operate">
              <span
                className="tx"
                onClick={() => {
                  this.productAttributeButtonHandle(record);
                }}
              >
                添加
              </span>
              <span className="line">|</span>
              <span
                className="tx"
                onClick={() => {
                  this.handelTableDel(record);
                }}
              >
                删除
              </span>
            </div>
          );
        },
      },
    ];
    const { monetaryUnitOption, languageOption, productDetail, productAttributeOption } =
      this.props.productCreate;
    const {
      language,
      monetary_unit,
      imageLink,
      link,
      mobile_link,
      description,
      title,
      brand,
      material,
      price,
      salePrice,
      product_highlight,
      availability,
      product_width,
      product_height,
      product_length,
      product_weight,
      shipping_width,
      shipping_height,
      shipping_length,
      ships_from_country,
    } = productDetail;
    return (
      <PageContainer>
        <div className="page">
          <div className="product-sku">
            <div className="content form-box">
              <div className="header"></div>
              <div className="form-item">
                <span className="label">
                  <i>*</i> 选择语言:
                </span>
                <Radio.Group
                  value={language}
                  onChange={this.languageRadioHandle}
                  options={languageOption}
                ></Radio.Group>
              </div>
              <div className="form-item">
                <div className="line-box">
                  <span className="label">
                    <i>*</i> 商品主图:
                  </span>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.imageSelectModel('imageLink');
                    }}
                  >
                    添加主图
                  </Button>
                </div>
                <div className="line-box main-img">
                  <Image width={250} src={imageLink} />
                </div>
              </div>
              <div className="form-item">
                <div className="line-box">
                  <span className="label">商品附加图片:</span>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.imageSelectModel('additionalImageLinks');
                    }}
                  >
                    添加附属图片
                  </Button>
                </div>
                <div className="line-box">
                  <div className="add-img-list">
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-item">
                <div className="line-box">
                  <span className="label">添加商品详情:</span>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.imageSelectModel('lifestyleImageLinks');
                    }}
                  >
                    添加商品详情
                  </Button>
                </div>
                <div className="line-box">
                  <div className="add-img-list">
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div className="add-img-item">
                      <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-item">
                <span className="label">
                  <i>*</i> 商品名称:
                </span>
                <Input
                  placeholder="商品名称"
                  style={{ width: 350 }}
                  value={title}
                  onChange={this.titleInputHandle}
                />
              </div>
              <div className="form-item">
                <span className="label">
                  <i>*</i> 商品着陆页:
                </span>
                <Input
                  placeholder="商品着陆页"
                  style={{ width: 350 }}
                  value={link}
                  onChange={this.linkInputHandle}
                />
              </div>
              <div className="form-item">
                <span className="label">手机端着陆页:</span>
                <Input
                  placeholder="商品着陆页"
                  style={{ width: 350 }}
                  value={mobile_link}
                  onChange={this.mobileLinkInputHandle}
                />
              </div>
              <div className="form-item">
                <span className="label">
                  <i>*</i> 选择货币单位:
                </span>
                <Select
                  value={monetary_unit.value}
                  style={{ width: 120 }}
                  onChange={this.monetaryUnitSelectHandle}
                  options={monetaryUnitOption}
                />
              </div>
              <div className="form-item">
                <span className="label">
                  <i>*</i>商品价格:
                </span>
                <Input
                  placeholder="价格"
                  style={{ width: 120 }}
                  value={price}
                  onChange={this.priceInputHandle}
                  suffix={monetary_unit.value}
                />
              </div>
              <div className="form-item">
                <span className="label">商品促销价格:</span>
                <Input
                  placeholder="售卖价格"
                  style={{ width: 120 }}
                  value={salePrice}
                  onChange={this.salePriceInputHandle}
                  suffix={monetary_unit.value}
                />
              </div>
              <div className="form-item">
                <span className="label" style={{ verticalAlign: 'top' }}>
                  <i>*</i>商品描述:
                </span>
                <TextArea
                  rows={4}
                  style={{ width: 350 }}
                  value={description}
                  onChange={this.descriptionTextAreaHandle}
                />
              </div>
              <div className="form-item">
                <span className="label">商品亮点:</span>
                <Input
                  placeholder="商品亮点"
                  style={{ width: 350 }}
                  value={product_highlight}
                  onChange={this.productHighlightInputHandle}
                />
              </div>
              <div className="form-item">
                <div className="line-box">
                  <span className="label" style={{ verticalAlign: 'top' }}>
                    商品属性:
                  </span>
                  <Button type="primary" size="small" onClick={this.productAttributeButtonHandle}>
                    添加属性
                  </Button>
                </div>
                <div className="line-box">
                  <div className="table-box">
                    <Table
                      dataSource={productAttributeOption}
                      columns={columnsProductAttribute}
                      pagination={false}
                      style={{ width: 350 }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-item">
                <span className="label">品牌名称:</span>
                <Input
                  placeholder="品牌名称"
                  style={{ width: 350 }}
                  value={brand}
                  onChange={this.brandInputHandle}
                />
              </div>
              <div className="form-item">
                <span className="label">商品材料:</span>
                <Input
                  placeholder="商品材料"
                  style={{ width: 350 }}
                  value={material}
                  onChange={this.materialInputHandle}
                />
              </div>
              <div className="form-item">
                <span className="label">商品是否缺货:</span>
                <Radio.Group value={availability}>
                  <Radio value="in_stock"> 有货 </Radio>
                  <Radio value="out_of_stock"> 缺货 </Radio>
                </Radio.Group>
              </div>
              <div className="form-item">
                <span className="label">商品尺寸:</span>
                长:
                <Input
                  placeholder="长"
                  style={{ width: 100 }}
                  value={product_length}
                  onChange={this.productLengthInputHandle}
                />
                宽:
                <Input
                  placeholder="宽"
                  style={{ width: 100 }}
                  value={product_width}
                  onChange={this.productWidthInputHandle}
                />
                高:
                <Input
                  placeholder="高"
                  style={{ width: 100 }}
                  value={product_height}
                  onChange={this.productHeightInputHandle}
                />
              </div>
              <div className="form-item">
                <span className="label">商品重量:</span>
                <Input
                  placeholder="商品重量"
                  style={{ width: 350 }}
                  value={product_weight}
                  onChange={this.productWeightInputHandle}
                />
              </div>
              <div className="form-item">
                <span className="label">商品包装尺寸:</span>
                长:
                <Input
                  placeholder="长"
                  style={{ width: 100 }}
                  value={shipping_length}
                  onChange={this.shippingLengthInputHandle}
                />
                宽:
                <Input
                  placeholder="宽"
                  style={{ width: 100 }}
                  value={shipping_width}
                  onChange={this.shippingWidthInputHandle}
                />
                高:
                <Input
                  placeholder="高"
                  style={{ width: 100 }}
                  value={shipping_height}
                  onChange={this.shippingHeightInputHandle}
                />
              </div>

              <div className="form-item">
                <span className="label">发货国家:</span>
                <Input
                  placeholder="发货国家"
                  style={{ width: 350 }}
                  value={ships_from_country}
                  onChange={this.shipsFromCountryInputHandle}
                />
              </div>
              <div className="form-item">
                <span className="label"></span>
                <Button type="primary" size="large">
                  确认创建SKU商品
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ProductAttribute
          dataSource={{ productAttributeOption }}
          open={this.state.isProductAttributeModal}
          callbackCancel={this.productAttributeCallbackCancel}
          callbackOk={this.productAttributeCallbackOk}
        ></ProductAttribute>
        <ImageSelectModal
          open={this.state.isProductImageModal}
          callbackCancel={this.productImageCallbackCancel}
          callbackOk={this.productImageCallbackOk}
        ></ImageSelectModal>
      </PageContainer>
    );
  }
}

export default ProductDetail;
