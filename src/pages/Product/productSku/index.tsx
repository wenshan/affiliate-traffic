import { PageContainer } from '@ant-design/pro-components';
import { Button, Image, Input, Table } from 'antd';
import React from 'react';
import { connect } from 'umi';

import './index.less';

const { TextArea } = Input;
const dataSource = [
  {
    id: '1',
    attribute_name: '胡彦斌',
    attribute_value: 32,
  },
  {
    id: '2',
    attribute_name: '胡彦祖',
    attribute_value: 42,
  },
];
const columns = [
  {
    title: '属性名称',
    dataIndex: 'attribute_name',
    key: 'attribute_name',
  },
  {
    title: '属性值',
    dataIndex: 'attribute_value',
    key: 'attribute_value',
  },
];

const ProductCreate: React.FC = (props) => {
  console.log('props:', props);
  return (
    <PageContainer>
      <div className="page">
        <div className="product-sku">
          <div className="content form-box">
            <div className="header"></div>
            <div className="form-item">
              <div className="line-box">
                <span className="label">
                  <i>*</i> 商品主图:
                </span>
                <Button type="primary" size="small">
                  添加主图
                </Button>
              </div>
              <div className="line-box main-img">
                <Image
                  width={250}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </div>
            </div>
            <div className="form-item">
              <div className="line-box">
                <span className="label">商品附加图片:</span>
                <Button type="primary" size="small">
                  添加附属图片
                </Button>
              </div>
              <div className="line-box">
                <div className="add-img-list">
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-item">
              <div className="line-box">
                <span className="label">添加商品详情:</span>
                <Button type="primary" size="small">
                  添加商品详情
                </Button>
              </div>
              <div className="line-box">
                <div className="add-img-list">
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                  <div className="add-img-item">
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-item">
              <span className="label">
                <i>*</i> 商品名称:
              </span>
              <Input placeholder="商品名称" style={{ width: 350 }} />
            </div>
            <div className="form-item">
              <span className="label">
                <i>*</i> 商品着陆页:
              </span>
              <Input placeholder="商品着陆页" style={{ width: 350 }} />
            </div>
            <div className="form-item">
              <span className="label">
                <i>*</i>商品价格:
              </span>
              <Input placeholder="价格" style={{ width: 120 }} /> <span className="unit">USD</span>
            </div>
            <div className="form-item">
              <span className="label">商品售卖价格:</span>
              <Input placeholder="售卖价格" style={{ width: 120 }} />{' '}
              <span className="unit">USD</span>
            </div>
            <div className="form-item">
              <span className="label" style={{ verticalAlign: 'top' }}>
                <i>*</i>商品描述:
              </span>
              <TextArea rows={4} style={{ width: 350 }} />
            </div>
            <div className="form-item">
              <span className="label">商品亮点:</span>
              <Input placeholder="商品亮点" style={{ width: 350 }} />
            </div>
            <div className="form-item">
              <span className="label">商品GTIN码:</span>
              <Input placeholder="商品GTIN码" style={{ width: 350 }} />
            </div>
            <div className="form-item">
              <div className="line-box">
                <span className="label" style={{ verticalAlign: 'top' }}>
                  商品属性:
                </span>
                <Button type="primary" size="small">
                  添加属性
                </Button>
              </div>
              <div className="line-box">
                <div className="table-box">
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    style={{ width: 350 }}
                  />
                </div>
              </div>
            </div>
            <div className="form-item">
              <span className="label">商品品牌名称:</span>
              <Input placeholder="品牌名称" style={{ width: 350 }} />
            </div>
            <div className="form-item">
              <span className="label">商品材料:</span>
              <Input placeholder="商品材料" style={{ width: 350 }} />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

const mapStateToProps = (state: { common: any; material: any; productSku: any }) => ({
  common: state.common,
  productSku: state.productSku,
});

export default connect(mapStateToProps)(ProductCreate);
