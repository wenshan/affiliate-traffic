import Footer from '@/components/Footer';
import { Button, Result } from 'antd';
import style from './index.less';

const Oauth: React.FC = () => {

  return (
    <div className={style.success}>
    <Result
      status="success"
      title="授权成功"
      subTitle="收取成功，请跳转 dashboard"
      extra={[
        <Button key="buy">欢迎页面</Button>,
      ]}
    ></Result>
      <Footer />
    </div>
  );
};

export default Oauth;
