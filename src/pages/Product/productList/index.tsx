import DefaultProject from '@/components/DefaultProject';
import Tool from '@/utils/tool';
import { SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Col, Modal, Row, Select, Spin, Table, message } from 'antd';
import { Component, JSX, Key } from 'react';
import { connect, history } from 'umi';

import './index.less';

@connect(({ product, common, material }) => ({
  product,
  common,
  material,
}))
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 20,
      language: 'en-US',
      onLoading: false,
    };
  }

  tableColumns = () => {
    return [
      {
        title: '主图',
        dataIndex: 'image_link',
        key: 'image_link',
        fixed: 'left',
        width: 60,
        render: (text, record) => {
          if (record && record.image_link) {
            return <img src={record.image_link} width={50}></img>;
          } else {
            return '-';
          }
        },
      },
      {
        title: '商品名称',
        dataIndex: 'title',
        key: 'title',
        fixed: 'left',
        width: 120,
      },
      {
        title: '货号',
        dataIndex: 'offer_id',
        key: 'offer_id',
        fixed: 'left',
        width: 70,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        fixed: 'left',
        width: 100,
        render: (_, record) => {
          const html: any = [];
          if (record && record.price && record.monetary_unit) {
            html.push(`price: ${record.price} ${record.monetary_unit}`);
          } else {
            html.push(<span>-</span>);
          }
          if (record && record.sale_price && record.sale_price && record.monetary_unit) {
            html.push(`salePrice: ${record.sale_price} ${record.monetary_unit}`);
          } else {
            html.push(<span>-</span>);
          }
          return html;
        },
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: 220,
        render: (_, record) => {
          if (record && record.description) {
            return (
              <div
                className="table-text clearfix"
                dangerouslySetInnerHTML={{ __html: record.description ? record.description : '' }}
              />
            );
          } else {
            return '-';
          }
        },
      },
      {
        title: 'GTIN',
        dataIndex: 'gtin',
        key: 'gtin',
        width: 90,
      },
      {
        title: '链接',
        dataIndex: 'link',
        key: 'link',
        width: 60,
        render: (_, record: any) => {
          const html: any = [];
          if (record.link) {
            html.push(
              <a href={record.link} title={record.link} target="_blank" rel="noreferrer">
                link
              </a>,
            );
          }
          if (record.mobile_link) {
            html.push(
              <a href={record.link} title={record.mobile_link} target="_blank" rel="noreferrer">
                mobileLink
              </a>,
            );
          }
          if (!record.link && !record.mobile_link) {
            html.push(<span>-</span>);
          }
          return html;
        },
      },
      {
        title: '商品分组',
        dataIndex: 'product_type',
        key: 'product_type',
        width: 90,
        render: (text, record) => {
          if (record.product_type && record.product_type.title) {
            return record.product_type.title;
          } else {
            return '-';
          }
        },
      },
      {
        title: 'Google类目',
        dataIndex: 'google_product_category',
        key: 'google_product_category',
        width: 110,
        render: (_, record) => {
          if (record.google_product_category && record.google_product_category.title) {
            return record.google_product_category.title;
          } else {
            return '-';
          }
        },
      },
      {
        title: '附加图片',
        dataIndex: 'additional_image_link',
        key: 'additional_image_link',
        width: 200,
        render: (text: any, record: { additional_image_link: string[] }) => {
          const html: JSX.Element[] = [];
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          record &&
            Tool.isArray(record.additional_image_link) &&
            record.additional_image_link.length &&
            record.additional_image_link.map((item: string, idx: Key) => {
              html.push(<img key={idx} src={item} width={50}></img>);
            });
          return html;
        },
      },
      {
        title: '详情图',
        dataIndex: 'lifestyle_image_link',
        key: 'lifestyle_image_link',
        width: 190,
        render: (text: any, record: { lifestyle_image_link: string[] }) => {
          const html: JSX.Element[] = [];
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          record &&
            Tool.isArray(record.lifestyle_image_link) &&
            record.lifestyle_image_link.length > 0 &&
            record.lifestyle_image_link.map((item: string, idx: Key) => {
              html.push(<img key={idx} src={item} width={30}></img>);
            });
          return html;
        },
      },
      {
        title: '分组ID',
        dataIndex: 'item_group_id',
        key: 'item_group_id',
        width: 90,
      },
      {
        title: '颜色',
        dataIndex: 'color',
        key: 'color',
        width: 90,
      },
      {
        title: '尺寸',
        dataIndex: 'size',
        key: 'size',
        width: 200,
        render: (_: any, record: any) => {
          if (record.size && record.size_type && record.size_system) {
            return (
              <>
                <p>{`尺寸: ${record.size}`}</p>
                <p>{`尺码类型: ${record.size_type} 尺码体系: ${record.size_system}`}</p>
              </>
            );
          } else {
            return '-';
          }
        },
      },
      {
        title: '商品尺寸',
        dataIndex: 'product_size',
        key: 'product_size',
        width: 200,
        render: (_: any, record: any) => {
          if (record.productHeight && record.productLength && record.sizeUnit) {
            return (
              <>
                <p>{`LWH: ${record.productLength}x${record.productWidth}x${record.productHeight} ${record.sizeUnit}`}</p>
                <p>{`W: ${record.productWeight} ${record.weightUnit}`}</p>
              </>
            );
          } else {
            return '-';
          }
        },
      },
      {
        title: '适用人群',
        dataIndex: 'age_group',
        key: 'age_group',
        width: 120,
        render: (text: any, record: any) => {
          if (record.age_group && record.gender) {
            return (
              <>
                <p>{`年龄: ${record.age_group}`}</p>
                <p>{`性别: ${record.gender}`}</p>
              </>
            );
          } else {
            return '-';
          }
        },
      },
      {
        title: '图案',
        dataIndex: 'pattern',
        key: 'pattern',
        width: 90,
      },
      {
        title: '商品属性',
        dataIndex: 'product_detail',
        key: 'product_detail',
        width: 200,
        render: (text: any, record: any) => {
          // return JSON.stringify(record.product_detail);
          const html: JSX.Element[] = [];
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          record.product_detail &&
            record.product_detail.length &&
            record.product_detail.map((item: any, idx: number) => {
              html.push(
                <p className="product-attr" key={idx}>
                  <span className="label">{item.attribute_name}</span> :{' '}
                  <span>{item.attribute_value}</span>
                </p>,
              );
            });
          return html;
        },
      },
      {
        title: '亮点',
        dataIndex: 'product_highlight',
        key: 'product_highlight',
        ellipsis: true,
        width: 200,
        render: (_, record) => (
          <span
            className="table-text clearfix"
            dangerouslySetInnerHTML={{ __html: record.product_highlight }}
          ></span>
        ),
      },
      {
        title: '库存',
        dataIndex: 'availability',
        key: 'availability',
        width: 60,
        render: (text, record) => {
          if (record.availability === 'in_stock') {
            return '有';
          } else {
            return '无';
          }
        },
      },
      {
        title: '语言',
        dataIndex: 'language',
        key: 'language',
        width: 90,
      },
      {
        title: '操作',
        key: 'operate',
        fixed: 'right',
        width: 160,
        render: (text, record) => {
          return (
            <div className="operate">
              <a
                className="tx"
                rel="noreferrer"
                target="_blank"
                href={`https://www.limeetpet.com/detail.html?id=${record.id}&lang=${record.language}`}
              >
                详情
              </a>
              <span className="line">|</span>
              <a
                className="tx"
                rel="nofollow"
                onClick={() => {
                  this.handelTableEdit(record);
                }}
              >
                编辑
              </a>
              <span className="line">|</span>
              <a
                className="tx"
                rel="nofollow"
                onClick={() => {
                  this.handelTableDel(record);
                }}
              >
                删除
              </a>
              <a
                className="tx"
                rel="nofollow"
                onClick={() => {
                  this.handelGoogleMerchantUpdate({
                    id: record.id,
                    language: record.language,
                    googleAccess: record.googleAccess,
                  });
                }}
              >
                {record.merchant_status > 0 ? '更新Merchant' : '同步Merchant'}
              </a>
            </div>
          );
        },
      },
    ];
  };
  searchLanguageSelectHandle = (value) => {
    const { searchParams } = this.props.product;
    const newSearchParams = Object.assign({}, searchParams, { language: value });
    this.props.dispatch({
      type: 'product/update',
      payload: {
        searchParams: newSearchParams,
      },
    });
  };
  searchKeywordInputHandle = (event) => {
    const { value } = event.target;
    const { searchParams } = this.props.product;
    const newSearchParams = Object.assign({}, searchParams, { keyword: value });
    this.props.dispatch({
      type: 'product/update',
      payload: {
        searchParams: newSearchParams,
      },
    });
  };
  searchProductTypeSelectHandle = (value) => {
    const { searchParams } = this.props.product;
    const newSearchParams = Object.assign({}, searchParams, { product_type_id: value });
    this.props.dispatch({
      type: 'product/update',
      payload: {
        searchParams: newSearchParams,
      },
    });
  };
  searchProductOfferIdHandle = (value) => {
    const { searchParams } = this.props.product;
    const newSearchParams = Object.assign({}, searchParams, { offer_id: value });
    this.props.dispatch({
      type: 'product/update',
      payload: {
        searchParams: newSearchParams,
      },
    });
  };
  handelTableView = (record) => {
    console.log(record);
  };
  handelTableEdit = (record) => {
    this.props.dispatch({
      type: 'product/update',
      payload: {
        productDetail: record,
      },
    });
    history.push(
      `/product/productCreateSku?product_main_id=${record.product_main_id}&product_id=${record.id}&language=${record.language}&product_sku_option_status=1`,
    );
  };

  // 同步google 购物
  handelGoogleMerchantUpdate = (data) => {
    if (data.googleAccess) {
      if (data && data.id) {
        this.props.dispatch({
          type: 'product/shoppingProductInsert',
          payload: data,
        });
      }
    } else {
      message.info('无权限，同步google merchant需要项目管理者权限。');
    }
  };

  handelTableDel = (record) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    Modal.confirm({
      title: '确认删除',
      content: '删除当前的SKU',
      onOk() {
        self.props.dispatch({
          type: 'product/delProduct',
          payload: record,
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 翻页
  handelTablePagination = (page) => {
    const { pagination } = this.props.product;
    const newPagination = Object.assign({}, pagination, { current: page });
    this.props.dispatch({
      type: 'product/update',
      payload: {
        pagination: newPagination,
      },
    });
    this.props.dispatch({
      type: 'product/queryProductAll',
    });
  };
  languageRadioHandle = (value) => {
    this.props.dispatch({
      type: 'product/update',
      payload: {
        language: value,
      },
    });
  };
  // 刷新 google token
  handelRefreshToken = () => {
    this.props.dispatch({
      type: 'login/googleGetToken',
    });
  };
  // 检索
  handelSearchParamsButton = () => {
    const { pagination } = this.props.product;
    const newPagination = Object.assign({}, pagination, { current: 1 });
    this.props.dispatch({
      type: 'product/update',
      payload: {
        pagination: newPagination,
      },
    });
    this.props.dispatch({
      type: 'product/queryProductAll',
    });
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'product/initQueryParams',
    });
    this.props.dispatch({
      type: 'product/queryProductAll',
    });
    this.props.dispatch({
      type: 'product/queryProductMainOfferId',
    });
  }

  render() {
    const { productList, pagination, searchParams, productMainOfferIds } = this.props.product;
    return (
      <PageContainer>
        <div className="page">
          <div className="product-list">
            <DefaultProject></DefaultProject>
            <div className="header">
              <Row>
                <Col span={6}>
                  <div className="form-item">
                    <span className="label">选择语言:</span>
                    <Select
                      defaultValue={searchParams.language}
                      value={searchParams.language}
                      style={{ width: 120 }}
                      onChange={this.searchLanguageSelectHandle}
                      options={searchParams.languageOption}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="form-item">
                    <span className="label">自定分类:</span>
                    <Select
                      value={searchParams.product_type_id}
                      style={{ width: 150 }}
                      onChange={this.searchProductTypeSelectHandle}
                      options={searchParams.productTypeOption}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="form-item">
                    <span className="label">商品货号:</span>
                    <Select
                      value={searchParams.offer_id}
                      style={{ width: 150 }}
                      onChange={this.searchProductOfferIdHandle}
                      options={productMainOfferIds}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="form-item">
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      onClick={this.handelSearchParamsButton}
                      style={{ width: 200 }}
                    >
                      搜索
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="content">
              <Table
                dataSource={productList}
                columns={this.tableColumns()}
                scroll={{ x: 1300 }}
                size="small"
                pagination={{
                  position: ['bottomRight'],
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                  onChange: this.handelTablePagination,
                }}
              />
            </div>
            <div className="footer"></div>
          </div>
        </div>
        <Spin size="large" spinning={this.state.onLoading} fullscreen />
      </PageContainer>
    );
  }
}

export default ProductList;
