import DefaultProject from '@/components/DefaultProject';
import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div className="container">
      <PageContainer>
        <DefaultProject></DefaultProject>
        <h1>欢迎</h1>
      </PageContainer>
    </div>
  );
};

export default Welcome;
