import DefaultProject from '@/components/DefaultProject';
import listToTreeSelf from '@/utils/listToTreeSelf';
import Tool from '@/utils/tool';
import {
  FolderAddOutlined,
  FolderOpenOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Checkbox, Col, Input, Modal, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import ImgList from './components/ImgList';
import UploadFile from './components/UploadFile';

import './index.less';

type Event = { target: { value: any } };

const operateFolderDirectoryInit = {
  label: '',
  key: '',
};

function MaterialPage() {
  const {
    queryFolderFetch,
    selectFolderDirectory,
    createFolderFetch,
    editFolderFetch,
    currentFolderDirectory,
    delFolderFetch,
    folderDirectoryRows,
    setFolderDirectory,
    setFolderDirectoryRows,
    setSelectFolderDirectory,
    queryFolderMaterialFetch,
    folderDirectory,
    setCheckFolderDirectory,
    checkFolderDirectory,
    otherFolderDirectory,
    setOtherFolderDirectory,
  } = useModel('material');
  const [optionAction, setOptionAction] = useState(false);
  const [folderOpenStatus, setFolderOpenStatus] = useState(false);
  const [operateFolderDirectory, setOperateFolderDirectory] = useState(operateFolderDirectoryInit);
  const handelFolderCancel = async () => {
    setFolderOpenStatus(false);
    setOperateFolderDirectory(operateFolderDirectoryInit);
  };
  const handelFolderOk = async () => {
    let addFolderDirectory = Object.assign({}, operateFolderDirectory);
    if (checkFolderDirectory && checkFolderDirectory.key) {
      if (checkFolderDirectory.father_key) {
        addFolderDirectory = Object.assign({}, operateFolderDirectory, {
          father_key: checkFolderDirectory.key,
          key_path: `${checkFolderDirectory.father_key}/${checkFolderDirectory.key}`,
          is_leaf: 1,
          active: false,
          is_default: false,
        });
      } else {
        addFolderDirectory = Object.assign({}, operateFolderDirectory, {
          father_key: checkFolderDirectory.key,
          key_path: `${checkFolderDirectory.key}`,
          is_leaf: 1,
          active: false,
          is_default: false,
        });
      }
    } else {
      addFolderDirectory = Object.assign({}, operateFolderDirectory, {
        father_key: '',
        key_path: '',
        key: '',
        is_leaf: 1,
        active: false,
        is_default: false,
      });
    }
    if (optionAction) {
      await editFolderFetch(addFolderDirectory);
    } else {
      await createFolderFetch(addFolderDirectory);
    }
    setFolderOpenStatus(false);
  };
  const handelCreateFolderAdd = async () => {
    setOptionAction(false);
    setFolderOpenStatus(true);
    setOperateFolderDirectory(operateFolderDirectoryInit);
  };
  const handleClickDropdownEdit = async () => {
    if (checkFolderDirectory && checkFolderDirectory.key) {
      setOptionAction(true);
      setFolderOpenStatus(true);
      setOperateFolderDirectory(checkFolderDirectory);
    } else {
      message.info('选择当前文件夹');
    }
  };
  const folderInputHandle = async (event: Event) => {
    const { value } = event.target;
    if (optionAction) {
      // 编辑
      const operateFolderDirectory = Object.assign({}, currentFolderDirectory, {
        title: value,
        label: value,
      });
      setOperateFolderDirectory(operateFolderDirectory);
    } else {
      // 新增
      const operateFolderDirectory = Object.assign({}, { title: value, label: value });
      setOperateFolderDirectory(operateFolderDirectory);
    }
  };
  const handleClickDropdownDel = async () => {
    if (checkFolderDirectory && checkFolderDirectory.key) {
      Modal.confirm({
        title: '确认',
        content: '确认删除',
        onOk: async () => {
          await delFolderFetch(checkFolderDirectory);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      message.info('选择当前文件夹');
    }
  };
  const handleOnCheckSelectFolderMenu = async (event: Event | undefined) => {
    const key = event?.target?.value;
    const newRows: any[] = [];
    let currentItem = {};
    if (key && folderDirectoryRows) {
      folderDirectoryRows.map((item: { key: any; checked: any }) => {
        if (item.key === key) {
          let tempItem;
          if (item && item.checked) {
            tempItem = Object.assign({}, item, { checked: false });
          } else {
            tempItem = Object.assign({}, item, { checked: true });
          }
          newRows.push(tempItem);
          currentItem = tempItem;
        } else {
          newRows.push(Object.assign({}, item, { checked: false }));
        }
      });
      const { rowsTree, rowsList } = listToTreeSelf(newRows, selectFolderDirectory);
      setFolderDirectory(rowsTree);
      setFolderDirectoryRows(rowsList);
      if (currentItem && currentItem.checked) {
        setCheckFolderDirectory(currentItem);
      } else {
        setCheckFolderDirectory({});
      }
    }
  };
  const handleClickFolderMenu = async (currentItem: any) => {
    if (currentItem && currentItem.key) {
      const { rowsTree, rowsList } = listToTreeSelf(folderDirectoryRows, currentItem);
      setFolderDirectory(rowsTree);
      setFolderDirectoryRows(rowsList);
      setSelectFolderDirectory(currentItem);
      const newOtherFolderDirectory = Object.assign({}, otherFolderDirectory, { active: false });
      setOtherFolderDirectory(newOtherFolderDirectory);
      await queryFolderMaterialFetch(currentItem);
    }
  };
  const handleClickFolderMenuSecond = async (currentItem: any) => {
    if (currentItem && currentItem.key) {
      const { rowsTree, rowsList } = listToTreeSelf(folderDirectoryRows, currentItem);
      setFolderDirectory(rowsTree);
      setFolderDirectoryRows(rowsList);
      setSelectFolderDirectory(currentItem);
      const newOtherFolderDirectory = Object.assign({}, otherFolderDirectory, { active: false });
      setOtherFolderDirectory(newOtherFolderDirectory);
      await queryFolderMaterialFetch(currentItem);
    }
  };
  const handleClickFolderMenuThird = async (currentItem: any) => {
    if (currentItem && currentItem.key) {
      const { rowsTree, rowsList } = listToTreeSelf(folderDirectoryRows, currentItem);
      setFolderDirectory(rowsTree);
      setFolderDirectoryRows(rowsList);
      setSelectFolderDirectory(currentItem);
      const newOtherFolderDirectory = Object.assign({}, otherFolderDirectory, { active: false });
      setOtherFolderDirectory(newOtherFolderDirectory);
      await queryFolderMaterialFetch(currentItem);
    }
  };
  const handleClickFolderMenuFourth = async (currentItem: any) => {
    if (currentItem && currentItem.key) {
      const { rowsTree, rowsList } = listToTreeSelf(folderDirectoryRows, currentItem);
      setFolderDirectory(rowsTree);
      setFolderDirectoryRows(rowsList);
      setSelectFolderDirectory(currentItem);
      const newOtherFolderDirectory = Object.assign({}, otherFolderDirectory, { active: false });
      setOtherFolderDirectory(newOtherFolderDirectory);
      await queryFolderMaterialFetch(currentItem);
    }
  };
  const folderMenuHtml = () => {
    const html: React.JSX.Element[] = [];
    if (folderDirectory && folderDirectory.length > 0 && folderDirectory[0]) {
      // eslint-disable-next-line array-callback-return
      folderDirectory.map((item: any, index: number) => {
        if (item.children && item.children.length > 0) {
          html.push(
            <li key={`${item.key}_${index}`} className={`pad00 ${item.active ? 'active' : ''}`}>
              <div title={item.label} className="item" key={item.key}>
                <span className="space"></span>
                {item.is_leaf === 1 ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                <Checkbox
                  value={item.key}
                  disabled={!!item.is_default}
                  checked={item.checked}
                  onChange={() => handleOnCheckSelectFolderMenu(event)}
                ></Checkbox>
                <span onClick={() => handleClickFolderMenu(item)}>
                  {Tool.replaceExceedEnd(item.label, 22)}
                </span>
              </div>
              {item.children && item.children.length && (
                <ul>
                  {item.children.map((childrenItem: any, idx: number) => {
                    return (
                      <li
                        key={`${childrenItem.key}_${idx}`}
                        className={`pad01 ${childrenItem.active ? 'active-second' : ''}`}
                      >
                        <div title={childrenItem.label} className="item item-second">
                          <span className="space"></span>
                          {childrenItem.is_default === 0 ? (
                            childrenItem.is_leaf === 1 ? (
                              <MinusSquareOutlined />
                            ) : (
                              <PlusSquareOutlined />
                            )
                          ) : null}
                          <Checkbox
                            value={childrenItem.key}
                            disabled={!!childrenItem.is_default}
                            checked={childrenItem.checked}
                            onChange={() => handleOnCheckSelectFolderMenu(event)}
                          ></Checkbox>
                          <span
                            className="label ellipsis"
                            onClick={() => handleClickFolderMenuSecond(childrenItem)}
                          >
                            {Tool.replaceExceedEnd(childrenItem.label, 22)}
                          </span>
                        </div>
                        {childrenItem.children && childrenItem.children.length && (
                          <ul key={`${childrenItem.key}_${idx}_ul`}>
                            {childrenItem.children.map((children2Item: any, idx2: number) => {
                              return (
                                <li
                                  key={`${children2Item.key}_${idx2}`}
                                  className={`pad02 ${children2Item.active ? 'active-third' : ''}`}
                                >
                                  <div title={children2Item.label} className="item item-third">
                                    <span className="space"></span>
                                    {children2Item.is_default === 0 ? (
                                      children2Item.is_leaf === 1 ? (
                                        <MinusSquareOutlined />
                                      ) : (
                                        <PlusSquareOutlined />
                                      )
                                    ) : null}
                                    <Checkbox
                                      value={children2Item.key}
                                      disabled={!!children2Item.is_default}
                                      checked={children2Item.checked}
                                      onChange={() => handleOnCheckSelectFolderMenu(event)}
                                    ></Checkbox>
                                    <span
                                      className="label ellipsis"
                                      onClick={() => handleClickFolderMenuThird(children2Item)}
                                    >
                                      {Tool.replaceExceedEnd(children2Item.label, 22)}
                                    </span>
                                  </div>
                                  {children2Item.children && children2Item.children.length && (
                                    <ul key={`${children2Item.key}_${idx2}_ul`}>
                                      {children2Item.children.map(
                                        (children3Item: any, idx3: number) => {
                                          return (
                                            <li
                                              key={`${children3Item.key}_${idx3}`}
                                              className={`pad03 ${
                                                children3Item.active ? 'active-fourth' : ''
                                              }`}
                                            >
                                              <div
                                                title={children3Item.label}
                                                className="item item-fourth"
                                              >
                                                <span className="space"></span>
                                                {children3Item.is_default === 0 ? (
                                                  children3Item.is_leaf === 1 ? (
                                                    <MinusSquareOutlined />
                                                  ) : (
                                                    <PlusSquareOutlined />
                                                  )
                                                ) : null}
                                                <Checkbox
                                                  value={children3Item.key}
                                                  disabled={!!children3Item.is_default}
                                                  checked={children3Item.checked}
                                                  onChange={() => handleOnCheckSelectFolderMenu()}
                                                ></Checkbox>
                                                <span
                                                  className="label ellipsis"
                                                  onClick={() =>
                                                    handleClickFolderMenuFourth(children3Item)
                                                  }
                                                >
                                                  {Tool.replaceExceedEnd(children3Item.label, 22)}
                                                </span>
                                              </div>
                                            </li>
                                          );
                                        },
                                      )}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>,
          );
        } else {
          html.push(
            <li
              key={`${item.key}_${item.is_default}`}
              className={`pad00 ${item.active ? 'active' : ''}`}
            >
              <div title={item.label} className="item" key={item.key}>
                <span className="space"></span>
                {item.is_leaf ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                <Checkbox
                  value={item.key}
                  disabled={!!item.is_default}
                  checked={item.checked}
                  onChange={() => handleOnCheckSelectFolderMenu(event)}
                ></Checkbox>
                <span className="label ellipsis" onClick={() => handleClickFolderMenu(item)}>
                  {Tool.replaceExceedEnd(item.label, 22)}
                </span>
              </div>
            </li>,
          );
        }
      });
    }
    return html;
  };
  const handleClickFolderOtherMenu = async ({ active }) => {
    const newOtherFolderDirectory = Object.assign({}, otherFolderDirectory, { active });
    setOtherFolderDirectory(newOtherFolderDirectory);
    const { rowsTree, rowsList } = listToTreeSelf(folderDirectoryRows);
    setFolderDirectory(rowsTree);
    setFolderDirectoryRows(rowsList);
    setSelectFolderDirectory({});
    await queryFolderMaterialFetch(newOtherFolderDirectory);
  };
  const otherFolderMenuHtml = () => {
    const html = [];
    html.push(
      <li
        key={`${otherFolderDirectory.key}_${otherFolderDirectory.is_default}`}
        className={`pad00 ${otherFolderDirectory.active ? 'active' : ''}`}
      >
        <div title={otherFolderDirectory.label} className="item" key={otherFolderDirectory.key}>
          <span className="space"></span>
          {otherFolderDirectory.is_leaf ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
          <Checkbox value={otherFolderDirectory.key} disabled={true}></Checkbox>
          <span
            className="label ellipsis"
            onClick={() => handleClickFolderOtherMenu({ active: true })}
          >
            {Tool.replaceExceedEnd(otherFolderDirectory.label, 22)}
          </span>
        </div>
      </li>,
    );
    return html;
  };

  useEffect(() => {
    queryFolderFetch();
  }, []);

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
                    <FolderOpenOutlined /> 文件目录
                  </div>
                  <div className="menu-wrap">
                    <ul>
                      {folderDirectory && folderMenuHtml()}
                      {otherFolderMenuHtml()}
                    </ul>
                  </div>
                </div>
              </Col>
              <Col span={19}>
                <div className="container">
                  <div className="header">
                    <Button
                      onClick={() => handleClickDropdownDel()}
                      disabled={!checkFolderDirectory}
                    >
                      删除文件夹
                    </Button>
                    <Button
                      onClick={() => handleClickDropdownEdit()}
                      disabled={!checkFolderDirectory}
                    >
                      编辑文件夹
                    </Button>
                    <Button icon={<FolderAddOutlined />} onClick={() => handelCreateFolderAdd()}>
                      新建文件目录
                    </Button>
                    <UploadFile></UploadFile>
                  </div>
                  <ImgList limit={20}></ImgList>
                  {currentFolderDirectory && (
                    <Modal
                      title={optionAction ? '编辑文件目录' : '添加文件目录'}
                      open={folderOpenStatus}
                      width={500}
                      onOk={() => handelFolderOk()}
                      onCancel={() => handelFolderCancel()}
                    >
                      <div className="content">
                        <div className="form-item">
                          <span className="label">文件夹名称: </span>
                          <Input
                            placeholder="文件夹名称"
                            style={{ width: 250 }}
                            value={operateFolderDirectory && operateFolderDirectory.label}
                            onChange={() => folderInputHandle(event)}
                          />
                        </div>
                      </div>
                    </Modal>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default MaterialPage;
