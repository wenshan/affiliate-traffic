import { Input, Modal, Table } from 'antd';
import { Component } from 'react';

import './index.less';

class ProductAttribute extends Component {
  constructor(props: Readonly<object>) {
    super(props);
    this.state = {
      selectedRowsProductAttr: [],
      optionAddStatus: 0,
      currentProductAttribute: {
        attribute_name: '',
        attribute_value: '',
      },
      selectedRowKeys: [],
      addOpen: false,
      open: false,
    };
  }

  // Modal
  handleOk = () => {
    const { selectedRowsProductAttr } = this.state;
    if (this.props.callbackOk) {
      this.props.callbackOk(selectedRowsProductAttr);
    }
  };

  handleCancel = () => {
    if (this.props.callbackCancel) {
      this.props.callbackCancel();
    }
  };

  handleAddOk = () => {
    const { currentProductAttribute } = this.state;
    this.setState(
      {
        addOpen: false,
      },
      () => {
        if (this.props.callbackAddOk) {
          this.props.callbackAddOk(currentProductAttribute);
        }
      },
    );
  };
  handleAddCancel = () => {
    const currentProductAttribute = {
      attribute_name: '',
      attribute_value: '',
    };
    this.setState({
      addOpen: false,
      currentProductAttribute,
    });
  };

  nameInputHandle = (event: { target: { value: any } }) => {
    const { value } = event.target;
    const { currentProductAttribute } = this.state;
    const newCurrentProductAttribute = Object.assign({}, currentProductAttribute, {
      attribute_name: value,
    });
    this.setState({
      currentProductAttribute: newCurrentProductAttribute,
    });
  };

  valueInputHandle = (event: { target: { value: any } }) => {
    const { value } = event.target;
    const { currentProductAttribute } = this.state;
    const newCurrentProductAttribute = Object.assign({}, currentProductAttribute, {
      attribute_value: value,
    });
    this.setState({
      currentProductAttribute: newCurrentProductAttribute,
    });
  };

  handelTableAdd = () => {
    const currentProductAttribute = {
      attribute_name: '',
      attribute_value: '',
    };
    this.setState({
      addOpen: true,
      optionAddStatus: 0,
      currentProductAttribute,
    });
  };

  handelTableEdit = (record: any) => {
    this.setState({
      addOpen: true,
      optionAddStatus: 1,
      currentProductAttribute: record,
    });
  };

  handelTableDel = (record: any) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    Modal.confirm({
      title: '确认删除',
      content: '删除当前的商品属性',
      onOk() {
        if (self.props.callbackDelOk) {
          self.props.callbackDelOk(record);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  onChangeSelectedRows = (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows);
    this.setState({
      selectedRowsProductAttr: selectedRows,
      selectedRowKeys,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource.product_detail) {
      const selectedRowKeys: any[] = [];
      const { product_detail } = nextProps.dataSource;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      product_detail &&
        product_detail.length &&
        product_detail.map((item: { key: any }) => {
          selectedRowKeys.push(item.key);
        });
      this.setState({
        selectedRowKeys,
      });
    }
  }

  render() {
    const { attribute_name, attribute_value } = this.state.currentProductAttribute;
    const { productAttributeOption } = this.props.dataSource;
    const { selectedRowKeys } = this.state;
    console.log('productAttributeOption:', productAttributeOption);
    console.log('selectedRowKeys:', selectedRowKeys);
    const columns = [
      {
        title: '属性名称',
        dataIndex: 'attribute_name',
        key: 'attribute_name',
      },
      {
        title: '属性值',
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
                  this.handelTableAdd(record);
                }}
              >
                添加
              </span>
              <span className="line">|</span>
              <span
                className="tx"
                onClick={() => {
                  this.handelTableEdit(record);
                }}
              >
                编辑
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

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onChangeSelectedRows,
    };
    return (
      <div className="product-attribute">
        <Modal
          title="商品属性管理"
          open={this.props.open}
          width={900}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table
            dataSource={productAttributeOption}
            columns={columns}
            pagination={false}
            rowSelection={rowSelection}
          />
        </Modal>
        <Modal
          title={this.state.optionAddStatus > 0 ? '编辑属性' : '添加属性'}
          open={this.state.addOpen}
          width={550}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          <div className="content form-box">
            <div className="form-item">
              <span className="label">属性名称:</span>
              <Input
                placeholder="属性名称"
                style={{ width: 250 }}
                value={attribute_name}
                onChange={this.nameInputHandle}
              />
            </div>
            <div className="form-item">
              <span className="label">属性值:</span>
              <Input
                placeholder="属性值"
                style={{ width: 250 }}
                value={attribute_value}
                onChange={this.valueInputHandle}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ProductAttribute;
