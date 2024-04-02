import { uploadFileURL } from '@/services/api/uploadFile';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import axios from 'axios';

import './index.less';
// https://github.com/react-component/upload#customrequest
const UploadFile: React.FC = (props) => {
  const uploadProps = {
    action: uploadFileURL(),
    multiple: false,
    data: props.data,
    headers: {},
    withCredentials: true,
    onStart(file) {
      console.log('onStart', file, file.name);
    },
    onSuccess(res, file) {
      if (props.callbackOk) {
        props.callbackOk();
      }
      console.log('onSuccess', res, file.name);
    },
    onError(err) {
      console.log('onError', err);
      if (props.handelUploadFailed) {
        props.handelUploadFailed();
      }
    },
    onProgress({ percent }, file) {
      console.log('onProgress', `${percent}%`, file.name);
    },
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      console.log('withCredentials:', withCredentials);
      console.log('headers:', headers);
      // EXAMPLE: post form-data with 'axios'
      // eslint-disable-next-line no-undef
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      formData.append(filename, file);

      axios
        .post(action, formData, {
          withCredentials,
          headers,
          onUploadProgress: ({ total, loaded }) => {
            onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
          },
        })
        .then(({ data: response }) => {
          onSuccess(response, file);
        })
        .catch(onError);
      /*
      return {
        abort() {
          console.log('upload progress is aborted.');
        },
      };
      */
    },
  };

  return (
    <div className="uploadfile">
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>上传图片</Button>
      </Upload>
    </div>
  );
};

export default UploadFile;
