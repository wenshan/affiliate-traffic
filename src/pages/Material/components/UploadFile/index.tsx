import { uploadFileURL } from '@/services/api/uploadFile';
import { UploadOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Upload, message } from 'antd';
import axios from 'axios';

import './index.less';
// https://github.com/react-component/upload#customrequest
const UploadFile: React.FC = (props: { [key: string]: string | any }) => {
  // console.log('UploadFile props:', props);
  const { selectFolderDirectory, queryFolderMaterialFetch } = useModel('material');
  const uploadProps = {
    accept: 'image/*',
    action: uploadFileURL(),
    multiple: true,
    data: selectFolderDirectory,
    headers: {},
    withCredentials: true,
    showUploadList: false,
    directory: false,
    maxCount: 1,
    method: 'post',
    onStart: async (file: { name: string }) => {
      console.log('onStart', file, file.name);
    },
    onSuccess: async (res: any, file: { name: any }) => {
      message.success(`${file.name} 上传成功！`);
      await queryFolderMaterialFetch(selectFolderDirectory, 'upload');
      console.log('onSuccess', res, file.name);
    },
    beforeUpload: async (file: { type: string; name: any }) => {
      if (
        selectFolderDirectory &&
        selectFolderDirectory.is_leaf &&
        selectFolderDirectory.is_leaf === 1
      ) {
        const imgType = 'image/png,image/gif,image/jpg,image/jpeg';
        if (imgType.indexOf(file.type) < 0) {
          message.error(`${file.name} 不是jpg/jpeg/gif/png格式`);
          return false;
        }
      } else {
        message.error(`当前文件夹不是叶子目录`);
      }
    },
    onError: async (err: any) => {
      console.log('onError', err);
      message.error('上传失败，请重试！');
    },
    onProgress: async ({ percent }: any, file: { name: any }) => {
      console.log('onProgress', `${percent}%`, file.name);
    },
    customRequest: async ({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) => {
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
          onUploadProgress: ({ total = 1, loaded }) => {
            onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
          },
        })
        .then(({ data: response }) => {
          onSuccess(response, file);
        })
        .catch(onError);
    },
  };

  return (
    <div className="uploadfile">
      <Upload {...uploadProps}>
        <Button
          icon={<UploadOutlined />}
          disabled={!!!(props.selectedKeys && props.selectedKeys[0])}
        >
          上传图片
        </Button>
      </Upload>
    </div>
  );
};

export default UploadFile;
