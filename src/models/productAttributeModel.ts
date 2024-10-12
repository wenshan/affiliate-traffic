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

  const cerateAttrFetch = async () => {
    const result = await cerateAttr();
    if (result && result.status === 200 && result.data) {
      console.log(result);
    }
  };
  const delAttrFetch = async (record: any) => {
    const { key } = record;
    const result = await delAttr({ key });
    if (result && result.status === 200 && result.data) {
      console.log(result);
    }
  };
  const editAttrFetch = async () => {
    const result = await editAttr();
    if (result && result.status === 200 && result.data) {
      console.log(result);
    }
  };
  const queryAttrFetch = async () => {
    const result = await queryAttr();
    if (result && result.status === 200 && result.data) {
      console.log(result);
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
