import React, { Component } from 'react';
import { Image, Space } from 'antd';
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';

import './index.less';

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const ImgList: React.FC = (props) => {
  console.log('props:', props);

  const onDownload = () => {
    fetch(src)
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

  return (
    <div className="imglist">
      <div className="content">
        <div className="list-owflow">
          <ul className="list-ul">
            <li className="item">
              <div className="img-box">
                <Image
                  width={200}
                  src={src}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                        },
                      },
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        <DownloadOutlined onClick={onDownload} />
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                        <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                      </Space>
                    ),
                  }}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImgList;
