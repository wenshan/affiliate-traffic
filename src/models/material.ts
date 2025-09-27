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
  resetImgInfo,
} from '@/services/api/material';
import listToTree from '@/utils/listToTree';
import { message } from 'antd';
import { useState } from 'react';

const operateFolderDirectoryInit = {
  label: '',
};

const ROWSLISTMAP = new Map();

type ImageListObject = {
  [key: string]: any;
};
type FolderData = {
  count: number;
  rows: any[];
  requested: boolean;
};
type DefaultFolderDirectoryType = {
  label?: string;
  key?: string;
  is_default?: boolean;
  active?: number | boolean;
  is_leaf?: string | number;
  key_path?: string;
  father_key?: string;
  data?: FolderData;
  keys?: any;
  [key: string]: any;
};
const resetFolderDirectory = {
  label: '',
  key: '',
  is_default: false,
  active: false,
  is_leaf: 1,
  key_path: '',
  father_key: '',
  data: {
    count: 0,
    rows: [],
    requested: false,
  },
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
//     selectedKeys, expandedKeys,
function Material() {
  const [isLoading, setLoading] = useState(false);
  // 选中当前的节点
  const [selectedKeys, setSelectedKeys] = useState([]);
  // 展开当前的节点
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [productSkuImageModalStatus, setProductSkuImageModalStatus] = useState(false);
  const [imageList, setImageList] = useState<ImageListObject>();
  const [checkFolderDirectory, setCheckFolderDirectory] = useState<DefaultFolderDirectoryType>();
  // 操作
  const [operateFolderDirectory, setOperateFolderDirectory] = useState<DefaultFolderDirectoryType>(
    operateFolderDirectoryInit,
  );
  // 选中当前的节点
  const [selectFolderDirectory, setSelectFolderDirectory] = useState<DefaultFolderDirectoryType>();
  const [folderDirectoryRowsTree, setFolderDirectoryRowsTree] = useState<any>([]);

  const [otherFolderDirectory, setOtherFolderDirectory] = useState(otherFolderDirectoryInit);
  const [folderDirectoryRows, setFolderDirectoryRows] = useState([]);
  const [folderDirectory, setFolderDirectory] = useState<any>([]);
  // 当前选择的素材列表
  const [selectedMaterial, setSelectedMaterial] = useState<any>([]); // 选取的素材
  const [currentOperateMaterial, setCurrentOperateMaterial] = useState({ keys: '' }); // 当前操作的素材
  const [currentImageProductType, setCurrentImageProductType] = useState('image_link');
  const [imageLimitNum, setImageLimitNum] = useState(20);

  // get keys
  // key_path = "99185496/59867357/46999078"
  // keys = ['46999078', '59867357', '99185496', '65655558']
  const grandParentKeys = (item: any) => {
    const keys = [];
    keys.push(item.key);
    if (item.key && item.father_key) {
      keys.push(item.father_key);
      // 一层
      const fatherItem = ROWSLISTMAP.get(item.father_key);
      if (fatherItem && fatherItem.father_key) {
        const fatherItem2 = ROWSLISTMAP.get(fatherItem.father_key);
        if (fatherItem2) {
          keys.push(fatherItem2.key);
          const fatherItem3 = ROWSLISTMAP.get(fatherItem2.father_key);
          if (fatherItem3) {
            keys.push(fatherItem3.key);
            const fatherItem4 = ROWSLISTMAP.get(fatherItem3.father_key);
            if (fatherItem4) {
              keys.push(fatherItem4.key);
              const fatherItem5 = ROWSLISTMAP.get(fatherItem4.father_key);
              if (fatherItem5) {
                keys.push(fatherItem5.key);
                const fatherItem6 = ROWSLISTMAP.get(fatherItem5.father_key);
                if (fatherItem6) {
                  keys.push(fatherItem6.key);
                  const fatherItem7 = ROWSLISTMAP.get(fatherItem6.father_key);
                  if (fatherItem7) {
                    keys.push(fatherItem7.key);
                    const fatherItem8 = ROWSLISTMAP.get(fatherItem7.father_key);
                    if (fatherItem8) {
                      keys.push(fatherItem8.key);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    const reversedArr = keys.reverse();
    return reversedArr;
  };
  // 同步更新选中的状态
  const updateOperateMaterial = (currentItem: { keys: string; [key: string]: any }) => {
    const newImageList: ({ keys: string; current: boolean } & { current: boolean })[] = [];
    const selectImageList: ({ keys: string; current: boolean } & { current: boolean })[] = [];
    if (currentItem && currentItem.keys && imageList) {
      imageList.forEach((item: { keys: string; current: boolean }) => {
        if (item.keys == currentItem.keys) {
          newImageList.push(Object.assign({}, item, { current: !item.current }));
        } else {
          newImageList.push(item);
        }
      });
      newImageList.forEach((item) => {
        if (item.current) {
          selectImageList.push(item);
        }
      });
      setImageList(newImageList);
      setSelectedMaterial(selectImageList);
    }
  };
  // 同步更新 checkbox
  const updateOperateSelectFolderDirectory = (currentItem: any) => {
    if (currentItem && currentItem.key) {
      setSelectFolderDirectory(currentItem);
      setCheckFolderDirectory({ key: '' });
    }
  };
  // 获取 分类
  const queryFolderFetch = async () => {
    ROWSLISTMAP.clear();
    const result = await queryFolder();
    if (result.status === 200 && result.data && result.data.rows) {
      const rows = result.data.rows;
      const newRows: any[] = [];
      rows.forEach((item: { father_key: any; label: string; key: string; is_leaf: number }) => {
        if (item.is_leaf == 1) {
          newRows.push(
            Object.assign({}, item, { title: item.label, children: [], disableCheckbox: true }),
          );
        } else {
          newRows.push(
            Object.assign({}, item, { title: item.label, children: [], disableCheckbox: false }),
          );
        }
        ROWSLISTMAP.set(item.key, item);
      });
      if (newRows && newRows[0]) {
        if (!(selectedKeys && selectedKeys[0])) {
          const itemData = newRows[0];
          // 初始化 当前节点 展开节点 节点数据
          const keys = grandParentKeys(itemData);
          // 获取层级keys
          console.log('keys:', keys);
          const newRowsKeys = Object.assign({}, itemData, { keys });
          setSelectFolderDirectory(newRowsKeys);
          // list to tree
          const rowsTree = listToTree(newRows);
          setFolderDirectoryRowsTree(rowsTree);
          const arrTemp = [];
          arrTemp.push(rowsTree[0].key);
          setSelectedKeys(arrTemp);
          // 初始化节点图片数据
          await queryFolderMaterialFetch(newRowsKeys);
        } else {
          // list to tree
          const rowsTree = listToTree(newRows);
          setFolderDirectoryRowsTree(rowsTree);
          await queryFolderMaterialFetch(selectFolderDirectory);
        }
      } else {
        setSelectedKeys([]);
        setOperateFolderDirectory({});
        setFolderDirectoryRowsTree([]);
        setSelectFolderDirectory({});
      }
    } else {
      message.error(result.msg);
    }
  };
  // 编辑文件夹
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
          setSelectedKeys([]);
          await queryFolderFetch();
          message.success('文件夹删除成功');
        } else {
          message.error(result.msg);
        }
      } else {
        message.error('不是根节点不能删除');
      }
    }
  };
  // 创建添加新文件夹
  const createFolderFetch = async (data: any) => {
    const result = await createFolder(data);
    if (result && result.status === 200 && result.data) {
      await queryFolderFetch();
    } else {
      message.error(result.msg);
    }
  };
  // 获取图片素材
  const queryFolderMaterialFetch = async (data: any, action?: string) => {
    if (data && data.key && data.is_leaf == 1) {
      const key = data.key;
      setLoading(true);
      const result = await queryFolderMaterial({ key });
      if (result.status === 200 && result.data) {
        const keysList = result.data.rows;
        setImageList(keysList);
        // 补足素材信息
        await resetImgInfo({ keysList });
      } else {
        message.error(result.msg);
      }
      setLoading(false);
    }
  };
  const delMaterialFetch = async (data: any) => {
    const result = await delMaterial(data);
    if (result && result.status === 200 && result.data) {
      await queryFolderMaterialFetch(selectFolderDirectory, 'upload');
    } else {
      message.error(result.msg);
    }
  };
  const delRemoteMaterialFetch = async (data: any) => {
    const result = await delRemoteMaterial(data);
    if (result && result.status === 200 && result.data) {
      await queryFolderMaterialFetch(selectFolderDirectory, 'upload');
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }
  };
  return {
    isLoading,
    setFolderDirectory,
    setFolderDirectoryRows,
    setSelectFolderDirectory,
    setCheckFolderDirectory,
    checkFolderDirectory,
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
    updateOperateMaterial,
    updateOperateSelectFolderDirectory,
    currentImageProductType,
    setCurrentImageProductType,
    imageLimitNum,
    setImageLimitNum,
    selectedKeys,
    expandedKeys,
    setSelectedKeys,
    setExpandedKeys,
    folderDirectoryRowsTree,
    grandParentKeys,
    setOperateFolderDirectory,
    operateFolderDirectory,
    setFolderDirectoryRowsTree,
  };
}

export default Material;
