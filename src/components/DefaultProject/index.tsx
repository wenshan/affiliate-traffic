import { getDefaultProject } from '@/services/api/googleAccount';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

type projectInfo = {
  accountId: string;
  adultContent: number;
  createdAt: string;
  defaultState: boolean;
  describe: string;
  id: number;
  image: string;
  name: string;
  kind: string;
  projectId: string;
  [key: string]: any;
};
const projectInfoInit = {
  name: '',
  accountId: '',
  adultContent: 0,
  createdAt: '',
  defaultState: false,
  projectId: '',
  id: 0,
  describe: '',
  image: '',
  kind: '',
};
const DefaultProject: React.FC = () => {
  const [projectInfo, setProjectInfo] = useState<projectInfo>(projectInfoInit);
  const getDefaultProjectInfo = async () => {
    const result = await getDefaultProject();
    if (result && result.status === 200 && result.data) {
      setProjectInfo(result.data);
    }
  };
  useEffect(() => {
    getDefaultProjectInfo();
  }, []);

  return (
    <Row>
      <Col>
        <p>当前项目：{`${projectInfo && projectInfo.name ? projectInfo.name : '无项目'}`}</p>
      </Col>
    </Row>
  );
};

export default DefaultProject;
