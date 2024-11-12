import { Button, Input, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

import './index.less';

const currentProductAttributeInit = {
  attribute_name: '',
  attribute_value: '',
};

function ProductAttribute(props: any) {
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
  const { productDetail } = useModel('productCreateSkuModel');
  const [selectedRowsProductAttr, setSelectedRowsProductAttr] = useState([]);
  const [optionAddStatus, setOptionAddStatus] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const handleOk = async () => {
    if (props.callbackOk) {
      props.callbackOk(selectedRowsProductAttr);
      setProductAttributeModalStatus(false);
    }
  };
  const handleAddOk = async () => {
    setAddOpen(false);
    await cerateAttrFetch(currentProductAttribute);
  };
  const handleCancel = async () => {
    setProductAttributeModalStatus(false);
  };
  const handleAddCancel = () => {
    setAddOpen(false);
    setCurrentProductAttribute(currentProductAttributeInit);
  };
  const nameInputHandle = (event: { target: { value: any } }) => {
    const { value } = event.target;
    const newCurrentProductAttribute = Object.assign({}, currentProductAttribute, {
      attribute_name: value,
    });
    setCurrentProductAttribute(newCurrentProductAttribute);
  };
  const valueInputHandle = (event: { target: { value: any } }) => {
    const { value } = event.target;
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
  };
  const onChangeSelectedRows = (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows);
    const newSelectedRows: any[] = [];
    if (selectedRows && selectedRows.length) {
      selectedRows.forEach((item: { attribute_name: any; attribute_value: any }) => {
        if (item.attribute_name && item.attribute_value) {
          newSelectedRows.push(
            Object.assign(
              {},
              { attribute_name: item.attribute_name, attribute_value: item.attribute_value },
            ),
          );
        }
      });
      //@ts-ignore
      setSelectedRowsProductAttr(newSelectedRows);
      setSelectedRowKeys(selectedRowKeys);
    }
  };
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
    const selectedRowKeys: any[] = [];
    if (productDetail && productDetail.id) {
      const { language, product_main_id, product_detail } = productDetail;
      if (language && product_main_id && product_detail) {
        if (productDetail && productDetail.length) {
          productDetail.forEach((item: { key: string }) => {
            if (item.key) {
              selectedRowKeys.push(item.key);
            }
          });
        }
        queryAttrFetch();
        // @ts-ignore
        setSelectedRowKeys(selectedRowKeys);
      }
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
            rowKey={(record) => record.attribute_name}
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
            <span className="label">属性名称:</span>
            <Input
              placeholder="属性名称"
              style={{ width: 250 }}
              value={currentProductAttribute.attribute_name}
              onChange={nameInputHandle}
            />
          </div>
          <div className="form-item">
            <span className="label">属性值:</span>
            <Input
              placeholder="属性值"
              style={{ width: 250 }}
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
