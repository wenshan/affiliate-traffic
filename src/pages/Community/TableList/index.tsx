import { downloadXlsx, getUserTableList, verifySignature } from '@/services/api/community';
import roomBuild from '@/utils/roomBuild';
import { FileWordOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Input, Modal, Popover, Radio, Space, Tag, message } from 'antd';
import React, { useRef, useState } from 'react';

const { TextArea } = Input;

const TableList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalShow, setModalShow] = useState<boolean>(false);
  const [id, setTableId] = useState<number>(0);
  const [is_checkSignature, setCheckSignature] = useState(0);
  const [params, setParams] = useState<number>(0);
  const [remark, setRemark] = useState<string>('');
  const actionRef = useRef<ActionType>();

  // 下载 ex
  const handelDownloadXlsx = async () => {
    await downloadXlsx();
    setLoading(false);
  };

  //  remark
  const textAreaOnChange = async (e) => {
    const { value } = e.target;
    setRemark(value);
  };
  // 审核
  const handelVerifySignatureStatus = async ({ id, is_checkSignature }) => {
    setModalShow(true);
    setTableId(id);
    setCheckSignature(is_checkSignature);
  };
  // 发送审核结果
  const handleOk = async () => {
    const logTime = new Date().getTime();
    if (is_checkSignature === 1 && !remark) {
      message.success({
        content: '未通过的状态的审核，请填写备注.',
      });
      return;
    } else {
      const result = await verifySignature({ id, is_checkSignature, remark });
      if (result && result.status === 200) {
        setModalShow(false);
        setParams(logTime);
        message.success({
          content: '审核变更成功',
        });
      } else {
        message.error({
          content: '审核变更失败',
        });
      }
    }
  };

  const handleCancel = async () => {
    setModalShow(false);
  };
  const onChangeRadio = (e: any) => {
    setCheckSignature(e.target.value);
  };

  const handelOpenPDF = async (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
      valueType: 'index',
      width: 60,
    },
    {
      title: '用户ID',
      dataIndex: 'userid',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
    },
    {
      title: '电子签',
      dataIndex: 'signatureFile',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
      width: 120,
      render: (_, record) => {
        let html = [];
        if (
          record &&
          record.signatureFile &&
          record.submitConfirmation &&
          record.submitConfirmation === 2
        ) {
          html = (
            <Popover content={<img width={160} src={record.signatureFile} />}>
              <img width={60} src={record.signatureFile} />
            </Popover>
          );
        }
        return html;
      },
    },
    {
      title: '签名审核',
      dataIndex: 'is_checkSignature',
      valueType: 'select',
      initialValue: 'All',
      width: 150,
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        all: {
          text: '所有',
          status: 'all',
        },
        0: {
          text: '未审核',
          status: '0',
        },
        1: {
          text: '审核未通过',
          status: '1',
        },
        2: {
          text: '审核已通过',
          status: '2',
        },
      },
      render: (_, record) => {
        let html = '';
        if (
          record &&
          record.signatureFile &&
          record.submitConfirmation &&
          record.submitConfirmation === 2
        ) {
          if (record.is_checkSignature > 0) {
            if (record.is_checkSignature === 1) {
              html = (
                <div className="check-signature">
                  {
                    <>
                      <Tag color="red">审核未通过</Tag>
                      <Button
                        type="link"
                        onClick={() =>
                          handelVerifySignatureStatus({
                            id: record.id,
                            is_checkSignature: record.is_checkSignature,
                          })
                        }
                      >
                        重新审核
                      </Button>
                    </>
                  }
                </div>
              );
            } else {
              html = (
                <div className="check-signature">
                  {
                    <>
                      <Tag color="green">审核已通过</Tag>
                      <Button
                        type="link"
                        onClick={() =>
                          handelVerifySignatureStatus({
                            id: record.id,
                            is_checkSignature: record.is_checkSignature,
                          })
                        }
                      >
                        重新审核
                      </Button>
                    </>
                  }
                </div>
              );
            }
          } else {
            html = (
              <div className="check-signature">
                {
                  <>
                    <Tag color="orange">未审核</Tag>
                    <Button
                      type="link"
                      onClick={() =>
                        handelVerifySignatureStatus({
                          id: record.id,
                          is_checkSignature: record.is_checkSignature,
                        })
                      }
                    >
                      去审核
                    </Button>
                  </>
                }
              </div>
            );
          }
        } else {
          html = <>未申报</>;
        }
        return html;
      },
    },
    {
      title: '审核人',
      dataIndex: 'reviewer',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
    },
    {
      title: '审核备注',
      dataIndex: 'remark',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
    },
    {
      title: '选择区域',
      dataIndex: 'areas',
      initialValue: '翠苑三区',
      filters: true,
      onFilter: true,
      ellipsis: false,
      valueType: 'select',
      valueEnum: {
        翠苑三区: { text: '翠苑三区', status: '翠苑三区' },
      },
    },
    {
      title: '选择片区',
      dataIndex: 'region',
      initialValue: 'C',
      filters: true,
      onFilter: true,
      ellipsis: false,
      valueType: 'select',
      valueEnum: {
        all: {
          text: '所有',
          status: 'all',
        },
        A: {
          text: 'A',
          status: 'A',
        },
        B: {
          text: 'B',
          status: 'B',
        },
        C: {
          text: 'C',
          status: 'C',
        },
        D: {
          text: 'D',
          status: 'D',
        },
        E: {
          text: 'E',
          status: 'E',
        },
      },
    },
    {
      title: '选择楼号',
      dataIndex: 'build',
      initialValue: 'All',
      filters: true,
      onFilter: true,
      ellipsis: false,
      valueType: 'select',
      valueEnum: {
        all: {
          text: 'All',
          status: '',
        },
        ...roomBuild,
      },
    },
    {
      title: '选择单元',
      dataIndex: 'unit',
      initialValue: 'All',
      filters: true,
      onFilter: true,
      ellipsis: false,
      valueType: 'select',
      valueEnum: {
        All: {
          text: 'All',
          status: 'All',
        },
        1: {
          text: '1单元',
          status: '1',
        },
        2: {
          text: '2单元',
          status: '2',
        },
        3: {
          text: '3单元',
          status: '3',
        },
        4: {
          text: '4单元',
          status: '4',
        },
        5: {
          text: '5单元',
          status: '5',
        },
        6: {
          text: '6单元',
          status: '6',
        },
      },
    },
    {
      title: '房号',
      dataIndex: 'room',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
    },
    {
      title: '产权类型',
      valueType: 'select',
      dataIndex: 'propertyType',
      initialValue: 'All',
      valueEnum: {
        All: {
          text: '所有',
          status: 'All',
        },
        0: {
          text: '未知',
          status: '0',
        },
        1: {
          text: '个人',
          status: '1',
        },
        2: {
          text: '公司',
          status: '2',
        },
      },
    },
    {
      title: '产权人',
      valueType: 'select',
      dataIndex: 'owner',
      initialValue: 'All',
      valueEnum: {
        0: {
          text: '未知',
          status: '0',
        },
        1: {
          text: '不是',
          status: '1',
        },
        2: {
          text: '是',
          status: '2',
        },
      },
    },
    {
      title: '手机验证',
      dataIndex: 'is_checkMobile',
      valueType: 'select',
      initialValue: 'All',
      valueEnum: {
        all: {
          text: '所有',
          status: '0',
        },
        0: {
          text: '未验证',
          status: '0',
        },
        1: {
          text: '已验证',
          status: '1',
        },
      },
    },
    {
      title: '意愿申报',
      dataIndex: 'submitConfirmation',
      valueType: 'select',
      initialValue: 'All',
      width: 120,
      valueEnum: {
        0: {
          text: '未申报',
          status: 'All',
        },
        1: {
          text: '同意',
          status: '0',
        },
        2: {
          text: '不同意',
          status: '1',
        },
      },
      render: (_, record) => {
        let html = '';
        if (
          record &&
          record.signatureFile &&
          record.submitConfirmation &&
          record.submitConfirmation > 0
        ) {
          if (record.submitConfirmation === 2) {
            html = (
              <>
                <Tag color="green">同意</Tag>{' '}
                <Button type="link" onClick={() => handelOpenPDF(record.contractPath)}>
                  查看协议
                </Button>
              </>
            );
          } else {
            html = <Tag color="red">不同意</Tag>;
          }
        } else {
          html = <Tag color="orange">未申报</Tag>;
        }
        return html;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateRange',
      hideInTable: false,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      render: (_, record) => {
        return record.createdAt;
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        tableClassName="page-table"
        params={params}
        headerTitle="数据表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setLoading(true);
              handelDownloadXlsx();
            }}
            loading={loading}
          >
            <FileWordOutlined /> 导出xlsx文件
          </Button>,
        ]}
        request={getUserTableList}
        columns={columns}
      />
      <Modal
        title="电子签名审核"
        open={isModalShow}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal-check"
      >
        <div className="check clearfix">
          <div className="tx">
            <div className="title">状态</div>
            <Radio.Group onChange={onChangeRadio} value={is_checkSignature}>
              <Space direction="vertical">
                <Radio value={1}>审核未通过</Radio>
                <Radio value={2}>审核通过</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="tx">
            <div className="title">备注</div>
            <TextArea
              rows={4}
              allowClear
              showCount
              value={remark}
              onChange={textAreaOnChange}
            ></TextArea>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default TableList;
