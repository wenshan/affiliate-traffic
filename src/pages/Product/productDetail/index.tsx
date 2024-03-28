import { PageContainer } from '@ant-design/pro-components';
import { Button, Image, Input, Radio, Select, Table } from 'antd';
import { Component, JSX } from 'react';
import { connect } from 'umi';
import ImageSelectModal from '../components/ImageSelectModal';
import ProductAttribute from '../components/ProductAttribute';

import './index.less';

const { TextArea } = Input;
@connect(({ product, common, material }) => ({
  product,
  common,
  material,
}))
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = {
      isProductAttributeModal: false,
      isProductImageModal: false,
      currentImageProductType: 'imageLink',
      imageLimitNum: 20,
    };
  }
  // 语言
  languageRadioHandle = (event) => {
    console.log(event);
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        language: event.target.value,
      },
    });
  };
  // 货币单位
  monetaryUnitSelectHandle = (event, option) => {
    console.log(event, option);
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        monetary_unit: option,
      },
    });
  };
  // 名称
  titleInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        title: value,
      },
    });
  };
  // 商品着陆页
  linkInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        link: value,
      },
    });
  };
  // 手机端着陆页
  mobileLinkInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        mobile_link: value,
      },
    });
  };
  // 商品价格
  priceInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        price: value,
      },
    });
  };
  // 商品促销价格
  salePriceInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        salePrice: value,
      },
    });
  };
  // 商品亮点
  productHighlightInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        product_highlight: value,
      },
    });
  };
  // 商品描述
  descriptionTextAreaHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        description: value,
      },
    });
  };
  // 商品尺寸
  productLengthInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        product_length: value,
      },
    });
  };
  productWidthInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        product_width: value,
      },
    });
  };
  productHeightInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        product_height: value,
      },
    });
  };
  // 商品重量
  productWeightInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        product_weight: value,
      },
    });
  };
  // 商品包装尺寸
  shippingLengthInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        shipping_length: value,
      },
    });
  };
  shippingWidthInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        shipping_width: value,
      },
    });
  };
  shippingHeightInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        shipping_height: value,
      },
    });
  };
  // 商品发货国家
  shipsFromCountryInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        ships_from_country: value,
      },
    });
  };
  // 品牌
  brandInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        brand: value,
      },
    });
  };
  // 材料
  materialInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
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
  productImageCallbackOk = (selectedMaterial: { url: any }[]) => {
    const { currentImageProductType } = this.state;
    const imageSrc: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, array-callback-return
    selectedMaterial &&
      selectedMaterial.length &&
      selectedMaterial.map((item: { url: any }) => {
        imageSrc.push(item.url);
      });

    if (currentImageProductType === 'imageLink') {
      this.props.dispatch({
        type: 'product/updateProduct',
        payload: {
          imageLink: imageSrc[0],
        },
      });
    }
    if (currentImageProductType === 'additionalImageLinks') {
      this.props.dispatch({
        type: 'product/updateProduct',
        payload: {
          additionalImageLinks: imageSrc,
        },
      });
    }
    if (currentImageProductType === 'lifestyleImageLinks') {
      this.props.dispatch({
        type: 'product/updateProduct',
        payload: {
          lifestyleImageLinks: imageSrc,
        },
      });
    }

    this.setState({
      isProductImageModal: false,
    });
  };

  imageSelectModel = (type: string, imageLimitNum: number) => {
    this.setState({
      isProductImageModal: true,
      currentImageProductType: type,
      imageLimitNum,
    });
    this.props.dispatch({
      type: 'material/queryFolder',
    });
  };

  handelFolderMenuSelect = (currentItem: any, folderDirectory: any) => {
    this.props.dispatch({
      type: 'material/update',
      payload: {
        folderDirectory,
      },
    });
    this.props.dispatch({
      type: 'material/queryFolderMaterial',
      payload: {
        ...currentItem,
      },
    });
  };

  imageRenderView = (data: string[]) => {
    const html: JSX.Element[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, array-callback-return
    data &&
      data.length &&
      data.map((item: string) => {
        html.push(
          <>
            <div className="add-img-item" key={item.keys}>
              <Image width={100} src={item} />
            </div>
          </>,
        );
      });
    return html;
  };
  componentDidMount() {}

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
      this.props.product;
    const { folderDirectory, imageList } = this.props.material;
    const {
      language,
      monetary_unit,
      imageLink,
      additionalImageLinks,
      lifestyleImageLinks,
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
                      this.imageSelectModel('imageLink', 1);
                    }}
                  >
                    添加主图
                  </Button>
                </div>
                <div className="line-box main-img">
                  <Image
                    width={250}
                    src={imageLink}
                    fallback="data:image/png;base64,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"
                  />
                </div>
              </div>
              <div className="form-item">
                <div className="line-box">
                  <span className="label">商品附加图片:</span>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.imageSelectModel('additionalImageLinks', 5);
                    }}
                  >
                    添加附属图片
                  </Button>
                </div>
                <div className="line-box">
                  <div className="add-img-list">{this.imageRenderView(additionalImageLinks)}</div>
                </div>
              </div>
              <div className="form-item">
                <div className="line-box">
                  <span className="label">添加商品详情:</span>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.imageSelectModel('lifestyleImageLinks', 20);
                    }}
                  >
                    添加商品详情
                  </Button>
                </div>
                <div className="line-box">
                  <div className="add-img-list">{this.imageRenderView(lifestyleImageLinks)}</div>
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
          folderDirectory={folderDirectory}
          imageList={imageList}
          folderMenuSelectCallback={this.handelFolderMenuSelect}
          selectedType={this.state.currentImageProductType}
          imageLimitNum={this.state.imageLimitNum}
        ></ImageSelectModal>
      </PageContainer>
    );
  }
}

export default ProductDetail;
