import { Input, Modal } from 'antd';
import { Component } from 'react';
import { connect } from 'umi';

import './index.less';

@connect(({ product, common, material }) => ({
  product,
  common,
  material,
}))
class FolderDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionAction: 0,
      operateFolderDirectory: {
        label: '',
        key: '',
      },
    };
  }

  handelTableAdd = () => {};

  handelTableDel = () => {};

  // Modal
  handleOk = () => {};

  handleCancel = () => {
    this.setState({
      operateFolderDirectory: { label: '', key: '' },
    });
    if (this.props.callbackCancel) {
      this.props.callbackCancel();
    }
  };

  folderInputHandle = (event) => {
    const { value } = event.target;
    const { optionAction } = this.state;
    const { selectFolderDirectory } = this.props.material;
    let addFolderDirectory;
    if (optionAction > 0) {
      // 编辑
      addFolderDirectory = Object.assign({}, selectFolderDirectory, {
        label: value,
        is_default: false,
        active: false,
      });
    } else {
      // 新增
      addFolderDirectory = Object.assign({}, { label: value, is_default: false, active: false });
    }
    this.setState({
      operateFolderDirectory: addFolderDirectory,
    });
    this.props.dispatch({
      type: 'material/update',
      payload: {
        addFolderDirectory,
      },
    });
  };
  /*
  UNSAFE_componentWillReceiveProps(nextProps) {

  }
  */

  render() {
    return (
      <div className="product-attribute">
        <Modal
          title={this.props.optionAction > 0 ? '编辑文件目录' : '添加文件目录'}
          open={this.props.open}
          width={500}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="content">
            <div className="form-item">
              <span className="label">文件夹名称: </span>
              <Input
                placeholder="文件夹名称"
                style={{ width: 250 }}
                value={this.state.operateFolderDirectory.label}
                onChange={this.folderInputHandle}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default FolderDirectory;
