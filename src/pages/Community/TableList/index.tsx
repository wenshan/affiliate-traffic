import { downloadXlsx, getUserTableList, verifySignature } from '@/services/api/login';
import { FileWordOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Modal, Popover, Radio, Space, message } from 'antd';
import React, { useRef, useState } from 'react';

const TableList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalShow, setModalShow] = useState<boolean>(false);
  const [id, setTableId] = useState<number>(0);
  const [is_checkSignature, setCheckSignature] = useState(0);
  const [params, setParams] = useState<number>(0);
  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  // 下载 ex
  const handelDownloadXlsx = async () => {
    const result = await downloadXlsx();
    console.log('result:', result);
    setLoading(false);
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
    setModalShow(false);
    const result = await verifySignature({ id, is_checkSignature });
    if (result && result.status === 200) {
      setParams(logTime);
      message.success({
        content: '审核成功',
      });
    } else {
      message.error({
        content: '审核失败',
      });
    }
  };

  const handleCancel = async () => {
    setModalShow(false);
  };
  const onChangeRadio = (e) => {
    console.log('radio checked', e.target.value);
    setCheckSignature(e.target.value);
  };

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: false,
      valueType: 'indexBorder',
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
                      审核未通过{' '}
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
                      审核已通过{' '}
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
                    未审核{' '}
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
      title: '选择区域',
      dataIndex: 'areas',
      initialValue: '翠苑三区',
      filters: true,
      onFilter: true,
      ellipsis: true,
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
      ellipsis: true,
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
      },
    },
    {
      title: '选择楼号',
      dataIndex: 'build',
      initialValue: 'All',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        all: {
          text: 'All',
          status: '',
        },
        1: {
          text: '1号',
          status: '1',
        },
        2: {
          text: '2号',
          status: '2',
        },
        3: {
          text: '3号',
          status: '3',
        },
        4: {
          text: '4号',
          status: '4',
        },
        5: {
          text: '5号',
          status: '5',
        },
        6: {
          text: '6号',
          status: '6',
        },
        7: {
          text: '7号',
          status: '7',
        },
        8: {
          text: '8号',
          status: '8',
        },
        9: {
          text: '9号',
          status: '9',
        },
        10: {
          text: '10号',
          status: '10',
        },
        11: {
          text: '11号',
          status: '11',
        },
        12: {
          text: '12号',
          status: '12',
        },
        13: {
          text: '13号',
          status: '13',
        },
        14: {
          text: '14号',
          status: '14',
        },
        15: {
          text: '15号',
          status: '15',
        },
        16: {
          text: '16号',
          status: '16',
        },
        17: {
          text: '17号',
          status: '17',
        },
        18: {
          text: '18号',
          status: '18',
        },
        19: {
          text: '19号',
          status: '19',
        },
        20: {
          text: '20号',
          status: '20',
        },
        21: {
          text: '21号',
          status: '21',
        },
        22: {
          text: '22号',
          status: '22',
        },
        23: {
          text: '23号',
          status: '23',
        },
        24: {
          text: '24号',
          status: '24',
        },
        25: {
          text: '25号',
          status: '25',
        },
        26: {
          text: '26号',
          status: '26',
        },
        27: {
          text: '27号',
          status: '27',
        },
        28: {
          text: '28号',
          status: '28',
        },
      },
    },
    {
      title: '选择单元',
      dataIndex: 'unit',
      initialValue: 'All',
      filters: true,
      onFilter: true,
      ellipsis: true,
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
          text: '5单元',
          status: '5',
        },
      },
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
          text: '个人产权',
          status: '1',
        },
        2: {
          text: '公司产权',
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
      valueEnum: {
        0: {
          text: '未申报',
          status: 'All',
        },
        1: {
          text: '同意意愿',
          status: '0',
        },
        2: {
          text: '不同意意愿',
          status: '1',
        },
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
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
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
      <Modal title="电子签名审核" open={isModalShow} onOk={handleOk} onCancel={handleCancel}>
        <Radio.Group onChange={onChangeRadio} value={is_checkSignature}>
          <Space direction="vertical">
            <Radio value={1}>审核未通过</Radio>
            <Radio value={2}>审核通过</Radio>
          </Space>
        </Radio.Group>
      </Modal>
    </PageContainer>
  );
};

export default TableList;