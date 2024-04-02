import { PageContainer } from '@ant-design/pro-components';
import { Component } from 'react';
import { connect } from 'umi';

import './index.less';

@connect(({ product, common, material }) => ({
  product,
  common,
  material,
}))
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <PageContainer>
        <div className="page">
          <div className="product-create">
            <div className="header"></div>
          </div>
        </div>
      </PageContainer>
    );
  }
}

export default ProductList;
