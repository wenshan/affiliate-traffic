import ImgList from '@/pages/Material/components/ImgList';
import { FolderOpenOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Col, Modal, Row, Tree, message } from 'antd';
import { SetStateAction, useEffect } from 'react';

import './index.less';

function ImageSelectModal(props: any) {
  const {
    queryFolderFetch,
    queryFolderMaterialFetch,
    selectedMaterial,
    setSelectedMaterial,
    productSkuImageModalStatus,
    setProductSkuImageModalStatus,
    currentImageProductType,
    imageLimitNum,
    folderDirectoryRowsTree,
    selectedKeys,
    setSelectedKeys,
    grandParentKeys,
    setSelectFolderDirectory,
    setImageList,
    imageList,
  } = useModel('material');

  // const [limit] = useState(props.imageLimitNum || 20);
  // const [selectedType] = useState(props.selectedType);

  const handleOkSelect = () => {
    let msg = '';
    if (props.callbackOk && selectedMaterial) {
      console.log('selectedMaterial:', selectedMaterial);

      if (currentImageProductType === 'image_link' && selectedMaterial.length > 1) {
        msg = `商品主图（限制1张图片）`;
        message.warning({ content: msg });
        return false;
      } else if (
        currentImageProductType === 'additional_image_link' &&
        selectedMaterial.length > 5
      ) {
        msg = `商品附加图片（选择5张图片）`;
        message.warning({ content: msg });
        return false;
      } else if (
        currentImageProductType === 'lifestyle_image_link' &&
        selectedMaterial.length > 30
      ) {
        msg = `商品详情（最多选择30张图片）`;
        message.warning({ content: msg });
        return false;
      } else if (currentImageProductType === 'pattern' && selectedMaterial.length > 1) {
        msg = `商品售卖规格（限制1张图片）`;
        message.warning({ content: msg });
        return false;
      }

      props.callbackOk(selectedMaterial);
      setProductSkuImageModalStatus(false);
      setSelectedMaterial([]);
    }
  };
  const handleCancelSelect = () => {
    const newImageList: any[] | SetStateAction<{ [key: string]: any } | undefined> = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    imageList &&
      imageList.forEach((item: any) => {
        newImageList.push(Object.assign({}, item, { current: false }));
      });
    setProductSkuImageModalStatus(false);
    setSelectedMaterial([]);
    setImageList(newImageList);
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

  const onSelectTree = async (selectedKey: any, e: any) => {
    console.log('selectedKeys:', selectedKey);
    console.log('selectedKeys e:', e);
    if (selectedKeys.includes(e.node.key)) {
      setSelectedKeys([]);
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

  useEffect(() => {
    queryFolderFetch();
  }, []);

  console.log('folderDirectoryRowsTree:', folderDirectoryRowsTree);
  console.log('selectedKeys:', selectedKeys);

  return (
    <div className="image-select-modal">
      <Modal
        className="wrap-select-modal"
        title="选择图片素材 "
        open={productSkuImageModalStatus}
        width={1100}
        onOk={handleOkSelect}
        onCancel={handleCancelSelect}
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
