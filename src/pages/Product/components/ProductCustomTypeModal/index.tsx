import { cerateType, editType } from '@/services/api/productType';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';

type Item = {
  title_zh: string;
  title_en: string;
  title_ja: string;
  title_ko: string;
  [key: string]: any;
};
type Props = {
  open: boolean;
  optionAction: boolean;
  openStatusCallback: any;
  callbackOk: any;
  initData: Item;
};

export default (props: Props) => {
  const [form] = Form.useForm<any>();
  const [isOpenShow, setOpenShow] = useState(props.open);
  const submitHandler = async (values: Item) => {
    const { optionAction } = props;
    if (values) {
      // 编辑
      if (optionAction) {
        const postData = Object.assign({}, props.initData, values);
        const result = await editType(postData);
        if (result && result.status === 200) {
          message.success(result.msg || '编辑成功');
          setOpenShow(false);
          if (props.callbackOk) {
            props.callbackOk();
          }
        } else {
          message.error(result.msg || '编辑失败');
        }
      } else {
        // 新增
        const result = await cerateType(values);
        if (result && result.status === 200) {
          message.success(result.msg || '添加成功');
          setOpenShow(false);
          if (props.callbackOk) {
            props.callbackOk(false);
          }
        } else {
          message.error(result.msg || '添加失败');
        }
      }
    }
  };

  const setOpenShowAction = async (open: boolean) => {
    setOpenShow(open);
    if (props.openStatusCallback) {
      props.openStatusCallback(open);
    }
  };

  useEffect(() => {
    form.setFieldsValue(props.initData);
    setOpenShow(props.open);
  }, [props]);
  return (
    <ModalForm<Item>
      title={`${props.optionAction ? '编辑分类' : '新建分类'}`}
      form={form}
      open={isOpenShow}
      onOpenChange={setOpenShowAction}
      onFinish={async (values) => {
        await submitHandler(values);
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText width="md" name="title_zh" label="分类名称-中文" placeholder="输入分类名称" />
        <ProFormText width="md" name="title_en" label="分类名称-英文" placeholder="输入分类名称" />
        <ProFormText width="md" name="title_ja" label="分类名称-日文" placeholder="输入分类名称" />
        <ProFormText width="md" name="title_ko" label="分类名称-韩文" placeholder="输入分类名称" />
      </ProForm.Group>
    </ModalForm>
  );
};
