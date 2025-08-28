/* eslint-disable */
/* @ts-ignore */
import { cerateAttr, delAttr, editAttr, queryAttr } from '@/services/api/productAttr';
import { useState } from 'react';

const productAttributeOptionInit = [
  {
    attribute_name: '',
    attribute_value: '',
  },
];

function ProductAttributeModel() {
  const [productAttributeModalStatus, setProductAttributeModalStatus] = useState(false);
  const [productAttributeList, setProductAttributeList] = useState();
  const [currentProductAttribute, setCurrentProductAttribute] = useState(
    productAttributeOptionInit,
  );

  const cerateAttrFetch = async (data: any) => {
    const { language, product_main_id, attribute_name, attribute_value } = data;
    if (product_main_id && attribute_name && attribute_value) {
      const result = await cerateAttr(data);
      if (result && result.status === 200 && result.data) {
        if (language && product_main_id) {
          await queryAttrFetch({ language, product_main_id });
        }
      }
    } else {
      console.log('缺少值');
    }
  };
  const delAttrFetch = async (record: any) => {
    const { key, language, product_main_id } = record;
    const result = await delAttr({ key });
    if (result && result.status === 200 && result.data) {
      if (language && product_main_id) {
        await queryAttrFetch({ language, product_main_id });
      }
    }
  };
  const editAttrFetch = async (data: any) => {
    const { language, product_main_id } = data;
    const result = await editAttr(data);
    if (result && result.status === 200 && result.data) {
      if (language && product_main_id) {
        await queryAttrFetch({ language, product_main_id });
      }
    }
  };
  const queryAttrFetch = async (data: any) => {
    const result = await queryAttr(data);
    if (result && result.status === 200 && result.data) {
      setProductAttributeList(result.data.rows);
    }
  };

  return {
    currentProductAttribute,
    setCurrentProductAttribute,
    productAttributeList,
    setProductAttributeList,
    cerateAttrFetch,
    delAttrFetch,
    editAttrFetch,
    queryAttrFetch,
    productAttributeModalStatus,
    setProductAttributeModalStatus,
  };
}

export default ProductAttributeModel;
