import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

import './index.less';

const UploadDirectory: React.FC = (props) => {
  console.log('props:', props);
  return (
    <div className="uploaddirectory">
      <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
        <Button icon={<UploadOutlined />}>Upload Directory</Button>
      </Upload>
    </div>
  );
};

export default UploadDirectory;
