import { Input, Modal } from 'antd';
import { Component } from 'react';

import './index.less';

class FolderDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFolderDirectory: {
        label: '',
        key: '',
      },
    };
  }

  handelTableAdd = () => {};

  handelTableDel = () => {};

  // Modal
  handleOk = () => {
    const { currentFolderDirectory } = this.state;
    if (this.props.callbackOk) {
      this.props.callbackOk(currentFolderDirectory);
    }
  };

  handleCancel = () => {
    if (this.props.callbackCancel) {
      this.props.callbackCancel();
    }
  };

  folderInputHandle = (event) => {
    const { value } = event.target;
    const { currentFolderDirectory } = this.state;
    this.setState({
      currentFolderDirectory: Object.assign({}, currentFolderDirectory, { label: value }),
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('nextProps:', nextProps);
    if (nextProps.currentFolderDirectory) {
      this.setState({
        currentFolderDirectory: nextProps.currentFolderDirectory,
      });
    }
  }

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
                value={this.state.currentFolderDirectory.label}
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
