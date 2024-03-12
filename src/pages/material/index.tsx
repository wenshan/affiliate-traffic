import { FolderAddOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Button, Col, Menu, Row } from 'antd';
import React from 'react';
import { connect } from 'umi';
import ImgList from './components/ImgList';
import UploadFile from './components/UploadFile';

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

const Material: React.FC = (props) => {
  console.log('props:', props);
  return (
    <div className="material">
      <div className="content">
        <Row>
          <Col span={4}>
            <Menu items={items}></Menu>
          </Col>
          <Col span={20}>
            <div className="container">
              <div className="header">
                <Button icon={<FolderAddOutlined />}>新建文件目录</Button>
                <UploadFile></UploadFile>
              </div>
              <ImgList></ImgList>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { common: any; material: any }) => ({
  common: state.common,
  material: state.material,
});

export default connect(mapStateToProps)(Material);
