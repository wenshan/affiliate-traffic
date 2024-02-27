import React from 'react';
import { connect } from 'umi';

import './index.less';

const Material: React.FC = (props) => {
  console.log('props:', props);
  return (
    <div className="material">
      <div className="content">
        <div className="header">
          <h1>商品列表</h1>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { common: any; material: any; productList: any }) => ({
  common: state.common,
  productList: state.productList,
});

export default connect(mapStateToProps)(Material);
