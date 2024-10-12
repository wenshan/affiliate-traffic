/* eslint-disable */
/* @ts-ignore */
import {
  createFolder,
  delFolder,
  delMaterial,
  delRemoteMaterial,
  editFolder,
  queryFolder,
  queryFolderMaterial,
} from '@/services/api/material';
import listToTreeSelf from '@/utils/listToTreeSelf';
import { message } from 'antd';
import { useState } from 'react';

type ImageListObject = {
  [key: string]: any;
};

type DefaultFolderDirectoryType = {
  label: string;
  key: string;
  is_default: boolean;
  active: number;
  is_leaf: string;
  key_path: string;
  father_key: string;
  [key: string]: any;
};
const defaultFolderDirectory = {
  label: '默认分组',
  key: '00000000',
  is_default: true,
  active: true,
  is_leaf: 1,
  key_path: '',
  father_key: '',
};
const addFolderDirectoryInit = {
  label: '',
  is_default: false,
  active: true,
  is_leaf: 1,
  father_key: '',
};

const folderDirectoryInit = [
  {
    label: '默认分组',
    key: '00000000',
    is_default: true,
    active: true,
    data: {
      count: 1,
      rows: [],
    },
  },
];

const otherFolderDirectoryInit = {
  key: '11111111',
  label: '垃圾桶',
  is_default: false,
  active: false,
  is_leaf: 1,
};

function Material() {
  const [productSkuImageModalStatus, setProductSkuImageModalStatus] = useState(false);
  const [imageList, setImageList] = useState<ImageListObject>();
  const [checkFolderDirectory, setCheckFolderDirectory] = useState<DefaultFolderDirectoryType>();
  const [selectFolderDirectory, setSelectFolderDirectory] = useState<DefaultFolderDirectoryType>();
  const [currentFolderDirectory, setCurrentFolderDirectory] =
    useState<DefaultFolderDirectoryType>();
  const [otherFolderDirectory, setOtherFolderDirectory] = useState(otherFolderDirectoryInit);
  const [folderDirectoryRows, setFolderDirectoryRows] = useState([]);
  const [folderDirectory, setFolderDirectory] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]); // 选取的素材
  // 获取 分类
  const queryFolderFetch = async () => {
    const result = await queryFolder();
    const map = new Map();
    if (result.status === 200 && result.data && result.data.rows) {
      // 已删除文件放在最后排序
      const rows = result.data.rows;
      const newRows: {
        key: string;
        father_key: string;
        is_leaf: any;
        label: string;
        [key: string]: any;
      }[] = [];
      rows.forEach((item: { label: string; key: string }) => {
        // @ts-ignore
        newRows.push(Object.assign({}, item, { title: item.label, checked: false, active: 0 }));
      });
      // @ts-ignore
      const initFolderDirectory =
        selectFolderDirectory && selectFolderDirectory.key
          ? selectFolderDirectory
          : Object.assign({}, newRows[0], { active: 1 });
      const { rowsTree, rowsList } = listToTreeSelf(newRows, initFolderDirectory);
      setFolderDirectory(rowsTree);
      setFolderDirectoryRows(rowsList);
      setCurrentFolderDirectory(initFolderDirectory);
      await queryFolderMaterialFetch(rowsTree[0]);
    } else {
      message.error(result.msg);
    }
  };
  const editFolderFetch = async (data: { [key: string]: any }) => {
    const result = await editFolder(data);
    if (result && result.status === 200 && result.data) {
      await queryFolderFetch();
    } else {
      message.error(result.msg);
    }
  };
  const delFolderFetch = async (data: { [key: string]: any }) => {
    if (data && data.key) {
      if (data.is_leaf === 1) {
        const result = await delFolder(data);
        if (result && result.status === 200 && result.data) {
          await queryFolderFetch();
        } else {
          message.error(result.msg);
        }
      } else {
        message.error('不是根节点不能删除');
      }
    }
  };
  const createFolderFetch = async (data) => {
    const result = await createFolder(data);
    if (result && result.status === 200 && result.data) {
      await queryFolderFetch();
    } else {
      message.error(result.msg);
    }
  };
  const queryFolderMaterialFetch = async (data: { key: any; children?: any }) => {
    if (
      data &&
      data.key &&
      folderDirectory &&
      folderDirectory.length > 0 &&
      folderDirectoryRows &&
      folderDirectoryRows.length > 0
    ) {
      const paramsKeys = [];
      paramsKeys.push(data.key);
      if (data.children && data.children.length > 0) {
        data.children.map((itemChildren: { key: any; children: any[] }) => {
          paramsKeys.push(itemChildren.key);
          if (itemChildren.children && itemChildren.children.length) {
            itemChildren.children.map((itemChildren2) => {
              paramsKeys.push(itemChildren2.key);
              if (itemChildren2.children && itemChildren2.children.length) {
                itemChildren2.children.map((itemChildren3: { key: any }) => {
                  paramsKeys.push(itemChildren3.key);
                });
              }
            });
          }
        });
      }
      const result = await queryFolderMaterial({ key: paramsKeys.join(',') });
      if (result.status === 200 && result.data && data && data.key) {
        setImageList(result.data.rows);
      } else {
        message.error(result.msg);
      }
    }
  };
  const delMaterialFetch = async (data) => {
    const result = await delMaterial(data);
    if (result && result.status === 200 && result.data) {
      await queryFolderMaterialFetch(selectFolderDirectory);
    } else {
      message.error(result.msg);
    }
  };
  const delRemoteMaterialFetch = async (data) => {
    const result = await delRemoteMaterial(data);
    if (result && result.status === 200 && result.data) {
      await queryFolderMaterialFetch(otherFolderDirectoryInit);
    } else {
      message.error(result.msg);
    }
  };
  return {
    setFolderDirectory,
    setFolderDirectoryRows,
    setSelectFolderDirectory,
    setCheckFolderDirectory,
    checkFolderDirectory,
    currentFolderDirectory,
    folderDirectoryRows,
    folderDirectory,
    selectFolderDirectory,
    otherFolderDirectory,
    setOtherFolderDirectory,
    imageList,
    setImageList,
    selectedMaterial,
    setSelectedMaterial,
    queryFolderFetch,
    delFolderFetch,
    createFolderFetch,
    editFolderFetch,
    delMaterialFetch,
    delRemoteMaterialFetch,
    queryFolderMaterialFetch,
    productSkuImageModalStatus,
    setProductSkuImageModalStatus,
  };
}

export default Material;
