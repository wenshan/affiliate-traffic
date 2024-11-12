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
import { message } from 'antd';
import { useState } from 'react';

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
  key: string;
  is_default?: boolean;
  active?: number | boolean;
  is_leaf?: string | number;
  key_path?: string;
  father_key?: string;
  data?: FolderData;
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

function Material() {
  const [productSkuImageModalStatus, setProductSkuImageModalStatus] = useState(false);
  const [imageList, setImageList] = useState<ImageListObject>();
  const [checkFolderDirectory, setCheckFolderDirectory] = useState<DefaultFolderDirectoryType>();
  const [selectFolderDirectory, setSelectFolderDirectory] = useState<DefaultFolderDirectoryType>();
  const [otherFolderDirectory, setOtherFolderDirectory] = useState(otherFolderDirectoryInit);
  const [folderDirectoryRows, setFolderDirectoryRows] = useState([]);
  const [folderDirectory, setFolderDirectory] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]); // 选取的素材
  const [currentOperateMaterial, setCurrentOperateMaterial] = useState({ keys: '' }); // 当前操作的素材
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
  // 重置所以得数据配置
  const resetFolder = () => {};
  // 获取 分类
  const queryFolderFetch = async () => {
    ROWSLISTMAP.clear();
    // console.log(ROWSLISTMAP.size);
    const newImageList: any[] = [];
    //  selectFolderDirectory, checkFolderDirectory, currentOperateMaterial
    // console.log('selectFolderDirectory1:', selectFolderDirectory);
    // console.log('checkFolderDirectory1:', checkFolderDirectory);
    // console.log('currentOperateMaterial1:', currentOperateMaterial);
    // console.log('selectedMaterial1:', selectedMaterial);
    // console.log('otherFolderDirectory1:', otherFolderDirectory);
    // console.log('imageList:', imageList);
    // setCheckFolderDirectory(resetFolderDirectory);
    // setSelectFolderDirectory(resetFolderDirectory);
    setFolderDirectoryRows([]);
    setCurrentOperateMaterial({ keys: '' });

    const result = await queryFolder();
    if (result.status === 200 && result.data && result.data.rows) {
      setCurrentOperateMaterial({ keys: '' });
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
        newRows.push(
          Object.assign({}, item, {
            title: item.label,
            checked: false,
            active: false,
            data: {
              requested: false,
              rows: [],
              count: 0,
            },
          }),
        );
        ROWSLISTMAP.set(
          item.key,
          Object.assign({}, item, {
            title: item.label,
            checked: false,
            active: false,
            data: {
              requested: false,
              rows: [],
              count: 0,
            },
          }),
        );
      });
      // @ts-ignore
      const initFolderDirectory =
        selectFolderDirectory && selectFolderDirectory.key
          ? selectFolderDirectory
          : Object.assign({}, newRows[0], { active: 1 });
      // const { rowsTree, rowsList } = listToTreeSelf(newRows, initFolderDirectory);
      // setFolderDirectory(rowsTree);
      // setFolderDirectoryRows(rowsList);

      // await queryFolderMaterialFetch(rowsTree[0]);
      // console.log('selectFolderDirectory2=:', selectFolderDirectory);
      // console.log('checkFolderDirectory2=:', checkFolderDirectory);
      // console.log('currentOperateMaterial2=:', currentOperateMaterial);
      // console.log('selectedMaterial2=:', selectedMaterial);
      // console.log('otherFolderDirectory2=:', otherFolderDirectory);

      if (selectFolderDirectory && selectFolderDirectory.key && imageList && imageList.length) {
        imageList.forEach((item: any) => {
          newImageList.push(Object.assign({}, item, { current: false }));
        });
        const mapData = ROWSLISTMAP.get(selectFolderDirectory.key);
        if (mapData && mapData.data) {
          mapData.data = Object.assign({}, mapData.data, { rows: newImageList, requested: false });
          ROWSLISTMAP.set(selectFolderDirectory.key, mapData);
          setImageList(newImageList);
          console.log('newImageList:', newImageList);
        }
      } else {
        setSelectFolderDirectory(initFolderDirectory);
        setImageList([]);
      }
      listToTreeSelf({
        selectFolderDirectory: initFolderDirectory,
        checkFolderDirectory,
        currentOperateMaterial,
        actionType: 'select',
      });
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
          message.success('文件夹删除成功');
        } else {
          message.error(result.msg);
        }
      } else {
        message.error('不是根节点不能删除');
      }
    }
  };
  const createFolderFetch = async (data: any) => {
    const result = await createFolder(data);
    if (result && result.status === 200 && result.data) {
      await queryFolderFetch();
    } else {
      message.error(result.msg);
    }
  };
  const queryFolderMaterialFetch = async (data: { key: any; children?: any }, action?: string) => {
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
      const key = paramsKeys.join(',');
      if (ROWSLISTMAP && key && ROWSLISTMAP.has(key) && data && data.key) {
        let mapData = ROWSLISTMAP.get(key);
        if (mapData && mapData.data) {
          if (action && action === 'upload') {
            mapData.data = Object.assign({}, mapData.data, { requested: false });
          }
          if (!mapData.data.requested) {
            const result = await queryFolderMaterial({ key });
            if (result.status === 200 && result.data) {
              mapData.data = Object.assign({}, result.data, { requested: false });
              ROWSLISTMAP.set(key, mapData);
              setImageList(result.data.rows);
            } else {
              message.error(result.msg);
            }
          } else {
            setImageList(mapData.data.rows);
          }
        }
        // 转化成  rowsTree rowsList
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
      await queryFolderMaterialFetch(otherFolderDirectoryInit, 'upload');
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
  };
}

export default Material;
