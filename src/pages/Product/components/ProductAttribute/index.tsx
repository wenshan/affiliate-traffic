import InputText from '@/components/InputText';
import { useModel } from '@umijs/max';
import { Button, Modal, Table, message } from 'antd';
import { useEffect, useState } from 'react';

import './index.less';

const currentProductAttributeInit = {
  attribute_name: '',
  attribute_value: '',
};

function ProductAttribute(props: any) {
  const { product_main_id, language } = props;
  const {
    productAttributeModalStatus,
    setProductAttributeModalStatus,
    currentProductAttribute,
    setCurrentProductAttribute,
    productAttributeList,
    cerateAttrFetch,
    delAttrFetch,
    queryAttrFetch,
  } = useModel('productAttributeModel');
  const { productDetail } = useModel('productCreateProductSkuModel');
  const [selectedRowsProductAttr, setSelectedRowsProductAttr] = useState([]);
  const [optionAddStatus, setOptionAddStatus] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addOpen, setAddOpen] = useState(false);

  const handleOk = async () => {
    if (props.callbackOk) {
      props.callbackOk(selectedRowsProductAttr, selectedRowKeys);
      setProductAttributeModalStatus(false);
    }
  };
  const handleAddOk = async () => {
    setAddOpen(false);
    const postData = Object.assign({}, currentProductAttribute, { product_main_id, language });
    if (
      product_main_id &&
      currentProductAttribute.attribute_name &&
      currentProductAttribute.attribute_value
    ) {
      await cerateAttrFetch(postData);
    } else {
      message.warning('缺少值');
    }
  };
  const handleCancel = async () => {
    setProductAttributeModalStatus(false);
  };
  const handleAddCancel = () => {
    setAddOpen(false);
    setCurrentProductAttribute(currentProductAttributeInit);
  };
  const nameInputHandle = (value: string) => {
    const newCurrentProductAttribute = Object.assign({}, currentProductAttribute, {
      attribute_name: value,
    });
    setCurrentProductAttribute(newCurrentProductAttribute);
  };
  const valueInputHandle = (value: string) => {
    const newCurrentProductAttribute = Object.assign({}, currentProductAttribute, {
      attribute_value: value,
    });
    setCurrentProductAttribute(newCurrentProductAttribute);
  };
  const handelTableAdd = () => {
    setAddOpen(true);
    setOptionAddStatus(false);
    setCurrentProductAttribute(currentProductAttributeInit);
  };

  const handelTableEdit = (record: any) => {
    setAddOpen(true);
    setOptionAddStatus(true);
    setCurrentProductAttribute(record);
  };
  const handelTableDel = (record: any) => {
    const isFound = selectedRowKeys.find((item) => item === record.key);
    if (isFound) {
      message.warning('先取消选中在删除!');
      return false;
    } else {
      Modal.confirm({
        title: '确认删除',
        content: '删除当前的商品属性',
        onOk: async () => {
          await delAttrFetch(record);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };
  const onChangeSelectedRows = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowsProductAttr(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };
  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
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
    {
      title: '操作',
      dataIndex: 'operate',
      render: (_: any, record: any) => {
        return (
          <div className="operate">
            <span className="tx" onClick={handelTableAdd}>
              添加
            </span>
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

  useEffect(() => {
    const { language, product_main_id } = productDetail;
    if (language && product_main_id) {
      queryAttrFetch({ product_main_id, language });
    }
  }, [productDetail]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onChangeSelectedRows,
  };

  return (
    <div className="product-attribute">
      <Modal
        title="商品属性管理"
        open={productAttributeModalStatus}
        width={900}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {productAttributeList && productAttributeList.length > 0 ? (
          <Table
            rowKey={(record) => record.key}
            dataSource={productAttributeList}
            columns={columns}
            pagination={false}
            rowSelection={rowSelection}
          />
        ) : (
          <div className="operate">
            <span className="tx">
              <Button onClick={handelTableAdd}>添加商品属性</Button>
            </span>
          </div>
        )}
      </Modal>
      <Modal
        title={optionAddStatus ? '编辑属性' : '添加属性'}
        open={addOpen}
        width={550}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <div className="content form-box">
          <div className="form-item">
            <span className="label">属性名: </span>
            <InputText
              placeholder="属性名称"
              style={{ width: 350 }}
              value={currentProductAttribute.attribute_name}
              onChange={nameInputHandle}
            />
          </div>
          <div className="form-item">
            <span className="label">属性值: </span>
            <InputText
              placeholder="属性值"
              style={{ width: 350 }}
              value={currentProductAttribute.attribute_value}
              onChange={valueInputHandle}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default ProductAttribute;
