import { connect } from 'umi';
import React, { Component } from 'react';
import Footer from '@/components/Footer';
import { Button, Result } from 'antd';
import ImgList from './components/ImgList';

import style from './index.less';

const Material: React.FC = (props) => {
  console.log('props:', props);
  return (
    <div className={style.material}>
      <div className="content">
        <ImgList></ImgList>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: { common: any; material: any }) => ({
  common: state.common,
  material: state.material,
});

export default connect(mapStateToProps)(Material);
