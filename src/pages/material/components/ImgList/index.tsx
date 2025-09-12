import ResizeImg from '@/constant/resizeImg';
import {
  DeleteOutlined,
  DownloadOutlined,
  RotateRightOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Image, Modal } from 'antd';
import React from 'react';

import './index.less';

function ImgList() {
  const { imageList, delRemoteMaterialFetch, updateOperateMaterial } = useModel('material');
  // const [ limit] = useState(props.limit || 20);
  const onDownload = async (item: { url: string | URL | Request }) => {
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
  const handelDelMaterial = async (item: any) => {
    if (item.status === 1) {
      Modal.confirm({
        title: '确认删除',
        content: '彻底删除服务文件，资源地址将失去访问',
        onOk: async () => {
          await delRemoteMaterialFetch(item);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      Modal.confirm({
        title: '确认删除',
        content: '当前的素材彻底删除，引用页面失效',
        onOk: async () => {
          // await delMaterialFetch(item);
          await delRemoteMaterialFetch(item);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };
  const handelSelectCurrent = async (currentItem: any) => {
    console.log('currentItem1:', currentItem);

    if (currentItem && currentItem.keys && imageList && imageList.length > 0) {
      /*
      imageList.map((item: any) => {
        if (item.keys === currentItem.keys) {
          if (currentItem.current) {
            checkedData.push(Object.assign({}, item, { current: false }));
            newImageList.push(Object.assign({}, item, { current: false }));
          } else {
            checkedData.push(Object.assign({}, item, { current: true }));
            newImageList.push(Object.assign({}, item, { current: true }));
          }
        } else {
          if (item && item.current) {
            checkedData.push(item);
          }
          newImageList.push(Object.assign({}, item));
        }
      });
      */
      updateOperateMaterial(currentItem);

      console.log('currentItem2:', currentItem);
      /*
      if (checkedData && checkedData.length > limit) {
        message.success(`当前场景下素材一次操作限制${limit}张素材`);
        return false;
      }
        */
    }
  };
  const htmlLi = () => {
    const html: React.JSX.Element[] = [];
    if (imageList && imageList.length) {
      imageList.forEach((item: any) => {
        html.push(
          <li className="item" key={item.keys}>
            <div className={item.current ? 'style current' : 'style'}>
              <div className="checkbox_input" onClick={() => handelSelectCurrent(item)}>
                <span className="checkbox_inner"></span>
              </div>
              <div className="img-box" onClick={() => handelSelectCurrent(item)}>
                <Image width={160} src={`${item.url}${ResizeImg['w_160']}`} preview={false} />
              </div>
              <div className="line"></div>
              <div className="tool">
                <DeleteOutlined onClick={() => handelDelMaterial(item)} />
                <RotateRightOutlined />
                <SwapOutlined />
                <DownloadOutlined onClick={() => onDownload(item)} />
              </div>
              <div className="line"></div>
              <div
                className="title ellipsis"
                title={item.filename}
                onClick={() => handelSelectCurrent(item)}
              >
                {item.filename}
              </div>
            </div>
          </li>,
        );
      });
    }

    return html;
  };

  return (
    <div className="imglist">
      <div className="content">
        <div className="list-owflow">
          <ul className="list-ul">{imageList && htmlLi()}</ul>
        </div>
      </div>
    </div>
  );
}

export default ImgList;
