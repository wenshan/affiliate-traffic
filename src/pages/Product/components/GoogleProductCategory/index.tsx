import tableData3 from '@/utils/google_product_category3';
import listToTreeSelf from '@/utils/listToTreeSelf';
import { Modal, Tree } from 'antd';
import { useState } from 'react';

import './index.less';

type Props = {
  selectedKeys: string[] | number[];
  open: boolean;
  callbackCancel: any;
  callbackOk: any;
};

const treeData = listToTreeSelf(tableData3);

export default (props: Props) => {
  const [selectedNodes, setSelectedNodes] = useState();
  const [selectedKeys, setSelectedKeys] = useState(props.selectedKeys);

  const googleProductCategoryTreeHandle = async (selectedKeys, event) => {
    const selectedNodes = Object.assign({}, event.selectedNodes[0], { children: null });
    setSelectedKeys(selectedKeys);
    setSelectedNodes(selectedNodes);
  };

  const handleOk = async () => {
    if (props.callbackOk && props.callbackCancel) {
      props.callbackOk(selectedNodes);
      props.callbackCancel();
    }
  };
  const handleCancel = async () => {
    if (props.callbackCancel) {
      props.callbackCancel();
    }
  };

  return (
    <div className="google-product-category">
      <Modal
        title="选择Google商品类目"
        open={props.open}
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkStrictly
          defaultExpandParent={false}
          multiple={false}
          treeData={treeData && treeData.rowsTree}
          height={500}
          defaultExpandAll={false}
          defaultExpandedKeys={selectedKeys}
          selectedKeys={selectedKeys}
          onSelect={googleProductCategoryTreeHandle}
        />
      </Modal>
    </div>
  );
};
