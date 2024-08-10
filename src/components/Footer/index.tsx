import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Gtraffic"
      links={[
        {
          key: '浙ICP备2023008986号',
          title: '浙ICP备2023008986号',
          href: 'https://beian.miit.gov.cn/#/Integrated/index',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
