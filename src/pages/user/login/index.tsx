import { Footer } from '@/components';
import { useIntl } from '@umijs/max';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

import './index.less';

const LoginInit: React.FC = () => {
  const intl = useIntl();
  const [type, setType] = useState<string>('login');
  return (
    <div className="container">
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <Tabs
          activeKey={type}
          onChange={setType}
          centered
          items={[
            {
              key: 'login',
              label: intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '账号密码登录',
              }),
            },
            {
              key: 'register',
              label: intl.formatMessage({
                id: 'pages.login.phoneLogin.tab',
                defaultMessage: '注册新账户',
              }),
            },
          ]}
        />
        {type === 'register' && <Register></Register>}
        {type === 'login' && <Login></Login>}
      </div>
      <Footer />
    </div>
  );
};

export default LoginInit;
