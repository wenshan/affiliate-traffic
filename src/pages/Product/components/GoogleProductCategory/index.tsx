import { Modal, Tree } from 'antd';
import { Component } from 'react';
import tableData from '../../../../utils/google_product_category2';

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
    console.log('selectedNodes:', event.selectedNodes[0]);
    this.setState({
      selectedNodes: Object.assign({}, event.selectedNodes[0], { children: null }),
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

  render() {
    return (
      <div className="custom-product-type">
        <Modal
          title="选择Google商品类目"
          open={this.props.open}
          width={600}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Tree
            checkStrictly
            defaultExpandParent={false}
            multiple={false}
            treeData={tableData}
            height={500}
            defaultExpandAll={false}
            onSelect={this.googleProductCategoryTreeHandle}
          />
        </Modal>
      </div>
    );
  }
}

export default CustomProductType;
