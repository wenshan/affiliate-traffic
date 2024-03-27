import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';

import './index.less';

const UploadFile: React.FC = (props) => {
  console.log('props UploadFile:', props);
  const changeEvent = (info: { file: { status: string; name: any }; fileList: any }) => {
    console.log('info:', info);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      if (props.callbackOk) {
        props.callbackOk(info);
      }
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      if (props.handelUploadFailed) {
        props.handelUploadFailed(info);
      }
    }
  };

  return (
    <div className="uploadfile">
      <Upload
        name="file"
        action="http://127.0.0.1:7001/api/material/upload"
        onChange={changeEvent}
        data={{ ...props.data }}
      >
        <Button icon={<UploadOutlined />}>上传图片</Button>
      </Upload>
    </div>
  );
};

export default UploadFile;
