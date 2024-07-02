/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  DeleteOutlined,
  DownloadOutlined,
  RotateRightOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Image, message } from 'antd';
import React, { Component } from 'react';

import './index.less';

class ImgList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: props.dataSource,
      limit: props.limit || 20,
    };
  }
  onDownload = (item) => {
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

  handelDelMaterial = (item) => {
    if (this.props.delMaterialCallback && item) {
      this.props.delMaterialCallback(item);
    }
  };

  handelSelectCurrent = (currentItem) => {
    const { imageList, limit } = this.state;
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

    this.setState(
      {
        imageList,
      },
      () => {
        if (this.props.onChangeCallback) {
          this.props.onChangeCallback(checkedData);
        }
      },
    );
  };

  htmlLi = () => {
    const html: React.JSX.Element[] = [];
    const { imageList } = this.state;
    // eslint-disable-next-line array-callback-return
    imageList &&
      imageList.length &&
      imageList.map((item: { url: string | undefined; keys: string }) => {
        html.push(
          <li className="item" key={item.keys}>
            <div className={item.current ? 'style current' : 'style'}>
              <div className="checkbox_input" onClick={() => this.handelSelectCurrent(item)}>
                <span className="checkbox_inner"></span>
              </div>
              <div className="img-box" onClick={() => this.handelSelectCurrent(item)}>
                <Image width={160} src={item.url} preview={false} />
              </div>
              <div className="line"></div>
              <div className="tool">
                <DeleteOutlined onClick={() => this.handelDelMaterial(item)} />
                <RotateRightOutlined />
                <SwapOutlined />
                <DownloadOutlined onClick={() => this.onDownload(item)} />
              </div>
              <div className="line"></div>
              <div
                className="title ellipsis"
                title={item.filename}
                onClick={() => this.handelSelectCurrent(item)}
              >
                {item.filename}
              </div>
            </div>
          </li>,
        );
      });
    return html;
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('nextProps:', nextProps);
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        imageList: nextProps.dataSource,
        checked: nextProps.checked,
        limit: nextProps.limit,
      });
    }
  }

  render() {
    return (
      <div className="imglist">
        <div className="content">
          <div className="list-owflow">
            <ul className="list-ul">{this.htmlLi()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ImgList;
