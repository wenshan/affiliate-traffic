import ResizeImg from '@/constant/resizeImg';
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Image, Modal } from 'antd';

import './index.less';

function ImgList(props: { [key: string]: string }) {
  console.log('props:', props);
  const { from } = props;
  const selectImgCurrentList = [];
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
      updateOperateMaterial(currentItem);
      selectImgCurrentList.push(currentItem);
      console.log('currentItem2:', currentItem);
    }
  };

  const htmlLi = () => {
    const html: React.JSX.Element[] = [];
    if (imageList && imageList.length) {
      imageList.forEach((item: any) => {
        html.push(
          <li className="item" key={item.keys}>
            <div className={item.current ? 'style current' : 'style'}>
              {from === 'selectModal' && (
                <div className="checkbox_input" onClick={() => handelSelectCurrent(item)}>
                  <span className="checkbox_inner"></span>
                </div>
              )}
              <div className="img-box">
                <Image
                  width={160}
                  src={`${item.url}${ResizeImg['w_160']}`}
                  preview={{ src: item.url }}
                />
              </div>
              <div className="line"></div>
              <div className="tool">
                <span className="tx">
                  {item.width}x{item.height} | {item.fileSize} | {item.extension}
                </span>
                <DeleteOutlined onClick={() => handelDelMaterial(item)} />
                <DownloadOutlined onClick={() => onDownload(item)} />
              </div>
              <div className="line"></div>
              <div className="title ellipsis" title={item.filename}>
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
