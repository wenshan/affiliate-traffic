import { connect } from 'umi';
import React, { Component } from 'react';
import Footer from '@/components/Footer';
import { Button, Result } from 'antd';
import style from './index.less';

const UploadFile: React.FC = (props) => {
  console.log('props:', props);
  return (
    <div className={style.uploadfile}>
      <div className="content"></div>
      <Footer />
    </div>
  );
};

export default UploadFile;
