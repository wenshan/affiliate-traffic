import { getOAuthUrl, googleGetToken, login } from '@/services/api/login';
import {
  AlipayCircleOutlined,
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, useModel, useSearchParams } from '@umijs/max';
import { Alert, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

import './index.less';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '26px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    action_google: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '28px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const ActionIcons = () => {
  const { styles } = useStyles();

  const googleAuthLoginButton = async () => {
    const result = await getOAuthUrl();
    if (result && result.status === 200 && result.data && result.data.url) {
      window.location.href = result.data.url;
    } else {
      message.info('授权登录失败');
    }
  };

  return (
    <>
      <GoogleOutlined
        key="GoogleOutlined"
        className={styles.action_google}
        onClick={googleAuthLoginButton}
      />
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} />
    </>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({
    status: 200,
  });
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();

  const state = searchParams.get('state');
  const code = searchParams.get('code');

  const fetchUserInfoHandler = async () => {
    if (initialState && initialState.fetchUserInfo) {
      const userInfo = await initialState?.fetchUserInfo?.();
      console.log('userInfo:', userInfo);
      if (userInfo) {
        flushSync(() => {
          setInitialState((s: any) => ({
            ...s,
            currentUser: userInfo,
          }));
        });
      }
    } else {
      message.error('资源依赖加载失败，请重试！');
    }
  };

  const getOAuth2UserInfo = async () => {
    if (state && code) {
      const result = await googleGetToken({ state, code });
      if (result && result.status === 200 && result.data) {
        message.success(result.msg || '登录成功！');
        await fetchUserInfoHandler();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/Welcome');
        return;
      } else {
        setUserLoginState(result);
      }
    }
  };

  useEffect(() => {
    getOAuth2UserInfo();
  }, [state, code]);

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const result = await login(values);
      if (result && result.status === 200 && result.data) {
        message.success(result.msg || '登录成功！');
        await fetchUserInfoHandler();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/Welcome');
        return;
      } else {
        setUserLoginState(result);
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  const { status, msg } = userLoginState;
  return (
    <div className={styles.container}>
      <div>
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={
            <img
              alt="logo"
              src="https://affiliate-traffic.oss-cn-hongkong.aliyuncs.com/gtraffic/gtraffic_500_260.png"
            />
          }
          subTitle="Gtraffic 联盟流量管理平台"
          initialValues={{
            auto_Login: false,
          }}
          actions={['其他登录方式', <ActionIcons key="icons" />]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {status !== 200 && msg && <LoginMessage content={JSON.stringify(msg)} />}
          {
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                placeholder="Email"
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          }
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="auto_Login">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
