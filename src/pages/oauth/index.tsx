import { connect } from 'umi';
import Footer from '@/components/Footer';
import { Button, Result } from 'antd';
import style from './index.less';

const Oauth: React.FC = () => {
  // const homeData = useSelector((state: any) => state.common.oauth2Github);
  // const dispatch = useDispatch();
  // console.log('homeData:', homeData);
  return (
    <div className={style.oauth}>
    <Result
      status="info"
      title="授权中..."
      subTitle="授权中请稍等..."
      extra={[
        <Button key="buy">返回主页面</Button>,
      ]}
    ></Result>
      <Footer />
    </div>
  );
};

// export default Oauth;

const mapStateToProps = (state: { home: any; }) => ({
  home: state.home
});

export default connect(mapStateToProps)(Oauth);
