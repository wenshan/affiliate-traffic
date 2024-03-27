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
      data: props.dataSource,
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
    const { data, limit } = this.state;
    console.log(currentItem);
    const checkedData = [];
    // 单选
    if (limit === 1) {
      // eslint-disable-next-line array-callback-return
      data.map((item: any[], idx: number) => {
        if (item.keys === currentItem.keys) {
          data[idx] = Object.assign({}, item, { current: true });
          checkedData.push(Object.assign({}, item, { current: true }));
        } else {
          data[idx] = Object.assign({}, item, { current: false });
          checkedData.push(item);
        }
      });
    } else {
      // eslint-disable-next-line array-callback-return
      data.map((item: any[], idx: number) => {
        if (item.keys === currentItem.keys) {
          if (currentItem.current) {
            data[idx] = Object.assign({}, item, { current: false });
          } else {
            data[idx] = Object.assign({}, item, { current: true });
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
        data,
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
    const { data } = this.state;
    // eslint-disable-next-line array-callback-return
    data &&
      data.length &&
      data.map((item: { url: string | undefined; keys: string }) => {
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
    console.log('nextProps:', nextProps);
    if (nextProps.dataSource !== this.props.dataSource) {
      const dataObject = {};
      const rows = [];
      // eslint-disable-next-line array-callback-return
      nextProps.dataSource &&
        nextProps.dataSource.length &&
        nextProps.dataSource.map((item: { keys: string }) => {
          if (item.keys) {
            dataObject[item.keys] = Object.assign({}, item);
          }
        });
      if (nextProps.checked) {
        // eslint-disable-next-line array-callback-return
        nextProps.checked &&
          nextProps.checked.length &&
          nextProps.checked.map((item: string | number) => {
            if (dataObject[item]) {
              dataObject[item] = Object.assign({}, dataObject[item], { current: true });
            }
          });
      }
      // eslint-disable-next-line guard-for-in
      for (let key in dataObject) {
        dataObject[key] && rows.push(dataObject[key]);
      }
      console.log('rows:', rows);
      this.setState({
        data: rows,
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
