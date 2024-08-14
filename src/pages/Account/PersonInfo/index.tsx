import { UploadOutlined } from '@ant-design/icons';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { Avatar, Button, ConfigProvider, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';

import './index.less';

const PersonInfo: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [currentUser, setCurrentUser] = useState(initialState.currentUser);
  const getCurrentUser = async () => {
    const currentUserNew = await initialState.fetchUserInfo();
    setCurrentUser(currentUserNew);
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  const updateProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <PageContainer className="personInfo">
      <ConfigProvider componentSize="large">
        <ProForm
          readonly
          layout="horizontal"
          submitter={{
            render: () => {
              return [];
            },
          }}
        >
          <div className="container">
            <div className="list">
              <ul>
                <li>
                  <ProFormText
                    width="md"
                    name="email"
                    label="账号邮箱"
                    initialValue={currentUser.email}
                  />{' '}
                  <div className="edit">修改</div>
                </li>
                <li>
                  <ProFormText
                    width="md"
                    name="nickname"
                    initialValue={currentUser.nickname}
                    label="昵称"
                  />{' '}
                  <div className="edit">修改</div>
                </li>
                <li>
                  <ProFormText width="md" name="id" label="用户ID" initialValue={currentUser.id} />
                </li>
                <li>
                  <ProFormText
                    width="md"
                    name="name"
                    label="姓名"
                    initialValue={currentUser.name}
                  />{' '}
                  <div className="status">
                    {currentUser && currentUser.is_certification ? '已实名' : '未实名'}
                  </div>
                  <div className="edit">修改</div>
                </li>
                <li>
                  <ProFormText
                    width="md"
                    name="gender"
                    label="性别"
                    initialValue={currentUser.gender}
                  />
                </li>
                <li>
                  <ProFormText
                    width="md"
                    name="mobile"
                    label="手机"
                    initialValue={currentUser.mobile}
                  />{' '}
                  <div className="status">
                    {currentUser && currentUser.is_checkMobile ? '已经认证' : '未认证'}
                  </div>
                  <div className="edit">修改</div>
                </li>
                <li>
                  <ProFormText
                    width="md"
                    name="invitation_code"
                    label="推广ID"
                    initialValue={currentUser.invitation_code}
                  />
                </li>
              </ul>
            </div>
            <div className="avatar">
              <div className="title">头像</div>
              <Avatar alt={currentUser.nickname} src={currentUser.avatar} size={120}></Avatar>
              <div className="update">
                <Upload {...updateProps}>
                  <Button size="small" icon={<UploadOutlined />}>
                    更换头像
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
        </ProForm>
      </ConfigProvider>
    </PageContainer>
  );
};

export default PersonInfo;
