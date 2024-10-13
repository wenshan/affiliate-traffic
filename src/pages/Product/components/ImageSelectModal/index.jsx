import listToTreeSelf from '@/utils/listToTreeSelf';
import Tool from '@/utils/tool';
import { FolderOpenOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Col, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import ImgList from '../../../Material/components/ImgList';

import './index.less';

function ImageSelectModal(props) {
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
    selectedMaterial,
    setSelectedMaterial,
    productSkuImageModalStatus,
    setProductSkuImageModalStatus,
  } = useModel('material');
  const [limit] = useState(props.imageLimitNum || 20);
  const [selectedType] = useState(props.selectedType);

  const handleOk = () => {
    if (props.callbackOk) {
      props.callbackOk(selectedMaterial);
      setProductSkuImageModalStatus(false);
      setSelectedMaterial([]);
    }
  };
  const handleCancel = () => {
    setProductSkuImageModalStatus(false);
    setSelectedMaterial([]);
  };
  const handleClickFolderMenu = async (currentItem) => {
    if (currentItem && currentItem.key) {
      const { rowsTree, rowsList } = listToTreeSelf(folderDirectoryRows, currentItem);
      setFolderDirectory(rowsTree);
      setFolderDirectoryRows(rowsList);
      setSelectFolderDirectory(currentItem);
      await queryFolderMaterialFetch(currentItem);
    }
  };
  const folderMenuHtml = () => {
    const html = [];
    if (folderDirectory && folderDirectory.length > 0 && folderDirectory[0]) {
      folderDirectory.map((item, index) => {
        if (item.children) {
          html.push(
            <li key={`${item.key}_${index}`} className={`pad00 ${item.active ? 'active' : ''}`}>
              <div
                title={item.label}
                className="item"
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
                      <li
                        key={`${childrenItem.key}_${idx}`}
                        className={`pad01 ${childrenItem.active ? 'active-second' : ''}`}
                      >
                        <div
                          title={childrenItem.label}
                          className="item item-second"
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
                          {Tool.replaceExceedEnd(childrenItem.label, 20)}
                        </div>
                        {childrenItem.children && childrenItem.children.length && (
                          <ul key={`${childrenItem.key}_${idx}_ul`}>
                            {childrenItem.children.map((children2Item, idx2) => {
                              return (
                                <li
                                  key={`${children2Item.key}_${idx2}`}
                                  className={`pad02 ${children2Item.active ? 'active-third' : ''}`}
                                >
                                  <div
                                    title={children2Item.label}
                                    className="item item-third"
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
              <div
                title={item.label}
                className="item"
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
  const imageSubTitle = () => {
    let html = '';
    const { selectedType, imageLimitNum } = props;
    if (selectedType === 'image_link') {
      html = `选择商品主图（选择${imageLimitNum}张图片）`;
    } else if (selectedType === 'additional_image_link') {
      html = `商品附加图片（选择${imageLimitNum}张图片）`;
      // eslint-disable-next-line eqeqeq
    } else if (selectedType === 'lifestyle_image_link') {
      html = `添加商品详情（最多选择${imageLimitNum}张图片）`;
    }
    return html;
  };

  useEffect(() => {
    queryFolderFetch();
  }, []);

  return (
    <div className="image-select-modal">
      <Modal
        className="wrap-select-modal"
        title="选择图片素材 "
        open={productSkuImageModalStatus}
        width={1000}
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
                <ImgList limit={props.imageLimitNum}></ImgList>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}

export default ImageSelectModal;
