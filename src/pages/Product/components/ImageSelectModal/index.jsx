import { FolderOpenOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import { Component } from 'react';
import ImgList from '../../../Material/components/ImgList';

import './index.less';

class ImageSelectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderDirectory: props.folderDirectory,
      limit: props.imageLimitNum,
      selectedMaterial: [],
    };
  }

  handelTableAdd = () => {};

  handelTableDel = () => {};

  // Modal
  handleOk = () => {
    const { selectedMaterial } = this.state;
    if (this.props.callbackOk) {
      this.props.callbackOk(selectedMaterial);
    }
  };

  handleCancel = () => {
    if (this.props.callbackCancel) {
      this.props.callbackCancel();
    }
  };

  nameInputHandle = () => {};

  valueInputHandle = () => {};
  handleClickFolderMenu = (currentItem) => {
    const { folderDirectory } = this.props;
    const newFolderDirectory = [];
    // eslint-disable-next-line array-callback-return
    folderDirectory.map((item) => {
      if (item.key === currentItem.key) {
        newFolderDirectory.push(Object.assign({}, item, { active: true }));
      } else {
        newFolderDirectory.push(Object.assign({}, item, { active: false }));
      }
    });
    if (this.props.folderMenuSelectCallback) {
      this.props.folderMenuSelectCallback(currentItem, newFolderDirectory);
    }
  };

  folderMenuHtml = () => {
    const html = [];
    const { folderDirectory } = this.props;
    if (folderDirectory && folderDirectory.length > 0) {
      // eslint-disable-next-line array-callback-return
      folderDirectory.map((item) => {
        html.push(
          <dd
            className={item.active ? 'active' : ''}
            key={item.key}
            onClick={() => {
              this.handleClickFolderMenu(item);
            }}
          >
            {item.label}
          </dd>,
        );
      });
    }
    return html;
  };
  // 图片素材操作
  handelCheckCallback = (items) => {
    console.log('items:', items);
    this.setState({
      selectedMaterial: items,
    });
  };

  // subTile
  imageSubTitle = () => {
    let html = '';
    const { selectedType } = this.props;
    // eslint-disable-next-line eqeqeq
    if (selectedType == 'image_link') {
      html = '选择商品主图（选择1张图片）';
      // eslint-disable-next-line eqeqeq
    } else if (selectedType == 'additionalImageLinks') {
      html = '商品附加图片（选择5张图片）';
      // eslint-disable-next-line eqeqeq
    } else if (selectedType == 'lifestyleImageLinks') {
      html = '添加商品详情（最多选择20张图片）';
    }
    return html;
  };

  /*
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('nextProps folderDirectory:', nextProps.folderDirectory);
    if (this.props.folderDirectory !== nextProps.folderDirectory || this.props.currentFolderDirectory !== nextProps.currentFolderDirectory) {
      this.setState({
        folderDirectory: nextProps.folderDirectory,
        currentFolderDirectory: nextProps.currentFolderDirectory,
      });
    }
  }
  */

  render() {
    const { imageLimitNum, imageList } = this.props;
    return (
      <div className="image-select-modal">
        <Modal
          className="wrap-select-modal"
          title="选择图片素材 "
          open={this.props.open}
          width={1100}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="content">
            <Row>
              <Col span={5}>
                <div className="folder-menu">
                  <dl>
                    <dt>
                      <FolderOpenOutlined /> 文件目录
                    </dt>
                    {this.folderMenuHtml()}
                  </dl>
                </div>
              </Col>
              <Col span={19}>
                <div className="sub-title">{this.imageSubTitle()}</div>
                <div className="imglist-modal">
                  <ImgList
                    limit={imageLimitNum}
                    dataSource={imageList || []}
                    onChangeCallback={this.handelCheckCallback}
                  ></ImgList>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ImageSelectModal;
