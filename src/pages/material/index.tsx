import { FolderAddOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'umi';
import ImgList from './components/ImgList';
import UploadFile from './components/UploadFile';

import './index.less';

@connect(({ material }) => ({
  material,
}))
class Material extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionAction: 0,
      folderOpenStatus: false,
      currentFolderDirectory: {
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
  handelFolderOk = (currentItem) => {
    const { optionAction } = this.state;
    this.setState(
      {
        folderOpenStatus: false,
        currentFolderDirectory: currentItem,
      },
      () => {
        this.props.dispatch({
          type: 'material/update',
          payload: {
            currentFolderDirectory: currentItem,
          },
        });
        if (optionAction === 1) {
          this.props.dispatch({
            type: 'material/editFolder',
            payload: {
              ...currentItem,
            },
          });
        } else {
          this.props.dispatch({
            type: 'material/createFolder',
            payload: {
              ...currentItem,
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
    });
  };
  handleClickDropdownEdit = (currentItem) => {
    this.setState(
      {
        optionAction: 1,
        folderOpenStatus: true,
        currentFolderDirectory: currentItem,
      },
      () => {
        this.props.dispatch({
          type: 'material/update',
          payload: {
            currentFolderDirectory: currentItem,
          },
        });
      },
    );
  };
  handleClickDropdownDel = (currentItem) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    Modal.confirm({
      title: '确认删除',
      content: '当前素材文件转移到默认文件夹下。',
      onOk() {
        self.props.dispatch({
          type: 'material/delFolder',
          payload: {
            ...currentItem,
          },
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  handleClickFolderMenu = (currentItem) => {
    const { folderDirectory } = this.props.material;
    const newFolderDirectory: any[] = [];
    // eslint-disable-next-line array-callback-return
    folderDirectory.map((item) => {
      if (item.key === currentItem.key) {
        newFolderDirectory.push(Object.assign({}, item, { active: true }));
      } else {
        newFolderDirectory.push(Object.assign({}, item, { active: false }));
      }
    });
    this.props.dispatch({
      type: 'material/update',
      payload: {
        folderDirectory: newFolderDirectory,
        currentFolderDirectory: currentItem,
      },
    });
    this.props.dispatch({
      type: 'material/queryFolderMaterial',
      payload: {
        ...currentItem,
      },
    });
  };
  folderMenuHtml = () => {
    const html: React.JSX.Element[] = [];
    const { folderDirectory } = this.props.material;
    if (folderDirectory && folderDirectory.length > 0) {
      // eslint-disable-next-line array-callback-return
      folderDirectory.map((item) => {
        if (item.is_default) {
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
        } else {
          html.push(
            <dd
              className={item.active ? 'active' : ''}
              key={item.key}
              onClick={() => {
                this.handleClickFolderMenu(item);
              }}
            >
              {item.label}{' '}
              <div className="span">
                <div className="dropdown">
                  <ul>
                    <li onClick={() => this.handleClickDropdownEdit(item)}>编辑</li>
                    <li onClick={() => this.handleClickDropdownDel(item)}>删除</li>
                  </ul>
                  <i className="icon arrow_right"></i>
                </div>
              </div>
            </dd>,
          );
        }
      });
    }
    return html;
  };

  delMaterialCallback = (item) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
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
  };
  handelUploadOk = () => {
    this.props.dispatch({
      type: 'material/queryFolder',
    });
  };
  handelUploadFailed = () => {};
  handelCheckCallback = (items) => {
    console.log('items:', items);
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'material/queryFolder',
    });
  }
  render() {
    console.log('this.props:', this.props);
    const { currentFolderDirectory } = this.props.material;
    return (
      <div className="material">
        <div className="content">
          <Row>
            <Col span={4}>
              <div className="folder-menu">
                <dl>
                  <dt>
                    <FolderOpenOutlined /> 文件目录
                  </dt>
                  {this.folderMenuHtml()}
                </dl>
              </div>
            </Col>
            <Col span={20}>
              <div className="container">
                <div className="header">
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
                  dataSource={
                    (currentFolderDirectory &&
                      currentFolderDirectory.data &&
                      currentFolderDirectory.data.rows) ||
                    []
                  }
                  delMaterialCallback={this.delMaterialCallback}
                  checked={['1085370435/22159932/limeet_logo_绿色.png']}
                  onChangeCallback={this.handelCheckCallback}
                ></ImgList>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Material;
