import { Modal, Table } from 'antd';
import { Component } from 'react';

import './index.less';

class CustomProductType extends Component {
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = {
      selectedNodes: {},
    };
  }
  googleProductCategoryTreeHandle = (selectedKeys, event) => {
    console.log('selectedKeys:', selectedKeys);
    console.log('selectedNodes:', event.selectedNodes);
    this.setState({
      selectedNodes: event.selectedNodes[0],
    });
  };

  handleOk = () => {
    const { selectedNodes } = this.state;
    if (this.props.callbackOk && this.props.callbackCancel) {
      this.props.callbackOk(selectedNodes);
      this.props.callbackCancel();
    }
  };

  handleCancel = () => {
    if (this.props.callbackCancel) {
      this.props.callbackCancel();
    }
  };
  handelTableDel = (record) => {
    console.log('record:', record);
  };

  handelTableAdd = (record) => {
    console.log('record:', record);
  };

  render() {
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'label',
        key: 'label',
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

    return (
      <div className="custom-product-type">
        <Modal
          title="选择Google商品类目"
          open={this.props.open}
          width={600}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table dataSource={this.props.dataSource} columns={columns} pagination={false} />
        </Modal>
      </div>
    );
  }
}

export default CustomProductType;
