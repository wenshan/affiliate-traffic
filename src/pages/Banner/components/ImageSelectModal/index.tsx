import imageListTip from '@/constant/imageListTip';
import { delRemoteMaterial, queryFolder, queryFolderMaterial } from '@/services/api/material';
import listToTreeSelf from '@/utils/listToTreeSelf';
import Tool from '@/utils/tool';
import {
  DeleteOutlined,
  DownloadOutlined,
  FolderOpenOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  RotateRightOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Col, Image, Modal, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';

import './index.less';

// const ImageSelectModal: React.FC = () => {
const ImageSelectModal: React.FC = ({ open, selectedType, callbackOk, callbackCancel }) => {
  console.log('open:', open);
  const limitParams = imageListTip[selectedType];
  const [folderDirectory, setFolderDirectory] = useState([]);
  const [imageList, setImageList] = useState([]);
  // @ts-ignore
  const [limit] = useState(limitParams.limit || 1);
  const [currentFolderDirectory, setCurrentFolderDirectory] = useState([]);
  // 选中的素材
  const [selectedMaterial, setSelectedMaterial] = useState([]);

  // 获取文件夹数据
  const getFolderDirectoryPost = async () => {
    const mapObj = new Map();
    const result = await queryFolder();
    if (result.status === 200 && result.data && result.data.rows) {
      // 已删除文件放在最后排序
      const rows = result.data.rows;
      const newRows: { key: string; father_key: string; is_leaf: any }[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      rows &&
        rows.length &&
        rows.map((item: { key: string }) => {
          if (item.key !== '11111111') {
            newRows.push(Object.assign({}, item, { title: item.label, checked: false }));
          }
          mapObj.set(item.key, Object.assign({}, item, { checked: false }));
        });
      newRows.push(Object.assign({}, rows[1], { title: rows[1] && rows[1].label, checked: false }));
      const tree = listToTreeSelf(newRows);
      setFolderDirectory(tree);
      setCurrentFolderDirectory(tree[0]);
    }
  };
  // 获取图片素材数据
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const queryFolderMaterialPost = async () => {
    const paramsKeys = [];
    if (currentFolderDirectory) {
      paramsKeys.push(currentFolderDirectory.key);
      if (currentFolderDirectory.children && currentFolderDirectory.children.length > 0) {
        currentFolderDirectory.children.map((itemChildren) => {
          paramsKeys.push(itemChildren.key);
          if (itemChildren.children && itemChildren.children.length) {
            itemChildren.children.map((itemChildren2) => {
              paramsKeys.push(itemChildren2.key);
              if (itemChildren2.children && itemChildren2.children.length) {
                itemChildren2.children.map((itemChildren3) => {
                  paramsKeys.push(itemChildren3.key);
                });
              }
            });
          }
        });
      }
      const result = await queryFolderMaterial({ key: paramsKeys.join(',') });
      if (
        result.status === 200 &&
        result.data &&
        currentFolderDirectory &&
        currentFolderDirectory.key
      ) {
        folderDirectory.map((item: { key: any }, idx: string | number) => {
          if (
            folderDirectory[idx] &&
            item &&
            Number(item.key) === Number(currentFolderDirectory.key)
          ) {
            folderDirectory[idx] = Object.assign({}, item, { data: result.data });
          }
        });
        setFolderDirectory(folderDirectory);
        setImageList(result.data.rows);
      }
    }
  };
  // 临时删除素材
  const delMaterialPost = async (item) => {
    const result = await delRemoteMaterial(item);
    if (result.status === 200 && result.data) {
      queryFolderMaterialPost();
    }
  };
  // 彻底删除图片素材
  const delRemoteMaterialPost = async (item) => {
    const result = await delRemoteMaterial(item);
    if (result.status === 200 && result.data) {
      queryFolderMaterialPost();
    }
  };

  useEffect(() => {
    getFolderDirectoryPost();
  }, []);

  useEffect(() => {
    queryFolderMaterialPost();
  }, [currentFolderDirectory]);

  const handleClickFolderMenu = (currentItem) => {
    console.log(currentItem);
    const newFolderDirectory = [];
    // eslint-disable-next-line array-callback-return
    folderDirectory.map((item) => {
      if (item.key === currentItem.key) {
        newFolderDirectory.push(Object.assign({}, item, { active: true }));
      } else {
        newFolderDirectory.push(Object.assign({}, item, { active: false }));
      }
    });
    setCurrentFolderDirectory(currentItem);
    setFolderDirectory(newFolderDirectory);
  };

  const folderMenuHtml = () => {
    const html = [];
    if (folderDirectory && folderDirectory.length > 0 && folderDirectory[0]) {
      // eslint-disable-next-line array-callback-return
      folderDirectory.map((item, index) => {
        if (item.children) {
          html.push(
            <li key={`${item.key}_${index}`} className="pad00">
              <div
                title={item.label}
                className={`item ${item.active ? 'active' : ''}`}
                onClick={() => handleClickFolderMenu(item)}
                key={item.key}
              >
                <span className="space"></span>
                {item.is_leaf === 1 ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                {Tool.replaceExceedEnd(item.label, 20)}
              </div>
              {item.children && item.children.length && (
                <ul>
                  {item.children.map((childrenItem, idx) => {
                    return (
                      <li key={`${childrenItem.key}_${idx}`} className="pad01">
                        <div
                          title={childrenItem.label}
                          className={`item ${childrenItem.active ? 'active' : ''}`}
                          onClick={() => handleClickFolderMenu(childrenItem)}
                        >
                          <span className="space"></span>
                          {childrenItem.is_default === 0 ? (
                            childrenItem.is_leaf === 1 ? (
                              <MinusSquareOutlined />
                            ) : (
                              <PlusSquareOutlined />
                            )
                          ) : null}
                          {Tool.replaceExceedEnd(childrenItem.label, 25)}
                        </div>
                        {childrenItem.children && childrenItem.children.length && (
                          <ul key={`${childrenItem.key}_${idx}_ul`}>
                            {childrenItem.children.map((children2Item, idx2) => {
                              return (
                                <li key={`${children2Item.key}_${idx2}`} className="pad02">
                                  <div
                                    title={children2Item.label}
                                    className={`item ${children2Item.active ? 'active' : ''}`}
                                    onClick={() => handleClickFolderMenu(children2Item)}
                                  >
                                    <span className="space"></span>
                                    {children2Item.is_default === 0 ? (
                                      children2Item.is_leaf === 1 ? (
                                        <MinusSquareOutlined />
                                      ) : (
                                        <PlusSquareOutlined />
                                      )
                                    ) : null}
                                    {Tool.replaceExceedEnd(children2Item.label, 20)}
                                  </div>
                                  {children2Item.children && children2Item.children.length && (
                                    <ul key={`${children2Item.key}_${idx2}_ul`}>
                                      {children2Item.children.map((children3Item, idx3) => {
                                        <li key={`${children3Item.key}_${idx3}`} className="pad03">
                                          <div
                                            title={children3Item.label}
                                            className={`${children3Item.active ? 'active' : ''}`}
                                            onClick={() => handleClickFolderMenu(children3Item)}
                                          >
                                            <span className="space"></span>
                                            {children3Item.is_default === 0 ? (
                                              children3Item.is_leaf === 1 ? (
                                                <MinusSquareOutlined />
                                              ) : (
                                                <PlusSquareOutlined />
                                              )
                                            ) : null}
                                            {Tool.replaceExceedEnd(children3Item.label, 20)}
                                          </div>
                                        </li>;
                                      })}
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
            <li key={`${item.key}_${item.is_defaul}`} className="pad00">
              <div
                title={item.label}
                className={`item ${item.active ? 'active' : ''}`}
                onClick={() => handleClickFolderMenu(item)}
                key={item.key}
              >
                <span className="space"></span>
                {item.is_leaf ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                {Tool.replaceExceedEnd(item.label, 20)}
              </div>
            </li>,
          );
        }
      });
    }

    return html;
  };
  // 图片素材操作
  const handleCancel = () => {
    callbackCancel();
  };
  const handleOk = () => {
    if (selectedMaterial && selectedMaterial[0] && selectedMaterial[0].url) {
      callbackOk(selectedMaterial);
    } else {
      message.error('请添加图片素材');
    }
  };
  // subTile
  const imageSubTitle = () => {
    return (limitParams && limitParams.des) || '添加图片（最多选择1张图片）';
  };

  const imageListHandelSelectCurrent = (currentItem) => {
    const checkedData = [];
    // 单选
    if (limit === 1) {
      // eslint-disable-next-line array-callback-return
      imageList.map((item: any[], idx: number) => {
        if (item.keys === currentItem.keys) {
          imageList[idx] = Object.assign({}, item, { current: true });
          checkedData.push(Object.assign({}, item, { current: true }));
        } else {
          imageList[idx] = Object.assign({}, item, { current: false });
          // checkedData.push(item);
        }
      });
    } else {
      // eslint-disable-next-line array-callback-return
      imageList.map((item: any[], idx: number) => {
        if (item.keys === currentItem.keys) {
          if (currentItem.current) {
            imageList[idx] = Object.assign({}, item, { current: false });
          } else {
            imageList[idx] = Object.assign({}, item, { current: true });
            checkedData.push(Object.assign({}, item, { current: true }));
          }
        } else {
          if (item.current) {
            checkedData.push(item);
          }
        }
      });
    }

    if (limit > 1 && checkedData && checkedData.length > limit) {
      message.success(`当前场景下素材一次操作限制${limit}张素材`);
      return false;
    }
    console.log(checkedData);
    setImageList(imageList);
    setSelectedMaterial(checkedData);
  };
  // 删除素材
  const imageListHtmlHandelDelMaterial = (item) => {
    if (item) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      if (item.status === 1) {
        Modal.confirm({
          title: '确认删除',
          content: '彻底删除服务文件，资源地址将失去访问',
          onOk() {
            delMaterialPost(item);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      } else {
        Modal.confirm({
          title: '确认删除',
          content: '删除当前的素材',
          onOk() {
            delRemoteMaterialPost(item);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    }
  };
  const imageListOnDownload = (item) => {
    fetch(item.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };
  const imageListHtml = () => {
    const html: React.JSX.Element[] = [];
    // eslint-disable-next-line array-callback-return, @typescript-eslint/no-unused-expressions
    imageList &&
      imageList.length &&
      imageList.map(
        (item: { url: string | undefined; keys: string; current: any; filename: any }) => {
          html.push(
            <li className="item" key={item.keys}>
              <div className={item && item.current ? 'style current' : 'style'}>
                <div className="checkbox_input" onClick={() => imageListHandelSelectCurrent(item)}>
                  <span className="checkbox_inner"></span>
                </div>
                <div className="img-box" onClick={() => imageListHandelSelectCurrent(item)}>
                  <Image width={160} src={item.url} preview={false} />
                </div>
                <div className="line"></div>
                <div className="tool">
                  <DeleteOutlined onClick={() => imageListHtmlHandelDelMaterial(item)} />
                  <RotateRightOutlined />
                  <SwapOutlined />
                  <DownloadOutlined onClick={() => imageListOnDownload(item)} />
                </div>
                <div className="line"></div>
                <div
                  className="title ellipsis"
                  title={item.filename}
                  onClick={() => imageListHandelSelectCurrent(item)}
                >
                  {item.filename}
                </div>
              </div>
            </li>,
          );
        },
      );
    return html;
  };

  return (
    <div className="image-select-modal">
      <Modal
        className="wrap-select-modal"
        title="选择图片素材 "
        open={open}
        width={1200}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="content">
          <Row>
            <Col span={5}>
              <div className="folder-menu">
                <div className="header">
                  <FolderOpenOutlined /> 文件目录
                </div>
                <div className="menu-wrap">
                  <ul>{folderDirectory && folderMenuHtml()}</ul>
                </div>
              </div>
            </Col>
            <Col span={19}>
              <div className="sub-title">{imageSubTitle()}</div>
              <div className="imglist-modal">
                <div className="imglist">
                  <div className="content">
                    <div className="list-owflow">
                      <ul className="list-ul">{imageListHtml()}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default ImageSelectModal;
