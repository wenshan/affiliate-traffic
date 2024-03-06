import { PageContainer } from '@ant-design/pro-components';
import { Button, Table } from 'antd';
import { Component } from 'react';
import { connect, history } from 'umi';
import CreateMainModal from '../components/CreateMainModal';

import './index.less';

@connect(({ productCreate }) => ({
  productCreate,
}))
class ProductCreate extends Component {
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = {
      isCreateMainModalShow: false,
    };
  }
  createMainModalStatusHandle = () => {
    this.setState({
      isCreateMainModalShow: true,
    });
  };
  createMainModalCallbackCancel = () => {
    this.setState({
      isCreateMainModalShow: false,
    });
  };
  createMainModalCallbackOk = (parames) => {
    this.setState(
      {
        isCreateMainModalShow: false,
      },
      () => {
        this.props.dispatch({
          type: 'productCreate/update',
          payload: {
            currentProductMain: parames,
          },
        });
      },
    );
  };

  // table
  handelTableCreateSku = (record) => {
    history.push(`/product/productDetail?offerId=${record.offerId}`);
  };

  handelTableAdd = () => {};

  handelTableDel = () => {};

  render() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '自定商品分类',
        dataIndex: 'productType',
        key: 'productType',
      },
      {
        title: '商品货号',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Google商品类目',
        dataIndex: 'googleProductCategory',
        key: 'googleProductCategory',
      },
      {
        title: '商品GTIN码',
        dataIndex: 'gtin',
        key: 'gtin',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (_: any, record: any) => {
          console.log('record:', record);
          return (
            <div className="operate">
              <Button
                size="small"
                onClick={() => {
                  this.handelTableCreateSku(record);
                }}
              >
                创建SKU商品详情
              </Button>
              <span className="line">|</span>
              <Button
                size="small"
                onClick={() => {
                  this.handelTableAdd(record);
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
    const { productTypeOption, currentProductMain, productMainList } = this.props.productCreate;
    return (
      <PageContainer>
        <div className="page">
          <div className="product-create">
            <div className="header">
              <div className="creat-button">
                <Button type="primary" size="large" onClick={this.createMainModalStatusHandle}>
                  {' '}
                  确认创建主商品{' '}
                </Button>
              </div>
            </div>
            <div className="content">
              <Table dataSource={productMainList} columns={columns} />
            </div>
            <div className="footer">
              <CreateMainModal
                dataSource={{ currentProductMain, productTypeOption }}
                open={this.state.isCreateMainModalShow}
                callbackCancel={this.createMainModalCallbackCancel}
                callbackOk={this.createMainModalCallbackOk}
              ></CreateMainModal>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default ProductCreate;
