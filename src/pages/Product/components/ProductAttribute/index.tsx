import { Input, Modal, Table } from 'antd';
import { Component } from 'react';

import './index.less';

class ProductAttribute extends Component {
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = {
      currentProductType: [],
      optionAddStatus: 0,
      currentProductAttribute: {
        attribute_name: '',
        attribute_value: '',
      },
      addOpen: false,
      open: false,
    };
  }

  // Modal
  handleOk = () => {
    const { currentProductMain } = this.state;
    if (this.props.callbackOk) {
      this.props.callbackOk(currentProductMain);
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

  nameInputHandle = (event) => {
    const { value } = event.target;
    const { currentProductAttribute } = this.state;
    const newCurrentProductAttribute = Object.assign({}, currentProductAttribute, {
      attribute_name: value,
    });
    this.setState({
      currentProductAttribute: newCurrentProductAttribute,
    });
  };

  valueInputHandle = (event) => {
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

  handelTableEdit = (record) => {
    this.setState({
      addOpen: true,
      optionAddStatus: 1,
      currentProductAttribute: record,
    });
  };

  handelTableDel = (record) => {
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
    this.setState({
      currentProductType: selectedRows,
    });
  };

  render() {
    const { attribute_name, attribute_value } = this.state.currentProductAttribute;
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
            dataSource={this.props.dataSource.productAttributeOption}
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
