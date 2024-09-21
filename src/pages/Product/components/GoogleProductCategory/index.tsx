import tableData3 from '@/utils/google_product_category3';
import listToTreeSelf from '@/utils/listToTreeSelf';
import { Modal, Tree } from 'antd';
import { Component } from 'react';

import './index.less';

const treeData = listToTreeSelf(tableData3);
class CustomProductType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNodes: {},
      selectedKeys: props.selectedKeys,
    };
  }
  googleProductCategoryTreeHandle = (selectedKeys, event) => {
    console.log('selectedKeys:', selectedKeys);
    this.setState({
      selectedNodes: Object.assign({}, event.selectedNodes[0], { children: null }),
      selectedKeys,
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
          width={800}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Tree
            checkStrictly
            defaultExpandParent={false}
            multiple={false}
            treeData={treeData && treeData.rowsTree}
            height={500}
            defaultExpandAll={false}
            defaultExpandedKeys={this.state.selectedKeys}
            selectedKeys={this.state.selectedKeys}
            onSelect={this.googleProductCategoryTreeHandle}
          />
        </Modal>
      </div>
    );
  }
}

export default CustomProductType;
