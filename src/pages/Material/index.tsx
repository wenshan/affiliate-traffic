import listToTreeSelf from '@/utils/listToTreeSelf';
import Tool from '@/utils/tool';
import {
  FolderAddOutlined,
  FolderOpenOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Col, Input, Modal, Row, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'umi';
import ImgList from './components/ImgList';
import UploadFile from './components/UploadFile';

import './index.less';

@connect(({ product, common, material }) => ({
  product,
  common,
  material,
}))
class Material extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionAction: 0,
      folderOpenStatus: false,
      operateFolderDirectory: {
        label: '',
        key: '',
      },
    };
  }
  handelFolderCancel = () => {
    this.setState({
      folderOpenStatus: false,
    });
  };
  handelFolderOk = () => {
    const { optionAction, operateFolderDirectory } = this.state;
    const { currentFolderDirectory } = this.props.material;
    let addFolderDirectory = Object.assign({}, operateFolderDirectory);
    this.setState(
      {
        folderOpenStatus: false,
      },
      () => {
        if (optionAction === 1) {
          this.props.dispatch({
            type: 'material/editFolder',
            payload: {
              ...addFolderDirectory,
            },
          });
        } else {
          // 默认分组直接建立目录
          if (currentFolderDirectory.key === '00000000') {
            addFolderDirectory = Object.assign({}, operateFolderDirectory, {
              father_key: '',
              key_path: '',
              key: '',
              is_leaf: 1,
              active: false,
              is_default: false,
            });
          } else {
            if (currentFolderDirectory.father_key) {
              addFolderDirectory = Object.assign({}, operateFolderDirectory, {
                father_key: currentFolderDirectory.key,
                key_path: `${currentFolderDirectory.father_key}/${currentFolderDirectory.key}`,
                key: '',
                is_leaf: 1,
                active: false,
                is_default: false,
              });
            } else {
              addFolderDirectory = Object.assign({}, operateFolderDirectory, {
                father_key: currentFolderDirectory.key,
                key_path: `${currentFolderDirectory.key}`,
                key: '',
                is_leaf: 1,
                active: false,
                is_default: false,
              });
            }
          }
          this.props.dispatch({
            type: 'material/createFolder',
            payload: {
              ...addFolderDirectory,
            },
          });
        }
      },
    );
  };
  handelCreateFolder = () => {
    this.setState({
      optionAction: 0,
      folderOpenStatus: true,
      operateFolderDirectory: {
        label: '',
        key: '',
      },
    });
  };
  handleClickDropdownEdit = () => {
    const { currentFolderDirectory } = this.props.material;
    this.setState({
      optionAction: 1,
      folderOpenStatus: true,
      operateFolderDirectory: currentFolderDirectory,
    });
  };
  folderInputHandle = (event) => {
    const { value } = event.target;
    const { optionAction } = this.state;
    const { currentFolderDirectory } = this.props.material;
    if (optionAction === 1) {
      this.setState({
        operateFolderDirectory: Object.assign({}, currentFolderDirectory, {
          title: value,
          label: value,
        }),
      });
    } else {
      this.setState({
        operateFolderDirectory: Object.assign({}, { title: value, label: value }),
      });
    }
  };
  handleClickDropdownDel = () => {
    const { currentFolderDirectory } = this.props.material;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    Modal.confirm({
      title: '确认删除',
      content: '当前素材文件转移到默认文件夹下。',
      onOk() {
        self.props.dispatch({
          type: 'material/delFolder',
          payload: {
            ...currentFolderDirectory,
          },
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  handleOnCheckSelectFolderMenu = (event) => {
    console.log('OnCheck event:', event);
    const { folderDirectoryRows } = this.props.material;
    const key = event.target.value;
    const newRows: any[] = [];
    let currentItem;
    if (key) {
      folderDirectoryRows.map((item: { key: any; checked: any }) => {
        if (item.key === key) {
          let tempItem;
          if (item && item.checked) {
            tempItem = Object.assign({}, item, { active: 1, checked: false });
          } else {
            tempItem = Object.assign({}, item, { active: 1, checked: true });
          }
          newRows.push(tempItem);
          currentItem = tempItem;
        } else {
          newRows.push(Object.assign({}, item, { active: 0, checked: false }));
        }
      });
      const folderDirectory = listToTreeSelf(newRows);
      this.props.dispatch({
        type: 'material/update',
        payload: {
          folderDirectory,
          currentFolderDirectory: currentItem,
          folderDirectoryRows: newRows,
        },
      });
    }
  };

  handleClickFolderMenu = (currentItem: any) => {
    console.log('currentItem:', currentItem);
    const { folderDirectoryRows } = this.props.material;
    const newRows: any = [];
    if (currentItem && currentItem.key) {
      folderDirectoryRows.map((item) => {
        if (item.key === currentItem.key) {
          newRows.push(Object.assign({}, item, { active: 1 }));
        } else {
          newRows.push(Object.assign({}, item, { active: 0 }));
        }
      });
      const folderDirectory = listToTreeSelf(newRows);
      this.props.dispatch({
        type: 'material/update',
        payload: {
          folderDirectory,
          currentFolderDirectory: currentItem,
          folderDirectoryRows: newRows,
        },
      });
      this.props.dispatch({
        type: 'material/queryFolderMaterial',
        payload: {
          ...currentItem,
        },
      });
    }
  };
  folderMenuHtml = () => {
    const html: React.JSX.Element[] = [];
    const { folderDirectory } = this.props.material;
    if (folderDirectory && folderDirectory.length > 0 && folderDirectory[0]) {
      // eslint-disable-next-line array-callback-return
      folderDirectory.map((item: any, index: number) => {
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
                <Checkbox
                  value={item.key}
                  disabled={!!item.is_default}
                  checked={item.checked}
                  onChange={this.handleOnCheckSelectFolderMenu}
                ></Checkbox>{' '}
                {Tool.replaceExceedEnd(item.label, 25)}
              </div>
              {item.children && item.children.length && (
                <ul>
                  {item.children.map((childrenItem: any, idx: number) => {
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
                          <Checkbox
                            value={childrenItem.key}
                            disabled={!!childrenItem.is_default}
                            checked={childrenItem.checked}
                            onChange={this.handleOnCheckSelectFolderMenu}
                          ></Checkbox>{' '}
                          {Tool.replaceExceedEnd(childrenItem.label, 25)}
                        </div>
                        {childrenItem.children && childrenItem.children.length && (
                          <ul key={`${childrenItem.key}_${idx}_ul`}>
                            {childrenItem.children.map((children2Item: any, idx2: number) => {
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
                                    <Checkbox
                                      value={children2Item.key}
                                      disabled={!!children2Item.is_default}
                                      checked={children2Item.checked}
                                      onChange={this.handleOnCheckSelectFolderMenu}
                                    ></Checkbox>
                                    {Tool.replaceExceedEnd(children2Item.label, 25)}
                                  </div>
                                  {children2Item.children && children2Item.children.length && (
                                    <ul key={`${children2Item.key}_${idx2}_ul`}>
                                      {children2Item.children.map(
                                        (children3Item: any, idx3: number) => {
                                          <li
                                            key={`${children3Item.key}_${idx3}`}
                                            className="pad03"
                                          >
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
                                              <Checkbox
                                                value={children3Item.key}
                                                disabled={!!children3Item.is_default}
                                                checked={children3Item.checked}
                                                onChange={this.handleOnCheckSelectFolderMenu}
                                              ></Checkbox>
                                              {Tool.replaceExceedEnd(children3Item.label, 25)}
                                            </div>
                                          </li>;
                                        },
                                      )}
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
                <Checkbox
                  value={item.key}
                  disabled={!!item.is_default}
                  checked={item.checked}
                  onChange={this.handleOnCheckSelectFolderMenu}
                ></Checkbox>
                {Tool.replaceExceedEnd(item.label, 25)}
              </div>
            </li>,
          );
        }
      });
    }

    return html;
  };

  delMaterialCallback = (item: any) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    if (item.status === 1) {
      Modal.confirm({
        title: '确认删除',
        content: '彻底删除服务文件，资源地址将失去访问',
        onOk() {
          self.props.dispatch({
            type: 'material/delRemoteMaterial',
            payload: {
              ...item,
            },
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      Modal.confirm({
        title: '确认删除',
        content: '删除当前的素材',
        onOk() {
          self.props.dispatch({
            type: 'material/delMaterial',
            payload: {
              ...item,
            },
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };
  handelUploadOk = (file) => {
    const { currentFolderDirectory } = this.props.material;
    message.success(`${file.name} 上传成功！`);
    this.props.dispatch({
      type: 'material/queryFolderMaterial',
      payload: {
        ...currentFolderDirectory,
      },
    });
  };
  handelUploadFailed = () => {
    message.error('上传失败，请重试！');
  };
  handelCheckCallback = (items) => {
    console.log('items:', items);
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'material/queryFolder',
    });
  }

  render() {
    const { currentFolderDirectory, imageList, folderDirectory } = this.props.material;
    // console.log('currentFolderDirectory:', currentFolderDirectory);
    return (
      <div className="page">
        <div className="material">
          <div className="content">
            <Row>
              <Col span={5}>
                <div className="folder-menu">
                  <div className="header">
                    {' '}
                    <FolderOpenOutlined /> 文件目录
                  </div>
                  <div className="menu-wrap">
                    <ul>
                      {folderDirectory &&
                        currentFolderDirectory &&
                        currentFolderDirectory.key &&
                        this.folderMenuHtml()}
                    </ul>
                  </div>
                </div>
              </Col>
              <Col span={19}>
                <div className="container">
                  <div className="header">
                    <Button onClick={this.handleClickDropdownDel}>删除</Button>
                    <Button onClick={this.handleClickDropdownEdit}>编辑</Button>
                    <Button icon={<FolderAddOutlined />} onClick={this.handelCreateFolder}>
                      新建文件目录
                    </Button>
                    <UploadFile
                      callbackOk={this.handelUploadOk}
                      callbackFailed={this.handelUploadFailed}
                      data={currentFolderDirectory}
                    ></UploadFile>
                  </div>
                  <ImgList
                    dataSource={imageList || []}
                    delMaterialCallback={this.delMaterialCallback}
                    checked={['1085370435/22159932/limeet_logo_绿色.png']}
                    onChangeCallback={this.handelCheckCallback}
                  ></ImgList>
                  {currentFolderDirectory &&
                    currentFolderDirectory.label &&
                    currentFolderDirectory.key && (
                      <Modal
                        title={this.state.optionAction > 0 ? '编辑文件目录' : '添加文件目录'}
                        open={this.state.folderOpenStatus}
                        width={500}
                        onOk={this.handelFolderOk}
                        onCancel={this.handelFolderCancel}
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
                    )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Material;
