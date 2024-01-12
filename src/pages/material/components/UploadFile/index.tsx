import { connect } from 'umi';
import Cookies from 'js-cookie';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';

import './index.less';

const UploadFile: React.FC = (props) => {
  console.log('props:', props);
  const changeEvent = (info: { file: { status: string; name: any }; fileList: any }) => {
    console.log('info:', info);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const access_token = props.common.currentUser.access_token || Cookies.get('access_token');

  return (
    <div className="uploadfile">
      <Upload
        name="file"
        action="http://127.0.0.1:7001/api/uploadFile"
        data={{ access_token }}
        headers={{ access_token }}
        onChange={changeEvent}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};

// export default UploadFile;
const mapStateToProps = (state: { common: any; material: any }) => ({
  common: state.common,
  material: state.material,
});

export default connect(mapStateToProps)(UploadFile);
