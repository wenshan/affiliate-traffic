import DefaultProject from '@/components/DefaultProject';
import bannerChannel from '@/constant/bannerChannel';
import bannerType from '@/constant/bannerType';
import { createBanner, delBanner, editBanner, queryBanner } from '@/services/api/banner';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Form, Modal, message } from 'antd';
import React, { useRef, useState } from 'react';
import ImageSelectModal from './components/ImageSelectModal';

import './index.less';

const initDetail = {
  language: '',
  name: '',
  src: '',
  url: '',
  type: '',
  is_show: 1,
  remark: '',
  channel: '',
};

const Banner: React.FC = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const actionRef = useRef<ActionType>();
  const [isModalFormStatus, setModalFormStatus] = useState<boolean>(false);
  const [isImageSelectModalStatus, setImageSelectModalStatus] = useState<boolean>(false);
  const [currentDetail, setCurrentDetail] = useState(initDetail);
  const [params, setParams] = useState(0);
  const [optionType, setOptionType] = useState(0);

  const productImageCallbackCancel = () => {
    setImageSelectModalStatus(false);
  };
  const productImageCallbackOk = (item) => {
    const newCurrentDetail = Object.assign({}, currentDetail, { src: item[0].url });
    setCurrentDetail(newCurrentDetail);
    setImageSelectModalStatus(false);
  };

  const createBannerPost = async (item) => {
    let result;
    if (item && item.name && item.url && item.type && item.channel && item.src) {
      if (optionType < 2) {
        if (optionType === 0) {
          result = await createBanner(item);
        }
        if (optionType === 1) {
          result = await editBanner(item);
        }
        if (result && result.status === 200 && result.data) {
          setModalFormStatus(false);
          setParams(new Date().getTime());
          message.success('提交成功');
        }
      } else {
        setModalFormStatus(false);
      }
    } else {
      message.success('缺少必要参数');
    }
  };

  const tableHandelEdit = (item) => {
    setOptionType(1);
    setCurrentDetail(item);
    setModalFormStatus(true);
  };
  const tableHandelView = (item) => {
    setOptionType(2);
    setCurrentDetail(item);
    setModalFormStatus(true);
  };
  const tableHandelDel = async (item) => {
    if (item && item.id) {
      Modal.confirm({
        title: '确认删除',
        content: '删除当前的广告Banner',
        onOk: async () => {
          const result = await delBanner({ id: item.id });
          if (result && result.status === 200) {
            setParams(new Date().getTime());
            message.success('删除成功');
          }
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
    },
    {
      title: '语言',
      dataIndex: 'language',
      valueType: 'select',
      initialValue: 'all',
      valueEnum: {
        all: { text: '所有', status: 'all' },
        'en-US': { text: 'English', status: 'en-US' },
        'ja-JP': { text: 'Japanese', status: 'ja-JP' },
        'zh-CN': { text: '中文(简体)', status: 'zh-CN' },
      },
    },
    {
      title: 'URL',
      dataIndex: 'url',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
      ellipsis: true,
    },
    {
      title: '通道',
      dataIndex: 'channel',
      valueType: 'select',
      initialValue: 'all',
      valueEnum: bannerChannel.getTableChannel,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      initialValue: 'all',
      valueEnum: bannerType.getTableType,
    },
    {
      title: '展示状态',
      dataIndex: 'is_show',
      valueType: 'select',
      initialValue: 'all',
      valueEnum: {
        all: { text: '所有', status: 'all' },
        '1': { text: '是', status: '1' },
        '0': { text: '否', status: '0' },
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateRange',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      render: (text, record) => {
        return record.createdAt;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <a
          key="edit"
          onClick={() => {
            tableHandelEdit(record);
          }}
        >
          编辑
        </a>,
        <a
          key="view"
          onClick={() => {
            tableHandelView(record);
          }}
        >
          查看
        </a>,
        <a
          key="del"
          onClick={() => {
            tableHandelDel(record);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const subTitle = () => {
    let title;
    switch (optionType) {
      case 0:
        title = '创建广告Banner';
        break;
      case 1:
        title = '编辑广告Banner';
        break;
      case 2:
        title = '查看广告Banner';
        break;
      default:
        title = '创建广告Banner';
    }
    return title;
  };

  return (
    <PageContainer>
      <DefaultProject></DefaultProject>
      <ProTable<API.RuleListItem, API.PageParams>
        tableClassName="page-table"
        headerTitle="数据表"
        actionRef={actionRef}
        rowKey="key"
        params={params}
        search={{
          labelWidth: 120,
        }}
        request={queryBanner}
        columns={columns}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOptionType(0);
              setCurrentDetail(initDetail);
              setModalFormStatus(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <ModalForm
        open={isModalFormStatus}
        title={subTitle()}
        form={form}
        readonly={optionType === 2}
        autoFocusFirstInput
        modalProps={{
          zIndex: 99,
          destroyOnClose: true,
          onCancel: () => setModalFormStatus(false),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          const item = Object.assign({}, currentDetail, values);
          createBannerPost(item);
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true }]}
            width="md"
            name="name"
            label="Banner 名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
            initialValue={currentDetail.name}
          />
          <ProFormRadio.Group
            width="md"
            rules={[{ required: true }]}
            label="是否展示"
            name="is_show"
            initialValue={currentDetail.is_show}
            options={[
              { label: '是', value: 1 },
              { label: '否', value: 0 },
            ]}
          />
        </ProForm.Group>
        <div className="img-box-modal-form">
          <div className="header">
            <div className="title">
              <i>*</i>图片
            </div>
          </div>
          <div className="view-box clearfix">
            <div className="view">
              <img src={currentDetail.src} />
            </div>
            <Button
              className="button"
              type="primary"
              size="small"
              onClick={() => {
                setImageSelectModalStatus(true);
              }}
            >
              选择图片
            </Button>
          </div>
        </div>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true }]}
            width="md"
            name="url"
            label="链接地址"
            placeholder="请输入链接地址"
            initialValue={currentDetail.url}
          />
          <ProFormSelect
            rules={[{ required: true }]}
            width="md"
            name="language"
            label="选择对应的语言"
            initialValue={currentDetail.language}
            options={[
              { label: 'English', value: 'en-US' },
              { label: 'Japanese', value: 'ja-JP' },
              { label: '中文(简体)', value: 'zh-CN' },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            rules={[{ required: true }]}
            width="md"
            name="type"
            label="广告展示位置"
            placeholder="选择广告展示位置"
            initialValue={currentDetail.type}
            options={[
              { value: 'home', label: 'home' },
              { value: 'list', label: 'list' },
              { value: 'product', label: 'product' },
              { value: 'detail', label: 'detail' },
              { value: 'other', label: 'other' },
            ]}
          />
          <ProFormSelect
            rules={[{ required: true }]}
            width="md"
            name="channel"
            label="广告展示通道"
            placeholder="请选择广告展示通道"
            initialValue={currentDetail.channel}
            options={[
              { value: 'limeetpet', label: 'limeetpet' },
              { value: 'community', label: 'community' },
              { value: 'qbs-tools', label: 'qbs-tools' },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="remark"
            label="备注"
            placeholder="请输入备注"
            initialValue={currentDetail.remark}
          />
        </ProForm.Group>
      </ModalForm>
      <ImageSelectModal
        open={isImageSelectModalStatus}
        callbackCancel={productImageCallbackCancel}
        callbackOk={productImageCallbackOk}
        selectedType="banner"
      ></ImageSelectModal>
    </PageContainer>
  );
};

export default Banner;
