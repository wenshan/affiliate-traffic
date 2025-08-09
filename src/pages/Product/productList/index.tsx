import DefaultProject from '@/components/DefaultProject';
import ResizeImg from '@/constant/resizeImg';
import Tool from '@/utils/tool';
import { SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Modal,
  Pagination,
  Row,
  Select,
  Spin,
  Table,
  TableProps,
  message,
} from 'antd';
import { JSX, Key, useEffect } from 'react';
import { history, useModel } from 'umi';

import './index.less';

type ExpandableConfig<T extends object> = TableProps<T>['expandable'];

interface DataType {
  [key: string]: any;
}

function ProductList() {
  const {
    onLoading,
    initQueryParams,
    pagePagination,
    setPagePagination,
    pageCurrent,
    setPageCurrent,
    searchParams,
    setSearchParams,
    setProductDetail,
    shoppingProductInsertFetch,
    delProductFetch,
    queryProductAllFetch,
    queryProductMainOfferIdFetch,
    productList,
    productMainOfferIds,
  } = useModel('productList');
  const searchLanguageSelectHandle = (value: any) => {
    const newSearchParams = Object.assign({}, searchParams, { language: value });
    setSearchParams(newSearchParams);
  };
  const searchProductOfferIdHandle = (value: any) => {
    const newSearchParams = Object.assign({}, searchParams, { offer_id: value });
    setSearchParams(newSearchParams);
  };

  const handelTableEdit = (record: any) => {
    console.log(record);
    if (record) {
      setProductDetail(record);
      history.push(
        `/product/productCreateSku?product_main_id=${record.product_main_id}&product_id=${record.product_id}&language=${record.language}&product_sku_option_status=1`,
      );
    }
  };

  // 同步google 购物
  const handelGoogleMerchantUpdate = async (data: any) => {
    if (data.googleAccess) {
      if (data && data.id) {
        await shoppingProductInsertFetch(data);
      }
    } else {
      message.info('无权限，同步google merchant需要项目管理者权限。');
    }
  };

  const handelTableDel = (record: any) => {
    Modal.confirm({
      title: '确认删除',
      content: '删除当前的SKU',
      onOk: async () => {
        await delProductFetch(record);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 翻页
  const handelTablePagination = async (page: any) => {
    console.log('page:', page);
    setPageCurrent(page);
    const newPagination = Object.assign({}, pagePagination, { current: Number(page) });
    setPagePagination(newPagination);
    await queryProductAllFetch();
  };

  const searchProductTypeSelectHandle = (value: any) => {
    const newSearchParams = Object.assign({}, searchParams, { product_type_id: value });
    setSearchParams(newSearchParams);
  };
  // 检索
  const handelSearchParamsButton = async () => {
    const newPagination = Object.assign({}, pagePagination, { current: 1 });
    setPagePagination(newPagination);
    await queryProductAllFetch();
  };

  const initPageParams = async () => {
    await initQueryParams();
    await queryProductAllFetch();
    await queryProductMainOfferIdFetch();
  };

  const columnsSaleSkus = () => {
    return [
      {
        title: '售卖规格',
        dataIndex: 'saleType',
        key: 'saleType',
      },
      {
        title: '规则名称',
        dataIndex: 'saleValue',
        key: 'saleValue',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: (_: any, record: any) => {
          const html: any = [];
          if (record && record.price && record.monetary_unit) {
            html.push(
              <span
                key={`${record.price}_price`}
              >{`价格: ${record.price} ${record.monetary_unit}`}</span>,
            );
          } else {
            html.push(<span>-</span>);
          }
          if (record && record.sale_price && record.sale_price && record.monetary_unit) {
            html.push(
              <span
                key={`${record.sale_price}_salePrice`}
              >{`促销: ${record.sale_price} ${record.monetary_unit}`}</span>,
            );
          } else {
            html.push(<span>-</span>);
          }
          if (record && record.discount && record.discount && record.monetary_unit) {
            html.push(
              <span key={`${record.discount}_discount`}>{`折扣: ${record.discount}%`}</span>,
            );
          } else {
            html.push(<span>-</span>);
          }
          return html;
        },
      },
      {
        title: '库存',
        dataIndex: 'availability',
        key: 'availability',
        width: 60,
        render: (_, record: any) => {
          if (record.availability === 'in_stock') {
            return '有';
          } else {
            return '无';
          }
        },
      },
    ];
  };

  const defaultExpandable: ExpandableConfig<DataType> = {
    expandedRowRender: (record: DataType) => (
      <Table
        rowKey={(record) => `${record.id}_${record.language}_${record.product_id}`}
        dataSource={record.saleSkus}
        columns={columnsSaleSkus()}
      />
    ),
  };

  useEffect(() => {
    initPageParams();
  }, []);

  const tableColumns = [
    {
      title: '主图',
      dataIndex: 'image_link',
      key: 'image_link',
      fixed: 'left',
      width: 60,
      render: (_: any, record: any) => {
        if (record && record.image_link) {
          return <img src={`${record.image_link}${ResizeImg['w_100']}`} width={50}></img>;
        } else {
          return '-';
        }
      },
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      width: 120,
    },
    {
      title: '货号',
      dataIndex: 'offer_id',
      key: 'offer_id',
      fixed: 'left',
      width: 90,
      render: (_: any, record: any) => {
        return (
          <p>
            {record.offer_id}
            <br></br>
            {record.product_id}
          </p>
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 220,
      render: (_: any, record: any) => {
        if (record && record.description) {
          return (
            <div
              className="table-text clearfix"
              dangerouslySetInnerHTML={{ __html: record.description ? record.description : '' }}
            />
          );
        } else {
          return '-';
        }
      },
    },
    {
      title: 'GTIN',
      dataIndex: 'gtin',
      key: 'gtin',
      width: 90,
    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
      width: 60,
      render: (_: any, record: any) => {
        const html: any = [];
        if (record.link) {
          html.push(
            <a
              key={`${record.link}_link`}
              href={record.link}
              title={record.link}
              target="_blank"
              rel="noreferrer"
            >
              link
            </a>,
          );
        }
        if (record.mobile_link) {
          html.push(
            <a
              key={`${record.mobile_link}_mobileLink`}
              href={record.mobile_link}
              title={record.mobile_link}
              target="_blank"
              rel="noreferrer"
            >
              mobileLink
            </a>,
          );
        }
        if (!record.link && !record.mobile_link) {
          html.push(<span>-</span>);
        }
        return html;
      },
    },
    {
      title: 'Google类目',
      dataIndex: 'google_product_category',
      key: 'google_product_category',
      width: 110,
      render: (_: any, record: any) => {
        if (record.google_product_category && record.google_product_category.title) {
          return record.google_product_category.title;
        } else {
          return '-';
        }
      },
    },
    {
      title: '附加图片',
      dataIndex: 'additional_image_link',
      key: 'additional_image_link',
      width: 200,
      render: (_: any, record: { additional_image_link: string[] }) => {
        const html: JSX.Element[] = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        record &&
          Tool.isArray(record.additional_image_link) &&
          record.additional_image_link.length &&
          record.additional_image_link.map((item: string, idx: Key) => {
            html.push(
              <img key={`${idx}_${item}`} src={`${item}${ResizeImg['w_50']}`} width={50}></img>,
            );
          });
        return html;
      },
    },
    {
      title: '详情图',
      dataIndex: 'lifestyle_image_link',
      key: 'lifestyle_image_link',
      width: 190,
      render: (_: any, record: { lifestyle_image_link: string[] }) => {
        const html: JSX.Element[] = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        record &&
          Tool.isArray(record.lifestyle_image_link) &&
          record.lifestyle_image_link.length > 0 &&
          record.lifestyle_image_link.map((item: string, idx: Key) => {
            html.push(
              <img key={`${idx}_${item}`} src={`${item}${ResizeImg['w_50']}`} width={30}></img>,
            );
          });
        return html;
      },
    },
    {
      title: '尺寸',
      dataIndex: 'size',
      key: 'size',
      width: 200,
      render: (_: any, record: any) => {
        if (record.size && record.size_type && record.size_system) {
          return (
            <>
              <p>{`尺寸: ${record.size}`}</p>
              <p>{`尺码类型: ${record.size_type} 尺码体系: ${record.size_system}`}</p>
            </>
          );
        } else {
          return '-';
        }
      },
    },
    {
      title: '商品尺寸',
      dataIndex: 'product_size',
      key: 'product_size',
      width: 200,
      render: (_: any, record: any) => {
        if (record.productHeight && record.productLength && record.sizeUnit) {
          return (
            <>
              <p>{`LWH: ${record.productLength}x${record.productWidth}x${record.productHeight} ${record.sizeUnit}`}</p>
              <p>{`W: ${record.productWeight} ${record.weightUnit}`}</p>
            </>
          );
        } else {
          return '-';
        }
      },
    },
    {
      title: '适用人群',
      dataIndex: 'age_group',
      key: 'age_group',
      width: 120,
      render: (_: any, record: any) => {
        if (record.age_group && record.gender) {
          return (
            <>
              <p>{`年龄: ${record.age_group}`}</p>
              <p>{`性别: ${record.gender}`}</p>
            </>
          );
        } else {
          return '-';
        }
      },
    },
    {
      title: '商品属性',
      dataIndex: 'product_detail',
      key: 'product_detail',
      width: 200,
      render: (_: any, record: any) => {
        // return JSON.stringify(record.product_detail);
        const html: JSX.Element[] = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        record.product_detail &&
          record.product_detail.length &&
          record.product_detail.map((item: any, idx: number) => {
            html.push(
              <p className="product-attr" key={`${idx}_${item.attribute_name}`}>
                <span className="label">{item.attribute_name}</span> :{' '}
                <span>{item.attribute_value}</span>
              </p>,
            );
          });
        return html;
      },
    },
    {
      title: '亮点',
      dataIndex: 'product_highlight',
      key: 'product_highlight',
      ellipsis: true,
      width: 200,
      render: (_: any, record: any) => (
        <span
          className="table-text clearfix"
          dangerouslySetInnerHTML={{ __html: record.product_highlight }}
        ></span>
      ),
    },
    {
      title: '语言',
      dataIndex: 'language',
      key: 'language',
      width: 90,
    },
    {
      title: '操作',
      key: 'operate',
      fixed: 'right',
      width: 160,
      render: (_: any, record: any) => {
        return (
          <div className="operate">
            <a
              className="tx"
              rel="noreferrer"
              target="_blank"
              href={`https://www.limeetpet.com/detail.html?id=${record.id}&lang=${record.language}`}
            >
              详情
            </a>
            <span className="line">|</span>
            <a
              className="tx"
              rel="nofollow"
              onClick={() => {
                handelTableEdit(record);
              }}
            >
              编辑
            </a>
            <span className="line">|</span>
            <a
              className="tx"
              rel="nofollow"
              onClick={() => {
                handelTableDel(record);
              }}
            >
              删除
            </a>
            <a
              className="tx"
              rel="nofollow"
              onClick={() => {
                handelGoogleMerchantUpdate({
                  id: record.id,
                  language: record.language,
                  googleAccess: record.googleAccess,
                });
              }}
            >
              {record.merchant_status > 0 ? '更新Merchant' : '同步Merchant'}
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <div className="page">
        <div className="product-list">
          <DefaultProject></DefaultProject>
          <div className="header">
            <Row>
              <Col span={6}>
                <div className="form-item">
                  <span className="label">选择语言:</span>
                  <Select
                    defaultValue={searchParams.language}
                    value={searchParams.language}
                    style={{ width: 120 }}
                    onChange={searchLanguageSelectHandle}
                    options={searchParams.languageOption}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div className="form-item">
                  <span className="label">自定分类:</span>
                  <Select
                    value={searchParams.product_type_id}
                    style={{ width: 150 }}
                    onChange={searchProductTypeSelectHandle}
                    options={searchParams.productTypeOption}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div className="form-item">
                  <span className="label">商品货号:</span>
                  <Select
                    value={searchParams.offer_id}
                    style={{ width: 150 }}
                    onChange={searchProductOfferIdHandle}
                    options={productMainOfferIds}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div className="form-item">
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={handelSearchParamsButton}
                    style={{ width: 200 }}
                  >
                    搜索
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <div className="content">
            <Table
              rowKey={(record) => `${record.id}_${record.language}_${record.title}`}
              dataSource={productList}
              columns={tableColumns}
              scroll={{ x: 1300 }}
              size="small"
              expandable={defaultExpandable}
              pagination={false}
            />
            <Pagination
              align="end"
              total={pagePagination.total}
              pageSize={pagePagination.pageSize}
              current={pageCurrent}
              onChange={handelTablePagination}
            ></Pagination>
          </div>
          <div className="footer"></div>
        </div>
      </div>
      <Spin size="large" spinning={onLoading} fullscreen />
    </PageContainer>
  );
}

export default ProductList;
