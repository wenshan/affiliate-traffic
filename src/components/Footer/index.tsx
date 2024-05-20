import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Gtraffic',
          title: 'Gtraffic',
          href: 'https://shoptraffic.cn',
          blankTarget: true,
        },
        {
          key: 'Hangzhou Ouhao Trading Co., Ltd',
          title: 'Hangzhou Ouhao Trading Co., Ltd',
          href: 'https://shoptraffic.cn',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
