import { connect } from 'umi';
import React, { Component } from 'react';
import Footer from '@/components/Footer';
import { Button, Result } from 'antd';
import style from './index.less';

const Oauth: React.FC = (props) => {
  console.log('props:', props);
  return (
    <div className={style.oauth}>
      <Result
        status="info"
        title="授权中..."
        subTitle="授权中请稍等..."
        extra={[<Button key="buy">返回主页面</Button>]}
      ></Result>
      <Footer />
    </div>
  );
};

// export default Oauth;

const mapStateToProps = (state: { common: any }) => ({
  common: state.common,
});

export default connect(mapStateToProps)(Oauth);
