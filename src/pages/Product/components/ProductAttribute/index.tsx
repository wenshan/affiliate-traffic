import { Input, Modal } from 'antd';
import { Component } from 'react';

import './index.less';

class ProductAttribute extends Component {
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = {
      attribute_name: '',
      attribute_value: '',
    };
  }

  handelTableAdd = () => {};

  handelTableDel = () => {};

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

  nameInputHandle = () => {};

  valueInputHandle = () => {};

  render() {
    const { attribute_name, attribute_value } = this.state;
    return (
      <div className="product-attribute">
        <Modal
          title="添加商品属性 "
          open={this.props.open}
          width={500}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
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
