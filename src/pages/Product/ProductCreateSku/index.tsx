import DefaultProject from '@/components/DefaultProject';
import InputText from '@/components/InputText';
import {
  ageGroupOption,
  genderOption,
  languageOption,
  optionsProductSaleTypeObj,
  productSizeUnitOption,
  productWeightUnitOption,
} from '@/constant/defaultCurrentData';
// import languageObj from '@/constant/language';
import ResizeImg from '@/constant/resizeImg';
import CreateProductSkuDrawer from '@/pages/Product/components/CreateProductSkuDrawer';
import ImageSelectModal from '@/pages/Product/components/ImageSelectModal';
import LabelHelpTip from '@/pages/Product/components/LabelHelpTip';
import ProductAttribute from '@/pages/Product/components/ProductAttribute';
import RichTextEditor from '@/pages/Product/components/RichTextEditor';
import YouTubeVideoPlayModal from '@/pages/Product/components/YouTubeVideoPlayModal';
import Tool from '@/utils/tool';
import { CloseOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import type { RadioChangeEvent } from 'antd';
import { Button, Col, Input, Modal, Radio, Row, Select, Table, message } from 'antd';
import { JSX, useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import './index.less';
const { TextArea } = Input;

function ProductCreateSku() {
  const {
    createProductFetch,
    editProductFetch,
    costsExchangeTypeCurrencyLabel,
    costsExchangeTypeCurrencyValue,
    productDetail,
    setProductDetail,
    queryParams,
    setQueryParams,
    initQueryParams,
    queryProductMainDetailFetch,
    currentLanguage,
    setCurrentLanguage,
    buttonSubmitCreateSkuLoading,
    saleSkuItems,
    setSaleSkuData,
    setSaleSkuOperateType,
    saleSkuDelFetch,
  } = useModel('productCreateProductSkuModel');
  const { product_sku_option_status, product_main_id, language } = queryParams;
  const { setProductAttributeModalStatus } = useModel('productAttributeModel');
  const {
    setProductSkuImageModalStatus,
    currentImageProductType,
    setCurrentImageProductType,
    setImageLimitNum,
    queryFolderFetch,
  } = useModel('material');
  // const [currentImageProductType, setCurrentImageProductType] = useState('image_link');
  // const [imageLimitNum, setImageLimitNum] = useState(20);
  const [isYoutubeVideoOpen, setYoutubeVideoOpen] = useState(false);
  const [isCreateProductSkuDrawer, setCreateProductSkuDrawer] = useState(false);
  // 语言
  // TODO: 创建时初始化货币单位
  const languageRadioHandle = (event: RadioChangeEvent) => {
    const { value } = event.target;
    if (value) {
      // setProductMainDetail(defaultCurrentProductMain);
      const newQueryParams = Object.assign({}, queryParams, { language: value });
      setQueryParams(newQueryParams);
      setCurrentLanguage(value);
      history.push(
        `/product/productCreateSku?product_main_id=${product_main_id}&language=${value}&product_sku_option_status=${product_sku_option_status}`,
      );
      initQueryParams();
    }
  };
  // 名称
  const titleInputHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { title: value });
    setProductDetail(newProductDetail);
  };
  // 商品着陆页
  const linkInputHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { link: value });
    setProductDetail(newProductDetail);
  };
  // 手机端着陆页
  const mobileLinkInputHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { mobile_link: value });
    setProductDetail(newProductDetail);
  };
  // youTubeId
  const youTubeIdInputHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { youTubeId: value });
    setProductDetail(newProductDetail);
  };
  // YoutubeCallbackPlayer
  const youtubeCallbackPlayer = () => {
    setYoutubeVideoOpen(true);
  };
  const youTubeCallbackStatus = () => {
    setYoutubeVideoOpen(false);
  };
  const skuDrawerCallbackStatus = (status: boolean) => {
    setCreateProductSkuDrawer(status);
  };
  // 创建销售规格
  const createProductSaleSku = () => {
    setSaleSkuOperateType(false);
    setCreateProductSkuDrawer(true);
  };
  // 商品重量
  const productWeightInputHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { productWeight: value });
    setProductDetail(newProductDetail);
  };
  // 尺寸 长宽高
  const productLengthInputHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { productLength: value });
    setProductDetail(newProductDetail);
  };

  const productWidthInputHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { productWidth: value });
    setProductDetail(newProductDetail);
  };

  const productHeightInputHandle = (value: string) => {
    const newProductDetail = Object.assign({}, productDetail, { productHeight: value });
    setProductDetail(newProductDetail);
  };

  const productAttributeButtonHandle = () => {
    setProductAttributeModalStatus(true);
  };
  const productAttributeCallbackOk = (selectedRowsProductAttr: any, selectedRowKeys: any) => {
    const strSelectedRowKeys =
      (selectedRowKeys && selectedRowKeys[0] && selectedRowKeys.join(',')) || '';
    const newProductDetail = Object.assign({}, productDetail, {
      product_detail: selectedRowsProductAttr,
      product_detail_keys: strSelectedRowKeys,
    });
    setProductDetail(newProductDetail);
    setProductAttributeModalStatus(false);
  };
  const productImageCallbackOk = (selectedMaterial: { url: any }[]) => {
    const { additional_image_link, lifestyle_image_link } = productDetail;
    let newProductDetail;
    if (selectedMaterial && selectedMaterial.length) {
      if (currentImageProductType === 'image_link') {
        const src_mage_link = selectedMaterial[0]?.url;
        newProductDetail = Object.assign({}, productDetail, { image_link: src_mage_link });
      }
      if (currentImageProductType === 'additional_image_link') {
        selectedMaterial.map((item: { url: string }) => {
          additional_image_link.push(item.url);
        });
        newProductDetail = Object.assign({}, productDetail, { additional_image_link });
      }
      if (currentImageProductType === 'lifestyle_image_link') {
        selectedMaterial.map((item: { url: string }) => {
          lifestyle_image_link.push(item.url);
        });
        newProductDetail = Object.assign({}, productDetail, { lifestyle_image_link });
      }
    }
    setProductSkuImageModalStatus(false);
    // @ts-ignore
    setProductDetail(newProductDetail);
  };
  const imageSelectModel = async (type: string, imageLimitNum: number) => {
    setProductSkuImageModalStatus(true);
    setCurrentImageProductType(type);
    setImageLimitNum(imageLimitNum);
    await queryFolderFetch();
  };

  const imgListRemove = (type: string, src: string) => {
    if (type && src) {
      const { image_link, additional_image_link, lifestyle_image_link } = productDetail;
      if (type === 'image_link' && image_link) {
        const newProductDetail = Object.assign({}, productDetail, { image_link: [] });
        setProductDetail(newProductDetail);
      }

      if (type === 'additional_image_link' && additional_image_link) {
        const newAdditional_image_link: string[] = [];
        additional_image_link.forEach((item: string) => {
          if (src !== item) {
            newAdditional_image_link.push(item);
          }
        });
        const newProductDetail = Object.assign({}, productDetail, {
          additional_image_link: newAdditional_image_link,
        });
        setProductDetail(newProductDetail);
      }
      if (type === 'lifestyle_image_link' && lifestyle_image_link) {
        const newLifestyle_image_link: string[] = [];
        lifestyle_image_link.forEach((item: string) => {
          if (src !== item) {
            newLifestyle_image_link.push(item);
          }
        });
        console.log('newLifestyle_image_link:', newLifestyle_image_link);
        const newProductDetail = Object.assign({}, productDetail, {
          lifestyle_image_link: newLifestyle_image_link,
        });
        setProductDetail(newProductDetail);
      }
    }
  };

  const imageRenderView = (type: string, data: string[] | string) => {
    const html: JSX.Element[] = [];
    if (type && data) {
      if (Tool.isArray(data)) {
        if (data[0]) {
          // @ts-ignore
          data.forEach((item: string, idx) => {
            if (item) {
              html.push(
                <div className="add-img-item" key={`${item}-${idx}`}>
                  <img src={`${item}${ResizeImg['w_100']}`} />
                  <span className="img-remove" onClick={() => imgListRemove(type, item)}>
                    <CloseOutlined style={{ fontSize: '24px' }} />
                  </span>
                </div>,
              );
            }
          });
        }
      } else {
        html.push(
          <div className="add-img-item" key={data}>
            <img src={`${data}${ResizeImg['w_100']}`} />
            <span className="img-remove 111" onClick={() => imgListRemove(type, data)}>
              <CloseOutlined style={{ fontSize: '24px' }} />
            </span>
          </div>,
        );
      }
    }
    return html;
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
    if (product_type && product_type.length && product_type.length > 0) {
      product_type.forEach((item: { [x: string]: any }) => {
        if (item) {
          nameStr.push(item[`title_${contentLanguage}`]);
        }
      });
    }
    return nameStr.join(',');
    // contentLanguage && product_type && product_type[`title_${contentLanguage}`]
  };

  // 重置主数据
  const resetProductMainDetail = async () => {
    const data = Object.assign({}, queryParams, { language: currentLanguage });
    await queryProductMainDetailFetch(data, 'reset');
  };
  // 提交创建SKU
  const handelSubmitCreateSku = async (product_sku_option_status: number | string) => {
    const { image_link, additional_image_link, lifestyle_image_link } = productDetail;
    if (
      image_link &&
      additional_image_link.length <= 8 &&
      lifestyle_image_link.length <= 30 &&
      saleSkuItems &&
      saleSkuItems[0]
    ) {
      const newProductDetail = Object.assign({}, productDetail, { saleSkus: saleSkuItems });
      setProductDetail(newProductDetail);
      if (Number(product_sku_option_status) > 0) {
        await editProductFetch();
      } else {
        await createProductFetch();
      }
    } else {
      message.warning({ content: '请检测图片数据' });
    }
  };
  const columnsProductAttribute = () => {
    return [
      {
        title: 'Key',
        dataIndex: 'key',
        key: 'key',
        width: '20%',
      },
      {
        title: '属性名称',
        dataIndex: 'attribute_name',
        key: 'attribute_name',
        width: '30%',
      },
      {
        title: '属性值',
        dataIndex: 'attribute_value',
        key: 'attribute_value',
      },
    ];
  };
  const handelTableEdit = (record: any) => {
    setSaleSkuOperateType(true);
    setSaleSkuData(record);
    setCreateProductSkuDrawer(true);
  };
  const handelTableDel = async (record: any) => {
    const { product_main_id, language } = productDetail;
    if (record && record.id) {
      Modal.confirm({
        title: '确认删除',
        content: '删除商品售卖规格',
        onOk: async () => {
          await saleSkuDelFetch({ product_main_id, language, id: record.id });
        },
      });
    }
  };
  const saleSkuColumns = () => {
    return [
      {
        title: '属性类型',
        dataIndex: 'saleType',
        key: 'saleType',
        render: (_: any, record: any) => {
          if (
            record.saleType &&
            optionsProductSaleTypeObj &&
            optionsProductSaleTypeObj[record.saleType]
          ) {
            return optionsProductSaleTypeObj[record.saleType];
          } else {
            return '-';
          }
        },
      },
      {
        title: '属性类型值',
        dataIndex: 'saleValue',
        key: 'saleValue',
        render: (_: any, record: any) => {
          let html;
          if (record.saleType === 'pattern' && record.pattern_name && record.pattern) {
            html = (
              <>
                <img src={record.pattern} className="img" width={50} />
                <span className="name">{record.pattern_name}</span>
              </>
            );
          } else {
            if (!record.saleValue) {
              html = '-';
            } else {
              html = record.saleValue;
            }
          }
          return html;
        },
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: (_: any, record: any) => {
          return `${record.price} ${record.monetary_unit}`;
        },
      },
      {
        title: '售卖价格',
        dataIndex: 'sale_price',
        key: 'sale_price',
        render: (_: any, record: any) => {
          return `${record.sale_price} ${record.monetary_unit}`;
        },
      },
      {
        title: '折扣',
        dataIndex: 'discount',
        key: 'discount',
        render: (_: any, record: any) => {
          return `${record.discount}%`;
        },
      },
      {
        title: '是否有货',
        dataIndex: 'availability',
        key: 'availability',
        render: (_: any, record: any) => {
          let html;
          if (record.availability === 'in_stock') {
            html = '有货';
          } else {
            html = '无货';
          }
          return html;
        },
      },
      {
        title: '绑定状态',
        key: 'state',
        render: (_: any, record: any) => {
          let html;
          if (record.product_id) {
            html = '已绑定';
          } else {
            html = '未绑定';
          }
          return html;
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (_: any, record: any) => {
          return (
            <div className="operate">
              <span
                className="tx"
                onClick={() => {
                  handelTableEdit(record);
                }}
              >
                编辑
              </span>
              <span className="line">|</span>
              <span
                className="tx"
                onClick={() => {
                  handelTableDel(record);
                }}
              >
                删除
              </span>
            </div>
          );
        },
      },
    ];
  };
  const {
    image_link,
    additional_image_link,
    lifestyle_image_link,
    link,
    product_type,
    mobile_link,
    description,
    title,
    product_highlight,
    productWeight,
    product_detail,
    age_group,
    gender,
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
    youTubeId,
    baseProductHeight,
    baseProductLength,
    baseProductWidth,
    baseProductWeight,
    baseSizeUnit,
    baseWeightUnit,
  } = productDetail;
  const productTypeName = productTypeNameStr();
  useEffect(() => {
    initQueryParams();
  }, []);
  return (
    <PageContainer>
      <div className="page">
        <div className="product-sku">
          <DefaultProject></DefaultProject>
          <div className="header">
            <div className="sub-header">
              <span>主数据</span>
              <Button className="reset-main-button" type="primary" onClick={resetProductMainDetail}>
                同步产品主数据
              </Button>
            </div>
          </div>

          <div className="content form-box">
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <div className="form-item">
                  <LabelHelpTip keyLabel="title_main"></LabelHelpTip>
                  <InputText
                    placeholder="主商品标题"
                    style={{ width: 300 }}
                    value={title_main}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="offer_id"></LabelHelpTip>
                  <InputText
                    placeholder="商品货号"
                    style={{ width: 300 }}
                    value={offer_id}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="google_product_category"></LabelHelpTip>
                  <InputText
                    placeholder="选择Google商品类目"
                    style={{ width: 300 }}
                    value={(google_product_category && google_product_category.title) || ''}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="product_type"></LabelHelpTip>
                  <InputText
                    placeholder="自定商品分类"
                    style={{ width: 300 }}
                    value={contentLanguage && product_type && productTypeName}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="gtin"></LabelHelpTip>
                  <InputText
                    placeholder="商品GTIN码"
                    style={{ width: 300 }}
                    value={gtin}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="brand"></LabelHelpTip>
                  <InputText placeholder="商品品牌" style={{ width: 300 }} value={brand} disabled />
                </div>
              </Col>
              <Col span={12}>
                <div className="form-item">
                  <LabelHelpTip keyLabel="costPrice"></LabelHelpTip>
                  <InputText
                    placeholder="商品成本价"
                    addonBefore="￥"
                    style={{ width: 300 }}
                    value={costPrice}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="preSalePrice"></LabelHelpTip>
                  <InputText
                    placeholder="商品预估售价"
                    addonBefore="￥"
                    style={{ width: 300 }}
                    value={preSalePrice}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel={costsExchangeTypeCurrencyLabel}></LabelHelpTip>
                  <InputText
                    placeholder="汇率"
                    addonBefore={costsExchangeTypeCurrencyLabel}
                    style={{ width: 300 }}
                    value={costsExchangeTypeCurrencyValue}
                    disabled
                  />
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="productSize"></LabelHelpTip>
                  <InputText
                    placeholder="长"
                    style={{ width: 80 }}
                    value={baseProductLength}
                    disabled
                  />
                  <InputText
                    placeholder="宽"
                    style={{ width: 80 }}
                    value={baseProductWidth}
                    disabled
                  />
                  <InputText
                    placeholder="高"
                    style={{ width: 80 }}
                    value={baseProductHeight}
                    disabled
                  />
                  <span>{baseSizeUnit}</span>
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="productWeight"></LabelHelpTip>
                  <InputText
                    placeholder="商品重量"
                    style={{ width: 280 }}
                    value={baseProductWeight}
                    disabled
                  />
                  <span>{baseWeightUnit}</span>
                </div>
                <div className="form-item">
                  <LabelHelpTip keyLabel="summaryKeywords"></LabelHelpTip>
                  <TextArea
                    placeholder="关键词"
                    rows={2}
                    style={{ width: 300 }}
                    value={summaryKeywords}
                    disabled
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="header">
            <div className="sub-header">基础商品数据</div>
          </div>
          <div className="content form-box">
            <div className="form-item">
              <span className="label">
                <i>*</i> 选择语言:
              </span>
              <Radio.Group
                value={currentLanguage}
                onChange={languageRadioHandle}
                options={languageOption}
                disabled={Number(queryParams.product_sku_option_status) > 0}
              ></Radio.Group>
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="title"></LabelHelpTip>
              <InputText
                placeholder="商品名称"
                style={{ width: 550 }}
                value={title}
                onChange={(value) => {
                  titleInputHandle(value);
                }}
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
                <span className="des">（限1张白底图片）</span>
              </div>
              <div className="line-box">
                <div className="add-img-list">{imageRenderView('image_link', image_link)}</div>
              </div>
            </div>
            <div className="form-item">
              <div className="line-box">
                <LabelHelpTip keyLabel="additional_image_link"></LabelHelpTip>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    imageSelectModel('additional_image_link', 6);
                  }}
                >
                  添加附属图片
                </Button>
                <span className="des">（限最多5张产品展示图）</span>
              </div>
              <div className="line-box">
                <div className="add-img-list">
                  {imageRenderView('additional_image_link', additional_image_link)}
                </div>
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
                      imageSelectModel('lifestyle_image_link', 30);
                    }}
                  >
                    添加生活图片
                  </Button>
                  <span className="des">（限最多30张产品生活图）</span>
                </div>
                <div className="line-box">
                  <div className="add-img-list">
                    {imageRenderView('lifestyle_image_link', lifestyle_image_link)}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="link"></LabelHelpTip>
              <InputText
                placeholder="商品着陆页"
                style={{ width: 550 }}
                value={link}
                onChange={linkInputHandle}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="mobile_link"></LabelHelpTip>
              <InputText
                placeholder="商品着陆页"
                style={{ width: 550 }}
                value={mobile_link}
                onChange={mobileLinkInputHandle}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="YoutubeVideo"></LabelHelpTip>
              <InputText
                placeholder="Youtube id"
                style={{ width: 450 }}
                value={youTubeId}
                onChange={youTubeIdInputHandle}
              />
              <Button disabled={!youTubeId} onClick={youtubeCallbackPlayer}>
                播放
              </Button>
            </div>
          </div>
          <div className="header">
            <div className="sub-header">
              <span>价格和库存状况</span>
              <Button className="reset-main-button" type="primary" onClick={createProductSaleSku}>
                创建销售规格
              </Button>
            </div>
          </div>
          <div className="content form-box">
            <div className="table-box">
              <Table
                dataSource={saleSkuItems}
                columns={saleSkuColumns()}
                rowKey={(record) => `${record.saleType}_${record.id}`}
                pagination={false}
              />
            </div>
          </div>
          <div className="header">
            <div className="sub-header">详细商品描述</div>
          </div>
          <div className="content form-box">
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
            {/**== 尺码类型 [size_type] */}
            {/**== 尺码体系 [size_system] */}
            <div className="form-item">
              <LabelHelpTip keyLabel="productSize"></LabelHelpTip>
              <InputText
                placeholder="长"
                style={{ width: 100 }}
                value={productLength}
                onChange={productLengthInputHandle}
              />
              <InputText
                placeholder="宽"
                style={{ width: 100 }}
                value={productWidth}
                onChange={productWidthInputHandle}
              />
              <InputText
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
              <InputText
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
                    rowKey={(record) => record.key}
                    dataSource={product_detail}
                    columns={columnsProductAttribute()}
                    pagination={false}
                    style={{ width: 600 }}
                    size="small"
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
                disabled={buttonSubmitCreateSkuLoading}
                onClick={() => {
                  handelSubmitCreateSku(queryParams && queryParams.product_sku_option_status);
                }}
              >
                {queryParams && Number(queryParams.product_sku_option_status) > 0
                  ? '确认编辑SKU商品'
                  : '确认创建SKU商品'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ProductAttribute
        callbackOk={productAttributeCallbackOk}
        product_main_id={product_main_id}
        language={language}
      ></ProductAttribute>
      <ImageSelectModal callbackOk={productImageCallbackOk}></ImageSelectModal>
      <CreateProductSkuDrawer
        isOpen={isCreateProductSkuDrawer}
        skuDrawerCallback={skuDrawerCallbackStatus}
      ></CreateProductSkuDrawer>
      <YouTubeVideoPlayModal
        youTubeCallbackStatus={youTubeCallbackStatus}
        youTubeId={youTubeId}
        isYoutubeVideoOpen={isYoutubeVideoOpen}
      ></YouTubeVideoPlayModal>
    </PageContainer>
  );
}
export default ProductCreateSku;
