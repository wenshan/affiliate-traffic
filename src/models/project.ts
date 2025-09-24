/* eslint-disable */
/* @ts-ignore */
import { queryProjectList, setDefault } from '@/services/api/googleAccount';
import { message } from 'antd';
import { useState } from 'react';

function Project() {
  const [formSearch, setFormSearch] = useState<{ accountId: string; merchantId: string }>();
  const [userLoading, setUserLoading] = useState(false);
  const [modalAccount, setModalAccount] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
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
    // form.setFieldValue('user_ids', userIdStr);
    setUserTableList(newList);
  };

  const accountUpdate = (record: any) => {
    // form.setFieldsValue(record);
    setModalAccount(true);
    // 用户列表
    setUserTableList(record.userList);
  };
  return {
    queryProjectListFetch,
    userTableListDel,
    accountUpdate,
  };
}
export default Project;
