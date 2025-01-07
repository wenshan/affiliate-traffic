import ImgList from '@/pages/Material/components/ImgList';
import Tool from '@/utils/tool';
import { FolderOpenOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import { JSX, useEffect } from 'react';
import { useModel } from 'umi';

import './index.less';

function ImageSelectModal(props: any) {
  const {
    queryFolderFetch,
    queryFolderMaterialFetch,
    folderDirectory,
    selectedMaterial,
    setSelectedMaterial,
    productSkuImageModalStatus,
    setProductSkuImageModalStatus,
    updateOperateSelectFolderDirectory,
    setCurrentOperateMaterial,
    currentImageProductType,
    imageLimitNum,
  } = useModel('material');

  // const [limit] = useState(props.imageLimitNum || 20);
  // const [selectedType] = useState(props.selectedType);

  const handleOk = () => {
    if (props.callbackOk) {
      console.log('selectedMaterial:', selectedMaterial);
      props.callbackOk(selectedMaterial);
      setProductSkuImageModalStatus(false);
      setSelectedMaterial([]);
    }
  };
  const handleCancel = () => {
    setProductSkuImageModalStatus(false);
    setSelectedMaterial([]);
  };
  const handleClickFolderMenu = async (currentItem: any) => {
    if (currentItem && currentItem.key) {
      updateOperateSelectFolderDirectory(currentItem);
      if (currentItem.is_leaf === 1) {
        await queryFolderMaterialFetch(currentItem);
      }
    }
  };
  const folderMenuHtml = () => {
    const html: JSX.Element[] = [];
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
              {item.children && item.children.length > 0 && (
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
                        {childrenItem.children && childrenItem.children.length > 0 && (
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
                                  {children2Item.children && children2Item.children.length > 0 && (
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
    if (currentImageProductType === 'image_link') {
      html = `选择商品主图（选择${imageLimitNum}张图片）`;
    } else if (currentImageProductType === 'additional_image_link') {
      html = `商品附加图片（选择${imageLimitNum}张图片）`;
      // eslint-disable-next-line eqeqeq
    } else if (currentImageProductType === 'lifestyle_image_link') {
      html = `添加商品详情（最多选择${imageLimitNum}张图片）`;
    } else if (currentImageProductType === 'pattern') {
      html = `添加商品售卖规格（最多选择${imageLimitNum}张图片）`;
    }
    return html;
  };

  useEffect(() => {
    setCurrentOperateMaterial({ keys: '' });
    queryFolderFetch();
  }, []);

  return (
    <div className="image-select-modal">
      <Modal
        className="wrap-select-modal"
        title="选择图片素材 "
        open={productSkuImageModalStatus}
        width={1100}
        onOk={handleOk}
        onCancel={handleCancel}
        zIndex={9999}
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
                <ImgList></ImgList>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}

export default ImageSelectModal;
