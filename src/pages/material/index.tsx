import { connect } from 'umi';
import React from 'react';
import Footer from '@/components/Footer';
import ImgList from './components/ImgList';
import UploadFile from './components/UploadFile';
import UploadDirectory from './components/UploadDirectory';

import './index.less';

const Material: React.FC = (props) => {
  console.log('props:', props);
  return (
    <div className="material">
      <div className="content">
        <div className="header">
          <UploadFile></UploadFile>
          <UploadDirectory></UploadDirectory>
        </div>
        <ImgList></ImgList>
      </div>
      <Footer></Footer>
    </div>
  );
};

const mapStateToProps = (state: { common: any; material: any }) => ({
  common: state.common,
  material: state.material,
});

export default connect(mapStateToProps)(Material);
