import DefaultProject from '@/components/DefaultProject';
import { defaultCurrentProductMain, defaultProductDetail } from '@/constant/defaultCurrentData';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Modal, Table } from 'antd';
import { Component } from 'react';
import { connect, history } from 'umi';
import CreateMainModal from '../components/CreateMainModal';

import './index.less';

@connect(({ product, common, material }) => ({
  product,
  common,
  material,
}))
class ProductCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      pageSize: 20,
      current: 1,
      currentOptionActionStatus: false, // 0 添加 1 编辑
      isCreateMainModalShow: false,
    };
  }
  createMainModalStatusHandle = () => {
    this.setState({
      currentOptionActionStatus: false,
      isCreateMainModalShow: true,
    });

    this.props.dispatch({
      type: 'product/update',
      payload: {
        currentProductMain: defaultCurrentProductMain,
      },
    });
  };
  createMainModalCallbackOk = (currentProductMain: any) => {
    this.props.dispatch({
      type: 'product/update',
      payload: currentProductMain,
    });
    this.props.dispatch({
      type: 'product/queryProductMainAll',
    });
  };
  openStatusCallbackCreateMainModal = (value) => {
    this.setState({
      isCreateMainModalShow: value,
    });
  };

  // table
  handelTableCreateSku = (record) => {
    const { currentProductMain } = this.props.product;
    const newCurrentProductMain = Object.assign({}, currentProductMain, record);
    const newProductDetail = Object.assign({}, defaultProductDetail, {
      product_main_id: record.id,
      title_main: record.title,
      gtin: record.gtin,
      offer_id: record.offer_id,
      google_product_category: record.google_product_category,
      google_product_category_id: record.google_product_category_id,
    });
    this.props.dispatch({
      type: 'product/update',
      payload: {
        productDetail: newProductDetail,
        currentProductMain: newCurrentProductMain,
      },
    });
    history.push(
      `/product/productCreateSku?product_main_id=${record.id}&product_sku_option_status=0`,
    );
  };

  handelTableEdit = (record: any) => {
    this.props.dispatch({
      type: 'product/update',
      payload: {
        currentProductMain: Object.assign({}, record),
      },
    });
    const { id } = record;
    this.setState({
      id,
      isCreateMainModalShow: true,
      currentOptionActionStatus: true,
    });
  };

  handelTableDel = (record: any) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    Modal.confirm({
      title: '确认删除',
      content: '删除当前的主产品信息，所包含的多语言产品数据一并删除。',
      onOk() {
        self.props.dispatch({
          type: 'product/delProductMain',
          payload: {
            ...record,
          },
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  handelTablePagination = (page, pageSize) => {
    const { pagination } = this.props.product;
    const updatePagination = Object.assign({}, pagination, { current: page });
    this.props.dispatch({
      type: 'product/update',
      payload: {
        pagination: updatePagination,
      },
    });
    this.props.dispatch({
      type: 'product/queryProductMainAll',
      payload: {
        pageSize,
        current: page,
      },
    });
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'product/initQueryParams',
    });
    this.props.dispatch({
      type: 'product/queryProductMainAll',
    });
    this.props.dispatch({
      type: 'product/shoppingCostsExchangeQuery',
    });
  }

  tableColumnsMain = () => {
    return [
      {
        title: '商品名称',
        dataIndex: 'title_main',
        key: 'title_main',
      },
      {
        title: '商品货号',
        dataIndex: 'offer_id',
        key: 'offer_id',
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
        title: '自定义商品分类',
        dataIndex: 'product_type',
        key: 'product_type',
        render: (text: any, record: any) => {
          return record.product_type.title_zh || '-';
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
      {
        title: 'Gtin码是否相关',
        dataIndex: 'identifierExists',
        key: 'identifierExists',
        render: (_: any, record: any) => {
          return <span>{record.identifierExists ? '是' : '否'}</span>;
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text: any, record: any) => {
          return (
            <div className="operate">
              <Button
                size="small"
                onClick={() => {
                  this.handelTableCreateSku(record);
                }}
              >
                创建SKU商品
              </Button>
              <br />
              <Button
                size="small"
                onClick={() => {
                  this.handelTableEdit(record);
                }}
              >
                编辑
              </Button>
              <span className="line">|</span>
              <Button
                size="small"
                onClick={() => {
                  this.handelTableDel(record);
                }}
              >
                删除
              </Button>
            </div>
          );
        },
      },
    ];
  };

  render() {
    const { productMainList, pagination } = this.props.product;
    const { currentOptionActionStatus, id, isCreateMainModalShow } = this.state;
    return (
      <PageContainer>
        <div className="page">
          <div className="product-create">
            <DefaultProject></DefaultProject>
            <div className="header">
              <div className="creat-button">
                <Button type="primary" size="large" onClick={this.createMainModalStatusHandle}>
                  创建主商品
                </Button>
              </div>
            </div>
            <div className="content">
              <Table
                dataSource={productMainList}
                columns={this.tableColumnsMain()}
                pagination={{
                  position: ['bottomRight'],
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                  onChange: this.handelTablePagination,
                }}
              />
            </div>
            <div className="footer">
              <CreateMainModal
                id={id}
                open={isCreateMainModalShow}
                openStatusCallback={this.openStatusCallbackCreateMainModal}
                callbackOk={this.createMainModalCallbackOk}
                optionAction={currentOptionActionStatus}
              ></CreateMainModal>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default ProductCreate;
