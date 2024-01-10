import Footer from '@/components/Footer';
import { Button, Result } from 'antd';
import style from './index.less';

const Oauth: React.FC = () => {

  return (
    <div className={style.failure}>
    <Result
      status="warning"
      title="授权失败"
      subTitle="返回授权页面重试"
      extra={[
        <Button key="buy">授权页面</Button>,
      ]}
    ></Result>
      <Footer />
    </div>
  );
};

export default Oauth;
