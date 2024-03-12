import { FolderOpenOutlined } from '@ant-design/icons';
import { Col, Menu, Modal, Row } from 'antd';
import { Component } from 'react';

import './index.less';

const items = [
  {
    label: '文件目录',
    key: 'group',
    type: 'group',
    icon: <FolderOpenOutlined />,
    children: [
      {
        label: '默认分组',
        key: '0',
      },
      {
        label: '分组一',
        key: '1',
      },
      {
        label: '分组二',
        key: '2',
      },
      {
        label: '分组三',
        key: '3',
      },
    ],
  },
];

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

class ImageSelectModal extends Component {
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
      <div className="image-select-modal">
        <Modal
          title="选择图片素材 "
          open={true}
          width={900}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="content imglist-modal">
            <Row>
              <Col span={4}>
                <Menu items={items}></Menu>
              </Col>
              <Col span={20}>
                <div className="imglist">
                  <div className="content">
                    <div className="list-owflow">
                      <ul className="list-ul">
                        <li className="item">
                          <div className="img-box">
                            <img src={src} />
                          </div>
                          <div className="title">测试的得的得得得得得得</div>
                        </li>
                        <li className="item">
                          <div className="img-box">
                            <img src={src} />
                          </div>
                          <div className="title">测试的得的得得得得得得</div>
                        </li>
                        <li className="item">
                          <div className="img-box">
                            <img src={src} />
                          </div>
                          <div className="title">测试的得的得得得得得得</div>
                        </li>
                        <li className="item">
                          <div className="img-box">
                            <img src={src} />
                          </div>
                          <div className="title">测试的得的得得得得得得</div>
                        </li>
                        <li className="item">
                          <div className="img-box">
                            <img src={src} />
                          </div>
                          <div className="title">测试的得的得得得得得得</div>
                        </li>
                      </ul>
                    </div>
                  </div>
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
