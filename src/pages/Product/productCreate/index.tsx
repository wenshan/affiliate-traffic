import { PageContainer } from '@ant-design/pro-components';
import { Button, Input, Radio, Select } from 'antd';
import React from 'react';
import { connect } from 'umi';

import './index.less';

const ProductCreate: React.FC = (props) => {
  console.log('props:', props);
  return (
    <PageContainer>
      <div className="page">
        <div className="product-create">
          <div className="header"></div>

          <div className="content form-box">
            <div className="form-item">
              <span className="label">
                <i>*</i> 选择对应的语言:
              </span>
              <Radio.Group value="en">
                <Radio value="en"> 英语 </Radio>
                <Radio value="jp"> 日语 </Radio>
                <Radio value="kor"> 韩语 </Radio>
              </Radio.Group>
            </div>
            <div className="form-item">
              <span className="label">
                <i>*</i> 选择产品管理分类:
              </span>
              <Select
                defaultValue="1"
                style={{ width: 120 }}
                options={[
                  { value: '1', label: 'Jack' },
                  { value: '2', label: 'Lucy' },
                  { value: '3', label: 'yiminghe' },
                  { value: '4', label: 'Disabled', disabled: true },
                ]}
              />
              <span className="operate">
                <Button type="primary" size="small">
                  管理产品分类
                </Button>
              </span>
            </div>
            <div className="form-item">
              <span className="label">
                <i>*</i> 选择对应的货币单位:
              </span>
              <Select
                defaultValue="USD"
                style={{ width: 120 }}
                options={[
                  { value: 'USD', label: '美元' },
                  { value: 'JPY', label: '日元' },
                  { value: 'EUR', label: '欧元' },
                  { value: 'GPB', label: '英镑' },
                  { value: 'KRW', label: '韩元' },
                  { value: 'CAD', label: '加拿大' },
                  { value: 'AUD', label: '澳大利亚' },
                ]}
              />
            </div>
            <div className="form-item">
              <span className="label">
                <i>*</i> 选择Google 商品类目:
              </span>
              <Input placeholder="选择Google 商品类目" style={{ width: 350 }} />
              <span className="operate">
                <Button type="primary" size="small">
                  商品类目
                </Button>
              </span>
            </div>
            <div className="form-item">
              <span className="label"></span>
              <Button type="primary" size="large">
                创建SKU商品详情
              </Button>
            </div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    </PageContainer>
  );
};

const mapStateToProps = (state: { common: any; material: any; productCreate: any }) => ({
  common: state.common,
  productCreate: state.productCreate,
});

export default connect(mapStateToProps)(ProductCreate);
