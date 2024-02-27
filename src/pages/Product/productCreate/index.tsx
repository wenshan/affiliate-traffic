import React from 'react';
import { connect } from 'umi';

import './index.less';

const ProductCreate: React.FC = (props) => {
  console.log('props:', props);
  return (
    <div className="product-create">
      <div className="content">
        <div className="header">
          <h1>创建商品</h1>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { common: any; material: any; productCreate: any }) => ({
  common: state.common,
  productCreate: state.productCreate,
});

export default connect(mapStateToProps)(ProductCreate);
