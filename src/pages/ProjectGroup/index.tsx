import { getUserEmail } from '@/services/api/api';
import {
  googleMerchantAccountGet,
  googleMerchantAccountInsert,
  queryProjectList,
  setDefault,
} from '@/services/api/googleAccount';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProForm,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Descriptions, Form, Input, Modal, Table, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import JsonView from 'react18-json-view';
const { Search } = Input;

import 'react18-json-view/src/style.css';
import './index.less';

export default () => {
  const formRef = useRef();
  const [form] = Form.useForm();
  const [formSearch] = Form.useForm<{ accountId: string; merchantId: string }>();
  const [userLoading, setUserLoading] = useState(false);
  const [modalAccount, setModalAccount] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [projectList, setProjectList] = useState({ rows: [] });
  const [userEmail, setUserEmail] = useState('');
  const [userInfoCurrent, setUserInfoCurrent] = useState();
  const [userTableList, setUserTableList] = useState([]);

  // 获取项目列表
  const queryProjectListFetch = async () => {
    const result = await queryProjectList();
    if (result && result.status === 200 && result.data) {
      setProjectList(result.data);
    } else {
      message.error(result.msg);
    }
  };

  const setDefaultStateFetch2 = async (accountId: any) => {
    const result = await setDefault({ accountId });
    if (result && result.status === 200 && result.data) {
      queryProjectListFetch();
      message.success('设置成功');
    }
  };

  const userTableListDel = (value: any) => {
    const newList: any[] = [];
    const userIdArr: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    userTableList &&
      userTableList.map((item: any) => {
        if (value !== item.email) {
          newList.push(item);
          userIdArr.push(item.id);
        }
      });
    const userIdStr = userIdArr.join(',');
    form.setFieldValue('user_ids', userIdStr);
    setUserTableList(newList);
  };

  const accountUpdate = (record: any) => {
    form.setFieldsValue(record);
    setModalAccount(true);
    // 用户列表
    setUserTableList(record.userList);
  };

  const columnsAccount = [
    {
      title: '账号ID',
      dataIndex: 'accountId',
      key: 'accountId',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '网站',
      dataIndex: 'websiteUrl',
      key: 'websiteUrl',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (_, record: any) => {
        return record.state ? '开启' : '关闭';
      },
    },
    {
      title: '操作',
      key: 'operate',
      render: (_, record: any) => {
        const html = [];
        html.push(
          <a
            onClick={() => {
              accountUpdate(record);
            }}
          >
            编辑
          </a>,
        );
        html.push(<span> | </span>);
        html.push(
          record.defaultState ? (
            '默认项目'
          ) : (
            <a onClick={() => setDefaultStateFetch2(record.accountId)}>设置默认为项目</a>
          ),
        );
        return html;
      },
    },
  ];
  const columnsUser = [
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '操作',
      key: 'operate',
      render: (_, record: any) => {
        return <a onClick={() => userTableListDel(record.email)}>删除</a>;
      },
    },
  ];

  // 插入子账号信息
  const googleAccountInsertFetch = async (value: { [key: string]: any } | undefined) => {
    const result = await googleMerchantAccountInsert(value);
    if (result && result.status === 200 && result.data) {
      queryProjectListFetch();
      message.info('创建项目成功！');
    } else {
      message.error(result.msg);
    }
  };

  // 获取值账号信息
  const googleMerchantAccountGetFetchSearch = async (value: any) => {
    const { merchantId, accountId } = value;
    const result = await googleMerchantAccountGet({ accountId, merchantId });
    if (result && result.status === 200 && result.data) {
      setAccountInfo(result.data);
      const formData = Object.assign({}, result.data, {
        accountId: result.data.id,
        state: true,
        defaultState: false,
      });
      form.setFieldsValue(formData);
    }
  };

  // user 查询用户信息
  const userEmailInfoFetchSearch = async (value: string) => {
    setUserLoading(true);
    const result = await getUserEmail({ email: value });
    if (result && result.status === 200 && result.data) {
      setUserInfoCurrent(result.data);
      setUserLoading(false);
    } else {
      setUserLoading(false);
      message.error(result.msg);
    }
  };
  // user 确认添加
  const userAddSubmit = () => {
    // setUserTableList userTableList userInfoCurrent
    if (userInfoCurrent) {
      const userIdArr: any[] = [];
      const obj = {};
      userTableList.forEach((item) => {
        obj[item.email] = Object.assign({}, item);
      });
      if (obj[userInfoCurrent.email]) {
        message.error('已经添加了此账号');
        return false;
      }
      userTableList.push(userInfoCurrent);
      const newUserTableList = JSON.parse(JSON.stringify(userTableList));
      setUserTableList(newUserTableList);
      setModalUser(false);
      // user_ids
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      newUserTableList &&
        newUserTableList.forEach((item: { id: any }) => {
          userIdArr.push(item.id);
        });
      const userIdStr = userIdArr.join(',');
      form.setFieldValue('user_ids', userIdStr);
    }
  };

  useEffect(() => {
    queryProjectListFetch();
  }, []);

  return (
    <PageContainer className="project-group">
      <div className="google-account">
        <div className="header">
          <h3>验证&查询 Google Merchant 账号信息</h3>
        </div>
        <div className="content">
          <div className="input">
            <ProForm
              form={formSearch}
              layout="inline"
              initialValues={{
                layout: 'inline',
              }}
              grid={true}
              rowProps={{ gutter: [16, 16] }}
              onFinish={async (value) => {
                googleMerchantAccountGetFetchSearch(value);
              }}
            >
              <ProFormText name="merchantId" label="Merchant ID" placeholder="input Merchant ID" />
              <ProFormText name="accountId" label="AccountId ID" placeholder="input AccountId ID" />
            </ProForm>
          </div>
          <div className="text"></div>
          <div className="account-info">
            <div className="data">{accountInfo && <JsonView src={accountInfo} />}</div>
          </div>
        </div>
        <div className="footer"></div>
      </div>
      <div className="table-box">
        <div className="button-new">
          <Button
            type="primary"
            onClick={() => {
              setModalAccount(true);
            }}
          >
            <PlusOutlined />
            新建项目
          </Button>
        </div>
        <Table
          dataSource={projectList && projectList.rows}
          columns={columnsAccount}
          pagination={false}
        />
      </div>

      <ModalForm
        open={modalAccount}
        onOpenChange={setModalAccount}
        onFinish={async (value) => {
          googleAccountInsertFetch(value);
          setModalAccount(false);
        }}
        formRef={formRef}
        autoFocusFirstInput
        form={form}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            required
            label="项目名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
            disabled
            rules={[{ required: true, message: '这是必填项' }]}
          />
          <ProFormText
            width="md"
            name="websiteUrl"
            label="商家的网站"
            placeholder="请输入网站"
            disabled
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="accountId"
            label="账户ID"
            placeholder="请输入网站ID"
            disabled
          />
          <ProFormSwitch
            name="state"
            checkedChildren="开启"
            unCheckedChildren="关闭"
            label="项目状态"
          ></ProFormSwitch>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="user_ids"
            label="项目管理员账号"
            placeholder="请输入用户ID','隔开"
            disabled
          />
        </ProForm.Group>
        <ProForm.Group>
          <div className="user-ids">
            <div className="header">
              <h3>项目管理员账号</h3>
              <a
                onClick={() => {
                  setModalUser(true);
                }}
              >
                添加用户
              </a>
            </div>
            <div className="table-box">
              <Table dataSource={userTableList} columns={columnsUser} pagination={false} />
            </div>
          </div>
        </ProForm.Group>
      </ModalForm>
      <Modal
        title="项目管理员账号"
        okText="确认添加此账号"
        width={600}
        open={modalUser}
        onCancel={() => {
          setModalUser(false);
        }}
        onOk={userAddSubmit}
      >
        <Search
          placeholder="input search email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          enterButton="查询用户"
          size="large"
          loading={userLoading}
          onSearch={userEmailInfoFetchSearch}
        />
        {userInfoCurrent && (
          <Descriptions title="用户信息">
            <Descriptions.Item label="Nickname">{userInfoCurrent.nickname}</Descriptions.Item>
            <Descriptions.Item label="Email">{userInfoCurrent.email}</Descriptions.Item>
            <Descriptions.Item label="项目ID">{userInfoCurrent.projectId}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </PageContainer>
  );
};
