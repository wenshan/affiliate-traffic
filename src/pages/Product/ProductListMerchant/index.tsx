import { deleteGoogleMerchant, getProductListAll } from '@/services/api/googleMerchant';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Modal, Spin, message } from 'antd';
import { useRef, useState } from 'react';

type priceObject = {
  value: string;
  currency: string;
};

type GoogleMerchant = {
  id: number;
  userid: string;
  product_id: number;
  offerId: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  additionalImageLinks: string[];
  lifestyleImageLinks: string[];
  contentLanguage: string;
  targetCountry: string;
  feedLabel: string;
  channel: string;
  adult: boolean;
  kind: string;
  brand: string;
  color: string;
  googleProductCategory: string;
  gtin: string;
  itemGroupId: string;
  material: string;
  price: priceObject;
  salePrice: priceObject;
  sizes: string;
  mobileLink: string;
  ageGroup: string;
  availability: string;
  gender: string;
  productHighlights: string[];
  projectId: string;
  accountId: number;
  merchant_status: boolean;
  merchant_product_id: string;
  updatedAt?: string;
  createdAt?: string;
  [key: string]: any;
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState({ action: 'init' });
  const [onLoading, setOnLoading] = useState(false);
  const deleteGoogleMerchantHandel = async ({ projectId, merchant_product_id }) => {
    setOnLoading(true);
    const result = await deleteGoogleMerchant({ projectId, merchant_product_id });
    if (result && result.status === 200 && result.data) {
      setParams({ action: 'delete' });
      setOnLoading(false);
      message.success('删除成功');
    } else {
      setOnLoading(false);
      message.error('删除失败');
    }
  };
  const tableDropdownAction = (param, record: any) => {
    console.log('tableDropdownAction-params:', param);
    console.log('tableDropdownAction-record:', record);
    if (record.googleAccess) {
      setParams({ action: 'init' });
      if (param === 'delete' && record.projectId && record.merchant_product_id) {
        Modal.confirm({
          icon: <ExclamationCircleOutlined />,
          content: '确认删除当前数据',
          onOk() {
            deleteGoogleMerchantHandel({
              projectId: record.projectId,
              merchant_product_id: record.merchant_product_id,
            });
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      } else {
        message.info('缺少参数');
      }
    } else {
      message.info('无权限，同步google merchant需要项目管理者权限。');
    }
  };
  const columns: ProColumns<GoogleMerchant>[] = [
    {
      title: '主图',
      dataIndex: 'imageLink',
      key: 'imageLink',
      valueType: 'image',
    },
    {
      title: '名称',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: 'offerId',
      dataIndex: 'offerId',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '超长'.repeat(50) },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
          disabled: true,
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
    },
    {
      disable: true,
      title: '描述',
      ellipsis: true,
      dataIndex: 'description',
      render: (_, record) => (
        <span
          className="table-text clearfix"
          dangerouslySetInnerHTML={{ __html: record.description }}
        ></span>
      ),
    },
    {
      disable: true,
      title: '亮点',
      ellipsis: true,
      dataIndex: 'productHighlights',
      render: (_, record) => (
        <span
          className="table-text clearfix"
          dangerouslySetInnerHTML={{ __html: record.productHighlights }}
        ></span>
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      fixed: 'left',
      width: 100,
      render: (_, record) => {
        const html: any = [];
        if (record && record.price && record.price.value && record.price.currency) {
          html.push(`price: ${record.price.value} ${record.price.currency}`);
        } else {
          html.push(<span>-</span>);
        }
        if (record && record.salePrice && record.salePrice.value && record.salePrice.currency) {
          html.push(`salePrice: ${record.salePrice.value} ${record.salePrice.currency}`);
        } else {
          html.push(<span>-</span>);
        }
        return html;
      },
    },
    {
      title: '国家',
      key: 'targetCountry',
      ellipsis: true,
      dataIndex: 'targetCountry',
      hideInSearch: true,
    },
    {
      title: '语言',
      key: 'contentLanguage',
      ellipsis: true,
      dataIndex: 'contentLanguage',
      hideInSearch: true,
    },
    {
      title: '状态',
      key: 'channel',
      ellipsis: true,
      dataIndex: 'channel',
      hideInSearch: true,
    },
    {
      title: '链接',
      key: 'link',
      dataIndex: 'link',
      hideInSearch: true,
      render: (_, record) => {
        const html: any = [];
        if (record.link) {
          html.push(
            <a href={record.link} title={record.link} target="_blank" rel="noreferrer">
              link
            </a>,
          );
        }
        if (record.mobileLink) {
          html.push(
            <a href={record.link} title={record.mobileLink} target="_blank" rel="noreferrer">
              mobileLink
            </a>,
          );
        }
        if (!record.link && !record.mobileLink) {
          html.push(<span>-</span>);
        }
        return html;
      },
    },
    {
      title: '尺寸&重量',
      key: 'product_size',
      dataIndex: 'product_size',
      render: (_, record) => {
        const html: any = [];
        if (
          record &&
          record.productHeight &&
          record.productHeight.velue &&
          record.productHeight.unit
        ) {
          html.push(
            <span className="size">
              LWH:
              {`${record.productLength.velue}x${record.productWidth.value}x${record.productHeight.value} ${record.productHeight.unit}`}
            </span>,
          );
        }
        if (record && record.productWeight && record.productWeight.velue && record.productWeight) {
          html.push(<span>W:{`${record.productWeight.velue} ${record.productWeight.unit}`}</span>);
        }
        if (!record.link && !record.mobileLink) {
          html.push(<span>-</span>);
        }
        return html;
      },
    },
    {
      title: '更新时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      hideInTable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <a href={record.link} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={(param) => {
            tableDropdownAction(param, record);
          }}
          menus={[{ key: 'delete', name: '删除' }]}
        />,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<GoogleMerchant>
        columns={columns}
        actionRef={actionRef}
        params={params}
        request={async (
          params: T & {
            pageSize: number;
            current: number;
          },
        ) => {
          const result = await getProductListAll({
            current: params.current,
            pageSize: params.pageSize,
          });
          if (result && result.status === 200 && result.data) {
            return {
              success: true,
              data: result.data.rows,
              total: result.data.count,
            };
          } else {
            return {
              success: false,
              data: [],
              total: 0,
            };
          }
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 20,
        }}
        dateFormatter="string"
        headerTitle="Merchant Product List"
      />
      <Spin size="large" spinning={onLoading} fullscreen />
    </PageContainer>
  );
};
