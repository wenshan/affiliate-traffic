import { Input, Modal, Table, message } from 'antd';
import { Component } from 'react';

import './index.less';

class CustomProductType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOpen: false,
      optionAddStatus: 0,
      currentProductType: {
        title: '',
      },
    };
  }

  handleOk = () => {
    const { currentProductType } = this.state;
    if (this.props.callbackOk) {
      this.props.callbackOk(currentProductType);
    }
  };

  handleCancel = () => {
    if (this.props.callbackCancel) {
      this.props.callbackCancel();
    }
  };
  handelTableDel = (record) => {
    if (this.props.callbackDelOk) {
      this.props.callbackDelOk(record);
    }
  };

  handelTableAdd = () => {
    const { currentProductType } = this.state;
    const newCurrentProductType = Object.assign({}, currentProductType, {
      title: '',
      key: '',
      id: '',
    });
    this.setState({
      currentProductType: newCurrentProductType,
      addOpen: true,
      optionAddStatus: 0,
    });
  };

  handelTableEdit = (record) => {
    this.setState({
      currentProductType: record,
      addOpen: true,
      optionAddStatus: 1,
    });
  };

  handelInputLabel = (event) => {
    const { currentProductType } = this.state;
    const { value } = event.target;
    const newCurrentProductType = Object.assign({}, currentProductType, { title: value });
    this.setState({
      currentProductType: newCurrentProductType,
    });
  };
  handleAddOk = () => {
    const { currentProductType, optionAddStatus } = this.state;
    if (currentProductType && currentProductType.title) {
      this.setState(
        {
          addOpen: false,
        },
        () => {
          if (this.props.callbackAddOk) {
            this.props.callbackAddOk(currentProductType, optionAddStatus);
          }
        },
      );
    } else {
      message.warning({
        content: '输入的内容不能为空',
      });
    }
  };
  handleAddCancel = () => {
    const { currentProductType } = this.state;
    const newCurrentProductType = Object.assign({}, currentProductType, {
      title: '',
      key: '',
      id: '',
    });
    this.setState({
      currentProductType: newCurrentProductType,
      addOpen: false,
    });
  };
  onChangeSelectedRows = (selectedRowKeys: any, selectedRows: any) => {
    this.setState({
      currentProductType: selectedRows,
    });
  };

  render() {
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'title',
        key: 'title',
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
      type: 'radio',
      onChange: this.onChangeSelectedRows,
    };

    return (
      <div className="custom-product-type">
        <Modal
          title="选择商品分类"
          open={this.props.open}
          width={900}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table
            dataSource={this.props.dataSource}
            columns={columns}
            pagination={false}
            rowSelection={rowSelection}
          />
        </Modal>
        <Modal
          title={this.state.optionAddStatus > 0 ? '编辑商品分类' : '添加商品分类'}
          open={this.state.addOpen}
          width={500}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          <div className="content">
            <div className="form-item">
              <span className="label">属性名称: </span>
              <Input
                placeholder="属性名称"
                style={{ width: 250 }}
                value={this.state.currentProductType.title}
                onChange={this.handelInputLabel}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CustomProductType;
