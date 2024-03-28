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
      isCreateMainModalShow: false,
      pageSize: 20,
      current: 1,
      currentOptionActionStatus: 0, // 0 添加 1 编辑
    };
  }
  createMainModalStatusHandle = () => {
    this.setState({
      isCreateMainModalShow: true,
      currentOptionActionStatus: 0,
    });
  };
  createMainModalCallbackCancel = () => {
    this.setState({
      isCreateMainModalShow: false,
    });
  };
  createMainModalCallbackOk = (currentProductMain) => {
    const { currentOptionActionStatus } = this.state;
    console.log('currentProductMain:', currentProductMain);
    this.setState(
      {
        isCreateMainModalShow: false,
      },
      () => {
        this.props.dispatch({
          type: 'product/update',
          payload: {
            currentProductMain,
          },
        });
        if (currentOptionActionStatus === 0) {
          this.props.dispatch({
            type: 'product/createProductMain',
            payload: {
              ...currentProductMain,
            },
          });
        } else {
          this.props.dispatch({
            type: 'product/editProductMain',
            payload: {
              ...currentProductMain,
            },
          });
        }
      },
    );
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
  // 删除商品分类
  handelDelProductType = (item) => {
    this.props.dispatch({
      type: 'product/delType',
      payload: {
        ...item,
      },
    });
  };

  // table
  handelTableCreateSku = (record) => {
    history.push(`/product/productDetail?offer_id=${record.offer_id}`);
  };

  handelTableEdit = (record) => {
    console.log('record:', record);
    this.props.dispatch({
      type: 'product/update',
      payload: {
        currentProductMain: record,
      },
    });
    this.setState({
      isCreateMainModalShow: true,
      currentOptionActionStatus: 1,
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
    console.log(page, pageSize);
    this.setState(
      {
        current: page,
      },
      () => {
        this.props.dispatch({
          type: 'product/queryProductMainAll',
          payload: {
            pageSize,
            current: page,
          },
        });
      },
    );
  };

  componentDidMount() {
    const { pageSize, current } = this.state;
    this.props.dispatch({
      type: 'product/queryProductMainAll',
      payload: {
        pageSize,
        current,
      },
    });
    this.props.dispatch({
      type: 'product/queryType',
    });
  }

  render() {
    const { productTypeOption, currentProductMain, productMainList, productMainTotal } =
      this.props.product;
    const { pageSize, current, currentOptionActionStatus } = this.state;
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '自定商品分类',
        dataIndex: 'product_type_id',
        key: 'product_type_id',
        render: (text: any, record: any) => {
          return record.product_type_id.title || '-';
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
        title: '操作',
        dataIndex: 'operate',
        render: (text: any, record: any) => {
          console.log('record:', record);
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
              <Table
                dataSource={productMainList}
                columns={columns}
                pagination={{
                  position: ['bottomRight'],
                  current,
                  pageSize,
                  total: productMainTotal,
                  onChange: this.handelTablePagination,
                }}
              />
            </div>
            <div className="footer">
              <CreateMainModal
                dataSource={{ currentProductMain, productTypeOption }}
                open={this.state.isCreateMainModalShow}
                callbackCancel={this.createMainModalCallbackCancel}
                callbackOk={this.createMainModalCallbackOk}
                optionAction={currentOptionActionStatus}
                callbackAddProductType={this.handelAddProductType}
                callbackDelProductType={this.handelDelProductType}
              ></CreateMainModal>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default ProductCreate;
