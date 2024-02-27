import React from 'react';
import { connect } from 'umi';

import './index.less';

const ProductEdit: React.FC = (props) => {
  console.log('props:', props);
  return (
    <div className="material">
      <div className="content">
        <div className="header">
          <h1>编辑商品</h1>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { common: any; material: any; productEdit: any }) => ({
  common: state.common,
  productEdit: state.productEdit,
});

export default connect(mapStateToProps)(ProductEdit);
