import Footer from '@/components/Footer';
import React from 'react';
import { connect } from 'umi';
import ImgList from './components/ImgList';
import UploadFile from './components/UploadFile';

import './index.less';

const Material: React.FC = (props) => {
  console.log('props:', props);
  return (
    <div className="material">
      <div className="content">
        <div id="buttonDiv"></div>
        <div className="header">
          <UploadFile></UploadFile>
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
