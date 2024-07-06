import Tool from '@/utils/tool';
import { FolderOpenOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
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
    if (folderDirectory && folderDirectory.length > 0 && folderDirectory[0]) {
      // eslint-disable-next-line array-callback-return
      folderDirectory.map((item, index) => {
        if (item.children) {
          html.push(
            <li key={`${item.key}_${index}`} className="pad00">
              <div
                title={item.label}
                className={`item ${item.active ? 'active' : ''}`}
                onClick={() => this.handleClickFolderMenu(item)}
                key={item.key}
              >
                <span className="space"></span>
                {item.is_leaf === 1 ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                {Tool.replaceExceedEnd(item.label, 20)}
              </div>
              {item.children && item.children.length && (
                <ul>
                  {item.children.map((childrenItem, idx) => {
                    return (
                      <li key={`${childrenItem.key}_${idx}`} className="pad01">
                        <div
                          title={childrenItem.label}
                          className={`item ${childrenItem.active ? 'active' : ''}`}
                          onClick={() => this.handleClickFolderMenu(childrenItem)}
                        >
                          <span className="space"></span>
                          {childrenItem.is_default === 0 ? (
                            childrenItem.is_leaf === 1 ? (
                              <MinusSquareOutlined />
                            ) : (
                              <PlusSquareOutlined />
                            )
                          ) : null}
                          {Tool.replaceExceedEnd(childrenItem.label, 25)}
                        </div>
                        {childrenItem.children && childrenItem.children.length && (
                          <ul key={`${childrenItem.key}_${idx}_ul`}>
                            {childrenItem.children.map((children2Item, idx2) => {
                              return (
                                <li key={`${children2Item.key}_${idx2}`} className="pad02">
                                  <div
                                    title={children2Item.label}
                                    className={`item ${children2Item.active ? 'active' : ''}`}
                                    onClick={() => this.handleClickFolderMenu(children2Item)}
                                  >
                                    <span className="space"></span>
                                    {children2Item.is_default === 0 ? (
                                      children2Item.is_leaf === 1 ? (
                                        <MinusSquareOutlined />
                                      ) : (
                                        <PlusSquareOutlined />
                                      )
                                    ) : null}
                                    {Tool.replaceExceedEnd(children2Item.label, 20)}
                                  </div>
                                  {children2Item.children && children2Item.children.length && (
                                    <ul key={`${children2Item.key}_${idx2}_ul`}>
                                      {children2Item.children.map((children3Item, idx3) => {
                                        <li key={`${children3Item.key}_${idx3}`} className="pad03">
                                          <div
                                            title={children3Item.label}
                                            className={`${children3Item.active ? 'active' : ''}`}
                                            onClick={() =>
                                              this.handleClickFolderMenu(children3Item)
                                            }
                                          >
                                            <span className="space"></span>
                                            {children3Item.is_default === 0 ? (
                                              children3Item.is_leaf === 1 ? (
                                                <MinusSquareOutlined />
                                              ) : (
                                                <PlusSquareOutlined />
                                              )
                                            ) : null}
                                            {Tool.replaceExceedEnd(children3Item.label, 20)}
                                          </div>
                                        </li>;
                                      })}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>,
          );
        } else {
          html.push(
            <li key={`${item.key}_${item.is_defaul}`} className="pad00">
              <div
                title={item.label}
                className={`item ${item.active ? 'active' : ''}`}
                onClick={() => this.handleClickFolderMenu(item)}
                key={item.key}
              >
                <span className="space"></span>
                {item.is_leaf ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                {Tool.replaceExceedEnd(item.label, 20)}
              </div>
            </li>,
          );
        }
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
    const { imageLimitNum, imageList, folderDirectory } = this.props;
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
                  <div className="header">
                    {' '}
                    <FolderOpenOutlined /> 文件目录
                  </div>
                  <div className="menu-wrap">
                    <ul>{folderDirectory && this.folderMenuHtml()}</ul>
                  </div>
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
