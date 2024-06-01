import { lastDayIntention, reportFormsBuildTable } from '@/services/api/community';
import { PageContainer } from '@ant-design/pro-components';
import type { RadioChangeEvent } from 'antd';
import { Card, Col, Popover, Radio, Row, Table, Tag, message } from 'antd';
import { MessageOutline } from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';

import './index.less';

const Dashboard: React.FC = () => {
  const [areas, setAreas] = useState('翠苑三区');
  const [region, setRegion] = useState('all');
  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });
  const [total, setTotal] = useState(0);
  const [cardAllData, setCardAllData] = useState({
    value: [],
    days: [],
    agreeUserNum: 0,
    unwillingUserNum: 0,
    communityUserNum: 0,
  });
  const [cardBData, setCardBData] = useState({
    value: [],
    days: [],
    agreeUserNum: 0,
    unwillingUserNum: 0,
    communityUserNum: 0,
  });
  const [cardCData, setCardCData] = useState({
    value: [],
    days: [],
    agreeUserNum: 0,
    unwillingUserNum: 0,
    communityUserNum: 0,
  });

  const optionsRadio = [
    { label: '翠苑三区All', value: 'all' },
    { label: 'B区', value: 'B' },
    { label: 'C区', value: 'C' },
  ];

  const columnsTable = () => {
    return [
      {
        title: 'ID',
        dataIndex: 'index',
        valueType: 'index',
        width: 60,
        render: (text, record, index) => {
          return index + 1;
        },
      },
      {
        title: '区域',
        key: 'name',
        ellipsis: true,
        render: (_: any, record: { areas: any; build: any; region: any }) => {
          let text = '';
          if (record && record.areas && record.build && record.region) {
            text = `${record.areas}-${record.region}区-${record.build}幢`;
          }
          return text;
        },
      },
      {
        title: '实际套数',
        dataIndex: 'total',
        key: 'total',
        ellipsis: true,
      },
      {
        title: '登记同意用户数',
        dataIndex: 'agreeNum',
        key: 'agreeNum',
        ellipsis: true,
      },
      {
        title: '征集通过率',
        key: 'rate',
        ellipsis: true,
        render: (_: any, record: { agreeNum: number; total: number }) => {
          return `${((record.agreeNum / record.total) * 100).toFixed(2)} %`;
        },
      },
      {
        title: '详细的房号信息',
        key: 'unitRoom',
        ellipsis: false,
        render: (_: any, record: { agreeNum: number; total: number; unitRoom: any }) => {
          let html: React.JSX.Element[] = [];
          if (record && record.unitRoom) {
            const items = record.unitRoom;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            items.length &&
              items.map((item: { unit: string | number; room: any }, idx: any) => {
                html.push(
                  <>
                    {/**
                     * {"id":158,"userid":124,
                     * "roomid":"c_12102","name":"陈庆生","areas":"翠苑三区","region":"C","build":1,
                     * "unit":2,"room":102,"is_certification":false,"contractId":"124_70414642",
                     * "contractPath":"https://img.dreamstep.top/community/124/70414642_1716031935541.pdf",
                     * "signatureFile":"",
                     * "is_checkSignature":0,
                     * "reviewer":null,
                     * "submitConfirmation":0,
                     * "mobile":null,
                     * "is_checkMobile":true,
                     * "owner":2,
                     * "propertyType":1,
                     * "feedback":null,
                     * "createdAt":"2024-05-18 18:58:13",
                     * "updatedAt":null}]}
                     */}
                    <div key={`${item.unit}_${idx}`} className="room-list clearfix">
                      <div className="unit" key={`${item.unit}_${idx}_unit`}>
                        {item.unit} #
                      </div>
                      <div className="list clearfix" key={`${item.unit}_${idx}list`}>
                        {item.room &&
                          item.room.length > 0 &&
                          item.room.map(
                            (
                              list: {
                                [x: string]: ReactNode;
                                unit: any;
                                room:
                                  | string
                                  | number
                                  | boolean
                                  | React.ReactElement<
                                      any,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | null
                                  | undefined;
                                areas: any;
                                region: any;
                                build: any;
                                name:
                                  | string
                                  | number
                                  | boolean
                                  | React.ReactElement<
                                      any,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | React.ReactPortal
                                  | null
                                  | undefined;
                                mobile:
                                  | string
                                  | number
                                  | boolean
                                  | React.ReactElement<
                                      any,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | React.ReactPortal
                                  | null
                                  | undefined;
                                propertyType: number;
                                owner: number;
                                submitConfirmation: number;
                                signatureFile: string | undefined;
                                contractPath: string | undefined;
                                is_checkSignature: number;
                                reviewer:
                                  | string
                                  | number
                                  | boolean
                                  | React.ReactElement<
                                      any,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | React.ReactPortal
                                  | null
                                  | undefined;
                                feedback:
                                  | string
                                  | number
                                  | boolean
                                  | React.ReactElement<
                                      any,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | React.ReactPortal
                                  | null
                                  | undefined;
                                createdAt:
                                  | string
                                  | number
                                  | boolean
                                  | React.ReactElement<
                                      any,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | React.ReactPortal
                                  | null
                                  | undefined;
                              },
                              index: any,
                            ) => (
                              <Popover
                                key={`${list.unit}_${index}_${list.room}_popover`}
                                content={
                                  <>
                                    <p>
                                      户号：
                                      {`${list.areas}-${list.region}区-${list.build}幢-${list.unit}单元-${list.room}室`}
                                    </p>
                                    <p>姓名：{list.name}</p>
                                    <p>userid：{list.userid}</p>
                                    <p>Mobile：{list.mobile}</p>
                                    <p>
                                      产权类型：
                                      {list.propertyType > 0 ? (
                                        <>{list.propertyType === 1 ? '个人' : '公司'}</>
                                      ) : (
                                        '未知'
                                      )}
                                    </p>
                                    <p>
                                      是否拥有产权：
                                      {list.owner > 0 ? (
                                        <>{list.owner === 2 ? '有' : '没有'}</>
                                      ) : (
                                        '未知'
                                      )}
                                    </p>
                                    <p>
                                      意愿申报：
                                      {list.submitConfirmation > 0 ? (
                                        <>{list.submitConfirmation === 2 ? '同意' : '不同意'}</>
                                      ) : (
                                        '未知'
                                      )}
                                    </p>
                                    {list.signatureFile && (
                                      <p>
                                        <img src={list.signatureFile} width={120} />
                                      </p>
                                    )}
                                    {list.contractPath && (
                                      <p>
                                        申报协议：
                                        <a
                                          href={list.contractPath}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          点击查看
                                        </a>
                                      </p>
                                    )}
                                    <p>
                                      审核状态：{list.is_checkSignature === 1 ? '已审核' : '未审核'}
                                    </p>
                                    <p>审核人：{list.reviewer ? list.reviewer : '未审核'}</p>
                                    <p>反馈信息：{list.feedback ? list.feedback : '无'}</p>
                                    <p>申报时间：{list.createdAt}</p>
                                  </>
                                }
                                title="详情"
                              >
                                {list.submitConfirmation > 0 ? (
                                  <Tag color={`${list.submitConfirmation === 2 ? 'green' : 'red'}`}>
                                    {list.room} {list.feedback && <MessageOutline />}
                                  </Tag>
                                ) : (
                                  <Tag>{list.room}</Tag>
                                )}
                              </Popover>
                            ),
                          )}
                      </div>
                    </div>
                  </>,
                );
              });
          }
          return html;
        },
      },
    ];
  };
  // 全区数据 lastDayIntention
  const fetchDataCardAll = async ({ areas, region }) => {
    const result = await lastDayIntention({ areas, region });
    if (result && result.status === 200 && result.data) {
      setCardAllData(result.data);
    } else {
      message.info('请求失败，请重试');
    }
  };
  // B区数据
  const fetchDataCardB = async ({ areas, region }) => {
    const result = await lastDayIntention({ areas, region });
    if (result && result.status === 200 && result.data) {
      setCardBData(result.data);
    } else {
      message.info('请求失败，请重试');
    }
  };
  // C区数据
  const fetchDataCardC = async ({ areas, region }) => {
    const result = await lastDayIntention({ areas, region });
    if (result && result.status === 200 && result.data) {
      setCardCData(result.data);
    } else {
      message.info('请求失败，请重试');
    }
  };

  const fetchDataTable = async ({ areas, region, pagination }) => {
    setLoading(true);
    const result = await reportFormsBuildTable({ areas, region, ...pagination });
    if (
      result &&
      result.status === 200 &&
      result.data &&
      result.data.rows &&
      result.data.rows.length > 0
    ) {
      setTableData(result.data.rows);
      setTotal(result.data.total);
      setLoading(false);
    } else {
      setTableData([]);
      setLoading(false);
    }
  };

  const onChangeRadio = async ({ target: { value } }: RadioChangeEvent) => {
    setRegion(value);
    setPagination({ current: 1, pageSize: 100 });
    fetchDataTable({ areas, region: value, pagination });
  };

  const handleTableChange = (pagination) => {
    setPagination({
      pagination,
    });
    fetchDataTable({ areas, region, pagination });
  };

  useEffect(() => {
    setAreas('翠苑三区');
    fetchDataTable({ areas, region, pagination });
    fetchDataCardAll({ areas, region: 'all' });
    fetchDataCardB({ areas, region: 'B' });
    fetchDataCardC({ areas, region: 'C' });
  }, [pagination?.current, pagination?.pageSize]);

  return (
    <PageContainer>
      <div className="dashboard-page">
        <div className="card-top">
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <div className="title">全区住房户号完成率</div>
                <div className="rate">
                  {((cardAllData.communityUserNum / 3850) * 100).toFixed(2)} %
                </div>
                <div className="des">
                  <p>
                    总户数: <span>1821</span>
                  </p>
                  <p>
                    已申请住房户数: <span>{cardAllData.communityUserNum}</span>{' '}
                  </p>
                  <p>
                    已申报成功用户: <span>{cardAllData.agreeUserNum}</span>
                  </p>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div className="title">B区住房户号完成率</div>
                <div className="rate">
                  {((cardBData.communityUserNum / 870) * 100).toFixed(2)} %
                </div>
                <div className="des">
                  <p>
                    总户数: <span>870</span>
                  </p>
                  <p>
                    已申请住房户数: <span>{cardBData.communityUserNum}</span>
                  </p>
                  <p>
                    已申报成功用户: <span>{cardBData.agreeUserNum}</span>
                  </p>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div className="title">C区住房户号完成率</div>
                <div className="rate">
                  {((cardCData.communityUserNum / 951) * 100).toFixed(2)} %
                </div>
                <div className="des">
                  <p>
                    总户数: <span>951</span>
                  </p>
                  <p>
                    已申请住房户数: <span>{cardCData.communityUserNum}</span>
                  </p>
                  <p>
                    已申报成功用户: <span>{cardCData.agreeUserNum}</span>
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="tab-table">
          <div className="header"></div>
          <div className="content">
            <div className="radio-wrap">
              <Radio.Group
                options={optionsRadio}
                onChange={onChangeRadio}
                value={region}
                optionType="button"
              />
            </div>

            <Table
              columns={columnsTable()}
              dataSource={tableData}
              loading={isLoading}
              pagination={{ ...pagination, total }}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              onChange={handleTableChange}
            ></Table>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
