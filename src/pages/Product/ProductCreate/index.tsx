import DefaultProject from '@/components/DefaultProject';
import {
  defaultCurrentProductMain,
  defaultProductDetail,
  languageOptionDropdown,
} from '@/constant/defaultCurrentData';
import { DownOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Modal, Space, Table, Tag } from 'antd';
import { JSX, useEffect, useState } from 'react';
import CreateMainModal from '../components/CreateMainModal';

import './index.less';

type GoogleProductCategory = {
  key: string;
  title: string;
  [key: string]: any;
};

type ProductType = {
  id: number;
  key: React.Key;
  title_zh: string;
  title_en: string;
  title_ja: string;
  title_ko: string;
  projectId: string;
  [key: string]: any;
};

type ProductMainDetailType = {
  title_main: string;
  imgSrc: string;
  offer_id: string;
  google_product_category: string | GoogleProductCategory;
  google_product_category_id: string;
  product_type: Array<ProductType>;
  product_type_id: string;
  gtin: string;
  brand: string;
  projectId: string;
  identifierExists: boolean;
  costPrice: string;
  preSalePrice: string;
  costFirstLegFreightRatio: number;
  costFbaRatio: number;
  costsAdvertisingRatio: number;
  targetProfitRatio: number;
  summaryKeywords: string;
  [key: string]: any;
};
function ProductCreate() {
  const {
    productMainDetail,
    setProductMainDetail,
    delProductMainFetch,
    queryProductMainListFetch,
    productMainList,
    setCreateMainModalStatus,
    paginationParams,
    setProductTypeName,
    shoppingCostsExchangeQuery,
  } = useModel('productMainModel');
  const { setProductDetail } = useModel('productCreateProductSkuModel');
  const [currentOptionActionStatus, setCurrentOptionActionStatus] = useState(false);

  const createMainModalStatusHandle = () => {
    setCurrentOptionActionStatus(false);
    setCreateMainModalStatus(true);
    // @ts-ignore
    setProductMainDetail(defaultCurrentProductMain);
    setProductDetail(defaultProductDetail);
  };

  const createMainModalCallbackOk = async (currentProductMain: any) => {
    setProductMainDetail(currentProductMain);
    setProductTypeName('');
    await queryProductMainListFetch(paginationParams);
  };

  // table
  const handelTableCreateSku = (e: { key: any }, record: { id: any }) => {
    setProductDetail(defaultProductDetail);
    history.push(
      `/product/productCreateSku?product_main_id=${record.id}&language=${e.key}&product_sku_option_status=0`,
    );
  };

  const handelTableEdit = (record: ProductMainDetailType) => {
    const newCurrentProductMain = Object.assign({}, productMainDetail, record);
    const productTypeNameArr: string[] = [];
    if (
      newCurrentProductMain &&
      newCurrentProductMain.product_type &&
      newCurrentProductMain.product_type.length > 0
    ) {
      newCurrentProductMain.product_type.forEach((item: ProductType) => {
        productTypeNameArr.push(item.title_zh);
      });
    }
    const productTypeNameStr: string = (productTypeNameArr && productTypeNameArr.join(',')) || '';
    setProductMainDetail(newCurrentProductMain);
    setCurrentOptionActionStatus(true);
    setCreateMainModalStatus(true);
    setProductTypeName(productTypeNameStr);
  };

  const handelTableDel = (record: ProductMainDetailType) => {
    Modal.confirm({
      title: '确认删除',
      content: '删除当前的主产品信息，所包含的多语言产品数据一并删除。',
      onOk: async () => {
        await delProductMainFetch(record);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handelTablePagination = async (page: number, pageSize: number) => {
    const updatePagination = Object.assign({}, paginationParams, { current: page, pageSize });
    await queryProductMainListFetch(updatePagination);
  };

  const items: MenuProps['items'] = languageOptionDropdown;

  const tableColumnsMain = () => {
    return [
      {
        title: '商品名称',
        dataIndex: 'title_main',
        key: 'title_main',
      },
      {
        title: '商品货号',
        dataIndex: 'offer_id',
        key: 'offer_id',
      },
      {
        title: 'Google商品类目',
        dataIndex: 'google_product_category',
        key: 'google_product_category',
        render: (text: any, record: any) => {
          return record.google_product_category.title || '-';
        },
      },
      {
        title: '自定义商品分类',
        dataIndex: 'product_type',
        key: 'product_type',
        render: (text: any, record: any) => {
          const txt: JSX.Element[] = [];
          if (record.product_type && record.product_type.length) {
            record.product_type.forEach((item: any) => {
              if (item.title_zh) {
                txt.push(<Tag>{item.title_zh}</Tag>);
              }
            });
          }
          return txt;
        },
      },
      {
        title: '商品GTIN码',
        dataIndex: 'gtin',
        key: 'gtin',
      },
      {
        title: '品牌名称',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: 'Gtin码是否相关',
        dataIndex: 'identifierExists',
        key: 'identifierExists',
        render: (_: any, record: any) => {
          return <span>{record.identifierExists ? '是' : '否'}</span>;
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text: any, record: any) => {
          return (
            <div className="operate">
              <Dropdown
                menu={{
                  items,
                  onClick: (e) => handelTableCreateSku(e, record),
                }}
              >
                <Button size="small">
                  <Space>
                    创建多语言SKU商品
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <div className="button-wrap">
                <Button
                  size="small"
                  onClick={() => {
                    handelTableEdit(record);
                  }}
                >
                  编辑
                </Button>
                <span className="line">|</span>
                <Button
                  size="small"
                  onClick={() => {
                    handelTableDel(record);
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          );
        },
      },
    ];
  };

  useEffect(() => {
    shoppingCostsExchangeQuery();
    queryProductMainListFetch(paginationParams);
  }, []);

  return (
    <>
      <PageContainer>
        <div className="page">
          <div className="product-create">
            <DefaultProject></DefaultProject>
            <div className="header">
              <div className="creat-button">
                <Button type="primary" size="large" onClick={createMainModalStatusHandle}>
                  创建主商品
                </Button>
              </div>
            </div>
            <div className="content">
              <Table
                rowKey={(record) => record.id}
                dataSource={productMainList}
                columns={tableColumnsMain()}
                pagination={{
                  position: ['bottomRight'],
                  current: paginationParams.current,
                  pageSize: paginationParams.pageSize,
                  total: paginationParams.total,
                  onChange: handelTablePagination,
                }}
              />
            </div>
            <div className="footer">
              <CreateMainModal
                callbackOk={createMainModalCallbackOk}
                optionAction={currentOptionActionStatus}
              ></CreateMainModal>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export default ProductCreate;
