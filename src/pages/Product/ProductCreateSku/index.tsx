import listToTreeSelf from '@/utils/listToTreeSelf';
import Tool from '@/utils/tool.js';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Image, Input, Radio, Select, Table, message } from 'antd';
import QueryString from 'query-string';
import { Component, JSX } from 'react';
import { connect } from 'umi';
import CustomProductType from '../components/CustomProductType';
import ImageSelectModal from '../components/ImageSelectModal';
import LabelHelpTip from '../components/LabelHelpTip';
import ProductAttribute from '../components/ProductAttribute';
import RichTextEditor from '../components/RichTextEditor';

import './index.less';

@connect(({ product, common, material }) => ({
  product,
  common,
  material,
}))
class ProductCreateSku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductAttributeModal: false,
      isProductImageModal: false,
      currentImageProductType: 'image_link',
      imageLimitNum: 20,
      isProductTypeShow: false,
      typeTextEditor: 'product_highlight',
      isTextEditorState: false,
      initValuerTextEditor: '',
    };
  }
  // 语言
  languageRadioHandle = (event) => {
    const { value } = event.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        language: value,
      },
    });
  };
  // 货币单位
  monetaryUnitSelectHandle = (value) => {
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        monetary_unit: value,
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
        sale_price: value,
      },
    });
  };
  // lifestyle_image_link 生活风格图片链接
  productLifestyleImageLinkInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        lifestyle_image_link: value,
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
  // 尺寸 长宽高
  productLengthInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        productLength: value,
      },
    });
  };

  productWidthInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        productWidth: value,
      },
    });
  };

  productHeightInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        productHeight: value,
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
  productAttributeCallbackOk = (selectedRowsProductAttr) => {
    this.setState(
      {
        isProductAttributeModal: false,
      },
      () => {
        this.props.dispatch({
          type: 'product/updateProduct',
          payload: {
            product_detail: selectedRowsProductAttr,
          },
        });
      },
    );
  };
  // 新增
  productAttributeAddCallbackOk = (item) => {
    this.props.dispatch({
      type: 'product/cerateAttr',
      payload: {
        ...item,
      },
    });
  };
  // 删除
  productAttributeDelCallbackOk = (item) => {
    this.props.dispatch({
      type: 'product/delAttr',
      payload: {
        ...item,
      },
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

    if (currentImageProductType === 'image_link') {
      this.props.dispatch({
        type: 'product/updateProduct',
        payload: {
          image_link: imageSrc,
        },
      });
    }
    if (currentImageProductType === 'additional_image_link') {
      this.props.dispatch({
        type: 'product/updateProduct',
        payload: {
          additional_image_link: imageSrc,
        },
      });
    }
    if (currentImageProductType === 'lifestyle_image_link') {
      this.props.dispatch({
        type: 'product/updateProduct',
        payload: {
          lifestyle_image_link: imageSrc,
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

  handelFolderMenuSelect = (currentItem: any) => {
    const { folderDirectoryRows } = this.props.material;
    const { rowsTree, rowsList } = listToTreeSelf(folderDirectoryRows, currentItem);
    this.props.dispatch({
      type: 'material/update',
      payload: {
        folderDirectory: rowsTree,
        folderDirectoryRows: rowsList,
        currentFolderDirectory: currentItem,
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
    if (data && Tool.isArray(data) && data.length) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.map((item: string) => {
        html.push(
          <>
            <div className="add-img-item" key={item}>
              <Image width={100} src={item} />
            </div>
          </>,
        );
      });
    } else {
      html.push(
        <>
          <div className="add-img-item">
            <Image width={100} src={data} />
          </div>
        </>,
      );
    }

    return html;
  };
  // 提交创建SKU
  handelSubmitCreateSku = (product_sku_option_status) => {
    if (product_sku_option_status > 0) {
      this.props.dispatch({
        type: 'product/editProduct',
      });
    } else {
      this.props.dispatch({
        type: 'product/createProduct',
      });
    }
  };

  columnsProductAttribute = () => {
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
  handelRadioAvailability = (event) => {
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        availability: event.target.value,
      },
    });
  };
  // 商品组 ID [item_group_id]
  itemGroupIdInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        item_group_id: value,
      },
    });
  };
  // 颜色 [color]
  colorInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        color: value,
      },
    });
  };
  // 年龄段 [age_group]
  ageGroupSelectHandle = (value) => {
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        age_group: value,
      },
    });
  };
  // 适用性别 [gender]
  genderSelectHandle = (value) => {
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        age_group: value,
      },
    });
  };
  // 材质 [material]
  materialInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        material: value,
      },
    });
  };
  // 图案 [pattern]
  patternInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        pattern: value,
      },
    });
  };
  // 尺寸 [size]
  sizeInputHandle = (e) => {
    const { value } = e.target;
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        size: value,
      },
    });
  };
  // 尺码类型 [size_type]
  sizeTypeSelectHandle = (value) => {
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        size_type: value,
      },
    });
  };
  // 尺码体系 [size_system]
  sizeSystemSelectHandle = (value) => {
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        size_system: value,
      },
    });
  };
  // 重量单位选择
  weightUnitSelectHandle = (value) => {
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        weightUnit: value,
      },
    });
  };
  // 尺寸单位选择
  sizeUnitSelectHandle = (value) => {
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        sizeUnit: value,
      },
    });
  };
  // 自定义商品分类
  productTypeButtonHandle = () => {
    const { productDetail } = this.props.product;
    const { language } = productDetail;
    if (language) {
      this.setState({
        isProductTypeShow: true,
      });
      this.props.dispatch({
        type: 'product/queryType',
      });
    } else {
      message.warning({ content: '请先选择语言' });
    }
  };
  // CustomProductType
  productTypeCallBackCancel = () => {
    this.setState({
      isProductTypeShow: false,
    });
  };
  // 管理页面回调
  productTypeCallBackOk = (item: { key: any }[]) => {
    if (item && item[0] && item[0].key) {
      this.setState({
        isProductTypeShow: false,
      });
      this.props.dispatch({
        type: 'product/updateProduct',
        payload: {
          product_type: item[0],
          product_type_id: item[0].key,
        },
      });
    } else {
      message.warning({ content: '获取数据有问题' });
    }
  };
  // 删除商品分类
  handelDelProductType = (item) => {
    this.props.dispatch({
      type: 'product/delType',
      payload: {
        ...item,
      },
    });
  };
  // 添加新产品分类
  handelAddProductType = (item, type) => {
    if (type) {
      this.props.dispatch({
        type: 'product/editType',
        payload: {
          ...item,
        },
      });
    } else {
      this.props.dispatch({
        type: 'product/cerateType',
        payload: {
          ...item,
        },
      });
    }
  };

  // 富文本编辑器回调
  callbackTextEditorDescription = (value) => {
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        description: value,
      },
    });
  };
  // 富文本编辑器回调
  callbackTextEditorProductHighlight = (value) => {
    console.log('====', value);
    console.log(value);
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        product_highlight: value,
      },
    });
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'product/initQueryParams',
    });
    this.props.dispatch({
      type: 'product/queryAttr',
    });
    // 获取主商品详细
    const search = window.document.location.search;
    const query = QueryString.parse(search);
    console.log('query===:', query);
    if (query && query.product_main_id) {
      this.props.dispatch({
        type: 'product/queryProductMainDetail',
        payload: {
          id: query.product_main_id,
        },
      });
    }
    /*
    this.props.dispatch({
      type: 'product/queryType',
    });
    */
  }

  render() {
    const {
      monetaryUnitOption,
      languageOption,
      productDetail,
      productAttributeOption,
      product_sku_option_status,
      sizeTypeOption,
      sizeSystemOption,
      genderOption,
      ageGroupOption,
      productTypeOption,
      productSizeUnitUnitOption,
      productWeightUnitOption,
    } = this.props.product;
    const { folderDirectory, imageList } = this.props.material;
    console.log('productDetail:', productDetail);
    console.log('product_sku_option_status:', product_sku_option_status);
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
      color,
      material,
      product_highlight,
      availability,
      product_weight,
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
    } = productDetail;
    return (
      <PageContainer>
        <div className="page">
          <div className="product-sku">
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
                  onChange={this.languageRadioHandle}
                  options={languageOption}
                ></Radio.Group>
              </div>
              <div className="form-item">
                <span className="label">
                  <i>*</i> 自定商品分类:
                </span>
                <Input
                  placeholder="自定商品分类"
                  style={{ width: 350 }}
                  value={product_type && product_type.title}
                  disabled
                />
                <span className="operate">
                  <Button type="primary" size="small" onClick={this.productTypeButtonHandle}>
                    管理自定商品分类
                  </Button>
                </span>
              </div>
              <div className="form-item">
                <LabelHelpTip keyLabel="title"></LabelHelpTip>
                <Input
                  placeholder="商品名称"
                  style={{ width: 350 }}
                  value={title}
                  onChange={this.titleInputHandle}
                />
              </div>
              <div className="form-item">
                <div className="line-box-header">
                  <LabelHelpTip keyLabel="description"></LabelHelpTip>
                </div>
                <div className="line-box-container">
                  <RichTextEditor
                    callbackValue={this.callbackTextEditorDescription}
                    initValuerTextEditor={description}
                  ></RichTextEditor>
                </div>
              </div>
              <div className="form-item">
                <div className="line-box-header">
                  <LabelHelpTip keyLabel="product_highlight"></LabelHelpTip>
                </div>
                <div className="line-box-container">
                  <RichTextEditor
                    callbackValue={this.callbackTextEditorProductHighlight}
                    initValuerTextEditor={product_highlight}
                  ></RichTextEditor>
                </div>
              </div>
              <div className="form-item">
                <div className="line-box">
                  <LabelHelpTip keyLabel="image_link"></LabelHelpTip>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.imageSelectModel('image_link', 5);
                    }}
                  >
                    添加主图
                  </Button>
                </div>
                <div className="line-box">
                  <div className="add-img-list">{this.imageRenderView(image_link)}</div>
                </div>
              </div>
              <div className="form-item">
                <div className="line-box">
                  <LabelHelpTip keyLabel="additional_image_link"></LabelHelpTip>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      this.imageSelectModel('additional_image_link', 10);
                    }}
                  >
                    添加附属图片
                  </Button>
                </div>
                <div className="line-box">
                  <div className="add-img-list">{this.imageRenderView(additional_image_link)}</div>
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
                        this.imageSelectModel('lifestyle_image_link', 10);
                      }}
                    >
                      添加附属图片
                    </Button>
                  </div>
                  <div className="line-box">
                    <div className="add-img-list">{this.imageRenderView(lifestyle_image_link)}</div>
                  </div>
                </div>
              </div>
              <div className="form-item">
                <LabelHelpTip keyLabel="link"></LabelHelpTip>
                <Input
                  placeholder="商品着陆页"
                  style={{ width: 350 }}
                  value={link}
                  onChange={this.linkInputHandle}
                />
              </div>
              <div className="form-item">
                <LabelHelpTip keyLabel="mobile_link"></LabelHelpTip>
                <Input
                  placeholder="商品着陆页"
                  style={{ width: 350 }}
                  value={mobile_link}
                  onChange={this.mobileLinkInputHandle}
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
                  style={{ width: 120 }}
                  onChange={this.monetaryUnitSelectHandle}
                  options={monetaryUnitOption}
                />
              </div>
              <div className="form-item">
                <LabelHelpTip keyLabel="price"></LabelHelpTip>
                <Input
                  placeholder="价格"
                  style={{ width: 120 }}
                  value={price}
                  onChange={this.priceInputHandle}
                  suffix={monetary_unit}
                />
              </div>
              <div className="form-item">
                <LabelHelpTip keyLabel="sale_price"></LabelHelpTip>
                <Input
                  placeholder="售卖价格"
                  style={{ width: 120 }}
                  value={sale_price}
                  onChange={this.salePriceInputHandle}
                  suffix={monetary_unit}
                />
              </div>
              <div className="form-item">
                <LabelHelpTip keyLabel="availability"></LabelHelpTip>
                <Radio.Group value={availability} onChange={this.handelRadioAvailability}>
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
                  onChange={this.itemGroupIdInputHandle}
                />
              </div>
              {/* 颜色 [color] */}
              <div className="form-item">
                <LabelHelpTip keyLabel="color"></LabelHelpTip>
                <Input
                  placeholder="商品颜色"
                  style={{ width: 350 }}
                  value={color}
                  onChange={this.colorInputHandle}
                />
              </div>
              {/* 年龄段 [age_group] */}
              <div className="form-item">
                <LabelHelpTip keyLabel="age_group"></LabelHelpTip>
                <Select
                  value={age_group}
                  style={{ width: 120 }}
                  onChange={this.ageGroupSelectHandle}
                  options={ageGroupOption}
                />
              </div>
              {/* 适用性别 [gender] */}
              <div className="form-item">
                <LabelHelpTip keyLabel="gender"></LabelHelpTip>
                <Select
                  value={gender}
                  style={{ width: 120 }}
                  onChange={this.genderSelectHandle}
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
                  onChange={this.materialInputHandle}
                />
              </div>
              {/* 图案 [pattern] */}
              <div className="form-item">
                <LabelHelpTip keyLabel="pattern"></LabelHelpTip>
                <Input
                  placeholder="商品图案"
                  style={{ width: 350 }}
                  value={pattern}
                  onChange={this.patternInputHandle}
                />
              </div>
              {/* 尺寸 [size] */}
              <div className="form-item">
                <LabelHelpTip keyLabel="size"></LabelHelpTip>
                <Input
                  placeholder="商品尺寸"
                  style={{ width: 150 }}
                  value={size}
                  onChange={this.sizeInputHandle}
                />
                <LabelHelpTip keyLabel="size_type"></LabelHelpTip>
                <Select
                  value={size_type}
                  style={{ width: 80 }}
                  onChange={this.sizeTypeSelectHandle}
                  options={sizeTypeOption}
                />
                <LabelHelpTip keyLabel="size_system"></LabelHelpTip>
                <Select
                  value={size_system}
                  style={{ width: 80 }}
                  onChange={this.sizeSystemSelectHandle}
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
                  onChange={this.productLengthInputHandle}
                />
                <Input
                  placeholder="宽"
                  style={{ width: 100 }}
                  value={productWidth}
                  onChange={this.productWidthInputHandle}
                />
                <Input
                  placeholder="高"
                  style={{ width: 100 }}
                  value={productHeight}
                  onChange={this.productHeightInputHandle}
                />
                <LabelHelpTip keyLabel="sizeUnit"></LabelHelpTip>
                <Select
                  value={sizeUnit}
                  style={{ width: 80 }}
                  onChange={this.sizeUnitSelectHandle}
                  options={productSizeUnitUnitOption}
                />
              </div>
              {/**== 重量尺寸体系 [product_weight] */}
              <div className="form-item">
                <LabelHelpTip keyLabel="product_weight"></LabelHelpTip>
                <Input
                  placeholder="商品重量"
                  style={{ width: 350 }}
                  value={product_weight}
                  onChange={this.productWeightInputHandle}
                />
                <LabelHelpTip keyLabel="weightUnit"></LabelHelpTip>
                <Select
                  value={weightUnit}
                  style={{ width: 60 }}
                  onChange={this.weightUnitSelectHandle}
                  options={productWeightUnitOption}
                />
              </div>
              <div className="form-item">
                <div className="line-box">
                  <LabelHelpTip keyLabel="product_detail"></LabelHelpTip>
                  <Button type="primary" size="small" onClick={this.productAttributeButtonHandle}>
                    属性管理
                  </Button>
                </div>
                <div className="line-box">
                  <div className="table-box">
                    <Table
                      dataSource={product_detail}
                      columns={this.columnsProductAttribute()}
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
                    this.handelSubmitCreateSku(product_sku_option_status);
                  }}
                >
                  {product_sku_option_status > 0 ? '确认编辑SKU商品' : '确认创建SKU商品'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ProductAttribute
          dataSource={{ productAttributeOption, product_detail }}
          open={this.state.isProductAttributeModal}
          callbackCancel={this.productAttributeCallbackCancel}
          callbackOk={this.productAttributeCallbackOk}
          callbackAddOk={this.productAttributeAddCallbackOk}
          callbackDelOk={this.productAttributeDelCallbackOk}
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
        <CustomProductType
          dataSource={{ productTypeOption, product_type }}
          open={this.state.isProductTypeShow}
          callbackCancel={this.productTypeCallBackCancel}
          callbackOk={this.productTypeCallBackOk}
          callbackAddOk={this.handelAddProductType}
          callbackDelOk={this.handelDelProductType}
        ></CustomProductType>
      </PageContainer>
    );
  }
}

export default ProductCreateSku;
