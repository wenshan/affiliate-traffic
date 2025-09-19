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
  const [folderDirectory, setFolderDirectory] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]); // 选取的素材
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
  // 转化成  rowsTree rowsList
  const listToTreeSelf = (data: any) => {
    const { selectFolderDirectory, checkFolderDirectory, currentOperateMaterial, actionType } =
      data;
    const result: any[] = [];
    const rowsList: any[] = [];
    const father_key: any[] = [];
    // const checkedData: any[] = [...selectedMaterial];
    const checkedData: any[] = [];
    // console.log('action:', actionType);
    // 当前文件夹的值
    ROWSLISTMAP.forEach((item) => {
      ROWSLISTMAP.set(
        item.key,
        Object.assign({}, item, { active: false, checked: false, children: [] }),
      );
    });

    if (selectFolderDirectory && selectFolderDirectory.key) {
      if (!selectFolderDirectory.active) {
        // 关闭=》展开
        father_key.push(selectFolderDirectory.key);
        if (selectFolderDirectory.father_key) {
          const father01 = ROWSLISTMAP.get(selectFolderDirectory.father_key);
          if (father01) {
            father_key.push(father01.key);
            if (father01.father_key) {
              const father02 = ROWSLISTMAP.get(father01.father_key);
              father_key.push(father02.key);
              if (father02.father_key) {
                const father03 = ROWSLISTMAP.get(father02.father_key);
                father_key.push(father03.key);
                if (father03.father_key) {
                  const father04 = ROWSLISTMAP.get(father02.father_key);
                  father_key.push(father04.key);
                }
              }
            }
          }
        }
      } else {
        // 展开=》关闭
        if (selectFolderDirectory.father_key) {
          const father01 = ROWSLISTMAP.get(selectFolderDirectory.father_key);
          if (father01) {
            father_key.push(father01.key);
            if (father01.father_key) {
              const father02 = ROWSLISTMAP.get(father01.father_key);
              father_key.push(father02.key);
              if (father02.father_key) {
                const father03 = ROWSLISTMAP.get(father02.father_key);
                father_key.push(father03.key);
                if (father03.father_key) {
                  const father04 = ROWSLISTMAP.get(father02.father_key);
                  father_key.push(father04.key);
                }
              }
            }
          }
        }
      }

      father_key.forEach((itemKey) => {
        const currentMap = ROWSLISTMAP.get(itemKey);
        if (currentMap) {
          ROWSLISTMAP.set(itemKey, Object.assign({}, currentMap, { children: [], active: true }));
        }
      });
    }
    // 文件夹被选中
    if (checkFolderDirectory && checkFolderDirectory.key) {
      ROWSLISTMAP.forEach((item) => {
        if (checkFolderDirectory.key === item.key) {
          ROWSLISTMAP.set(
            item.key,
            Object.assign({}, item, { checked: checkFolderDirectory.checked }, { children: [] }),
          );
        } else {
          ROWSLISTMAP.set(item.key, Object.assign({}, item, { children: [], checked: false }));
        }
      });
    }
    // imgList
    if (
      currentOperateMaterial &&
      currentOperateMaterial.keys &&
      selectFolderDirectory &&
      selectFolderDirectory.key
    ) {
      if (selectFolderDirectory.is_leaf === 1) {
        if (ROWSLISTMAP.get(selectFolderDirectory.key)) {
          const mapData = ROWSLISTMAP.get(selectFolderDirectory.key);
          // if (mapData.data && mapData.data.requested && mapData.data.rows) {
          if (mapData.data && mapData.data.rows) {
            mapData.data.rows.forEach((item: { keys: any; current: any }, idx: string | number) => {
              if (currentOperateMaterial.keys === item.keys) {
                if (currentOperateMaterial.current) {
                  mapData.data.rows[idx] = Object.assign({}, item, { current: false });
                } else {
                  mapData.data.rows[idx] = Object.assign({}, item, { current: true });
                  checkedData.push(Object.assign({}, item, { current: true }));
                }
              } else {
                if (item && item.current) {
                  checkedData.push(item);
                }
              }
            });
          }
        }
      }
    }

    ROWSLISTMAP.forEach((item) => {
      rowsList.push(Object.assign({}, item));
      if (item.father_key) {
        const parentItem = ROWSLISTMAP.get(item.father_key);
        if (parentItem) {
          if (!parentItem.children) {
            parentItem['children'] = [];
          }
          // console.log(item.key, parentItem.children);
          parentItem.children.push(item);
        }
      } else {
        result.push(item);
      }
    });
    // console.log('result:', result);
    // console.log('checkedData:', checkedData);
    setFolderDirectory(result);
    setFolderDirectoryRows(rowsList);
    setSelectedMaterial(checkedData);
  };
  // 同步更新选中的状态
  const updateOperateMaterial = (currentItem: { keys: string; [key: string]: any }) => {
    if (currentItem && currentItem.keys) {
      setCurrentOperateMaterial(currentItem);
      listToTreeSelf({
        selectFolderDirectory,
        checkFolderDirectory,
        currentOperateMaterial: currentItem,
        actionType: 'imglist',
      });
    }
  };
  // 同步更新 select
  const updateOperateCheckFolderDirectory = (currentItem: any) => {
    if (currentItem && currentItem.key) {
      setCheckFolderDirectory(Object.assign({}, currentItem, { children: [], data: {} }));
      listToTreeSelf({
        selectFolderDirectory,
        checkFolderDirectory: currentItem,
        currentOperateMaterial,
        actionType: 'select',
      });
    }
  };
  // 同步更新 checkbox
  const updateOperateSelectFolderDirectory = (currentItem: any) => {
    if (currentItem && currentItem.key) {
      setSelectFolderDirectory(currentItem);
      setCheckFolderDirectory({ key: '' });
      listToTreeSelf({
        selectFolderDirectory: currentItem,
        checkFolderDirectory: { key: '' },
        currentOperateMaterial,
        actionType: 'checkbox',
      });
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
      if (!(selectedKeys && selectedKeys[0])) {
        const itemData = newRows[0];
        // 初始化 当前节点 展开节点 节点数据
        setSelectedKeys(itemData.key);
        const keys = grandParentKeys(itemData);
        // 获取层级keys
        console.log('keys:', keys);
        const newRowsKeys = Object.assign({}, itemData, { keys });
        setSelectFolderDirectory(newRowsKeys);
      }
      // list to tree
      const rowsTree = listToTree(newRows);
      setFolderDirectoryRowsTree(rowsTree);

      // 初始化节点图片数据
      await queryFolderMaterialFetch(newRows[0]);
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
      const result = await queryFolderMaterial({ key });
      if (result.status === 200 && result.data) {
        setImageList(result.data.rows);
      } else {
        message.error(result.msg);
      }
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
    setCurrentOperateMaterial,
    updateOperateMaterial,
    updateOperateCheckFolderDirectory,
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
  };
}

export default Material;
