import DefaultProject from '@/components/DefaultProject';
import { getUserEmail } from '@/services/api/api';
import {
  googleMerchantAccountGet,
  googleMerchantAccountInsert,
  queryProjectList,
  setDefault,
  updateProject,
} from '@/services/api/googleAccount';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Input,
  Modal,
  Row,
  Switch,
  Table,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import JsonView from 'react18-json-view';
const { Search } = Input;

import 'react18-json-view/src/style.css';
import './index.less';

type objType = {
  [key: string]: any;
};
const initGMCAccount = {
  merchantId: '',
  accountId: '',
};
const initAccountInfo = {
  accountId: '',
  name: '',
  merchantId: '',
  projectId: '',
  websiteUrl: '',
  state: false,
  user_ids: '',
};

export default () => {
  const [optionAction, setOptionAction] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [gmcAccount, setGmcAccount] = useState(initGMCAccount);

  // 新建项目的浮层状态
  const [modalProjectAccountState, setModalProjectAccountState] = useState(false);
  // 添加用户浮层
  const [modalUser, setModalUser] = useState(false);
  // 项目信息
  const [accountInfo, setAccountInfo] = useState(initAccountInfo);

  const [projectList, setProjectList] = useState({ rows: [] });
  const [userEmail, setUserEmail] = useState('');
  const [userInfoCurrent, setUserInfoCurrent] = useState<any>({});
  const [userTableList, setUserTableList] = useState<any>([]);

  // 获取项目列表
  const queryProjectListFetch = async () => {
    const result = await queryProjectList();
    if (result && result.status === 200 && result.data) {
      setProjectList(result.data);
    } else {
      message.error(result.msg);
    }
  };

  const setDefaultStateFetch = async (accountId: any) => {
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
    const newAccountInfo = Object.assign({}, accountInfo, { user_ids: userIdStr });
    setAccountInfo(newAccountInfo);
    setUserTableList(newList);
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
      title: '项目ID',
      dataIndex: 'projectId',
      key: 'projectId',
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
      render: (_: any, record: any) => {
        return record.state ? '开启' : '关闭';
      },
    },
    {
      title: '操作',
      key: 'operate',
      render: (_: any, record: any) => {
        const html = [];
        html.push(
          <a
            key={`${record.projectId}_edit`}
            onClick={() => {
              setOptionAction(true);
              setModalProjectAccountState(true);
              setAccountInfo(record);
              setUserTableList(record.userList);
            }}
          >
            编辑
          </a>,
        );
        html.push(<span key={`${record.projectId}_span`}> | </span>);
        html.push(
          record.defaultState ? (
            '默认项目'
          ) : (
            <a
              key={`${record.projectId}_default`}
              onClick={() => setDefaultStateFetch(record.accountId)}
            >
              设置默认为项目
            </a>
          ),
        );
        return html;
      },
    },
  ];
  const columnsUser = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
    },
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
      render: (_: any, record: any) => {
        return (
          <a key={record.email} onClick={() => userTableListDel(record.email)}>
            删除
          </a>
        );
      },
    },
  ];

  // 获取值账号信息
  const googleMerchantAccountGetFetchSearch = async (value: any) => {
    const { merchantId, accountId } = value;
    const result = await googleMerchantAccountGet({ accountId, merchantId });
    if (result && result.status === 200 && result.data) {
      setAccountInfo(result.data);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      result && result.msg && message.error(result.msg);
    }
  };
  // 添加 user 数据
  const userAddAdminSubmit = () => {
    if (userInfoCurrent) {
      const userIdArr: any[] = [];
      const obj: objType = {};
      userTableList.forEach((item: { email: string | number }) => {
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
      const newAccountInfo = Object.assign({}, accountInfo, { user_ids: userIdStr });
      setAccountInfo(newAccountInfo);
    }
  };
  // 添加编辑/创建项目
  const userAddProjectSubmit = async () => {
    const { accountId, name, websiteUrl, user_ids } = accountInfo;
    if (name && websiteUrl && user_ids && accountId) {
      if (optionAction) {
        // 编辑
        setUserLoading(true);
        const result = await updateProject(accountInfo);
        if (result && result.status === 200 && result.data) {
          await queryProjectListFetch();
          message.info('项目更新成功');
          setUserLoading(false);
          setModalProjectAccountState(false);
          await queryProjectListFetch();
        } else {
          message.error('接口请求错误');
        }
      } else {
        // 新增加
        setUserLoading(true);
        const result = await googleMerchantAccountInsert(accountInfo);
        if (result && result.status === 200 && result.data) {
          await queryProjectListFetch();
          message.info('创建项目成功！');
          setUserLoading(false);
          setModalProjectAccountState(false);
          await queryProjectListFetch();
        } else {
          message.error('接口请求错误');
        }
      }
    } else {
      message.error('缺少参数');
    }
  };
  // 取消
  const userAddProjectCancel = () => {
    setModalProjectAccountState(false);
  };
  // switchStat
  const switchStateOnChange = (checked: boolean) => {
    const newAccountInfo = Object.assign({}, accountInfo, { state: checked });
    setAccountInfo(newAccountInfo);
  };

  // switchStat
  const inputAccountInfoOnChange = (name: string, event: any) => {
    const { value } = event.target;
    const temp: any = {};
    temp[name] = value;
    const newAccountInfo = Object.assign({}, accountInfo, temp);
    setAccountInfo(newAccountInfo);
  };

  // google-account
  const googleAccountInput = (name: string, event: any) => {
    const { value } = event.target;
    const temp: any = {};
    temp[name] = value;
    const newGmcAccount = Object.assign({}, gmcAccount, temp);
    setGmcAccount(newGmcAccount);
  };
  // button
  const googleAccountSearch = async () => {
    await googleMerchantAccountGetFetchSearch(gmcAccount);
  };
  const googleAccountRestart = () => {
    setGmcAccount(initGMCAccount);
  };

  useEffect(() => {
    queryProjectListFetch();
  }, []);

  return (
    <PageContainer className="project-group">
      <div className="google-account">
        <DefaultProject></DefaultProject>
        <div className="header">
          <h3>验证&查询 Google Merchant 账号信息</h3>
        </div>
        <div className="content">
          <div className="input">
            <div className="account-search">
              <Row>
                <Col span={14}>
                  <div>
                    <span className="label">Merchant ID</span>
                    <Input
                      onChange={(event) => googleAccountInput('merchantId', event)}
                      key="merchantId"
                      name="merchantId"
                      placeholder="input Merchant ID"
                    />
                  </div>
                  <div>
                    <span className="label">AccountId ID</span>
                    <Input
                      onChange={(event) => googleAccountInput('accountId', event)}
                      key="accountId"
                      name="accountId"
                      placeholder="input AccountId ID"
                    />
                  </div>
                </Col>
                <Col span={10}>
                  <div className="button">
                    <Button type="primary" icon={<SearchOutlined />} onClick={googleAccountSearch}>
                      查询
                    </Button>{' '}
                    <Button onClick={googleAccountRestart}>重置</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="text"></div>
          <div className="account-info">
            <div className="data">{accountInfo.name && <JsonView src={accountInfo} />}</div>
          </div>
        </div>
        <div className="footer"></div>
      </div>
      <Divider></Divider>
      <div className="table-box">
        <div className="button-new">
          <Button
            type="primary"
            onClick={() => {
              setOptionAction(false);
              setModalProjectAccountState(true);
              setAccountInfo(initAccountInfo);
              setUserTableList([]);
            }}
          >
            <PlusOutlined />
            新建项目
          </Button>
        </div>
        <Table
          key="xjxm"
          rowKey={(record) => record.accountId}
          dataSource={projectList && projectList.rows}
          columns={columnsAccount}
          pagination={false}
        />
      </div>

      <Modal
        open={modalProjectAccountState}
        title={`${optionAction ? '编辑项目信息' : '创建新项目'}`}
        width={750}
        onCancel={userAddProjectCancel}
        onOk={userAddProjectSubmit}
      >
        <div className="box">
          <span className="label">项目名称</span>
          <Input
            width="md"
            name="name"
            placeholder="请输入名称"
            value={accountInfo.name}
            onChange={(event) => inputAccountInfoOnChange('name', event)}
          />
          <span className="label">商家的网站</span>
          <Input
            width="md"
            name="websiteUrl"
            placeholder="请输入网站"
            value={accountInfo.websiteUrl}
            onChange={(event) => inputAccountInfoOnChange('websiteUrl', event)}
          />
        </div>
        <Divider></Divider>
        <div className="box">
          <span className="label">账户ID</span>
          <Input
            width="md"
            name="accountId"
            placeholder="请输入网站ID"
            value={accountInfo.accountId}
            onChange={(event) => inputAccountInfoOnChange('accountId', event)}
          />
          <span className="label">项目状态</span>
          <Switch
            onChange={switchStateOnChange}
            checkedChildren="开启"
            unCheckedChildren="关闭"
          ></Switch>
        </div>
        <div className="box">
          <span className="label">项目管理员账号</span>
          <Input
            width="md"
            name="user_ids"
            placeholder="请输入用户ID','隔开"
            value={accountInfo.user_ids}
            disabled={true}
            onChange={(event) => inputAccountInfoOnChange('user_ids', event)}
          />
        </div>
        <Divider></Divider>
        <div>
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
              <Table
                key="yhlb"
                rowKey={(record) => record.email}
                dataSource={userTableList}
                columns={columnsUser}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="项目管理员账号"
        okText="确认添加此账号"
        width={600}
        open={modalUser}
        onCancel={() => {
          setModalUser(false);
        }}
        onOk={userAddAdminSubmit}
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
            <Descriptions.Item key="ID" label="ID">
              {userInfoCurrent.id}
            </Descriptions.Item>
            <Descriptions.Item key="Nickname" label="Nickname">
              {userInfoCurrent.nickname}
            </Descriptions.Item>
            <Descriptions.Item key="Email" label="Email">
              {userInfoCurrent.email}
            </Descriptions.Item>
            <Descriptions.Item key="xmid" label="项目ID">
              {userInfoCurrent.projectId}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </PageContainer>
  );
};
