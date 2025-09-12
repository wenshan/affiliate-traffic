import { queryTypeAll } from '@/services/api/productType';
import { useModel } from '@umijs/max';
import type { TableColumnsType, TableProps } from 'antd';
import { Modal, Table, message } from 'antd';
import { useEffect, useState } from 'react';

import './index.less';

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

type Props = {
  selectedKeys: string;
  callbackOk: any;
};

export default (props: Props) => {
  const { productTypeShow, setProductTypeShow } = useModel('productMainModel');
  const [dataTypeList, setDataTypeList] = useState();
  const [selectedRows, setSelectedRows] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleSelectOk = async () => {
    props.callbackOk(selectedRowKeys, selectedRows);
    setProductTypeShow(false);
  };
  const handleSelectCancel = async () => {
    setProductTypeShow(false);
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

  useEffect(() => {
    if (props.selectedKeys) {
      const selectedKeysArr = props.selectedKeys.split(',');
      const selectedKeysNum = selectedKeysArr.map(Number);
      setSelectedRowKeys(selectedKeysNum);
    } else {
      setSelectedRowKeys([]);
    }
    queryTypeAllHandler();
  }, [props.selectedKeys]);

  const columns: TableColumnsType<ProductType> = [
    {
      title: '中文',
      dataIndex: 'title_zh',
    },
    {
      title: '英文',
      dataIndex: 'title_en',
    },
    {
      title: '日本',
      dataIndex: 'title_ja',
    },
    {
      title: '韩文',
      dataIndex: 'title_ko',
    },
  ];
  const rowSelection: TableProps<ProductType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ProductType[]) => {
      setSelectedRows(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: ProductType) => ({
      checked: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
    selectedRowKeys,
  };

  return (
    <div className="product-custom-type-modal-select">
      <Modal
        title="选择产品自定义分类"
        open={productTypeShow}
        width={800}
        onOk={handleSelectOk}
        onCancel={handleSelectCancel}
      >
        <div className="content">
          <Table<ProductType>
            rowKey={(record) => record.key}
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            columns={columns}
            dataSource={dataTypeList}
            pagination={false}
          />
        </div>
      </Modal>
    </div>
  );
};
