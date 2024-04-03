import { PageContainer } from '@ant-design/pro-components';
import { Modal, Select, Table } from 'antd';
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
    };
  }

  tableColumns = () => {
    return [
      {
        title: '主图',
        dataIndex: 'imageLink',
        key: 'imageLink',
        fixed: 'left',
        width: 60,
        render: (text, record) => {
          if (record && record.imageLink) {
            return <img src={record.imageLink} width={50}></img>;
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
        width: 60,
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
        dataIndex: 'salePrice',
        key: 'salePrice',
        fixed: 'left',
        width: 100,
        render: (text, record) => {
          if (record && record.salePrice && record.monetary_unit.value) {
            return `${record.salePrice} ${record.monetary_unit.value}`;
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
        render: (text, record) => {
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
        dataIndex: 'color',
        key: 'color',
        width: 200,
        render: (text: any, record: any) => {
          return (
            <div>{`${record.product_length}x${record.product_width}x${record.product_height}`}</div>
          );
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
    console.log(record);
    this.props.dispatch({
      type: 'product/update',
      payload: {
        productDetail: record,
      },
    });
    history.push(
      `/product/productCreateSku?product_main_id=${record.product_main_id}&product_sku_option_status=1`,
    );
  };
  handelTableDel = (record) => {
    console.log(record);
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
  componentDidMount() {
    this.props.dispatch({
      type: 'product/initQueryParams',
    });
    this.props.dispatch({
      type: 'product/queryProductAll',
    });
    // queryProductMainAllCompos
    this.props.dispatch({
      type: 'product/queryProductMainAllCompos',
    });
  }
  languageRadioHandle = (value) => {
    this.props.dispatch({
      type: 'product/update',
      payload: {
        language: value,
      },
    });
  };

  render() {
    const { productList, languageOption, pagination, language } = this.props.product;
    return (
      <PageContainer>
        <div className="page">
          <div className="product-list">
            <div className="header">
              <div className="form-item">
                <span className="label">选择语言:</span>
                <Select
                  defaultValue={language}
                  value={language}
                  style={{ width: 120 }}
                  onChange={this.languageRadioHandle}
                  options={languageOption}
                />
              </div>
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
      </PageContainer>
    );
  }
}

export default ProductList;
