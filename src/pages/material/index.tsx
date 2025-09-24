import DefaultProject from '@/components/DefaultProject';
import InputText from '@/components/InputText';
import { FolderAddOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Col, Empty, Modal, Row, Spin, Tree, message } from 'antd';
import { useEffect, useState } from 'react';
import ImgList from './components/ImgList';
import UploadFile from './components/UploadFile';
import UploadFiles from './components/UploadFiles';

import './index.less';

const operateFolderDirectoryInit = {
  label: '',
};

function MaterialPage() {
  const {
    isLoading,
    queryFolderFetch,
    selectFolderDirectory,
    createFolderFetch,
    editFolderFetch,
    delFolderFetch,
    queryFolderMaterialFetch,
    selectedKeys,
    setSelectedKeys,
    setSelectFolderDirectory,
    folderDirectoryRowsTree,
    grandParentKeys,
    setOperateFolderDirectory,
    operateFolderDirectory,
    setImageList,
  } = useModel('material');
  const [optionAction, setOptionAction] = useState(false);
  const [folderOpenStatus, setFolderOpenStatus] = useState(false);
  const handelFolderCancel = async () => {
    setFolderOpenStatus(false);
    setOperateFolderDirectory(operateFolderDirectoryInit);
  };
  // 添加和编辑文件夹
  const handelAddFolderOk = async () => {
    if (selectFolderDirectory && operateFolderDirectory) {
      if (optionAction) {
        const editFolderDirectory = Object.assign(
          {},
          selectFolderDirectory,
          operateFolderDirectory,
        );
        await editFolderFetch(editFolderDirectory);
      } else {
        const addFolderDirectory = Object.assign({}, operateFolderDirectory, {
          father_key: selectFolderDirectory.key,
          key_path: selectFolderDirectory.keys && selectFolderDirectory.keys.join('/'),
          is_leaf: 1,
          active: false,
          is_default: false,
        });
        await createFolderFetch(addFolderDirectory);
      }
    } else {
      if (!optionAction) {
        const addFolderDirectory = Object.assign({}, operateFolderDirectory, {
          father_key: '',
          key_path: '',
          is_leaf: 1,
          active: false,
          is_default: false,
        });
        await createFolderFetch(addFolderDirectory);
      }
    }
    setFolderOpenStatus(false);
  };
  // 新建文件夹
  const handelCreateFolderAdd = async () => {
    setOptionAction(false);
    setFolderOpenStatus(true);
    setOperateFolderDirectory(operateFolderDirectoryInit);
  };
  // 编辑文件夹
  const handleClickDropdownEdit = async () => {
    if (selectFolderDirectory) {
      setOptionAction(true);
      setFolderOpenStatus(true);
      setOperateFolderDirectory(selectFolderDirectory);
    } else {
      message.info('选择当前文件夹');
    }
  };
  const folderInputHandle = async (value: string) => {
    if (optionAction) {
      // 编辑
      const inputOperateFolderDirectory = Object.assign({}, selectFolderDirectory, {
        label: value,
        title: value,
      });
      setOperateFolderDirectory(inputOperateFolderDirectory);
    } else {
      // 新增
      const inputOperateFolderDirectory = Object.assign({}, { label: value, title: value });
      setOperateFolderDirectory(inputOperateFolderDirectory);
    }
  };
  const handleClickDropdownDel = async () => {
    if (selectFolderDirectory && selectFolderDirectory.key) {
      if (selectFolderDirectory.is_leaf === 1) {
        Modal.confirm({
          title: '确认',
          content: '确认删除',
          onOk: async () => {
            await delFolderFetch(selectFolderDirectory);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      } else {
        message.info('非叶子节点无法删除');
      }
    } else {
      message.info('选择当前文件夹');
    }
  };

  const onSelectTree = async (selectedKey: any, e: any) => {
    console.log('selectedKeys:', selectedKey);
    console.log('selectedKeys e:', e);
    if (selectedKeys.includes(e.node.key)) {
      setSelectedKeys([]);
      setImageList([]);
      console.log('取消选择');
    } else {
      const keys = grandParentKeys(e.node);
      const currentItemKeys = Object.assign({}, e.node, { keys });
      console.log('currentItemKeys:', currentItemKeys);
      setSelectFolderDirectory(currentItemKeys);
      setSelectedKeys(selectedKey);
      await queryFolderMaterialFetch(currentItemKeys);
    }
  };
  const onExpandTree = async (expandedKeys: any, e: any) => {
    console.log('expandedKeys:', expandedKeys);
    console.log('e:', e);
  };
  const restSelectTree = async () => {
    setSelectedKeys([]);
    setOperateFolderDirectory({});
    setSelectFolderDirectory({});
  };

  useEffect(() => {
    queryFolderFetch();
  }, []);
  console.log('folderDirectoryRowsTree:', folderDirectoryRowsTree);
  console.log('selectFolderDirectory:', selectFolderDirectory);
  console.log('selectedKeys:', selectedKeys);
  console.log('isLoading:', isLoading);

  return (
    <PageContainer>
      <div className="page">
        <div className="material">
          <DefaultProject></DefaultProject>
          <div className="content">
            <Row>
              <Col span={5}>
                <div className="folder-menu">
                  <div className="header">
                    <FolderOpenOutlined /> 文件目录{' '}
                    <span onClick={restSelectTree} className="rest-select">
                      (返回跟节点)
                    </span>
                  </div>
                  <div className="menu-wrap">
                    {folderDirectoryRowsTree && (
                      <Tree
                        treeData={folderDirectoryRowsTree}
                        selectedKeys={selectedKeys} // 选中的 key 数组
                        onSelect={onSelectTree}
                        onExpand={onExpandTree}
                        showLine // 显示连接线
                        selectable // 是否可选中
                        checkable={false}
                      />
                    )}
                  </div>
                </div>
              </Col>
              <Col span={19}>
                <div className="container">
                  <div className="header">
                    <Button
                      onClick={() => handleClickDropdownDel()}
                      disabled={!!!(selectedKeys && selectedKeys[0])}
                    >
                      删除文件夹
                    </Button>
                    <Button
                      onClick={() => handleClickDropdownEdit()}
                      disabled={!!!(selectedKeys && selectedKeys[0])}
                    >
                      编辑文件夹
                    </Button>
                    <Button icon={<FolderAddOutlined />} onClick={() => handelCreateFolderAdd()}>
                      新建文件目录
                    </Button>
                    <UploadFile selectedKeys={selectedKeys}></UploadFile>
                    <UploadFiles selectedKeys={selectedKeys}></UploadFiles>
                  </div>
                  <div>
                    {selectFolderDirectory && selectFolderDirectory.is_leaf === 1 ? (
                      <ImgList></ImgList>
                    ) : (
                      <div className="no-leaf">
                        <Empty description="...不是叶子节点，无图片素材..."></Empty>
                      </div>
                    )}
                  </div>

                  {
                    <Modal
                      title={optionAction ? '编辑文件目录' : '添加文件目录'}
                      open={folderOpenStatus}
                      width={500}
                      onOk={() => handelAddFolderOk()}
                      onCancel={() => handelFolderCancel()}
                    >
                      <div className="content">
                        <div className="form-item">
                          <span className="label">文件夹名称: </span>
                          <InputText
                            placeholder="文件夹名称"
                            style={{ width: 250 }}
                            value={operateFolderDirectory && operateFolderDirectory.label}
                            onChange={folderInputHandle}
                          />
                        </div>
                      </div>
                    </Modal>
                  }
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Spin size="large" fullscreen spinning={isLoading} tip="加载中..." />
      </div>
    </PageContainer>
  );
}

export default MaterialPage;
