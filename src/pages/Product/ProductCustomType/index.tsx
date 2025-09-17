import DefaultProject from '@/components/DefaultProject';
import { defaultProductCustomType } from '@/constant/defaultCurrentData';
import { delType, queryTypeAll } from '@/services/api/productType';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Modal, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ProductCustomTypeModal from '../components/ProductCustomTypeModal';

type ProductCustomType = {
  id: number;
  key: string;
  userid: number;
  zh_CN: string;
  en_US: string;
  ja_JP: string;
  ko_KR: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
  [key: string]: string | number | any;
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [isProductTypeShow, setProductTypeShow] = useState(false);
  const [productTypeOptionAction, setProductTypeOptionAction] = useState(false);
  const [initData, setInitData] = useState(defaultProductCustomType);
  const [dataTypeList, setDataTypeList] = useState();

  const handelTableAdd = async () => {
    setInitData(defaultProductCustomType);
    setProductTypeShow(true);
    setProductTypeOptionAction(false);
  };
  const handelTableEdit = async (record: ProductCustomType) => {
    setInitData(record);
    setProductTypeShow(true);
    setProductTypeOptionAction(true);
  };
  // 获取列表数据
  const queryTypeAllHandler = async () => {
    const result = await queryTypeAll();
    if (result && result.status === 200 && result.data) {
      setDataTypeList(result.data.rows);
    } else {
      message.error(result.msg || '更新失败');
    }
  };
  const handelTableDel = async (record: ProductCustomType) => {
    Modal.warning({
      title: '确认删除',
      content: '删除当前产品分类吗？',
      okText: '确认',
      onOk: async () => {
        if (record && record.key && record.id) {
          const result = await delType(record);
          if (result && result.status === 200) {
            await queryTypeAllHandler();
            message.success(result.msg);
          } else {
            message.error(result.msg || '删除失败');
          }
        } else {
          message.error('缺少参数');
        }
      },
    });
  };
  const productTypeCallBackOk = async () => {
    setProductTypeShow(false);
    await queryTypeAllHandler();
  };
  const productTypeOpenStatusCallback = async (open: any) => {
    setProductTypeShow(open);
  };

  useEffect(() => {
    queryTypeAllHandler();
  }, []);

  const columns: ProColumns<ProductCustomType>[] = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '分类名称-中文',
      dataIndex: 'zh_CN',
      key: 'zh_CN',
    },
    {
      title: '分类名称-英文',
      dataIndex: 'en_US',
      key: 'en_US',
    },
    {
      title: '分类名称-日文',
      dataIndex: 'ja_JP',
      key: 'ja_JP',
    },
    {
      title: '分类名称-韩文',
      dataIndex: 'ko_KR',
      key: 'ko_KR',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (_: any, record: ProductCustomType) => {
        return (
          <div className="operate">
            <span className="line">|</span>
            <span
              className="tx"
              onClick={() => {
                handelTableEdit(record);
              }}
            >
              编辑
            </span>
            <span className="line">|</span>
            <span
              className="tx"
              onClick={() => {
                handelTableDel(record);
              }}
            >
              删除
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <div className="product-custom-type">
        <DefaultProject></DefaultProject>
        <ProTable<ProductCustomType>
          columns={columns}
          actionRef={actionRef}
          rowKey="id"
          pagination={false}
          dataSource={dataTypeList}
          headerTitle="自定义分类列表"
          search={false}
          toolBarRender={() => [
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                handelTableAdd();
              }}
              type="primary"
            >
              新建
            </Button>,
          ]}
        />
        <ProductCustomTypeModal
          open={isProductTypeShow}
          optionAction={productTypeOptionAction}
          openStatusCallback={productTypeOpenStatusCallback}
          initData={initData}
          callbackOk={productTypeCallBackOk}
        ></ProductCustomTypeModal>
      </div>
    </PageContainer>
  );
};
