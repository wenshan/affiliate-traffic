import { queryTypeAll } from '@/services/api/productType';
import type { TableColumnsType, TableProps } from 'antd';
import { Modal, Table, message } from 'antd';
import { useEffect, useState } from 'react';

import './index.less';

type DataType = {
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
  id: string | number;
  open: boolean;
  openStatusCallback: any;
  callbackCancel: any;
  optionAction: boolean;
  callbackOk: any;
};

export default (props: Props) => {
  const [dataTypeList, setDataTypeList] = useState();
  const [selectedRows, setSelectedRows] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState();

  const handleSelectOk = async () => {
    props.callbackOk({ selectedRowKeys, selectedRows });
  };
  const handleSelectCancel = async () => {
    props.callbackCancel();
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
    queryTypeAllHandler();
  }, []);

  const columns: TableColumnsType<DataType> = [
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
  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRows(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      checked: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div className="product-custom-type-modal-select">
      <Modal
        title="选择产品自定义分类"
        open={props.open}
        width={800}
        onOk={handleSelectOk}
        onCancel={handleSelectCancel}
      >
        <div className="content">
          <Table<DataType>
            rowSelection={{ type: 'radio', ...rowSelection }}
            columns={columns}
            dataSource={dataTypeList}
            pagination={false}
          />
        </div>
      </Modal>
    </div>
  );
};
