import { SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Input, Modal, Select, Space, Table } from 'antd';
import { Component } from 'react';
import { connect } from 'umi';

import './index.less';

@connect(({ product, common, material }) => ({
  product,
  common,
  material,
}))
class ProductListCompos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 20,
      language: 'en-US',
    };
  }
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
  searchTitleInputHandle = (event) => {
    const { value } = event.target;
    const { searchParams } = this.props.product;
    const newSearchParams = Object.assign({}, searchParams, { title: value });
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
  tableColumnsMain = () => {
    return [
      {
        title: '商品名称',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '自定商品分类',
        dataIndex: 'product_type',
        key: 'product_type',
        render: (text: any, record: any) => {
          return (record.product_type && record.product_type.title) || '-';
        },
      },
      {
        title: '商品货号',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Google商品类目',
        dataIndex: 'google_product_category',
        key: 'google_product_category',
        render: (text: any, record: any) => {
          return record.google_product_category.title || '-';
        },
      },
      {
        title: '商品GTIN码',
        dataIndex: 'gtin',
        key: 'gtin',
      },
      {
        title: '品牌名称',
        dataIndex: 'brand',
        key: 'brand',
      },
    ];
  };
  tableColumnsSku = () => {
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
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        fixed: 'left',
        width: 100,
        render: (text, record) => {
          if (record && record.price && record.monetary_unit.value) {
            return `${record.price} ${record.monetary_unit.value}`;
          } else {
            return '-';
          }
        },
      },
      {
        title: '售卖价格',
        dataIndex: 'sale_price',
        key: 'sale_price',
        fixed: 'left',
        width: 100,
        render: (text, record) => {
          if (record && record.sale_price && record.monetary_unit.value) {
            return `${record.sale_price} ${record.monetary_unit.value}`;
          } else {
            return '-';
          }
        },
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: 220,
      },
      {
        title: '链接',
        dataIndex: 'link',
        key: 'link',
        width: 60,
        render: (text, record) => {
          if (record.link) {
            return (
              <a href={record.link} title={record.link} target="_blank" rel="noreferrer">
                链接
              </a>
            );
          } else {
            return '-';
          }
        },
      },
      {
        title: '手机链接',
        dataIndex: 'mobile_link',
        key: 'mobile_link',
        width: 90,
        render: (text, record) => {
          if (record.link) {
            return (
              <a href={record.link} title={record.link} target="_blank" rel="noreferrer">
                链接
              </a>
            );
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
            record.additional_image_link &&
            record.additional_image_link.length &&
            record.additional_image_link.map((item: string, idx: Key) => {
              html.push(<img key={idx} src={item} width={50}></img>);
            });
          return html;
        },
      },
      {
        title: '生活风格图',
        dataIndex: 'lifestyle_image_link',
        key: 'lifestyle_image_link',
        width: 200,
        render: (text: any, record: { lifestyle_image_link: string[] }) => {
          const html: JSX.Element[] = [];
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          record &&
            record.lifestyle_image_link &&
            record.lifestyle_image_link.length &&
            record.lifestyle_image_link.map((item: string, idx: Key) => {
              html.push(<img key={idx} src={item} width={50}></img>);
            });
          return html;
        },
      },
      {
        title: '颜色',
        dataIndex: 'color',
        key: 'color',
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
        title: '商品亮点',
        dataIndex: 'product_highlight',
        key: 'product_highlight',
        width: 200,
      },
      {
        title: '商品尺寸',
        width: 200,
        render: (text: any, record: any) => {
          return (
            <div>{`${record.productLength}x${record.productWidth}x${record.productHeight} ${record.sizeUnit}`}</div>
          );
        },
      },
      {
        title: '商品重量',
        width: 200,
        render: (text: any, record: any) => {
          return <div>{`${record.productWeight} ${record.weightUnit}`}</div>;
        },
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
                rel="nofollow"
                onClick={() => {
                  this.handelTableView(record);
                }}
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
            </div>
          );
        },
      },
    ];
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
      `/product/productCreateSku?product_main_id=${record.id}&product_sku_option_status=1`,
    );
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
  handelTablePagination = () => {};
  // 嵌套子表格
  expandedRowRenderTable = (record) => {
    if (record && record.skus && record.skus.length) {
      return (
        <Table
          dataSource={record.skus}
          columns={this.tableColumnsSku()}
          size="small"
          pagination={false}
        />
      );
    } else {
      return '-';
    }
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'product/initQueryParams',
    });
    // queryProductMainAllCompos
    this.props.dispatch({
      type: 'product/queryProductMainAllCompos',
    });
  }

  render() {
    const { languageOption, pagination, productTypeOption, productMainList, searchParams } =
      this.props.product;
    return (
      <PageContainer>
        <div className="page">
          <div className="product-list">
            <div className="header">
              <Space>
                <div className="form-item">
                  <span className="label">选择语言:</span>
                  <Select
                    defaultValue={searchParams.language}
                    value={searchParams.language}
                    style={{ width: 120 }}
                    onChange={this.searchLanguageSelectHandle}
                    options={languageOption}
                  />
                </div>
                <div className="form-item">
                  <span className="label">自定商品分类:</span>
                  <Select
                    value={searchParams.product_type_id}
                    style={{ width: 150 }}
                    onChange={this.searchProductTypeSelectHandle}
                    options={productTypeOption}
                  />
                </div>
                <div className="form-item">
                  <span className="label">商品名称:</span>
                  <Input
                    placeholder="商品名称"
                    style={{ width: 200 }}
                    value={searchParams.title}
                    onChange={this.searchTitleInputHandle}
                  />
                </div>
                <div className="form-item">
                  <Button type="primary" icon={<SearchOutlined />}>
                    Search
                  </Button>
                </div>
              </Space>
            </div>
            <div className="content">
              <div className="list-box">
                <div className="main">
                  <div className="table-content">
                    <Table
                      dataSource={productMainList}
                      columns={this.tableColumnsMain()}
                      expandable={{
                        expandedRowRender: this.expandedRowRenderTable,
                        defaultExpandedRowKeys: ['0'],
                      }}
                      pagination={{
                        position: ['bottomRight'],
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        onChange: this.handelTablePagination,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="footer"></div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default ProductListCompos;
